import { defineCollections, defineConfig } from "fumadocs-mdx/config";
import { z } from "zod";

export const blog = defineCollections({
  type: "doc",
  dir: "content/blog",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.string(),
    author: z.string(),
    category: z.string(),
    image: z.string().optional(),
    tags: z.array(z.string()).optional().default([]),
  }),
});

export default defineConfig({});
