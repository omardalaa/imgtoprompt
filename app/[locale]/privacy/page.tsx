import { Metadata } from "next";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { getAuthSession } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Privacy Policy — PromptShot AI",
  description: "How PromptShot AI collects, uses, and protects your personal data.",
};

export default async function PrivacyPage() {
  const session = await getAuthSession();

  return (
    <>
      <Navbar user={session?.user} />
      <main className="container max-w-3xl py-12">
        <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-muted-foreground mb-10">Last updated: April 16, 2026</p>

        <div className="prose prose-slate dark:prose-invert max-w-none space-y-8">

          <section>
            <h2 className="text-xl font-bold mb-3">1. Introduction</h2>
            <p className="text-muted-foreground leading-relaxed">
              PromptShot AI ("we", "our", or "us") operates insforge.dev. This Privacy Policy
              explains what information we collect, how we use it, and your rights regarding your
              personal data. By using our service, you agree to the collection and use of
              information in accordance with this policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">2. Information We Collect</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">We collect the following types of information:</p>
            <ul className="space-y-2 text-muted-foreground list-disc list-inside">
              <li><strong className="text-foreground">Account data:</strong> Name, email address, and profile picture provided via Google or GitHub OAuth.</li>
              <li><strong className="text-foreground">Usage data:</strong> Images you upload, prompts generated, output types selected, and generation history.</li>
              <li><strong className="text-foreground">Billing data:</strong> Subscription plan and payment status managed securely by Stripe. We never store your full card details.</li>
              <li><strong className="text-foreground">Technical data:</strong> IP address, browser type, device type, and pages visited for security and analytics purposes.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">3. How We Use Your Information</h2>
            <ul className="space-y-2 text-muted-foreground list-disc list-inside">
              <li>To provide and improve the PromptShot AI service</li>
              <li>To process your subscription and billing via Stripe</li>
              <li>To authenticate your account via NextAuth.js</li>
              <li>To send transactional emails (password resets, receipts)</li>
              <li>To enforce rate limits and prevent abuse</li>
              <li>To analyze usage trends and improve our product</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">4. Image Data</h2>
            <p className="text-muted-foreground leading-relaxed">
              Images you upload are sent to OpenAI's GPT-4o API for analysis and prompt generation.
              Images are transmitted securely over HTTPS as base64-encoded data and are not stored
              permanently by PromptShot AI beyond your generation history. We do not use your images
              to train our own models. OpenAI's data handling is governed by their{" "}
              <a href="https://openai.com/privacy" className="text-violet-600 hover:underline" target="_blank" rel="noopener noreferrer">
                Privacy Policy
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">5. Data Sharing</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              We do not sell your personal data. We share data only with:
            </p>
            <ul className="space-y-2 text-muted-foreground list-disc list-inside">
              <li><strong className="text-foreground">OpenAI:</strong> For image analysis and prompt generation</li>
              <li><strong className="text-foreground">Stripe:</strong> For payment processing</li>
              <li><strong className="text-foreground">Neon:</strong> For database hosting (your data is encrypted at rest)</li>
              <li><strong className="text-foreground">Vercel:</strong> For application hosting and edge compute</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">6. Data Retention</h2>
            <p className="text-muted-foreground leading-relaxed">
              Free plan users: generation history is retained for 7 days. Pro and Business users
              have full history retained indefinitely. You can delete your account and all associated
              data at any time by contacting us at{" "}
              <a href="mailto:privacy@insforge.dev" className="text-violet-600 hover:underline">
                privacy@insforge.dev
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">7. Your Rights</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Depending on your location, you may have the right to:
            </p>
            <ul className="space-y-2 text-muted-foreground list-disc list-inside">
              <li>Access the personal data we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Object to or restrict certain processing</li>
              <li>Data portability (receive your data in a structured format)</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-3">
              To exercise any of these rights, email us at{" "}
              <a href="mailto:privacy@insforge.dev" className="text-violet-600 hover:underline">
                privacy@insforge.dev
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">8. Security</h2>
            <p className="text-muted-foreground leading-relaxed">
              We implement industry-standard security measures including HTTPS/TLS encryption,
              hashed session tokens, and principle-of-least-privilege database access. No method
              of transmission over the internet is 100% secure, and we cannot guarantee absolute
              security.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">9. Cookies</h2>
            <p className="text-muted-foreground leading-relaxed">
              We use cookies to manage authentication sessions. Please see our{" "}
              <a href="/cookies" className="text-violet-600 hover:underline">Cookie Policy</a>{" "}
              for details.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">10. Changes to This Policy</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of significant
              changes by email or by posting a notice on our website. Continued use of the service
              after changes constitutes acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">11. Contact</h2>
            <p className="text-muted-foreground leading-relaxed">
              For privacy-related questions, contact us at{" "}
              <a href="mailto:privacy@insforge.dev" className="text-violet-600 hover:underline">
                privacy@insforge.dev
              </a>{" "}
              or write to: PromptShot AI, Privacy Team, insforge.dev.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
