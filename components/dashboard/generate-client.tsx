"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Upload,
  Zap,
  Copy,
  Wand2,
  X,
  ImageIcon,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type OutputType =
  | "MIDJOURNEY"
  | "STABLE_DIFFUSION"
  | "PRODUCT_DESCRIPTION"
  | "AD_COPY"
  | "SEO_CONTENT";

const OUTPUT_TYPES: { value: OutputType; label: string; description: string }[] =
  [
    { value: "MIDJOURNEY", label: "Midjourney", description: "Ready-to-use with parameters" },
    { value: "STABLE_DIFFUSION", label: "Stable Diffusion", description: "Positive & negative prompts" },
    { value: "PRODUCT_DESCRIPTION", label: "Product Description", description: "E-commerce copy" },
    { value: "AD_COPY", label: "Ad Copy", description: "Multi-platform variations" },
    { value: "SEO_CONTENT", label: "SEO Content", description: "Meta, keywords, alt text" },
  ];

interface GenerateClientProps {
  plan: string;
  rateLimit: { remaining: number; limit: number; allowed: boolean };
}

export function GenerateClient({ plan, rateLimit }: GenerateClientProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [outputType, setOutputType] = useState<OutputType>("MIDJOURNEY");
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<{ id: string; prompt: string } | null>(null);
  const [remaining, setRemaining] = useState(rateLimit.remaining);
  const [copied, setCopied] = useState(false);

  const maxFiles = plan === "BUSINESS" ? 50 : plan === "PRO" ? 10 : 1;

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newFiles = acceptedFiles.slice(0, maxFiles);
      setFiles(newFiles);
      setResult(null);

      const newPreviews = newFiles.map((f) => URL.createObjectURL(f));
      setPreviews((prev) => {
        prev.forEach((p) => URL.revokeObjectURL(p));
        return newPreviews;
      });
    },
    [maxFiles]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/webp": [],
      "image/gif": [],
    },
    maxFiles,
    maxSize: 10 * 1024 * 1024,
    onDropRejected: (rejections) => {
      const error = rejections[0]?.errors[0];
      if (error?.code === "file-too-large") {
        toast.error("Image too large. Maximum size is 10MB.");
      } else if (error?.code === "too-many-files") {
        toast.error(`Max ${maxFiles} file${maxFiles > 1 ? "s" : ""} for your plan.`);
      } else {
        toast.error("Invalid file type. Please use PNG, JPG, or WebP.");
      }
    },
  });

  const removeFile = (index: number) => {
    URL.revokeObjectURL(previews[index]);
    setFiles((f) => f.filter((_, i) => i !== index));
    setPreviews((p) => p.filter((_, i) => i !== index));
    setResult(null);
  };

  const fileToBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        resolve(result.split(",")[1]);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const handleGenerate = async () => {
    if (files.length === 0) {
      toast.error("Please upload an image first.");
      return;
    }
    if (remaining <= 0) {
      toast.error("Daily limit reached. Upgrade for more generations.");
      return;
    }

    setIsGenerating(true);
    setResult(null);

    try {
      const file = files[0];
      const imageBase64 = await fileToBase64(file);

      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageBase64,
          mimeType: file.type,
          outputType,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 429) {
          toast.error(data.error ?? "Rate limit reached.");
          setRemaining(0);
        } else {
          toast.error(data.error ?? "Generation failed.");
        }
        return;
      }

      setResult({ id: data.id, prompt: data.prompt });
      setRemaining(data.remaining ?? remaining - 1);
      toast.success("Prompt generated successfully!");
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(result.prompt);
    setCopied(true);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleEnhance = async () => {
    if (!result) return;
    if (plan === "FREE") {
      toast.error("Prompt enhancer requires Pro or Business plan.");
      return;
    }

    try {
      const res = await fetch("/api/enhance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ generationId: result.id, outputType }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error ?? "Enhancement failed.");
        return;
      }
      setResult((r) => r ? { ...r, prompt: data.enhanced } : r);
      toast.success("Prompt enhanced!");
    } catch {
      toast.error("Enhancement failed.");
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Left: Upload */}
      <div className="space-y-4">
        {/* Rate limit warning */}
        {!rateLimit.allowed || remaining <= 0 ? (
          <div className="flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/30 px-4 py-3">
            <AlertCircle className="h-4 w-4 text-amber-600 mt-0.5 shrink-0" />
            <div className="text-sm">
              <p className="font-medium text-amber-800 dark:text-amber-200">Daily limit reached</p>
              <p className="text-amber-700 dark:text-amber-300">
                Resets at midnight UTC.{" "}
                <Link href="/pricing" className="underline font-medium">Upgrade</Link>{" "}
                for more generations.
              </p>
            </div>
          </div>
        ) : remaining <= 2 && plan === "FREE" ? (
          <div className="flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/30 px-4 py-3">
            <AlertCircle className="h-4 w-4 text-amber-600 mt-0.5 shrink-0" />
            <p className="text-sm text-amber-700 dark:text-amber-300">
              {remaining} generation{remaining !== 1 ? "s" : ""} left today.{" "}
              <Link href="/pricing" className="underline font-medium">Upgrade to Pro</Link>{" "}
              for 200/day.
            </p>
          </div>
        ) : null}

        {/* Dropzone */}
        <div
          {...getRootProps()}
          className={`relative cursor-pointer rounded-xl border-2 border-dashed p-8 text-center transition-colors ${
            isDragActive
              ? "border-primary bg-primary/5"
              : "border-border hover:border-primary/50 hover:bg-muted/20"
          }`}
        >
          <input {...getInputProps()} />
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-muted">
            <Upload className="h-6 w-6 text-muted-foreground" />
          </div>
          <p className="font-medium mb-1">
            {isDragActive ? "Drop to upload" : "Upload image"}
          </p>
          <p className="text-sm text-muted-foreground">
            PNG, JPG, WebP up to 10MB
            {maxFiles > 1 && ` · Up to ${maxFiles} files`}
          </p>
        </div>

        {/* Previews */}
        {previews.length > 0 && (
          <div className="grid grid-cols-3 gap-2">
            {previews.map((src, i) => (
              <div key={i} className="relative aspect-square rounded-lg overflow-hidden border">
                <Image
                  src={src}
                  alt={`Preview ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="120px"
                />
                <button
                  onClick={() => removeFile(i)}
                  className="absolute top-1 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-background/80 text-foreground hover:bg-destructive hover:text-white transition-colors"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Output type */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Output Type</label>
          <Select
            value={outputType}
            onValueChange={(v) => setOutputType(v as OutputType)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {OUTPUT_TYPES.map((t) => (
                <SelectItem key={t.value} value={t.value}>
                  <div>
                    <span className="font-medium">{t.label}</span>
                    <span className="ml-2 text-xs text-muted-foreground">
                      {t.description}
                    </span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button
          onClick={handleGenerate}
          disabled={isGenerating || files.length === 0 || remaining <= 0}
          variant="gradient"
          className="w-full"
          size="lg"
        >
          {isGenerating ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              Generating...
            </>
          ) : (
            <>
              <Zap className="h-4 w-4" />
              Generate ({remaining} left today)
            </>
          )}
        </Button>
      </div>

      {/* Right: Result */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">Output</h3>
          {result && (
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleEnhance}
                disabled={plan === "FREE"}
                title={plan === "FREE" ? "Requires Pro plan" : "Enhance prompt"}
              >
                <Wand2 className="h-3.5 w-3.5" />
                Enhance
                {plan === "FREE" && <Badge variant="pro" className="ml-1 text-[10px] px-1">PRO</Badge>}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopy}
              >
                {copied ? (
                  <CheckCircle className="h-3.5 w-3.5 text-emerald-500" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
                {copied ? "Copied!" : "Copy"}
              </Button>
            </div>
          )}
        </div>

        <Card className="min-h-[300px]">
          <CardContent className="p-4">
            {result ? (
              <Textarea
                value={result.prompt}
                onChange={(e) =>
                  setResult((r) => r ? { ...r, prompt: e.target.value } : r)
                }
                className="min-h-[280px] border-0 shadow-none focus-visible:ring-0 resize-none font-mono text-sm p-0"
                placeholder="Your generated prompt will appear here..."
              />
            ) : isGenerating ? (
              <div className="flex h-[280px] items-center justify-center">
                <div className="text-center">
                  <div className="mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                  <p className="text-sm text-muted-foreground animate-pulse">
                    Analyzing image with GPT-4o...
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex h-[280px] items-center justify-center text-center">
                <div>
                  <ImageIcon className="mx-auto mb-3 h-10 w-10 text-muted-foreground/40" />
                  <p className="text-sm text-muted-foreground">
                    Upload an image and click Generate
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Results appear here instantly
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {plan === "FREE" && (
          <Card className="border-violet-200 bg-violet-50 dark:border-violet-800 dark:bg-violet-950/20">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Zap className="h-4 w-4 text-violet-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-violet-900 dark:text-violet-100">
                    Unlock more with Pro
                  </p>
                  <p className="text-xs text-violet-700 dark:text-violet-300 mt-0.5">
                    200 generations/day, prompt enhancer, bulk upload, export, and no watermarks.
                  </p>
                  <Link
                    href="/pricing"
                    className="mt-2 inline-block text-xs font-semibold text-violet-700 hover:text-violet-900 dark:text-violet-300 underline"
                  >
                    Upgrade to Pro — $9/month →
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
