import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { blogCollection, getSlug } from "@/lib/source";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Footer } from "@/components/marketing/footer";
import { FullWidthDivider } from "@/components/ui/full-width-divider";

type Params = { slug: string };

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export async function generateStaticParams(): Promise<Params[]> {
  return blogCollection.map((post) => ({ slug: getSlug(post) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = blogCollection.find((p) => getSlug(p) === slug);

  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    keywords: [post.category, "Hyepr Labs", "Next.js", "Web Development"],
    openGraph: {
      title: `${post.title} | Hyepr Labs`,
      description: post.description,
      url: `https://hyeprlabs.com/blog/${slug}`,
      type: "article",
      publishedTime: new Date(post.date).toISOString(),
      authors: [post.author],
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | Hyepr Labs`,
      description: post.description,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = blogCollection.find((p) => getSlug(p) === slug);

  if (!post) notFound();

  const { body: MDXContent } = post;

  return (
    <>
      <article className="relative mx-auto w-full max-w-5xl">
        {/* Article header */}
        <header className="px-6 py-12 md:px-8 md:py-16">
          <FullWidthDivider position="top" />
          <div className="mb-6">
            <Button asChild variant="ghost" size="sm" className="font-mono -ml-2 text-muted-foreground">
              <Link href="/blog">
                <ArrowLeft className="mr-1 size-3.5" />
                Back to Blog
              </Link>
            </Button>
          </div>
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <Badge variant="outline" className="font-mono bg-linear-to-br from-muted to-background">
              {post.category}
            </Badge>
            <span className="text-muted-foreground text-xs font-mono">
              {formatDate(post.date)}
            </span>
          </div>
          <h1 className="mb-4 text-balance text-3xl font-serif md:text-4xl lg:text-5xl">
            {post.title}
          </h1>
          <p className="mb-6 max-w-2xl text-muted-foreground font-mono text-sm md:text-base tracking-wide">
            {post.description}
          </p>
          <footer className="flex items-center gap-1.5 text-sm text-muted-foreground font-mono">
            <span>by</span>
            <span className="font-medium text-foreground/80">{post.author}</span>
          </footer>
        </header>

        {/* Article body */}
        <FullWidthDivider />
        <section className="prose prose-neutral dark:prose-invert max-w-none px-6 py-10 md:px-8 md:py-14
          prose-headings:font-serif prose-headings:tracking-tight
          prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
          prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
          prose-p:font-mono prose-p:text-sm prose-p:leading-relaxed prose-p:text-foreground/80
          prose-li:font-mono prose-li:text-sm prose-li:text-foreground/80
          prose-strong:text-foreground prose-strong:font-semibold
          prose-blockquote:border-l-border prose-blockquote:font-mono prose-blockquote:text-muted-foreground
          prose-code:font-mono prose-code:text-sm prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
          prose-pre:bg-muted prose-pre:border prose-pre:border-border prose-pre:rounded-lg
          prose-a:text-foreground prose-a:underline prose-a:underline-offset-4 hover:prose-a:text-muted-foreground
          prose-table:font-mono prose-table:text-sm
          prose-th:border prose-th:border-border prose-th:px-4 prose-th:py-2 prose-th:bg-muted
          prose-td:border prose-td:border-border prose-td:px-4 prose-td:py-2
          prose-hr:border-border">
          <MDXContent />
        </section>
        <FullWidthDivider />

        {/* Back link */}
        <nav aria-label="Post navigation" className="px-6 py-8 md:px-8">
          <Button asChild variant="outline" size="sm" className="font-mono">
            <Link href="/blog">
              <ArrowLeft className="mr-1 size-3.5" />
              All Posts
            </Link>
          </Button>
        </nav>
      </article>
      <Footer />
    </>
  );
}
