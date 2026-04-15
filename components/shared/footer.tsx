import Link from "next/link";
import { Zap } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600">
                <Zap className="h-3.5 w-3.5 text-white" />
              </div>
              <span className="font-bold">PromptShot AI</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-[200px]">
              Turn any image into perfect AI prompts instantly.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-3">Product</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/#features" className="hover:text-foreground">Features</Link></li>
              <li><Link href="/pricing" className="hover:text-foreground">Pricing</Link></li>
              <li><Link href="/gallery" className="hover:text-foreground">Gallery</Link></li>
              <li><Link href="/dashboard/generate" className="hover:text-foreground">Generate</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-3">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/about" className="hover:text-foreground">About</Link></li>
              <li><Link href="/blog" className="hover:text-foreground">Blog</Link></li>
              <li><Link href="/careers" className="hover:text-foreground">Careers</Link></li>
              <li><Link href="/contact" className="hover:text-foreground">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-3">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/privacy" className="hover:text-foreground">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-foreground">Terms of Service</Link></li>
              <li><Link href="/cookies" className="hover:text-foreground">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} PromptShot AI. All rights reserved.</p>
          <p>Built with Next.js 14 · Powered by GPT-4o</p>
        </div>
      </div>
    </footer>
  );
}
