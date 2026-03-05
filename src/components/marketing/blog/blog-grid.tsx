"use client";

import { useQueryState, parseAsString } from "nuqs";
import { useTranslations } from "next-intl";
import { cn, formatDate } from "@/lib/utils";
import { getCategoryTextClass } from "@/lib/blog";
import { FullWidthDivider } from "@/components/ui/full-width-divider";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AuthorInfo } from "./author-info";
import { Link } from "@/i18n/navigation";

type BlogPost = {
  title: string;
  date: string;
  description: string;
  category: string;
  author: string;
  tags: string[];
  href: string;
};

type Props = {
  posts: BlogPost[];
  categories: string[];
};

export function BlogGrid({ posts, categories }: Props) {
  const t = useTranslations("BlogSection");
  const [category, setCategory] = useQueryState(
    "category",
    parseAsString.withDefault("all"),
  );

  const filtered =
    category === "all"
      ? posts
      : posts.filter((p) => p.category === category);

  return (
    <div className="relative">
      {/* Category filter tabs */}
      <div className="px-4 pb-4 pt-2">
        <Tabs
          value={category}
          onValueChange={(v) => {
            setCategory(v === "all" ? null : v);
          }}
        >
          <TabsList>
            <TabsTrigger value="all">{t("all")}</TabsTrigger>
            {categories.map((cat) => (
              <TabsTrigger key={cat} value={cat}>
                {cat}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {/* Blog post grid — border-l + [&>*]:border-r + [&>*]:border-b creates
          a clean grid-line look without using bg-border on the container,
          so sparse grids (e.g. only 2 posts) show the normal page background. */}
      <div className="relative">
        <FullWidthDivider position="top" />
        <div className="grid grid-cols-1 border-l sm:grid-cols-2 lg:grid-cols-3 [&>*]:border-b [&>*]:border-r">
          {filtered.map((blog) => (
            <BlogCard {...blog} key={blog.href} />
          ))}
        </div>
        <FullWidthDivider position="bottom" />
      </div>
    </div>
  );
}

function BlogCard({
  title,
  date,
  description,
  category,
  author,
  tags,
  href,
  className,
  ...props
}: React.ComponentProps<typeof Link> & BlogPost) {
  return (
    <Link
      href={href}
      className={cn(
        "group flex min-h-[320px] w-full flex-col bg-background px-4 py-8 text-muted-foreground hover:bg-muted/30 transition-colors sm:px-6 md:py-10 lg:px-8",
        className,
      )}
      {...props}
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
        {formatDate(date)}
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
