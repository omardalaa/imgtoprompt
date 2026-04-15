import { NextRequest, NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { z } from "zod";

const querySchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(50).default(20),
  type: z
    .enum([
      "MIDJOURNEY",
      "STABLE_DIFFUSION",
      "PRODUCT_DESCRIPTION",
      "AD_COPY",
      "SEO_CONTENT",
      "ALL",
    ])
    .default("ALL"),
});

export async function GET(req: NextRequest) {
  const session = await getAuthSession();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const params = querySchema.parse(Object.fromEntries(searchParams));

  // Free plan: last 7 days only
  const sub = await db.subscription.findUnique({
    where: { userId: session.user.id },
    select: { plan: true },
  });

  const dateFilter =
    sub?.plan === "FREE"
      ? { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
      : undefined;

  const skip = (params.page - 1) * params.limit;

  const [generations, total] = await Promise.all([
    db.generation.findMany({
      where: {
        userId: session.user.id,
        ...(dateFilter ? { createdAt: dateFilter } : {}),
        ...(params.type !== "ALL" ? { outputType: params.type as any } : {}),
      },
      orderBy: { createdAt: "desc" },
      skip,
      take: params.limit,
      select: {
        id: true,
        outputType: true,
        prompt: true,
        enhancedPrompt: true,
        isPublic: true,
        watermark: true,
        createdAt: true,
      },
    }),
    db.generation.count({
      where: {
        userId: session.user.id,
        ...(dateFilter ? { createdAt: dateFilter } : {}),
        ...(params.type !== "ALL" ? { outputType: params.type as any } : {}),
      },
    }),
  ]);

  return NextResponse.json({
    generations,
    total,
    page: params.page,
    pages: Math.ceil(total / params.limit),
    plan: sub?.plan ?? "FREE",
  });
}

export async function DELETE(req: NextRequest) {
  const session = await getAuthSession();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  const generation = await db.generation.findFirst({
    where: { id, userId: session.user.id },
  });

  if (!generation) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  await db.generation.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
