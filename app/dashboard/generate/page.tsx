import { Metadata } from "next";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { checkRateLimit } from "@/lib/rate-limit";
import { GenerateClient } from "@/components/dashboard/generate-client";

export const metadata: Metadata = {
  title: "Generate Prompts",
  robots: { index: false, follow: false },
};

export default async function GeneratePage() {
  const session = await getAuthSession();
  const [sub, rateLimit] = await Promise.all([
    db.subscription.findUnique({
      where: { userId: session!.user!.id },
      select: { plan: true },
    }),
    checkRateLimit(session!.user!.id),
  ]);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Generate Prompts</h1>
        <p className="text-muted-foreground mt-1">
          Upload an image to generate AI prompts, product descriptions, ad copy,
          or SEO content.
        </p>
      </div>

      <GenerateClient
        plan={sub?.plan ?? "FREE"}
        rateLimit={rateLimit}
      />
    </div>
  );
}
