import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap } from "lucide-react";

interface CtaSectionProps {
  isAuthenticated: boolean;
}

export function CtaSection({ isAuthenticated }: CtaSectionProps) {
  return (
    <section className="py-20">
      <div className="container">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-violet-600 to-indigo-700 px-8 py-16 text-center text-white">
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10" aria-hidden="true" />
          <div className="relative">
            <div className="mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm">
              <Zap className="h-7 w-7" />
            </div>
            <h2 className="text-3xl font-bold sm:text-4xl mb-4">
              Start Generating Perfect Prompts Today
            </h2>
            <p className="max-w-xl mx-auto text-violet-100 mb-8">
              Join 50,000+ creators, marketers, and developers who use PromptShot AI
              to power their creative workflows. Free tier — no credit card needed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="xl"
                className="bg-white text-violet-700 hover:bg-violet-50"
                asChild
              >
                <Link href={isAuthenticated ? "/dashboard/generate" : "/auth/signin"}>
                  Get started free
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="xl"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 hover:border-white/50"
                asChild
              >
                <Link href="/pricing">View pricing</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
