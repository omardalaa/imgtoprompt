import { Metadata } from "next";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { getAuthSession } from "@/lib/auth";
import { Zap, Target, Users, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "About — PromptShot AI",
  description:
    "Learn about PromptShot AI — our mission to make AI-powered creativity accessible to everyone.",
};

const values = [
  {
    icon: Zap,
    title: "Speed First",
    description:
      "We believe great tools should be instant. Upload an image and get a production-ready prompt in seconds, not minutes.",
  },
  {
    icon: Target,
    title: "Precision Output",
    description:
      "Generic prompts don't cut it. Our GPT-4o pipeline is tuned for each output type — Midjourney parameters, SD tags, ad copy tone.",
  },
  {
    icon: Users,
    title: "Built for Creators",
    description:
      "Whether you're a solo designer, a marketing team, or an e-commerce brand, PromptShot AI adapts to your workflow.",
  },
  {
    icon: Sparkles,
    title: "Constantly Improving",
    description:
      "AI is moving fast. We ship updates weekly, adding new output types, better models, and features our community asks for.",
  },
];

export default async function AboutPage() {
  const session = await getAuthSession();

  return (
    <>
      <Navbar user={session?.user} />
      <main>
        {/* Hero */}
        <section className="py-20 bg-gradient-to-b from-violet-50/50 to-background dark:from-violet-950/20">
          <div className="container max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-violet-100 dark:bg-violet-900/30 px-4 py-1.5 text-sm font-medium text-violet-700 dark:text-violet-300 mb-6">
              <Zap className="h-3.5 w-3.5" /> Our Story
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              We turn images into{" "}
              <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                creative fuel
              </span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              PromptShot AI was born from a simple frustration: spending more
              time writing prompts than actually creating. We built the tool we
              wished existed — one that understands your image and outputs
              exactly what each AI platform needs.
            </p>
          </div>
        </section>

        {/* Mission */}
        <section className="py-16 container max-w-4xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                AI image generation has democratized visual creativity — but the
                prompt layer remains a bottleneck. Writing the right prompt is
                still a skill that takes years to develop.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                PromptShot AI closes that gap. By analyzing your images with
                GPT-4o Vision and translating them into platform-specific
                prompts, we let you focus on the creative work that matters.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our mission is to make professional-quality AI prompting
                accessible to every creator, marketer, and developer — regardless
                of their technical background.
              </p>
            </div>
            <div className="rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 p-8 text-white">
              <p className="text-2xl font-bold mb-2">50,000+</p>
              <p className="text-violet-200 mb-6">prompts generated</p>
              <p className="text-2xl font-bold mb-2">5 output types</p>
              <p className="text-violet-200 mb-6">
                Midjourney, SD, product copy, ads, SEO
              </p>
              <p className="text-2xl font-bold mb-2">GPT-4o Vision</p>
              <p className="text-violet-200">
                State-of-the-art image understanding
              </p>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 bg-muted/30">
          <div className="container max-w-4xl">
            <h2 className="text-3xl font-bold text-center mb-12">
              What we stand for
            </h2>
            <div className="grid sm:grid-cols-2 gap-8">
              {values.map((v) => (
                <div key={v.title} className="flex gap-4">
                  <div className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-lg bg-violet-100 dark:bg-violet-900/30">
                    <v.icon className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{v.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {v.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-16 container max-w-3xl text-center">
          <h2 className="text-3xl font-bold mb-4">A small team, big vision</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            PromptShot AI is built by a lean team of engineers and designers who
            are obsessed with AI tools and creative workflows. We move fast, ship
            often, and listen closely to our community.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Have feedback, ideas, or just want to say hi? We'd love to hear from
            you at{" "}
            <a
              href="mailto:hello@insforge.dev"
              className="text-violet-600 hover:underline"
            >
              hello@insforge.dev
            </a>
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
