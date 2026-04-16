const createNextIntlPlugin = require("next-intl/plugin");

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "*.neon.tech" },
    ],
    minimumCacheTTL: 60,
  },
  experimental: {
    serverComponentsExternalPackages: ["@prisma/client", "prisma"],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
      {
        source: "/api/stripe/webhook",
        headers: [{ key: "Cache-Control", value: "no-store" }],
      },
    ];
  },
};

module.exports = withNextIntl(nextConfig);
