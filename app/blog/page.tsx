import { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { getAuthSession } from "@/lib/auth";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog — PromptShot AI",
  description:
    "Tips, tutorials, and insights on AI image generation, prompt engineering, and creative workflows.",
};

const posts = [
  {
    slug: "midjourney-v6-prompt-guide",
    title: "The Complete Guide to Midjourney v6 Prompts",
    excerpt:
      "Midjourney v6 changed everything. New natural language understanding, improved coherence, and a reworked parameter system. Here's how to write prompts that get stunning results every time.",
    category: "Tutorial",
    date: "April 10, 2026",
    readTime: "8 min read",
    featured: true,
  },
  {
    slug: "stable-diffusion-negative-prompts",
    title: "Mastering Negative Prompts in Stable Diffusion",
    excerpt:
      "Negative prompts are the secret weapon most SD users underuse. Learn the exact tags that eliminate blurry faces, extra limbs, and low-quality outputs from your generations.",
    category: "Tutorial",
    date: "April 3, 2026",
    readTime: "6 min read",
    featured: false,
  },
  {
    slug: "ai-product-photography",
    title: "AI Product Photography: From Photo to Listing Copy",
    excerpt:
      "E-commerce brands are using AI to turn product photos into compelling descriptions in seconds. Here's the workflow top Shopify stores are using to scale their content.",
    category: "Use Case",
    date: "March 28, 2026",
    readTime: "5 min read",
    featured: false,
  },
  {
    slug: "gpt4o-vision-image-analysis",
    title: "How GPT-4o Vision Understands Your Images",
    excerpt:
      "Under the hood of PromptShot AI: how GPT-4o analyzes composition, lighting, style, and mood to generate prompts that actually recreate what you're seeing.",
    category: "Deep Dive",
    date: "March 20, 2026",
    readTime: "7 min read",
    featured: false,
  },
  {
    slug: "ad-copy-from-product-images",
    title: "3 Ways to Turn Product Images Into High-Converting Ad Copy",
    excerpt:
      "Stop staring at a blank page. Your product photos already contain everything a great ad needs — you just need the right prompts to extract it.",
    category: "Marketing",
    date: "March 12, 2026",
    readTime: "4 min read",
    featured: false,
  },
  {
    slug: "seo-image-optimization-guide",
    title: "SEO-Optimized Alt Text at Scale: The AI Approach",
    excerpt:
      "Alt text matters for accessibility and SEO — but writing it for hundreds of product images is tedious. Here's how to automate it without sacrificing quality.",
    category: "SEO",
    date: "March 5, 2026",
    readTime: "5 min read",
    featured: false,
  },
];

const categoryColors: Record<string, "default" | "secondary" | "pro"> = {
  Tutorial: "pro",
  "Use Case": "secondary",
  "Deep Dive": "default",
  Marketing: "secondary",
  SEO: "default",
};

export default async function BlogPage() {
  const session = await getAuthSession();
  const [featured, ...rest] = posts;

  return (
    <>
      <Navbar user={session?.user} />
      <main className="container py-12 max-w-4xl">
        <div className="mb-10">
          <h1 className="text-4xl font-bold mb-3">Blog</h1>
          <p className="text-muted-foreground">
            Prompt engineering tips, AI workflows, and product updates.
          </p>
        </div>

        {/* Featured post */}
        <div className="mb-10 rounded-2xl border bg-gradient-to-br from-violet-50 to-indigo-50 dark:from-violet-950/30 dark:to-indigo-950/30 p-8">
          <Badge variant="pro" className="mb-4">
            Featured
          </Badge>
          <h2 className="text-2xl font-bold mb-3">
            <Link
              href={`/blog/${featured.slug}`}
              className="hover:text-violet-600 transition-colors"
            >
              {featured.title}
            </Link>
          </h2>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            {featured.excerpt}
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" /> {featured.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" /> {featured.readTime}
            </span>
          </div>
        </div>

        {/* Post grid */}
        <div className="grid sm:grid-cols-2 gap-6">
          {rest.map((post) => (
            <article
              key={post.slug}
              className="rounded-xl border p-6 hover:border-violet-300 dark:hover:border-violet-700 transition-colors"
            >
              <Badge variant={categoryColors[post.category] ?? "secondary"} className="mb-3">
                {post.category}
              </Badge>
              <h3 className="font-bold mb-2 leading-snug">
                <Link
                  href={`/blog/${post.slug}`}
                  className="hover:text-violet-600 transition-colors"
                >
                  {post.title}
                </Link>
              </h3>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed line-clamp-3">
                {post.excerpt}
              </p>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" /> {post.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" /> {post.readTime}
                </span>
              </div>
            </article>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
