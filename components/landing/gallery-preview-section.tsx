import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Heart, Eye } from "lucide-react";

const samplePrompts = [
  {
    type: "MIDJOURNEY",
    prompt:
      "Ethereal forest at golden hour, ancient oak trees with glowing moss, magical particles floating, cinematic lighting, 8k --ar 16:9 --v 6",
    likes: 342,
    views: 2841,
    tags: ["nature", "fantasy"],
  },
  {
    type: "PRODUCT_DESCRIPTION",
    prompt:
      "Handcrafted leather journal with aged mahogany cover. Perfect for writers and travelers. 200 acid-free pages, thread-sewn binding. Your story deserves a timeless home.",
    likes: 187,
    views: 1523,
    tags: ["product", "lifestyle"],
  },
  {
    type: "STABLE_DIFFUSION",
    prompt:
      "POSITIVE: cyberpunk cityscape, neon lights, rain-soaked streets, (masterpiece:1.2), ultra detailed, 8k\nNEGATIVE: blurry, low quality, deformed",
    likes: 521,
    views: 4201,
    tags: ["cyberpunk", "urban"],
  },
  {
    type: "AD_COPY",
    prompt:
      "1) 'Your mornings just got magical ✨' | 2) Start every day with artisan coffee crafted from single-origin beans. 100% sustainable, 100% delicious. | 3) Headline: 'Premium Coffee Delivered' | Desc: Farm-to-cup excellence.",
    likes: 94,
    views: 876,
    tags: ["ad", "food"],
  },
];

const typeColors: Record<string, string> = {
  MIDJOURNEY: "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300",
  STABLE_DIFFUSION: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300",
  PRODUCT_DESCRIPTION: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  AD_COPY: "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300",
  SEO_CONTENT: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
};

export function GalleryPreviewSection() {
  return (
    <section className="py-20">
      <div className="container">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-2">
              Community Gallery
            </h2>
            <p className="text-muted-foreground">
              Browse prompts shared by our community of creators.
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link href="/gallery" className="hidden sm:flex">
              View all <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </Button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {samplePrompts.map((item, i) => (
            <div
              key={i}
              className="rounded-xl border bg-card p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-3">
                <span
                  className={`text-xs font-medium px-2 py-1 rounded-md ${typeColors[item.type]}`}
                >
                  {item.type.replace("_", " ")}
                </span>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Heart className="h-3 w-3" /> {item.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="h-3 w-3" /> {item.views}
                  </span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                {item.prompt}
              </p>
              <div className="flex gap-1.5 mt-3">
                {item.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center sm:hidden">
          <Button variant="outline" asChild>
            <Link href="/gallery">View full gallery <ArrowRight className="h-4 w-4 ml-1" /></Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
