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
      <div className="px-4 pb-4 pt-2 sm:px-6">
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

      <div className="relative grid grid-cols-1 gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
        <FullWidthDivider position="top" />
        {filtered.map((blog) => (
          <BlogCard {...blog} key={blog.href} />
        ))}
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
        "group flex w-full flex-col bg-background px-4 py-8 text-muted-foreground hover:cursor-pointer hover:text-foreground active:bg-accent sm:px-6 md:py-12 lg:px-8 active:dark:bg-accent/50",
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
      <h3 className="mb-3 line-clamp-2 font-medium text-foreground text-lg md:text-xl">
        {title}
      </h3>
      <span className="mb-3 truncate text-muted-foreground text-xs group-hover:text-foreground">
        {formatDate(date)}
      </span>
      <p className="mb-4 line-clamp-3 flex-1 text-muted-foreground text-sm tracking-wide group-hover:text-foreground font-mono">
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
