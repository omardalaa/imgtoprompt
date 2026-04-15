import { NextRequest, NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";
import { checkRateLimit, ipRateLimit } from "@/lib/rate-limit";
import { generateFromImage, OutputType } from "@/lib/openai";
import { generateWatermark } from "@/lib/utils";
import { db } from "@/lib/db";
import { z } from "zod";

export const runtime = "nodejs";
export const maxDuration = 30;

const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10MB

const schema = z.object({
  imageBase64: z.string().min(1),
  mimeType: z.enum(["image/jpeg", "image/png", "image/webp", "image/gif"]),
  outputType: z.enum([
    "MIDJOURNEY",
    "STABLE_DIFFUSION",
    "PRODUCT_DESCRIPTION",
    "AD_COPY",
    "SEO_CONTENT",
  ]),
  makePublic: z.boolean().optional().default(false),
});

export async function POST(req: NextRequest) {
  // IP rate limit
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] ?? "unknown";
  if (!ipRateLimit(ip, 30, 60_000)) {
    return NextResponse.json(
      { error: "Too many requests" },
      { status: 429 }
    );
  }

  const session = await getAuthSession();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { allowed, remaining, limit, resetAt } = await checkRateLimit(
    session.user.id
  );

  if (!allowed) {
    return NextResponse.json(
      {
        error: "Daily limit reached",
        remaining: 0,
        limit,
        resetAt: resetAt.toISOString(),
      },
      {
        status: 429,
        headers: {
          "X-RateLimit-Limit": limit.toString(),
          "X-RateLimit-Remaining": "0",
          "X-RateLimit-Reset": resetAt.toISOString(),
        },
      }
    );
  }

  let body: z.infer<typeof schema>;
  try {
    const raw = await req.json();
    body = schema.parse(raw);
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  // Validate image size (base64 is ~33% larger than binary)
  if (body.imageBase64.length > MAX_IMAGE_SIZE * 1.37) {
    return NextResponse.json(
      { error: "Image too large (max 10MB)" },
      { status: 400 }
    );
  }

  // Validate it's actually base64
  if (!/^[A-Za-z0-9+/]+=*$/.test(body.imageBase64.replace(/\s/g, ""))) {
    return NextResponse.json({ error: "Invalid image data" }, { status: 400 });
  }

  try {
    const { prompt } = await generateFromImage(
      body.imageBase64,
      body.mimeType,
      body.outputType as OutputType
    );

    // Get user plan for watermark
    const sub = await db.subscription.findUnique({
      where: { userId: session.user.id },
      select: { plan: true },
    });
    const addWatermark = !sub || sub.plan === "FREE";
    const finalPrompt = addWatermark ? generateWatermark(prompt) : prompt;

    // Store generation
    const generation = await db.generation.create({
      data: {
        userId: session.user.id,
        imageUrl: `data:${body.mimeType};base64,${body.imageBase64.slice(0, 50)}...`,
        outputType: body.outputType as any,
        prompt: finalPrompt,
        isPublic: body.makePublic && sub?.plan !== "FREE",
        watermark: addWatermark,
      },
    });

    // Add to gallery if public and business plan
    if (body.makePublic && sub?.plan === "BUSINESS") {
      await db.galleryItem.create({
        data: {
          generationId: generation.id,
          userId: session.user.id,
          tags: [body.outputType.toLowerCase().replace("_", "-")],
        },
      });
    }

    return NextResponse.json(
      {
        id: generation.id,
        prompt: finalPrompt,
        outputType: body.outputType,
        remaining: remaining - 1,
        limit,
      },
      {
        headers: {
          "X-RateLimit-Limit": limit.toString(),
          "X-RateLimit-Remaining": (remaining - 1).toString(),
          "X-RateLimit-Reset": resetAt.toISOString(),
        },
      }
    );
  } catch (error: any) {
    console.error("Generation error:", error);
    if (error?.status === 429) {
      return NextResponse.json(
        { error: "AI service rate limit reached, try again shortly" },
        { status: 503 }
      );
    }
    return NextResponse.json(
      { error: "Generation failed. Please try again." },
      { status: 500 }
    );
  }
}
