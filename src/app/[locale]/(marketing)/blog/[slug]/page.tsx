import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBlogByLocale, getSlug } from "@/lib/source";
import { formatDate, cn } from "@/lib/utils";
import { getCategoryBadgeClass } from "@/lib/blog";
import { CallToAction } from "@/components/marketing/cta";
import { Footer } from "@/components/marketing/footer";
import { FullWidthDivider } from "@/components/ui/full-width-divider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AuthorInfo } from "@/components/marketing/blog/author-info";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import { ArrowLeft } from "lucide-react";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

/**
 * Generate static route parameters for every blog post in the specified locale.
 *
 * @param params - An object containing `locale`, used to load posts for that locale.
 * @returns An array of parameter objects each with a `slug` property derived from a post's path.
 */
export async function generateStaticParams({
  params,
}: {
  params: { locale: string };
}) {
  const posts = await getBlogByLocale(params.locale);
  return posts.map((post) => ({
    slug: getSlug(post.info.path),
  }));
}

/**
 * Create SEO, Open Graph, and Twitter metadata for the blog post identified by the given route params.
 *
 * @param params - An object that resolves to the route parameters containing `locale` and `slug`.
 * @returns A Metadata object for the matched post including title, description, keywords, authors, canonical/alternate URLs, `openGraph` (article data and image), and `twitter` card data; returns an empty object if no post matches the slug.
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params;
  const posts = await getBlogByLocale(locale);
  const post = posts.find((p) => getSlug(p.info.path) === slug);

  if (!post) return {};

  const postUrl = `https://hyeprlabs.com/${locale}/blog/${slug}`;
  const tags = post.tags ?? [];
  const keywords = [post.category, ...tags].filter(Boolean);

  return {
    title: post.title,
    description: post.description,
    keywords,
    authors: [{ name: post.author }],
    alternates: {
      canonical: postUrl,
      languages: {
        en: `https://hyeprlabs.com/en/blog/${slug}`,
        de: `https://hyeprlabs.com/de/blog/${slug}`,
      },
    },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url: postUrl,
      siteName: "Hyepr Labs",
      publishedTime: post.date,
      authors: [post.author],
      section: post.category,
      tags,
      images: post.image
        ? [{ url: post.image, width: 1200, height: 630 }]
        : [
            {
              url: `/og?title=${encodeURIComponent(post.title)}&description=${encodeURIComponent(post.description)}&type=${encodeURIComponent(post.category ?? "Article")}`,
              width: 1200,
              height: 630,
              alt: post.title,
            },
          ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      creator: "@hyeprlabs",
      images: post.image
        ? [post.image]
        : [
            `/og?title=${encodeURIComponent(post.title)}&description=${encodeURIComponent(post.description)}&type=${encodeURIComponent(post.category ?? "Article")}`,
          ],
    },
  };
}

/**
 * Render a localized blog post page for the given locale and slug.
 *
 * Looks up the post for the provided locale and slug, renders header (back link, category/date badge, title,
 * description, author info, tags), the MDX body, and site chrome (call to action and footer). Triggers a 404
 * response if no matching post is found.
 *
 * @param params - Object containing `slug` and `locale` used to resolve the post content.
 * @returns The React element for the complete blog post page.
 */
export default async function BlogPostPage({ params }: Props) {
  const { slug, locale } = await params;
  const posts = await getBlogByLocale(locale);
  const post = posts.find((p) => getSlug(p.info.path) === slug);

  if (!post) notFound();

  const t = await getTranslations("BlogPage");
  const MDXContent = post.body;
  const tags = post.tags ?? [];

  return (
    <>
      <article className="relative mx-auto w-full max-w-5xl">
        <FullWidthDivider position="top" />

        {/* Post header */}
        <header className="space-y-4 px-4 py-8 md:py-12">
          {/* Back button – below the full-width divider, styled like hero outline button */}
          <div>
            <Button
              variant="outline"
              size="sm"
              asChild
              className="rounded-full bg-linear-to-br from-muted to-background"
            >
              <Link href="/blog">
                <ArrowLeft />
                {t("allPosts")}
              </Link>
            </Button>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
            <Badge
              variant="outline"
              className={cn(getCategoryBadgeClass(post.category))}
            >
              {post.category}
            </Badge>
            <span aria-hidden="true">·</span>
            <time dateTime={post.date}>{formatDate(post.date, locale)}</time>
          </div>

          <h1 className="max-w-2xl text-2xl font-serif md:text-4xl lg:text-5xl">
            {post.title}
          </h1>

          <p className="max-w-xl text-muted-foreground text-sm font-mono tracking-wide">
            {post.description}
          </p>

          <AuthorInfo author={post.author} />

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
        <div className="prose prose-neutral dark:prose-invert max-w-none px-4 py-8 md:py-12 [&_h2]:font-serif [&_h3]:font-serif [&_blockquote]:font-mono [&_code]:font-mono [&_table]:text-sm [&_pre]:overflow-x-auto [&_pre]:max-w-full [&_table]:block [&_table]:w-full [&_table]:overflow-x-auto md:[&_table]:table [&_img]:max-w-full [&_img]:h-auto">
          <MDXContent />
        </div>

        <FullWidthDivider position="bottom" />
      </article>

      <CallToAction />
      <Footer />
    </>
  );
}
