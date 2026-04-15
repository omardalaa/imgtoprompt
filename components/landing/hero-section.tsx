import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles, Zap } from "lucide-react";

interface HeroSectionProps {
  isAuthenticated: boolean;
}

export function HeroSection({ isAuthenticated }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-violet-50/30 to-white dark:from-background dark:via-violet-950/10 dark:to-background">
      {/* Background decoration */}
      <div
        className="absolute inset-0 -z-10"
        aria-hidden="true"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-r from-violet-200/40 to-indigo-200/40 blur-3xl rounded-full" />
      </div>

      <div className="container py-20 md:py-28 lg:py-32 text-center">
        <Badge variant="secondary" className="mb-6 gap-1.5 px-3 py-1">
          <Sparkles className="h-3.5 w-3.5 text-violet-600" />
          <span>Powered by GPT-4o Vision</span>
        </Badge>

        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl mb-6 text-balance">
          Turn Any Image Into{" "}
          <span className="gradient-text">Perfect AI Prompts</span>
        </h1>

        <p className="mx-auto max-w-2xl text-lg text-muted-foreground mb-10 text-balance">
          Upload any image and instantly get Midjourney prompts, Stable Diffusion
          prompts, product descriptions, ad copy, and SEO content — all powered
          by GPT-4o vision AI.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="gradient" size="xl" asChild>
            <Link href={isAuthenticated ? "/dashboard/generate" : "/auth/signin"}>
              <Zap className="h-5 w-5" />
              Start Generating Free
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" size="xl" asChild>
            <Link href="/gallery">View Gallery</Link>
          </Button>
        </div>

        <p className="mt-6 text-sm text-muted-foreground">
          Free tier: 5 generations/day · No credit card required
        </p>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 gap-6 sm:grid-cols-4 max-w-2xl mx-auto">
          {[
            { value: "500K+", label: "Prompts Generated" },
            { value: "50K+", label: "Happy Users" },
            { value: "5", label: "Output Types" },
            { value: "99.9%", label: "Uptime SLA" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-bold gradient-text">{stat.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Demo preview */}
        <div className="mt-16 mx-auto max-w-4xl rounded-2xl border bg-card shadow-2xl overflow-hidden">
          <div className="border-b px-4 py-3 flex items-center gap-2 bg-muted/30">
            <div className="flex gap-1.5">
              <div className="h-3 w-3 rounded-full bg-red-400" />
              <div className="h-3 w-3 rounded-full bg-yellow-400" />
              <div className="h-3 w-3 rounded-full bg-green-400" />
            </div>
            <span className="text-xs text-muted-foreground mx-auto">promptshotai.com/dashboard</span>
          </div>
          <div className="p-8 grid md:grid-cols-2 gap-6">
            <div className="rounded-xl border-2 border-dashed border-border bg-muted/20 aspect-square flex items-center justify-center">
              <div className="text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-violet-100 dark:bg-violet-900">
                  <Zap className="h-6 w-6 text-violet-600" />
                </div>
                <p className="text-sm font-medium">Drop your image here</p>
                <p className="text-xs text-muted-foreground mt-1">PNG, JPG, WebP up to 10MB</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="rounded-lg bg-violet-50 dark:bg-violet-950/30 p-4 border border-violet-200 dark:border-violet-800">
                <p className="text-xs font-medium text-violet-700 dark:text-violet-300 mb-2">Midjourney Prompt</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  A serene Japanese garden with stone lanterns, cherry blossoms in full bloom, misty morning atmosphere, ultra-detailed, 8k resolution, shot on Canon EOS R5 --ar 16:9 --v 6 --style raw
                </p>
              </div>
              <div className="flex gap-2">
                <div className="flex-1 rounded-lg bg-muted/50 p-3 text-center">
                  <p className="text-xs text-muted-foreground">Midjourney</p>
                </div>
                <div className="flex-1 rounded-lg bg-muted/50 p-3 text-center">
                  <p className="text-xs text-muted-foreground">Stable Diffusion</p>
                </div>
                <div className="flex-1 rounded-lg bg-primary/10 p-3 text-center border border-primary/20">
                  <p className="text-xs font-medium text-primary">Product Desc</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
