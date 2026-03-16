import type { MetadataRoute } from "next";

/**
 * Provide the site's robots.txt configuration.
 *
 * @returns Robots directives containing a rules array (allows "/" and disallows "/api/" for all user agents), a `sitemap` URL of "https://hyeprlabs.com/sitemap.xml", and `host` set to "https://hyeprlabs.com".
 */
export default function robots(): MetadataRoute.Robots {
  const base = "https://hyeprlabs.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
