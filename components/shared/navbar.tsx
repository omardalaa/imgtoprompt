"use client";

import Link from "next/link";
import { useState } from "react";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Zap, Menu, X, ChevronDown } from "lucide-react";
import Image from "next/image";

interface NavbarProps {
  user?: {
    id?: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    plan?: string;
  } | null;
}

export function Navbar({ user }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600">
            <Zap className="h-4 w-4 text-white" />
          </div>
          <span className="font-bold text-lg">PromptShot AI</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/gallery" className="text-muted-foreground hover:text-foreground transition-colors">
            Gallery
          </Link>
          <Link href="/pricing" className="text-muted-foreground hover:text-foreground transition-colors">
            Pricing
          </Link>
          <Link href="/#features" className="text-muted-foreground hover:text-foreground transition-colors">
            Features
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 rounded-lg border px-3 py-1.5 text-sm hover:bg-accent transition-colors"
              >
                {user.image && (
                  <Image
                    src={user.image}
                    alt={user.name ?? "User"}
                    width={24}
                    height={24}
                    className="rounded-full"
                  />
                )}
                <span className="max-w-[120px] truncate">{user.name}</span>
                {user.plan && user.plan !== "FREE" && (
                  <Badge variant="pro" className="text-[10px] px-1.5 py-0">
                    {user.plan}
                  </Badge>
                )}
                <ChevronDown className="h-3 w-3 opacity-50" />
              </button>
              {userMenuOpen && (
                <div className="absolute right-0 top-full mt-1 w-48 rounded-lg border bg-popover shadow-lg">
                  <div className="p-2 space-y-1">
                    <Link
                      href="/dashboard/generate"
                      className="block rounded-md px-3 py-2 text-sm hover:bg-accent"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <Link
                      href="/dashboard/history"
                      className="block rounded-md px-3 py-2 text-sm hover:bg-accent"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      History
                    </Link>
                    <Link
                      href="/dashboard/billing"
                      className="block rounded-md px-3 py-2 text-sm hover:bg-accent"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      Billing
                    </Link>
                    <hr className="my-1" />
                    <button
                      onClick={() => signOut({ callbackUrl: "/" })}
                      className="w-full text-left rounded-md px-3 py-2 text-sm hover:bg-accent text-destructive"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/auth/signin">Sign in</Link>
              </Button>
              <Button variant="gradient" size="sm" asChild>
                <Link href="/auth/signin">Get started free</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="md:hidden border-t bg-background px-4 py-4 space-y-4">
          <nav className="flex flex-col gap-3 text-sm">
            <Link href="/gallery" onClick={() => setMobileOpen(false)}>Gallery</Link>
            <Link href="/pricing" onClick={() => setMobileOpen(false)}>Pricing</Link>
            <Link href="/#features" onClick={() => setMobileOpen(false)}>Features</Link>
          </nav>
          {user ? (
            <div className="flex flex-col gap-2">
              <Link href="/dashboard/generate">
                <Button variant="outline" className="w-full" size="sm">Dashboard</Button>
              </Link>
              <Button variant="ghost" size="sm" onClick={() => signOut({ callbackUrl: "/" })}>
                Sign out
              </Button>
            </div>
          ) : (
            <div className="flex gap-2">
              <Button variant="outline" size="sm" asChild className="flex-1">
                <Link href="/auth/signin">Sign in</Link>
              </Button>
              <Button variant="gradient" size="sm" asChild className="flex-1">
                <Link href="/auth/signin">Get started</Link>
              </Button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
