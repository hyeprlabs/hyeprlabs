import { blog as blogCollection } from "../../.source/server";

export type BlogPost = (typeof blogCollection)[number];

export { blogCollection };

/** Derive the slug from a blog post's virtual file path (e.g. "my-post.mdx" → "my-post") */
export function getSlug(post: BlogPost): string {
  return post.info.path.replace(/\.mdx?$/, "");
}
