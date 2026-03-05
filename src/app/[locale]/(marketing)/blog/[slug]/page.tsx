import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { blogCollection, getSlug } from "@/lib/source";
import { formatDate } from "@/lib/utils";
import { CallToAction } from "@/components/marketing/cta";
import { Footer } from "@/components/marketing/footer";
import { FullWidthDivider } from "@/components/ui/full-width-divider";
import { Badge } from "@/components/ui/badge";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  const posts = await blogCollection;
  return posts.map((post) => ({
    slug: getSlug(post.info.path),
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const posts = await blogCollection;
  const post = posts.find((p) => getSlug(p.info.path) === slug);

  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      ...(post.image ? { images: [{ url: post.image }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      ...(post.image ? { images: [post.image] } : {}),
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const posts = await blogCollection;
  const post = posts.find((p) => getSlug(p.info.path) === slug);

  if (!post) notFound();

  const MDXContent = post.body;
  const tags = post.tags ?? [];

  return (
    <>
      <article className="relative mx-auto w-full max-w-5xl">
        <FullWidthDivider position="top" />

        {/* Post header */}
        <header className="space-y-4 px-4 py-8 md:py-12">
          <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
            <Badge variant="outline">{post.category}</Badge>
            <span aria-hidden="true">·</span>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
          </div>

          <h1 className="max-w-2xl text-3xl font-serif md:text-4xl lg:text-5xl">
            {post.title}
          </h1>

          <p className="max-w-xl text-muted-foreground text-sm font-mono tracking-wide">
            {post.description}
          </p>

          <p className="text-xs text-muted-foreground font-mono">
            by{" "}
            <span className="font-medium text-foreground/80">{post.author}</span>
          </p>

          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-1">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-mono text-muted-foreground"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </header>

        <FullWidthDivider />

        {/* MDX body */}
        <div className="prose prose-neutral dark:prose-invert max-w-none px-4 py-8 md:py-12 [&_h2]:font-serif [&_h3]:font-serif [&_blockquote]:font-mono [&_code]:font-mono [&_table]:text-sm">
          <MDXContent />
        </div>

        <FullWidthDivider position="bottom" />
      </article>

      <CallToAction />
      <Footer />
    </>
  );
}
