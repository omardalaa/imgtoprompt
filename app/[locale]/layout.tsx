import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { Toaster } from "sonner";
import { Providers } from "@/components/shared/providers";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { siteConfig } from "@/lib/site-config";

const inter = Inter({ subsets: ["latin", "latin-ext"], variable: "--font-inter" });

const rtlLocales = ["ar"];

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: siteConfig.name, template: `%s | ${siteConfig.name}` },
  description: siteConfig.description,
  keywords: [
    "AI prompt generator", "image to prompt", "Midjourney prompts",
    "Stable Diffusion prompts", "AI image analysis", "product description generator",
    "generateur de prompt IA", "generador de prompts IA", "AI プロンプト生成",
  ],
  authors: [{ name: "PromptShot AI" }],
  openGraph: {
    type: "website",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [{ url: `${siteConfig.url}/og.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${siteConfig.url}/og.png`],
    creator: "@promptshotai",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;

  if (!routing.locales.includes(locale as never)) {
    notFound();
  }

  const messages = await getMessages();
  const dir = rtlLocales.includes(locale) ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "PromptShot AI",
              url: siteConfig.url,
              description: siteConfig.description,
              applicationCategory: "UtilitiesApplication",
              operatingSystem: "Web",
              offers: { "@type": "AggregateOffer", priceCurrency: "USD", lowPrice: "0", highPrice: "29" },
            }),
          }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <Providers>
            {children}
            <Toaster richColors position="top-right" />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
