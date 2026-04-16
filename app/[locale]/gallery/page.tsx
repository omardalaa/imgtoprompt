import { Metadata } from "next";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { GalleryPageClient } from "@/components/gallery/gallery-page-client";
import { getAuthSession } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Prompt Gallery — PromptShot AI",
  description:
    "Browse thousands of AI prompts shared by the PromptShot AI community. Midjourney, Stable Diffusion, product descriptions, ad copy, and more.",
};

export default async function GalleryPage() {
  const session = await getAuthSession();

  return (
    <>
      <Navbar user={session?.user} />
      <main className="container py-10">
        <div className="mb-10">
          <h1 className="text-3xl font-bold mb-2">Community Gallery</h1>
          <p className="text-muted-foreground">
            Browse AI prompts shared by our community of creators.
          </p>
        </div>
        <GalleryPageClient />
      </main>
      <Footer />
    </>
  );
}
