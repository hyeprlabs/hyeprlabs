import { blog } from "fumadocs-mdx:collections/server";

export { blog };

/**
 * Converts a file path like "hello-world.mdx" to a URL slug "hello-world".
 */
export function getSlug(filePath: string): string {
  return filePath.replace(/\.mdx?$/, "");
}
