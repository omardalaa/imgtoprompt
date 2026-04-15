"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Copy, CheckCircle, Clock, Send } from "lucide-react";

interface ReferralData {
  code: string;
  link: string;
  total: number;
  completed: number;
  pending: number;
  referrals: { email: string; status: string; date: string }[];
}

export function ReferralClient() {
  const [data, setData] = useState<ReferralData | null>(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetch("/api/referral")
      .then((r) => r.json())
      .then(setData)
      .catch(() => toast.error("Failed to load referrals."))
      .finally(() => setLoading(false));
  }, []);

  const handleCopyLink = () => {
    if (!data?.link) return;
    navigator.clipboard.writeText(data.link);
    setCopied(true);
    toast.success("Link copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSending(true);
    try {
      const res = await fetch("/api/referral", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const json = await res.json();
      if (!res.ok) {
        toast.error(json.error ?? "Failed to send invite.");
        return;
      }
      toast.success("Invite recorded!");
      setEmail("");
      // Refresh
      const r = await fetch("/api/referral");
      setData(await r.json());
    } catch {
      toast.error("Failed to send invite.");
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-32 rounded-xl border bg-muted animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-2xl">
      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-3xl font-bold text-violet-600">{data?.total ?? 0}</div>
            <p className="text-xs text-muted-foreground mt-1">Total Referrals</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-3xl font-bold text-emerald-600">{data?.completed ?? 0}</div>
            <p className="text-xs text-muted-foreground mt-1">Completed</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-3xl font-bold text-amber-600">{data?.pending ?? 0}</div>
            <p className="text-xs text-muted-foreground mt-1">Pending</p>
          </CardContent>
        </Card>
      </div>

      {/* Referral link */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Your Referral Link</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex gap-2">
            <Input
              value={data?.link ?? ""}
              readOnly
              className="font-mono text-sm"
            />
            <Button variant="outline" size="icon" onClick={handleCopyLink}>
              {copied ? (
                <CheckCircle className="h-4 w-4 text-emerald-500" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Share this link with friends. When they sign up, it&apos;s counted as your referral.
          </p>
        </CardContent>
      </Card>

      {/* Invite by email */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Invite by Email</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleInvite} className="flex gap-2">
            <Input
              type="email"
              placeholder="friend@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button type="submit" disabled={sending}>
              {sending ? (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              ) : (
                <Send className="h-4 w-4" />
              )}
              Invite
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Referral list */}
      {data?.referrals && data.referrals.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Your Referrals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {data.referrals.map((ref, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between py-2 border-b last:border-0"
                >
                  <span className="text-sm font-mono">{ref.email}</span>
                  <Badge
                    variant={
                      ref.status === "COMPLETED"
                        ? "success"
                        : ref.status === "PENDING"
                        ? "secondary"
                        : "outline"
                    }
                    className="text-xs"
                  >
                    {ref.status === "COMPLETED" ? (
                      <CheckCircle className="h-3 w-3 mr-1" />
                    ) : (
                      <Clock className="h-3 w-3 mr-1" />
                    )}
                    {ref.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
