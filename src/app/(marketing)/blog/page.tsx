import type { Metadata } from "next";
import Link from "next/link";
import { MarketingHero } from "@/components/marketing/marketing-hero";
import { CallToAction } from "@/components/marketing/cta";
import { Footer } from "@/components/marketing/footer";
import { FullWidthDivider } from "@/components/ui/full-width-divider";
import { blogCollection, getSlug } from "@/lib/source";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Thoughts on design, development, and building digital products for the modern web.",
  keywords: ["Web Development Blog", "Design Insights", "Engineering Articles", "Next.js Blog", "UI/UX Tips"],
  openGraph: {
    title: "Blog | Hyepr Labs | Think Fast. Build Fast.",
    description: "Thoughts on design, development, and building digital products for the modern web.",
    url: "https://hyeprlabs.com/blog",
  }
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default async function Page() {
  const posts = [...blogCollection].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  return (
    <>
      <MarketingHero
        badge="BLOG"
        title="Insights & News"
        description="Thoughts on design, development, and building digital products for the modern web."
      />
      <div className="relative mx-auto w-full max-w-5xl mb-12 md:mb-36">
        <FullWidthDivider position="top" />
        <div className="space-y-2 px-4 py-8 md:py-12">
          <h2 className="font-medium text-2xl tracking-wide md:text-4xl">
            Latest Posts
          </h2>
          <p className="text-muted-foreground text-sm font-mono">
            Discover the latest trends and insights in the world of design and
            technology.
          </p>
        </div>
        <div className="relative grid grid-cols-1 gap-px bg-border md:grid-cols-2 lg:grid-cols-4">
          <FullWidthDivider position="top" />
          {posts.map((post) => (
            <BlogCard
              key={post.info.path}
              title={post.title}
              date={formatDate(post.date)}
              description={post.description}
              category={post.category}
              author={post.author}
              href={`/blog/${getSlug(post)}`}
            />
          ))}
          <FullWidthDivider position="bottom" />
        </div>
      </div>
      <CallToAction />
      <Footer />
    </>
  );
}

function BlogCard({
  title,
  date,
  description,
  category,
  author,
  href,
  className,
}: {
  title: string;
  date: string;
  description: string;
  category: string;
  author: string;
  href: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group w-full bg-background px-6 py-12 text-muted-foreground hover:cursor-pointer hover:text-foreground active:bg-accent md:px-8 active:dark:bg-accent/50",
        className,
      )}
    >
      <h3 className="mb-3 line-clamp-2 font-medium text-foreground text-lg md:text-xl">
        {title}
      </h3>
      <div className="mb-3 flex items-center gap-2">
        <span className="text-muted-foreground text-xs group-hover:text-foreground">
          {category}
        </span>
        <div className="inline-flex size-1 rounded-full bg-muted-foreground" />
        <span className="text-muted-foreground text-xs group-hover:text-foreground">
          {date}
        </span>
      </div>
      <p className="mb-8 line-clamp-3 text-muted-foreground text-sm tracking-wide group-hover:text-foreground font-mono">
        {description}
      </p>
      <div className="flex items-center gap-1.5">
        by
        <span className="font-medium font-mono text-foreground/80 text-xs group-hover:text-foreground md:text-sm">
          {author}
        </span>
      </div>
    </Link>
  );
}
