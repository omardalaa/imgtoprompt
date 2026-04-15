import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { PLANS } from "@/lib/stripe";

export function PricingSection() {
  return (
    <section id="pricing" className="py-20 md:py-28">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Start free, upgrade when you need more. Cancel anytime.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
          {/* Free */}
          <Card className="relative">
            <CardHeader className="pb-4">
              <p className="text-sm font-medium text-muted-foreground">{PLANS.FREE.name}</p>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold">$0</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <p className="text-sm text-muted-foreground">5 generations per day</p>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full mb-6" asChild>
                <Link href="/auth/signin">Get started free</Link>
              </Button>
              <ul className="space-y-2.5">
                {PLANS.FREE.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Pro */}
          <Card className="relative border-violet-200 dark:border-violet-800 shadow-lg shadow-violet-100 dark:shadow-violet-900/20">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <Badge variant="pro" className="px-3">Most Popular</Badge>
            </div>
            <CardHeader className="pb-4">
              <p className="text-sm font-medium text-violet-600">{PLANS.PRO.name}</p>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold">${PLANS.PRO.price}</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <p className="text-sm text-muted-foreground">200 generations per day</p>
            </CardHeader>
            <CardContent>
              <Button variant="gradient" className="w-full mb-6" asChild>
                <Link href="/auth/signin">Start Pro trial</Link>
              </Button>
              <ul className="space-y-2.5">
                {PLANS.PRO.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Business */}
          <Card className="relative">
            <CardHeader className="pb-4">
              <p className="text-sm font-medium text-muted-foreground">{PLANS.BUSINESS.name}</p>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold">${PLANS.BUSINESS.price}</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <p className="text-sm text-muted-foreground">Unlimited generations</p>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full mb-6" asChild>
                <Link href="/auth/signin">Get Business</Link>
              </Button>
              <ul className="space-y-2.5">
                {PLANS.BUSINESS.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
