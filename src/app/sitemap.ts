import type { MetadataRoute } from "next";

const BASE = "https://hyeprlabs.com";
const LOCALES = ["en", "de"] as const;

// All blog post slugs (same slugs exist in both en and de)
const BLOG_SLUGS = [
  "ai-first-development-workflow",
  "building-design-systems-that-scale",
  "component-architecture-building-uis-that-last",
  "design-principles-for-modern-web-apps",
  "from-prototype-to-product-launch-checklist",
  "gpt-4o-multimodal-revolution",
  "letter-club-ode-to-slow-web",
  "measuring-what-matters-analytics",
  "open-source-ai-catches-up",
  "rise-of-ai-agents",
  "why-web-performance-matters",
];

type PageConfig = {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
  lastModified?: Date;
};

const PAGES: PageConfig[] = [
  { path: "", changeFrequency: "daily", priority: 1 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
  { path: "/blog", changeFrequency: "weekly", priority: 0.9 },
  { path: "/brand", changeFrequency: "monthly", priority: 0.7 },
  { path: "/changelog", changeFrequency: "weekly", priority: 0.8 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.8 },
  { path: "/legal/imprint", changeFrequency: "yearly", priority: 0.5 },
  { path: "/legal/privacy-policy", changeFrequency: "yearly", priority: 0.5 },
  { path: "/legal/terms-of-service", changeFrequency: "yearly", priority: 0.5 },
  { path: "/projects", changeFrequency: "weekly", priority: 0.9 },
  { path: "/support", changeFrequency: "monthly", priority: 0.7 },
  { path: "/team", changeFrequency: "monthly", priority: 0.8 },
  { path: "/templates", changeFrequency: "weekly", priority: 0.9 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Static pages — one entry per locale
  const staticEntries: MetadataRoute.Sitemap = PAGES.flatMap((page) =>
    LOCALES.map((locale) => ({
      url: `${BASE}/${locale}${page.path}`,
      lastModified: page.lastModified ?? now,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
      alternates: {
        languages: Object.fromEntries(
          LOCALES.map((l) => [l, `${BASE}/${l}${page.path}`])
        ),
      },
    }))
  );

  // Blog posts — one entry per locale per post
  const blogEntries: MetadataRoute.Sitemap = BLOG_SLUGS.flatMap((slug) =>
    LOCALES.map((locale) => ({
      url: `${BASE}/${locale}/blog/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
      alternates: {
        languages: Object.fromEntries(
          LOCALES.map((l) => [l, `${BASE}/${l}/blog/${slug}`])
        ),
      },
    }))
  );

  return [...staticEntries, ...blogEntries];
}
