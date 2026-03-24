import type { NextConfig } from "next";
import { createMDX } from "fumadocs-mdx/next";
import createNextIntlPlugin from "next-intl/plugin";

const withMDX = createMDX();

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ["localhost:3000"],
    },
  },
  compress: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "storage.efferd.com",
      },
    ],
  },
  async headers() {
    return [
      {
        // Security headers for all routes
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
      {
        // Long-term cache for immutable static assets (Next.js uses path segments without regex)
        source: "/:path*.(png|jpg|jpeg|gif|ico|webp|avif|svg|woff|woff2|ttf|otf)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default withMDX(withNextIntl(nextConfig));
