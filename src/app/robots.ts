import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const hl = "https://hyeprlabs.com";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/private/", "/sign-in", "/sign-up", "/api/"],
    },
    sitemap: `${hl}/sitemap.xml`,
  };
}
