import { Metadata } from "next";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { PricingSection } from "@/components/landing/pricing-section";
import { getAuthSession } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Pricing — PromptShot AI",
  description:
    "Simple, transparent pricing. Free forever, or upgrade to Pro ($9/mo) or Business ($29/mo) for more generations and features.",
};

export default async function PricingPage() {
  const session = await getAuthSession();

  return (
    <>
      <Navbar user={session?.user} />
      <main className="py-12">
        <div className="container text-center mb-4">
          <h1 className="text-4xl font-bold mb-3">Pricing</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Start free. Upgrade when you need more. Cancel anytime.
          </p>
        </div>
        <PricingSection />
      </main>
      <Footer />
    </>
  );
}
