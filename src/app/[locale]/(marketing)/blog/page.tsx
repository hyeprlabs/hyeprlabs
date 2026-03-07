import type { Metadata } from "next";
import { MarketingHero } from "@/components/marketing/marketing-hero";
import { BlogSection } from "@/components/marketing/blog/blog-section";
import { CallToAction } from "@/components/marketing/cta";
import { Footer } from "@/components/marketing/footer";
import { getTranslations } from "next-intl/server";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Insights on design, engineering, AI, and building high-performance digital products. Expert articles from the Hyepr Labs team.",
  keywords: [
    "Web Development Blog",
    "Design Insights",
    "Engineering Articles",
    "AI News",
    "Next.js Blog",
    "UI/UX Tips",
    "Digital Product Agency",
    "Software Engineering",
    "Hyepr Labs Blog",
  ],
  alternates: {
    canonical: "https://hyeprlabs.com/blog",
  },
  openGraph: {
    type: "website",
    title: "Blog | Hyepr Labs",
    description:
      "Insights on design, engineering, AI, and building high-performance digital products. Expert articles from the Hyepr Labs team.",
    url: "https://hyeprlabs.com/blog",
    siteName: "Hyepr Labs",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Hyepr Labs",
    description:
      "Insights on design, engineering, AI, and building high-performance digital products. Expert articles from the Hyepr Labs team.",
    creator: "@hyeprlabs",
    site: "@hyeprlabs",
  },
};

export default async function Page() {
  const t = await getTranslations("BlogPage");

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Blog", href: "/blog" },
        ]}
      />
      <MarketingHero
        badge={t("badge")}
        title={t("title")}
        description={t("description")}
      />
      <BlogSection />
      <CallToAction />
      <Footer />
    </>
  );
}
