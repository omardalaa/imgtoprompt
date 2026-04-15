"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Eye, Copy, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

interface GalleryItem {
  id: string;
  prompt: string;
  outputType: string;
  tags: string[];
  likes: number;
  views: number;
  createdAt: string;
  author: string | null;
  authorImage: string | null;
}

const TAGS = ["All", "midjourney", "stable-diffusion", "product-description", "ad-copy", "seo-content"];

const TYPE_COLORS: Record<string, string> = {
  MIDJOURNEY: "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300",
  STABLE_DIFFUSION: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300",
  PRODUCT_DESCRIPTION: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  AD_COPY: "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300",
  SEO_CONTENT: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
};

export function GalleryPageClient() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [activeTag, setActiveTag] = useState("All");
  const [loading, setLoading] = useState(true);

  const fetchItems = async (p = page, tag = activeTag) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: p.toString(),
        limit: "12",
        ...(tag !== "All" ? { tag } : {}),
      });
      const res = await fetch(`/api/gallery?${params}`);
      const data = await res.json();
      setItems(data.items ?? []);
      setTotal(data.total ?? 0);
      setPages(data.pages ?? 1);
    } catch {
      toast.error("Failed to load gallery.");
    } finally {
      setLoading(false);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { fetchItems(1, activeTag); setPage(1); }, [activeTag]);

  const handleCopy = (prompt: string) => {
    navigator.clipboard.writeText(prompt);
    toast.success("Copied to clipboard!");
  };

  return (
    <div>
      {/* Tag filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {TAGS.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveTag(tag)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              activeTag === tag
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            {tag === "All" ? "All" : tag.replace("-", " ")}
          </button>
        ))}
      </div>

      <p className="text-sm text-muted-foreground mb-4">{total} prompts</p>

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="h-52 rounded-xl border bg-muted animate-pulse" />
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">
          <p className="text-lg font-medium mb-2">No prompts yet</p>
          <p className="text-sm">Be the first to share in the gallery!</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <Card key={item.id} className="group hover:shadow-md transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded-md ${
                      TYPE_COLORS[item.outputType] ?? "bg-muted text-foreground"
                    }`}
                  >
                    {item.outputType.replace("_", " ")}
                  </span>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Heart className="h-3 w-3" /> {item.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="h-3 w-3" /> {item.views}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground line-clamp-4 leading-relaxed mb-3 font-mono">
                  {item.prompt}
                </p>

                <div className="flex flex-wrap gap-1 mb-3">
                  {item.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {item.authorImage && (
                      <Image
                        src={item.authorImage}
                        alt={item.author ?? "User"}
                        width={20}
                        height={20}
                        className="rounded-full"
                      />
                    )}
                    <span className="text-xs text-muted-foreground">
                      {item.author ?? "Anonymous"}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 px-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => handleCopy(item.prompt)}
                  >
                    <Copy className="h-3.5 w-3.5" />
                    Copy
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Pagination */}
      {pages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-8">
          <Button
            variant="outline"
            size="sm"
            disabled={page === 1}
            onClick={() => {
              const p = page - 1;
              setPage(p);
              fetchItems(p);
            }}
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          <span className="text-sm text-muted-foreground px-4">
            {page} / {pages}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={page === pages}
            onClick={() => {
              const p = page + 1;
              setPage(p);
              fetchItems(p);
            }}
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
