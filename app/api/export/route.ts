import { NextRequest, NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { z } from "zod";

const schema = z.object({
  format: z.enum(["txt", "csv"]),
  ids: z.array(z.string().cuid()).min(1).max(500).optional(),
});

export async function POST(req: NextRequest) {
  const session = await getAuthSession();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Export requires PRO+
  const sub = await db.subscription.findUnique({
    where: { userId: session.user.id },
    select: { plan: true },
  });
  if (!sub || sub.plan === "FREE") {
    return NextResponse.json(
      { error: "Export requires Pro or Business plan" },
      { status: 403 }
    );
  }

  let body: z.infer<typeof schema>;
  try {
    body = schema.parse(await req.json());
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const generations = await db.generation.findMany({
    where: {
      userId: session.user.id,
      ...(body.ids ? { id: { in: body.ids } } : {}),
    },
    orderBy: { createdAt: "desc" },
    take: 500,
  });

  if (body.format === "txt") {
    const content = generations
      .map(
        (g, i: number) =>
          `=== Generation ${i + 1} ===\nType: ${g.outputType}\nDate: ${g.createdAt.toISOString()}\n\n${g.prompt}\n`
      )
      .join("\n---\n\n");

    return new NextResponse(content, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Content-Disposition": `attachment; filename="promptshot-export-${Date.now()}.txt"`,
      },
    });
  }

  // CSV
  const csvRows: string[][] = [
    ["ID", "Type", "Date", "Prompt"],
    ...generations.map((g) => [
      g.id,
      g.outputType,
      g.createdAt.toISOString(),
      `"${g.prompt.replace(/"/g, '""')}"`,
    ]),
  ];
  const csv = csvRows.map((row) => row.join(",")).join("\n");

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="promptshot-export-${Date.now()}.csv"`,
    },
  });
}
