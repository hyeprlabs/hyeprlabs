import type { Metadata } from "next";
import { MarketingHero } from "@/components/marketing/marketing-hero";
import { DataDisclaimer } from "@/components/marketing/data-disclaimer";
import { BlogSection } from "@/components/marketing/blog/blog-section";
import { CallToAction } from "@/components/marketing/cta";
import { Footer } from "@/components/marketing/footer";
import { getTranslations } from "next-intl/server";

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

export default async function Page() {
  const t = await getTranslations("BlogPage");

  return (
    <>
      <MarketingHero
        badge={t("badge")}
        title={t("title")}
        description={t("description")}
      />
      <DataDisclaimer description={t("disclaimer")} />
      <BlogSection />
      <CallToAction />
      <Footer />
    </>
  );
}
