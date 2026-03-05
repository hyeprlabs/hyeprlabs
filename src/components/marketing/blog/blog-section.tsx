import { cn, formatDate } from "@/lib/utils";
import { FullWidthDivider } from "@/components/ui/full-width-divider";
import { getTranslations } from "next-intl/server";
import { blogCollection, getSlug } from "@/lib/source";
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

export async function BlogSection() {
  const t = await getTranslations("BlogSection");
  const posts = await blogCollection;

  const blogs: BlogPost[] = posts
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

  return (
    <div className="relative mx-auto w-full max-w-5xl mb-12 md:mb-36">
      <FullWidthDivider position="top" />
      <div className="space-y-2 px-4 py-8 md:py-12">
        <h1 className="font-medium text-2xl tracking-wide md:text-4xl">
          {t("heading")}
        </h1>
        <p className="max-w-xl text-balance text-muted-foreground text-sm font-mono">
          {t("subheading")}
        </p>
      </div>
      <div className="relative grid grid-cols-1 gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
        <FullWidthDivider position="top" />
        {blogs.map((blog) => (
          <BlogCard {...blog} key={blog.title} by={t("by")} />
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
  by,
  href,
  className,
  ...props
}: React.ComponentProps<typeof Link> & BlogPost & { by: string }) {
  return (
    <Link
      href={href}
      className={cn(
        "group w-full bg-background px-4 py-8 text-muted-foreground hover:cursor-pointer hover:text-foreground active:bg-accent sm:px-6 md:py-12 lg:px-8 active:dark:bg-accent/50",
        className,
      )}
      {...props}
    >
      <h3 className="mb-3 line-clamp-2 font-medium text-foreground text-lg md:text-xl">
        {title}
      </h3>
      <div className="mb-3 flex items-center gap-2 min-w-0">
        <span className="truncate max-w-[6rem] text-muted-foreground text-xs group-hover:text-foreground">
          {category}
        </span>
        <div className="inline-flex size-1 shrink-0 rounded-full bg-muted-foreground" />
        <span className="truncate text-muted-foreground text-xs group-hover:text-foreground">
          {formatDate(date)}
        </span>
      </div>
      <p className="mb-4 line-clamp-3 text-muted-foreground text-sm tracking-wide group-hover:text-foreground font-mono">
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
      <div className="flex items-center gap-1.5 min-w-0">
        <span className="shrink-0">{by}</span>
        <span className="truncate font-medium font-mono text-foreground/80 text-xs group-hover:text-foreground md:text-sm">
          {author}
        </span>
      </div>
    </Link>
  );
}
