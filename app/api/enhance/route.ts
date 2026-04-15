import { NextRequest, NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";
import { enhancePrompt, OutputType } from "@/lib/openai";
import { db } from "@/lib/db";
import { z } from "zod";

export const runtime = "nodejs";
export const maxDuration = 30;

const schema = z.object({
  generationId: z.string().cuid(),
  outputType: z.enum([
    "MIDJOURNEY",
    "STABLE_DIFFUSION",
    "PRODUCT_DESCRIPTION",
    "AD_COPY",
    "SEO_CONTENT",
  ]),
});

export async function POST(req: NextRequest) {
  const session = await getAuthSession();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Prompt enhancer is PRO+ only
  const sub = await db.subscription.findUnique({
    where: { userId: session.user.id },
    select: { plan: true },
  });
  if (!sub || sub.plan === "FREE") {
    return NextResponse.json(
      { error: "Prompt enhancer requires Pro or Business plan" },
      { status: 403 }
    );
  }

  let body: z.infer<typeof schema>;
  try {
    body = schema.parse(await req.json());
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const generation = await db.generation.findFirst({
    where: { id: body.generationId, userId: session.user.id },
  });

  if (!generation) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  try {
    const enhanced = await enhancePrompt(
      generation.prompt,
      body.outputType as OutputType
    );

    await db.generation.update({
      where: { id: generation.id },
      data: { enhancedPrompt: enhanced },
    });

    return NextResponse.json({ enhanced });
  } catch (error) {
    console.error("Enhancement error:", error);
    return NextResponse.json({ error: "Enhancement failed" }, { status: 500 });
  }
}
