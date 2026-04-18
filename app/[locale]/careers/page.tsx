import { Metadata } from "next";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { getAuthSession } from "@/lib/auth";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Careers — PromptShot AI",
  description:
    "Join the PromptShot AI team. We're building the future of AI-powered creative tools.",
};

const openRoles = [
  {
    title: "Senior Full-Stack Engineer",
    team: "Engineering",
    location: "Remote",
    type: "Full-time",
    description:
      "Own end-to-end features across our Next.js frontend and Node.js backend. You'll work closely with AI APIs, build real-time generation pipelines, and help scale our infrastructure.",
    requirements: [
      "4+ years with TypeScript/Node.js",
      "Strong Next.js / React experience",
      "Familiarity with LLM APIs (OpenAI, Anthropic)",
      "PostgreSQL and Prisma experience a plus",
    ],
  },
  {
    title: "AI/ML Engineer",
    team: "AI",
    location: "Remote",
    type: "Full-time",
    description:
      "Fine-tune our prompt generation pipeline, experiment with new models, and build evaluation frameworks to measure output quality across all 5 output types.",
    requirements: [
      "Experience with GPT-4o, Claude, or similar vision models",
      "Python proficiency for model experimentation",
      "Understanding of prompt engineering techniques",
      "Background in NLP or computer vision a plus",
    ],
  },
  {
    title: "Product Designer",
    team: "Design",
    location: "Remote",
    type: "Full-time",
    description:
      "Shape the experience for 50,000+ users generating AI prompts daily. From onboarding flows to the generation dashboard, you'll own the design system end-to-end.",
    requirements: [
      "3+ years of product design experience",
      "Proficiency in Figma",
      "Experience designing SaaS or developer tools",
      "Ability to write production-ready HTML/CSS a plus",
    ],
  },
  {
    title: "Growth Marketer",
    team: "Marketing",
    location: "Remote",
    type: "Full-time",
    description:
      "Drive user acquisition and retention for a fast-growing AI SaaS. Own SEO content, paid channels, and community growth across Twitter/X, Reddit, and Discord.",
    requirements: [
      "3+ years in growth or digital marketing",
      "Experience with SEO content at scale",
      "Data-driven mindset with analytics fluency",
      "Passion for AI tools and creative communities",
    ],
  },
];

const perks = [
  { emoji: "🌍", title: "Fully Remote", description: "Work from anywhere in the world." },
  { emoji: "💰", title: "Competitive Pay", description: "Top-of-market salary + equity." },
  { emoji: "🏖️", title: "Unlimited PTO", description: "Take the time you need." },
  { emoji: "🖥️", title: "Equipment Budget", description: "$2,000 home office setup." },
  { emoji: "📚", title: "Learning Budget", description: "$1,000/year for courses and books." },
  { emoji: "🤝", title: "Small Team", description: "High impact, no bureaucracy." },
];

export default async function CareersPage() {
  const session = await getAuthSession();

  return (
    <>
      <Navbar user={session?.user} />
      <main>
        {/* Hero */}
        <section className="py-20 bg-gradient-to-b from-violet-50/50 to-background dark:from-violet-950/20">
          <div className="container max-w-3xl text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Build the future of{" "}
              <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                AI creativity
              </span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We're a small, fully remote team on a mission to make AI-powered
              creativity accessible to everyone. If you're passionate about AI,
              great products, and moving fast — we'd love to meet you.
            </p>
          </div>
        </section>

        {/* Perks */}
        <section className="py-14 container max-w-4xl">
          <h2 className="text-2xl font-bold text-center mb-8">Why join us</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {perks.map((p) => (
              <div key={p.title} className="rounded-xl border p-5">
                <div className="text-2xl mb-2">{p.emoji}</div>
                <div className="font-semibold mb-1">{p.title}</div>
                <div className="text-sm text-muted-foreground">{p.description}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Open Roles */}
        <section className="py-14 bg-muted/30">
          <div className="container max-w-4xl">
            <h2 className="text-2xl font-bold mb-8">Open roles</h2>
            <div className="space-y-4">
              {openRoles.map((role) => (
                <div key={role.title} className="rounded-xl border bg-background p-6">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                    <div>
                      <h3 className="text-lg font-bold">{role.title}</h3>
                      <div className="flex items-center gap-3 mt-1">
                        <Badge variant="secondary">{role.team}</Badge>
                        <span className="flex items-center gap-1 text-sm text-muted-foreground">
                          <MapPin className="h-3.5 w-3.5" /> {role.location}
                        </span>
                        <span className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="h-3.5 w-3.5" /> {role.type}
                        </span>
                      </div>
                    </div>
                    <a
                      href={`mailto:careers@insforge.dev?subject=Application: ${role.title}`}
                      className="inline-flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-700 transition-colors"
                    >
                      Apply <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    {role.description}
                  </p>
                  <ul className="space-y-1">
                    {role.requirements.map((r) => (
                      <li key={r} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="text-violet-500 mt-0.5">•</span> {r}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-14 container max-w-2xl text-center">
          <h2 className="text-2xl font-bold mb-3">Don't see your role?</h2>
          <p className="text-muted-foreground mb-6">
            We're always looking for talented people. Send us a note and tell us
            how you'd make PromptShot AI better.
          </p>
          <a
            href="mailto:careers@insforge.dev"
            className="inline-flex items-center gap-2 rounded-lg bg-violet-600 px-6 py-3 font-medium text-white hover:bg-violet-700 transition-colors"
          >
            Get in touch <ArrowRight className="h-4 w-4" />
          </a>
        </section>
      </main>
      <Footer />
    </>
  );
}
