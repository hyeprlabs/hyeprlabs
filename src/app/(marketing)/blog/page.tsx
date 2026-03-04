import type { Metadata } from "next";
import { MarketingHero } from "@/components/marketing/marketing-hero";
import { BlogSection } from "@/components/marketing/blog/blog-section";
import { CallToAction } from "@/components/marketing/cta";
import { Footer } from "@/components/marketing/footer";

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

export default function Page() {
  return (
    <>
      <MarketingHero
        badge="BLOG"
        title="Insights & News"
        description="Thoughts on design, development, and building digital products for the modern web."
      />
      <BlogSection />
      <CallToAction />
      <Footer />
    </>
  );
}
