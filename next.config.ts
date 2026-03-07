import type { NextConfig } from "next";
import { createMDX } from "fumadocs-mdx/next";
import createNextIntlPlugin from "next-intl/plugin";

const withMDX = createMDX();
 
const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "storage.efferd.com",
      },
    ],
  },
};

export default withMDX(withNextIntl(nextConfig));
