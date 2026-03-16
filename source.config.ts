import { defineCollections, defineConfig } from "fumadocs-mdx/config";
import { z } from "zod";

const blogSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.string(),
  author: z.string(),
  category: z.string(),
  image: z.string().optional(),
  tags: z.array(z.string()).optional().default([]),
});

export const blogEn = defineCollections({
  type: "doc",
  dir: "content/blog/en",
  schema: blogSchema,
});

export const blogDe = defineCollections({
  type: "doc",
  dir: "content/blog/de",
  schema: blogSchema,
});

export default defineConfig({});
