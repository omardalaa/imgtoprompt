import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";

const querySchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(50).default(20),
  tag: z.string().optional(),
});

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const params = querySchema.parse(Object.fromEntries(searchParams));

  const skip = (params.page - 1) * params.limit;

  const [items, total] = await Promise.all([
    db.galleryItem.findMany({
      where: params.tag ? { tags: { has: params.tag } } : undefined,
      include: {
        generation: {
          select: {
            prompt: true,
            outputType: true,
            imageUrl: true,
            createdAt: true,
          },
        },
        user: { select: { name: true, image: true } },
      },
      orderBy: [{ likes: "desc" }, { createdAt: "desc" }],
      skip,
      take: params.limit,
    }),
    db.galleryItem.count({
      where: params.tag ? { tags: { has: params.tag } } : undefined,
    }),
  ]);

  // Increment views (fire and forget)
  if (items.length > 0) {
    db.galleryItem
      .updateMany({
        where: { id: { in: items.map((item) => item.id) } },
        data: { views: { increment: 1 } },
      })
      .catch(() => {});
  }

  return NextResponse.json(
    {
      items: items.map((item) => ({
        id: item.id,
        prompt: item.generation.prompt.slice(0, 300),
        outputType: item.generation.outputType,
        tags: item.tags,
        likes: item.likes,
        views: item.views,
        createdAt: item.createdAt,
        author: item.user.name,
        authorImage: item.user.image,
      })),
      total,
      page: params.page,
      pages: Math.ceil(total / params.limit),
    },
    {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120",
      },
    }
  );
}
