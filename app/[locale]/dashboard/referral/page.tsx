import { Metadata } from "next";
import { ReferralClient } from "@/components/dashboard/referral-client";

export const metadata: Metadata = {
  title: "Referrals",
  robots: { index: false, follow: false },
};

export default function ReferralPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Referral Program</h1>
        <p className="text-muted-foreground mt-1">
          Share PromptShot AI and earn rewards for each friend who signs up.
        </p>
      </div>
      <ReferralClient />
    </div>
  );
}
