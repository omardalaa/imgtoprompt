import { Metadata } from "next";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { HistoryClient } from "@/components/dashboard/history-client";

export const metadata: Metadata = {
  title: "History",
  robots: { index: false, follow: false },
};

export default async function HistoryPage() {
  const session = await getAuthSession();

  const sub = await db.subscription.findUnique({
    where: { userId: session!.user!.id },
    select: { plan: true },
  });

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">History</h1>
          <p className="text-muted-foreground mt-1">
            {sub?.plan === "FREE"
              ? "Your last 7 days of generations."
              : "All your generations, filterable and exportable."}
          </p>
        </div>
      </div>

      <HistoryClient plan={sub?.plan ?? "FREE"} />
    </div>
  );
}
