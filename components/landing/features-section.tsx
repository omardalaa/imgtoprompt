import {
  ImageIcon,
  Wand2,
  Upload,
  Download,
  Globe,
  ShoppingBag,
  Megaphone,
  Search,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: ImageIcon,
    title: "Midjourney Prompts",
    description: "Generate production-ready Midjourney prompts with parameters like --ar, --v, and --style.",
    color: "text-violet-600",
    bg: "bg-violet-100 dark:bg-violet-900/30",
  },
  {
    icon: Wand2,
    title: "Stable Diffusion",
    description: "Create detailed positive and negative prompts optimized for SDXL and SD 1.5.",
    color: "text-indigo-600",
    bg: "bg-indigo-100 dark:bg-indigo-900/30",
  },
  {
    icon: ShoppingBag,
    title: "Product Descriptions",
    description: "Compelling e-commerce copy that highlights features, benefits, and drives conversions.",
    color: "text-blue-600",
    bg: "bg-blue-100 dark:bg-blue-900/30",
  },
  {
    icon: Megaphone,
    title: "Ad Copy",
    description: "Multi-platform ad variations for social media, Facebook, Instagram, and Google Display.",
    color: "text-pink-600",
    bg: "bg-pink-100 dark:bg-pink-900/30",
  },
  {
    icon: Search,
    title: "SEO Content",
    description: "Optimized titles, meta descriptions, keywords, alt text, and SEO paragraphs.",
    color: "text-emerald-600",
    bg: "bg-emerald-100 dark:bg-emerald-900/30",
  },
  {
    icon: Wand2,
    title: "Prompt Enhancer",
    description: "Upgrade any generated prompt with richer details, better composition, and more impact.",
    color: "text-amber-600",
    bg: "bg-amber-100 dark:bg-amber-900/30",
  },
  {
    icon: Upload,
    title: "Bulk Upload",
    description: "Process multiple images at once. Pro users get 10, Business users get 50 per batch.",
    color: "text-cyan-600",
    bg: "bg-cyan-100 dark:bg-cyan-900/30",
  },
  {
    icon: Download,
    title: "Export TXT/CSV",
    description: "Export your entire history or selected generations to TXT or CSV format.",
    color: "text-slate-600",
    bg: "bg-slate-100 dark:bg-slate-900/30",
  },
  {
    icon: Globe,
    title: "Public Gallery",
    description: "Share your best prompts to the community gallery. Get likes, views, and inspire others.",
    color: "text-orange-600",
    bg: "bg-orange-100 dark:bg-orange-900/30",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 md:py-28">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Everything You Need to{" "}
            <span className="gradient-text">Create Better Prompts</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From AI image prompts to marketing copy — PromptShot AI is the
            all-in-one tool for creators, marketers, and developers.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title} className="group hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className={`mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl ${feature.bg}`}>
                  <feature.icon className={`h-5 w-5 ${feature.color}`} />
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
