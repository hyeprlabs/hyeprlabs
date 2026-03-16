import { FullWidthDivider } from "@/components/ui/full-width-divider";
import { getTranslations, getLocale } from "next-intl/server";
import { getBlogByLocale, getSlug } from "@/lib/source";
import { BlogGrid } from "@/components/marketing/blog/blog-grid";

/**
 * Render a localized blog section with a heading, subheading, and a grid of blog posts.
 *
 * Fetches translations and the current locale, loads locale-specific blog posts, and constructs
 * a list of posts (including title, date, description, category, author, tags, and href) and
 * an alphabetically sorted list of unique categories to populate the grid.
 *
 * @returns The blog section React element displaying the localized heading and subheading, and a BlogGrid populated with the transformed posts and derived categories.
 */
export async function BlogSection() {
  const t = await getTranslations("BlogSection");
  const locale = await getLocale();
  const posts = await getBlogByLocale(locale);

  const blogs = posts
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .map((post) => ({
      title: post.title,
      date: post.date,
      description: post.description,
      category: post.category,
      author: post.author,
      tags: post.tags ?? [],
      href: `/blog/${getSlug(post.info.path)}`,
    }));

  const categories = Array.from(
    new Set(blogs.map((b) => b.category)),
  ).sort();

  return (
    <div className="relative mx-auto w-full max-w-5xl mb-12 md:mb-36">
      <FullWidthDivider position="top" />
      <div className="space-y-2 px-4 py-8 md:py-12">
        <h2 className="font-medium text-2xl tracking-wide md:text-4xl">
          {t("heading")}
        </h2>
        <p className="max-w-xl text-balance text-muted-foreground text-sm font-mono">
          {t("subheading")}
        </p>
      </div>
      <BlogGrid posts={blogs} categories={categories} />
    </div>
  );
}
