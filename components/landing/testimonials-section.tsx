import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Digital Artist",
    avatar: "SC",
    rating: 5,
    text: "PromptShot AI saves me hours every week. I just drop my reference images and get perfect Midjourney prompts instantly. The quality is incredible.",
  },
  {
    name: "Marcus Rodriguez",
    role: "E-commerce Manager",
    avatar: "MR",
    rating: 5,
    text: "We use PromptShot for all our product descriptions. Uploading product images and getting SEO-optimized copy in seconds has transformed our workflow.",
  },
  {
    name: "Emily Park",
    role: "Social Media Strategist",
    avatar: "EP",
    rating: 5,
    text: "The ad copy feature is a game-changer. I get 3 variations per image perfectly tailored for different platforms. Best $9 I spend every month.",
  },
  {
    name: "James Liu",
    role: "Stable Diffusion Artist",
    avatar: "JL",
    rating: 5,
    text: "The SD prompts are genuinely good — positive and negative prompts, style tags, quality boosters. It's like having an expert prompt engineer on call.",
  },
  {
    name: "Alex Thompson",
    role: "Freelance Copywriter",
    avatar: "AT",
    rating: 5,
    text: "Bulk upload on the Business plan is phenomenal. I process 50 product images in one batch and export to CSV. My clients are amazed by the turnaround.",
  },
  {
    name: "Priya Patel",
    role: "Content Creator",
    avatar: "PP",
    rating: 5,
    text: "The prompt enhancer takes already good prompts and makes them exceptional. My AI art quality jumped noticeably after switching to PromptShot AI.",
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Loved by{" "}
            <span className="gradient-text">50,000+ Creators</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            See what our users are building with PromptShot AI.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <Card key={t.name} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 text-white text-xs font-bold">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
