import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { db } from "@/lib/db";
import { checkRateLimit } from "@/lib/rate-limit";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAuthSession();
  if (!session?.user?.id) redirect("/auth/signin");

  const [sub, rateLimit] = await Promise.all([
    db.subscription.findUnique({
      where: { userId: session.user.id },
      select: { plan: true, status: true },
    }),
    checkRateLimit(session.user.id),
  ]);

  return (
    <div className="flex min-h-screen">
      <DashboardSidebar
        user={session.user}
        plan={sub?.plan ?? "FREE"}
        rateLimit={rateLimit}
      />
      <main className="flex-1 overflow-auto">
        <div className="container max-w-5xl py-8 px-4 sm:px-8">
          {children}
        </div>
      </main>
    </div>
  );
}
