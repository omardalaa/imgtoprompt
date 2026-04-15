"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Zap,
  History,
  CreditCard,
  Users,
  LogOut,
} from "lucide-react";

interface SidebarProps {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
  plan: string;
  rateLimit: {
    remaining: number;
    limit: number;
    allowed: boolean;
  };
}

const navItems = [
  { href: "/dashboard/generate", icon: Zap, label: "Generate" },
  { href: "/dashboard/history", icon: History, label: "History" },
  { href: "/dashboard/billing", icon: CreditCard, label: "Billing" },
  { href: "/dashboard/referral", icon: Users, label: "Referrals" },
];

export function DashboardSidebar({ user, plan, rateLimit }: SidebarProps) {
  const pathname = usePathname();

  const usedToday = rateLimit.limit === -1 ? 0 : rateLimit.limit - rateLimit.remaining;
  const usagePercent =
    rateLimit.limit === -1 ? 0 : (usedToday / rateLimit.limit) * 100;

  return (
    <aside className="hidden md:flex w-64 flex-col border-r bg-card min-h-screen sticky top-0">
      {/* Logo */}
      <div className="p-6 border-b">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600">
            <Zap className="h-4 w-4 text-white" />
          </div>
          <span className="font-bold">PromptShot AI</span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              pathname === item.href
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            )}
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Usage */}
      <div className="p-4 border-t">
        <div className="rounded-lg bg-muted/50 p-3 mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-medium">Daily usage</span>
            <Badge
              variant={plan === "FREE" ? "secondary" : "pro"}
              className="text-[10px]"
            >
              {plan}
            </Badge>
          </div>
          {rateLimit.limit === -1 ? (
            <p className="text-xs text-muted-foreground">Unlimited</p>
          ) : (
            <>
              <Progress value={usagePercent} className="h-1.5 mb-1" />
              <p className="text-xs text-muted-foreground">
                {usedToday} / {rateLimit.limit} today
              </p>
            </>
          )}
          {plan === "FREE" && (
            <Link
              href="/pricing"
              className="mt-2 block text-xs text-violet-600 hover:text-violet-700 font-medium"
            >
              Upgrade for more →
            </Link>
          )}
        </div>

        {/* User */}
        <div className="flex items-center gap-3">
          {user.image ? (
            <Image
              src={user.image}
              alt={user.name ?? "User"}
              width={32}
              height={32}
              className="rounded-full"
            />
          ) : (
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-white text-xs font-bold">
              {user.name?.[0] ?? user.email?.[0] ?? "U"}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{user.name}</p>
            <p className="text-xs text-muted-foreground truncate">{user.email}</p>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="text-muted-foreground hover:text-destructive transition-colors"
            aria-label="Sign out"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
