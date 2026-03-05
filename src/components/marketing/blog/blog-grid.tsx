"use client";

import { useQueryState, parseAsString } from "nuqs";
import { useTranslations } from "next-intl";
import { Search } from "lucide-react";
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
  const [query, setQuery] = useQueryState(
    "q",
    parseAsString.withDefault(""),
  );

  const searchTerm = query.trim().toLowerCase();

  const filtered = posts
    .filter((p) => category === "all" || p.category === category)
    .filter((p) => {
      if (!searchTerm) return true;
      return (
        p.title.toLowerCase().includes(searchTerm) ||
        p.description.toLowerCase().includes(searchTerm) ||
        p.author.toLowerCase().includes(searchTerm) ||
        p.category.toLowerCase().includes(searchTerm) ||
        p.tags.some((tag) => tag.toLowerCase().includes(searchTerm))
      );
    });

  return (
    <div className="relative">
      {/* Category filter tabs + search bar */}
      <div className="flex flex-col gap-3 px-4 pb-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <Tabs
          value={category}
          onValueChange={(v) => {
            setCategory(v === "all" ? null : v);
          }}
          className="w-full sm:w-auto"
        >
          <TabsList className="w-full overflow-x-auto sm:w-auto">
            <TabsTrigger value="all">
              {t("all")}
            </TabsTrigger>
            {categories.map((cat) => (
              <TabsTrigger key={cat} value={cat}>
                {cat}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div className="relative w-full sm:w-64">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            size={14}
            aria-hidden={true}
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value || null)}
            placeholder={t("searchPlaceholder")}
            className="h-9 w-full rounded-full border border-border bg-background pl-8 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
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
