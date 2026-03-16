import { blogEn, blogDe } from "fumadocs-mdx:collections/server";

export { blogEn, blogDe };

/**
 * Selects the blog collection for a locale, using the German collection when `locale` is `"de"` and the English collection otherwise.
 *
 * @param locale - Locale identifier; `"de"` returns the German collection, any other value returns the English collection
 * @returns The selected blog collection (`blogDe` for `"de"`, `blogEn` otherwise)
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
