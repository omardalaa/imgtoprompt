import { Metadata } from "next";
import { HeroSection } from "@/components/landing/hero-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { HowItWorksSection } from "@/components/landing/how-it-works-section";
import { PricingSection } from "@/components/landing/pricing-section";
import { GalleryPreviewSection } from "@/components/landing/gallery-preview-section";
import { TestimonialsSection } from "@/components/landing/testimonials-section";
import { CtaSection } from "@/components/landing/cta-section";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { getAuthSession } from "@/lib/auth";

export const metadata: Metadata = {
  title: "PromptShot AI — Turn Any Image Into Perfect AI Prompts",
  description:
    "Convert images to Midjourney prompts, Stable Diffusion prompts, product descriptions, ad copy, and SEO content. Free tier available.",
};

export default async function HomePage() {
  const session = await getAuthSession();

  return (
    <>
      <Navbar user={session?.user} />
      <main>
        <HeroSection isAuthenticated={!!session} />
        <FeaturesSection />
        <HowItWorksSection />
        <GalleryPreviewSection />
        <TestimonialsSection />
        <PricingSection />
        <CtaSection isAuthenticated={!!session} />
      </main>
      <Footer />
    </>
  );
}
