import { NextRequest, NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { z } from "zod";

export async function GET(_req: NextRequest) {
  const session = await getAuthSession();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await db.user.findUnique({
    where: { id: session.user.id },
    select: { referralCode: true },
  });

  const referrals = await db.referral.findMany({
    where: { senderId: session.user.id },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://promptshotai.com";

  return NextResponse.json({
    code: user?.referralCode,
    link: `${baseUrl}/?ref=${user?.referralCode}`,
    total: referrals.length,
    completed: referrals.filter((r) => r.status === "COMPLETED").length,
    pending: referrals.filter((r) => r.status === "PENDING").length,
    referrals: referrals.map((r) => ({
      email: r.referredEmail.replace(/(.{2}).+(@.+)/, "$1***$2"),
      status: r.status,
      date: r.createdAt,
    })),
  });
}

const inviteSchema = z.object({
  email: z.string().email().max(255),
});

export async function POST(req: NextRequest) {
  const session = await getAuthSession();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: z.infer<typeof inviteSchema>;
  try {
    body = inviteSchema.parse(await req.json());
  } catch {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  // Check not already referred
  const existing = await db.referral.findFirst({
    where: { senderId: session.user.id, referredEmail: body.email },
  });
  if (existing) {
    return NextResponse.json(
      { error: "Already referred this email" },
      { status: 409 }
    );
  }

  await db.referral.create({
    data: {
      senderId: session.user.id,
      referredEmail: body.email,
      status: "PENDING",
    },
  });

  return NextResponse.json({ success: true });
}
