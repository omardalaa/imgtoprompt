import { Metadata } from "next";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { getAuthSession } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Cookie Policy — PromptShot AI",
  description: "How PromptShot AI uses cookies and similar tracking technologies.",
};

const cookieTable = [
  {
    name: "next-auth.session-token",
    type: "Essential",
    purpose: "Stores your authentication session so you remain logged in.",
    duration: "30 days",
  },
  {
    name: "next-auth.csrf-token",
    type: "Essential",
    purpose: "CSRF protection for authentication form submissions.",
    duration: "Session",
  },
  {
    name: "next-auth.callback-url",
    type: "Essential",
    purpose: "Remembers the page to redirect to after sign-in.",
    duration: "Session",
  },
  {
    name: "__stripe_mid",
    type: "Functional",
    purpose: "Stripe fraud prevention and payment session identification.",
    duration: "1 year",
  },
  {
    name: "__stripe_sid",
    type: "Functional",
    purpose: "Stripe session cookie for payment processing.",
    duration: "30 minutes",
  },
  {
    name: "theme",
    type: "Preference",
    purpose: "Stores your dark/light mode preference.",
    duration: "1 year",
  },
];

export default async function CookiesPage() {
  const session = await getAuthSession();

  return (
    <>
      <Navbar user={session?.user} />
      <main className="container max-w-3xl py-12">
        <h1 className="text-4xl font-bold mb-2">Cookie Policy</h1>
        <p className="text-muted-foreground mb-10">Last updated: April 16, 2026</p>

        <div className="space-y-8">

          <section>
            <h2 className="text-xl font-bold mb-3">1. What Are Cookies?</h2>
            <p className="text-muted-foreground leading-relaxed">
              Cookies are small text files placed on your device when you visit a website. They
              are widely used to make websites work efficiently, provide functionality, and give
              site owners information about how their site is being used. PromptShot AI uses
              cookies and similar technologies to provide a secure, functional experience.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">2. Types of Cookies We Use</h2>

            <div className="space-y-4">
              <div className="rounded-lg border p-4">
                <h3 className="font-semibold mb-1 text-violet-600">Essential Cookies</h3>
                <p className="text-sm text-muted-foreground">
                  Required for the Service to function. These cannot be disabled. They include
                  authentication session cookies that keep you logged in and CSRF protection tokens.
                </p>
              </div>
              <div className="rounded-lg border p-4">
                <h3 className="font-semibold mb-1 text-blue-600">Functional Cookies</h3>
                <p className="text-sm text-muted-foreground">
                  Enable enhanced functionality such as payment processing via Stripe. Disabling
                  these may affect features like subscription management.
                </p>
              </div>
              <div className="rounded-lg border p-4">
                <h3 className="font-semibold mb-1 text-emerald-600">Preference Cookies</h3>
                <p className="text-sm text-muted-foreground">
                  Remember your settings and preferences (e.g., dark mode) to improve your
                  experience on return visits.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">3. Cookies We Set</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 pr-4 font-semibold">Cookie</th>
                    <th className="text-left py-2 pr-4 font-semibold">Type</th>
                    <th className="text-left py-2 pr-4 font-semibold">Purpose</th>
                    <th className="text-left py-2 font-semibold">Duration</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {cookieTable.map((c) => (
                    <tr key={c.name}>
                      <td className="py-3 pr-4 font-mono text-xs text-violet-600 align-top">
                        {c.name}
                      </td>
                      <td className="py-3 pr-4 text-muted-foreground align-top whitespace-nowrap">
                        {c.type}
                      </td>
                      <td className="py-3 pr-4 text-muted-foreground align-top">
                        {c.purpose}
                      </td>
                      <td className="py-3 text-muted-foreground align-top whitespace-nowrap">
                        {c.duration}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">4. Third-Party Cookies</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Some cookies are set by third-party services we use:
            </p>
            <ul className="space-y-2 text-muted-foreground list-disc list-inside">
              <li>
                <strong className="text-foreground">Stripe</strong> — sets cookies for fraud prevention and payment session management.
                See{" "}
                <a href="https://stripe.com/cookie-settings" className="text-violet-600 hover:underline" target="_blank" rel="noopener noreferrer">
                  Stripe's Cookie Policy
                </a>.
              </li>
              <li>
                <strong className="text-foreground">Google OAuth</strong> — if you sign in with Google, Google may set cookies per their{" "}
                <a href="https://policies.google.com/privacy" className="text-violet-600 hover:underline" target="_blank" rel="noopener noreferrer">
                  Privacy Policy
                </a>.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">5. Managing Cookies</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              You can control cookies through your browser settings. Note that disabling essential
              cookies will prevent you from signing in and using the Service.
            </p>
            <ul className="space-y-1 text-muted-foreground list-disc list-inside">
              <li>
                <a href="https://support.google.com/chrome/answer/95647" className="text-violet-600 hover:underline" target="_blank" rel="noopener noreferrer">
                  Chrome
                </a>
              </li>
              <li>
                <a href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer" className="text-violet-600 hover:underline" target="_blank" rel="noopener noreferrer">
                  Firefox
                </a>
              </li>
              <li>
                <a href="https://support.apple.com/guide/safari/manage-cookies-sfri11471" className="text-violet-600 hover:underline" target="_blank" rel="noopener noreferrer">
                  Safari
                </a>
              </li>
              <li>
                <a href="https://support.microsoft.com/en-us/windows/delete-and-manage-cookies-168dab11-0753-043d-7c16-ede5947fc64d" className="text-violet-600 hover:underline" target="_blank" rel="noopener noreferrer">
                  Edge
                </a>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">6. Updates to This Policy</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update this Cookie Policy as we add new features or third-party integrations.
              Changes will be posted on this page with an updated date.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">7. Contact</h2>
            <p className="text-muted-foreground leading-relaxed">
              Questions about our use of cookies? Email us at{" "}
              <a href="mailto:privacy@insforge.dev" className="text-violet-600 hover:underline">
                privacy@insforge.dev
              </a>.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
