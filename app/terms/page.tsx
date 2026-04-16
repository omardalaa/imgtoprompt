import { Metadata } from "next";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { getAuthSession } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Terms of Service — PromptShot AI",
  description: "Terms and conditions governing your use of PromptShot AI.",
};

export default async function TermsPage() {
  const session = await getAuthSession();

  return (
    <>
      <Navbar user={session?.user} />
      <main className="container max-w-3xl py-12">
        <h1 className="text-4xl font-bold mb-2">Terms of Service</h1>
        <p className="text-muted-foreground mb-10">Last updated: April 16, 2026</p>

        <div className="space-y-8">

          <section>
            <h2 className="text-xl font-bold mb-3">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              By accessing or using PromptShot AI ("the Service") at promptshotai.com, you agree
              to be bound by these Terms of Service. If you do not agree to these terms, do not
              use the Service. These terms apply to all visitors, users, and others who access
              or use the Service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">2. Description of Service</h2>
            <p className="text-muted-foreground leading-relaxed">
              PromptShot AI provides an AI-powered tool that analyzes images and generates
              prompts for Midjourney, Stable Diffusion, product descriptions, advertising copy,
              and SEO content using GPT-4o Vision. The Service is offered on a subscription
              basis with a free tier and paid plans.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">3. Account Registration</h2>
            <p className="text-muted-foreground leading-relaxed">
              You must create an account to use the Service. You agree to provide accurate,
              current, and complete information during registration. You are responsible for
              maintaining the confidentiality of your account credentials and for all activities
              that occur under your account. You must notify us immediately of any unauthorized
              use of your account.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">4. Acceptable Use</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">You agree not to use the Service to:</p>
            <ul className="space-y-2 text-muted-foreground list-disc list-inside">
              <li>Upload images containing illegal content, including child sexual abuse material</li>
              <li>Upload images that violate third-party intellectual property rights</li>
              <li>Attempt to reverse-engineer, scrape, or abuse the Service's API</li>
              <li>Share account credentials or resell access to the Service</li>
              <li>Generate content for spam, phishing, or deceptive marketing</li>
              <li>Circumvent rate limits or usage restrictions</li>
              <li>Upload malicious files or attempt to compromise our systems</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">5. Subscription and Billing</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Paid plans are billed monthly. By subscribing, you authorize us to charge your
              payment method on a recurring basis. All prices are in USD.
            </p>
            <ul className="space-y-2 text-muted-foreground list-disc list-inside">
              <li><strong className="text-foreground">Free Plan:</strong> 5 generations per day, no credit card required.</li>
              <li><strong className="text-foreground">Pro Plan ($9/mo):</strong> 200 generations per day, all output types, prompt enhancer.</li>
              <li><strong className="text-foreground">Business Plan ($29/mo):</strong> Unlimited generations, bulk upload, API access.</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-3">
              You may cancel your subscription at any time. Cancellation takes effect at the end
              of the current billing period. We do not offer prorated refunds for unused time.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">6. Intellectual Property</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              <strong className="text-foreground">Your content:</strong> You retain ownership of images you upload. By uploading images,
              you grant us a limited license to process them solely for the purpose of generating
              your requested output.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Generated prompts:</strong> You own the prompts generated for you and may use them
              for any lawful purpose, including commercial projects. PromptShot AI retains no
              ownership over generated outputs.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">7. Disclaimer of Warranties</h2>
            <p className="text-muted-foreground leading-relaxed">
              THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND,
              EXPRESS OR IMPLIED. WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED,
              ERROR-FREE, OR THAT THE GENERATED CONTENT WILL MEET YOUR REQUIREMENTS. AI-GENERATED
              CONTENT MAY BE INACCURATE OR INCONSISTENT AND SHOULD BE REVIEWED BEFORE USE.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">8. Limitation of Liability</h2>
            <p className="text-muted-foreground leading-relaxed">
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, PROMPTSHOT AI SHALL NOT BE LIABLE FOR ANY
              INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING FROM YOUR
              USE OF THE SERVICE. OUR TOTAL LIABILITY SHALL NOT EXCEED THE AMOUNT PAID BY YOU IN
              THE 12 MONTHS PRECEDING THE CLAIM.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">9. Termination</h2>
            <p className="text-muted-foreground leading-relaxed">
              We reserve the right to suspend or terminate your account at any time for violation
              of these Terms. You may delete your account at any time. Upon termination, your right
              to use the Service ceases immediately. Sections 6, 7, and 8 survive termination.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">10. Governing Law</h2>
            <p className="text-muted-foreground leading-relaxed">
              These Terms are governed by the laws of the State of Delaware, United States,
              without regard to conflict of law principles. Any disputes shall be resolved
              through binding arbitration in accordance with the American Arbitration Association rules.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">11. Changes to Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may modify these Terms at any time. We will provide at least 14 days' notice
              of material changes via email or in-app notification. Continued use of the Service
              after changes take effect constitutes acceptance of the new Terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">12. Contact</h2>
            <p className="text-muted-foreground leading-relaxed">
              Questions about these Terms? Contact us at{" "}
              <a href="mailto:legal@promptshotai.com" className="text-violet-600 hover:underline">
                legal@promptshotai.com
              </a>.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
