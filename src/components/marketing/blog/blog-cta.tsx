import { getTranslations, getLocale } from "next-intl/server";
import { unstable_noStore as noStore } from "next/cache";
import { getBlogByLocale, getSlug } from "@/lib/source";
import { FullWidthDivider } from "@/components/ui/full-width-divider";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { cn, formatDate } from "@/lib/utils";
import { getCategoryTextClass } from "@/lib/blog";
import { AuthorInfo } from "@/components/marketing/blog/author-info";

const preview = 3;

/**
 * Renders a localized blog call-to-action section with previews of the three most recent posts.
 *
 * This component disables route caching and fetches translations, the current locale, and locale-specific blog posts before rendering.
 *
 * @returns A section element containing a heading, a "view all" button linking to /blog, and a responsive grid of up to three blog preview cards for the current locale.
 */
export async function BlogCta() {
  noStore();
  const t = await getTranslations("BlogCta");
  const locale = await getLocale();
  const posts = await getBlogByLocale(locale);

  const blogs = posts
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, preview)
    .map((post) => ({
      title: post.title,
      date: post.date,
      description: post.description,
      category: post.category,
      author: post.author,
      tags: post.tags ?? [],
      href: `/blog/${getSlug(post.info.path)}`,
    }));

  return (
    <section className="relative mx-auto mb-12 md:mb-36 w-full max-w-5xl">
      <FullWidthDivider position="top" />
      <div className="flex flex-col gap-4 px-4 py-8 sm:flex-row sm:items-end sm:justify-between md:py-12">
        <div className="space-y-2">
          <h2 className="font-medium text-2xl tracking-wide md:text-4xl">
            {t("heading")}
          </h2>
          <p className="max-w-xl text-balance text-muted-foreground text-sm font-mono">
            {t("subheading")}
          </p>
        </div>
        <Link href="/blog" className="shrink-0">
          <Button
            variant="outline"
            className="rounded-full bg-linear-to-br from-muted to-background"
          >
            {t("viewAll")}
            <ArrowRight />
          </Button>
        </Link>
      </div>

      <div className="relative">
        <FullWidthDivider position="top" />
        <div className="overflow-hidden">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 [&>*]:border-b [&>*]:border-r -mr-px -mb-px ml-0 mt-0">
            {blogs.map((blog) => (
              <BlogPreviewCard key={blog.href} {...blog} locale={locale} />
            ))}
          </div>
        </div>
        <FullWidthDivider position="bottom" />
      </div>
    </section>
  );
}

type BlogPreviewCardProps = {
  title: string;
  date: string;
  description: string;
  category: string;
  author: string;
  tags: string[];
  href: string;
  locale: string;
};

/**
 * Render a blog post preview card that links to the full post.
 *
 * Displays category, title, a locale-formatted date, a short description, up to three tags, and author information.
 *
 * @param href - Destination URL for the post link
 * @param tags - Array of tag strings; at most the first three tags are rendered
 * @param locale - Locale string used to format the post date (e.g., "en-US")
 * @returns A JSX element representing the blog preview card
 */
function BlogPreviewCard({
  title,
  date,
  description,
  category,
  author,
  tags,
  href,
  locale,
}: BlogPreviewCardProps) {
  return (
    <Link
      href={href}
      className="group flex min-h-[320px] w-full flex-col bg-background px-4 py-8 text-muted-foreground hover:bg-muted/30 transition-colors sm:px-6 md:py-10 lg:px-8"
    >
      <span
        className={cn(
          "mb-2 text-xs font-mono font-medium",
          getCategoryTextClass(category),
        )}
      >
        {category}
      </span>
      <h3 className="mb-2 line-clamp-2 font-medium text-foreground text-lg md:text-xl">
        {title}
      </h3>
      <span className="mb-3 text-muted-foreground text-xs">
        {formatDate(date, locale)}
      </span>
      <p className="mb-4 line-clamp-3 flex-1 text-muted-foreground text-sm tracking-wide font-mono">
        {description}
      </p>
      {tags.length > 0 && (
        <div className="mb-6 flex flex-wrap gap-1.5">
          {tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-xs font-mono text-muted-foreground group-hover:text-foreground/70"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
      <AuthorInfo author={author} />
    </Link>
  );
}
