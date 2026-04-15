"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, ExternalLink, Zap } from "lucide-react";
import { PLANS } from "@/lib/stripe";
import { formatDate } from "@/lib/utils";

interface BillingClientProps {
  plan: string;
  status: string;
  periodEnd: string | null;
  hasSubscription: boolean;
}

export function BillingClient({
  plan,
  status,
  periodEnd,
  hasSubscription,
}: BillingClientProps) {
  const [loading, setLoading] = useState<string | null>(null);

  const handleUpgrade = async (targetPlan: "PRO" | "BUSINESS") => {
    try {
      setLoading(targetPlan);
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: targetPlan }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error ?? "Failed to start checkout.");
        return;
      }
      window.location.href = data.url;
    } catch {
      toast.error("Failed to start checkout.");
    } finally {
      setLoading(null);
    }
  };

  const handlePortal = async () => {
    try {
      setLoading("portal");
      const res = await fetch("/api/stripe/portal", { method: "POST" });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error ?? "Failed to open billing portal.");
        return;
      }
      window.location.href = data.url;
    } catch {
      toast.error("Failed to open billing portal.");
    } finally {
      setLoading(null);
    }
  };

  const isActive = status === "ACTIVE";

  return (
    <div className="space-y-6 max-w-2xl">
      {/* Current plan */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Current Plan</CardTitle>
            <Badge variant={plan === "FREE" ? "secondary" : "pro"}>
              {plan}
            </Badge>
          </div>
          <CardDescription>
            {plan === "FREE"
              ? "You're on the free plan. Upgrade to unlock more."
              : `Your ${plan} subscription is ${isActive ? "active" : status.toLowerCase()}.`}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {periodEnd && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">
                {status === "CANCELED" ? "Access until" : "Renews on"}
              </span>
              <span className="font-medium">{formatDate(periodEnd)}</span>
            </div>
          )}

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-lg bg-muted/50 p-3">
              <p className="text-muted-foreground mb-0.5">Daily limit</p>
              <p className="font-semibold">
                {plan === "FREE" ? "5" : plan === "PRO" ? "200" : "Unlimited"}
              </p>
            </div>
            <div className="rounded-lg bg-muted/50 p-3">
              <p className="text-muted-foreground mb-0.5">Bulk upload</p>
              <p className="font-semibold">
                {plan === "FREE" ? "1 image" : plan === "PRO" ? "10 images" : "50 images"}
              </p>
            </div>
          </div>

          {hasSubscription && (
            <Button
              variant="outline"
              onClick={handlePortal}
              disabled={loading === "portal"}
              className="w-full"
            >
              {loading === "portal" ? (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              ) : (
                <ExternalLink className="h-4 w-4" />
              )}
              Manage billing & invoices
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Upgrade options */}
      {plan !== "BUSINESS" && (
        <div>
          <h3 className="font-semibold mb-4">
            {plan === "FREE" ? "Upgrade your plan" : "Upgrade to Business"}
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {plan === "FREE" && (
              <Card className="border-violet-200 dark:border-violet-800">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">Pro</CardTitle>
                    <Badge variant="pro">Popular</Badge>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold">$9</span>
                    <span className="text-sm text-muted-foreground">/mo</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {PLANS.PRO.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm">
                        <Check className="h-3.5 w-3.5 text-emerald-500" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button
                    variant="gradient"
                    className="w-full"
                    onClick={() => handleUpgrade("PRO")}
                    disabled={!!loading}
                  >
                    {loading === "PRO" ? (
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    ) : (
                      <Zap className="h-4 w-4" />
                    )}
                    Upgrade to Pro
                  </Button>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Business</CardTitle>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold">$29</span>
                  <span className="text-sm text-muted-foreground">/mo</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  {PLANS.BUSINESS.features.slice(0, 5).map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <Check className="h-3.5 w-3.5 text-emerald-500" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => handleUpgrade("BUSINESS")}
                  disabled={!!loading}
                >
                  {loading === "BUSINESS" ? (
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  ) : null}
                  Upgrade to Business
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
