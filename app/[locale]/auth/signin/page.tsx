import { Metadata } from "next";
import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { SignInCard } from "@/components/auth/sign-in-card";

export const metadata: Metadata = {
  title: "Sign In — PromptShot AI",
  description: "Sign in to your PromptShot AI account.",
  robots: { index: false, follow: false },
};

export default async function SignInPage({
  params,
  searchParams,
}: {
  params: { locale: string };
  searchParams: { callbackUrl?: string; error?: string };
}) {
  try {
    const session = await getAuthSession();
    if (session) redirect(searchParams.callbackUrl ?? `/${params.locale}/dashboard/generate`);
  } catch {
    // DB not ready yet — show sign-in page anyway
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-50 to-indigo-50 dark:from-background dark:to-background p-4">
      <SignInCard
        callbackUrl={searchParams.callbackUrl}
        error={searchParams.error}
      />
    </div>
  );
}
