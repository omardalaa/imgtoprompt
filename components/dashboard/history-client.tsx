"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatDate, truncate } from "@/lib/utils";
import {
  Copy,
  Trash2,
  Download,
  ChevronLeft,
  ChevronRight,
  FileText,
} from "lucide-react";
import Link from "next/link";

interface Generation {
  id: string;
  outputType: string;
  prompt: string;
  enhancedPrompt: string | null;
  createdAt: string;
}

interface HistoryClientProps {
  plan: string;
}

const TYPE_LABELS: Record<string, string> = {
  ALL: "All Types",
  MIDJOURNEY: "Midjourney",
  STABLE_DIFFUSION: "Stable Diffusion",
  PRODUCT_DESCRIPTION: "Product Description",
  AD_COPY: "Ad Copy",
  SEO_CONTENT: "SEO Content",
};

export function HistoryClient({ plan }: HistoryClientProps) {
  const [generations, setGenerations] = useState<Generation[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [type, setType] = useState("ALL");
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<string[]>([]);

  const fetchHistory = async (p = page, t = type) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/history?page=${p}&type=${t}&limit=10`);
      const data = await res.json();
      setGenerations(data.generations ?? []);
      setTotal(data.total ?? 0);
      setPages(data.pages ?? 1);
    } catch {
      toast.error("Failed to load history.");
    } finally {
      setLoading(false);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { fetchHistory(1, type); setPage(1); }, [type]);

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/history?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      setGenerations((g) => g.filter((gen) => gen.id !== id));
      setTotal((t) => t - 1);
      toast.success("Deleted.");
    } catch {
      toast.error("Failed to delete.");
    }
  };

  const handleExport = async (format: "txt" | "csv") => {
    if (plan === "FREE") {
      toast.error("Export requires Pro or Business plan.");
      return;
    }
    try {
      const res = await fetch("/api/export", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          format,
          ids: selected.length > 0 ? selected : undefined,
        }),
      });
      if (!res.ok) {
        toast.error("Export failed.");
        return;
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `promptshot-export.${format}`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success("Export downloaded!");
    } catch {
      toast.error("Export failed.");
    }
  };

  const toggleSelect = (id: string) => {
    setSelected((s) =>
      s.includes(id) ? s.filter((i) => i !== id) : [...s, id]
    );
  };

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center justify-between">
        <div className="flex gap-3 items-center">
          <Select value={type} onValueChange={setType}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(TYPE_LABELS).map(([v, l]) => (
                <SelectItem key={v} value={v}>{l}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <span className="text-sm text-muted-foreground">{total} total</span>
        </div>

        <div className="flex gap-2">
          {plan !== "FREE" ? (
            <>
              <Button variant="outline" size="sm" onClick={() => handleExport("txt")}>
                <FileText className="h-3.5 w-3.5" />
                TXT
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleExport("csv")}>
                <Download className="h-3.5 w-3.5" />
                CSV
              </Button>
            </>
          ) : (
            <Link href="/pricing">
              <Button variant="outline" size="sm">
                <Download className="h-3.5 w-3.5" />
                Export
                <Badge variant="pro" className="ml-1 text-[10px] px-1">PRO</Badge>
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* List */}
      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-24 rounded-xl border bg-muted animate-pulse" />
          ))}
        </div>
      ) : generations.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <p className="text-lg font-medium mb-2">No generations yet</p>
          <p className="text-sm">
            <Link href="/dashboard/generate" className="text-primary hover:underline">
              Generate your first prompt
            </Link>
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {generations.map((gen) => (
            <Card key={gen.id} className="group">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={selected.includes(gen.id)}
                    onChange={() => toggleSelect(gen.id)}
                    className="mt-1 h-4 w-4 rounded border-gray-300"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary" className="text-xs">
                        {TYPE_LABELS[gen.outputType] ?? gen.outputType}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {formatDate(gen.createdAt)}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2 font-mono">
                      {gen.enhancedPrompt
                        ? truncate(gen.enhancedPrompt, 200)
                        : truncate(gen.prompt, 200)}
                    </p>
                  </div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => {
                        navigator.clipboard.writeText(gen.enhancedPrompt ?? gen.prompt);
                        toast.success("Copied!");
                      }}
                    >
                      <Copy className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:text-destructive"
                      onClick={() => handleDelete(gen.id)}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Pagination */}
      {pages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-4">
          <Button
            variant="outline"
            size="sm"
            disabled={page === 1}
            onClick={() => {
              const p = page - 1;
              setPage(p);
              fetchHistory(p);
            }}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm text-muted-foreground">
            Page {page} of {pages}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={page === pages}
            onClick={() => {
              const p = page + 1;
              setPage(p);
              fetchHistory(p);
            }}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
