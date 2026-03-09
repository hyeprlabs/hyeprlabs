import { blogEn, blogDe } from "fumadocs-mdx:collections/server";

export { blogEn, blogDe };

/**
 * Returns the blog collection for the given locale.
 * Falls back to the English collection for unknown locales.
 */
export function getBlogByLocale(locale: string) {
  return locale === "de" ? blogDe : blogEn;
}

/**
 * Converts a file path like "hello-world.mdx" to a URL slug "hello-world".
 */
export function getSlug(filePath: string): string {
  return filePath.replace(/\.mdx?$/, "");
}
