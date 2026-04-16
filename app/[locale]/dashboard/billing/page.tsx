import { Metadata } from "next";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { BillingClient } from "@/components/dashboard/billing-client";

export const metadata: Metadata = {
  title: "Billing",
  robots: { index: false, follow: false },
};

export default async function BillingPage() {
  const session = await getAuthSession();

  const sub = await db.subscription.findUnique({
    where: { userId: session!.user!.id },
    select: {
      plan: true,
      status: true,
      stripeCurrentPeriodEnd: true,
      stripeSubscriptionId: true,
    },
  });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Billing</h1>
        <p className="text-muted-foreground mt-1">
          Manage your subscription and billing details.
        </p>
      </div>

      <BillingClient
        plan={sub?.plan ?? "FREE"}
        status={sub?.status ?? "ACTIVE"}
        periodEnd={sub?.stripeCurrentPeriodEnd?.toISOString() ?? null}
        hasSubscription={!!sub?.stripeSubscriptionId}
      />
    </div>
  );
}
