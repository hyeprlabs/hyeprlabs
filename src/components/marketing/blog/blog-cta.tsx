import { getTranslations } from "next-intl/server";
import { blogCollection, getSlug } from "@/lib/source";
import { FullWidthDivider } from "@/components/ui/full-width-divider";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { cn, formatDate } from "@/lib/utils";
import { getCategoryTextClass } from "@/lib/blog";
import { AuthorInfo } from "./author-info";

const PREVIEW_COUNT = 3;

export async function BlogCta() {
  const t = await getTranslations("BlogCta");
  const posts = await blogCollection;

  const blogs = posts
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, PREVIEW_COUNT)
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
        <div className="grid grid-cols-1 border-l sm:grid-cols-2 lg:grid-cols-3 [&>*]:border-b [&>*]:border-r">
          {blogs.map((blog) => (
            <BlogPreviewCard key={blog.href} {...blog} />
          ))}
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
};

function BlogPreviewCard({
  title,
  date,
  description,
  category,
  author,
  tags,
  href,
}: BlogPreviewCardProps) {
  return (
    <Link
      href={href}
      className="group flex min-h-[320px] w-full flex-col bg-background px-4 py-8 text-muted-foreground transition-colors hover:bg-muted/30 sm:px-6 md:py-10 lg:px-8"
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
      <span className="mb-3 text-xs text-muted-foreground">
        {formatDate(date)}
      </span>
      <p className="mb-4 line-clamp-3 flex-1 font-mono text-sm text-muted-foreground tracking-wide">
        {description}
      </p>
      {tags.length > 0 && (
        <div className="mb-6 flex flex-wrap gap-1.5">
          {tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="font-mono text-xs text-muted-foreground group-hover:text-foreground/70"
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
