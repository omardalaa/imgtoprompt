import { Upload, Cpu, Copy } from "lucide-react";

const steps = [
  {
    step: "01",
    icon: Upload,
    title: "Upload Your Image",
    description:
      "Drag & drop or click to upload any image (PNG, JPG, WebP). Supports up to 10MB. Bulk upload available on Pro & Business plans.",
  },
  {
    step: "02",
    icon: Cpu,
    title: "Choose Output Type",
    description:
      "Select from Midjourney, Stable Diffusion, Product Description, Ad Copy, or SEO Content. Our AI analyzes every detail.",
  },
  {
    step: "03",
    icon: Copy,
    title: "Copy & Use Instantly",
    description:
      "Get your AI-generated output in seconds. Copy with one click, enhance with our prompt booster, or export to TXT/CSV.",
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            How It Works
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Generate perfect prompts in three simple steps.
          </p>
        </div>

        <div className="relative grid gap-8 md:grid-cols-3">
          {/* Connector line */}
          <div
            className="absolute top-10 left-[25%] right-[25%] h-px bg-gradient-to-r from-violet-300 to-indigo-300 hidden md:block"
            aria-hidden="true"
          />

          {steps.map((step) => (
            <div key={step.step} className="relative text-center">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 shadow-lg shadow-violet-200 dark:shadow-violet-900/30">
                <step.icon className="h-8 w-8 text-white" />
                <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-background border-2 border-violet-600 text-xs font-bold text-violet-600">
                  {step.step}
                </span>
              </div>
              <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
