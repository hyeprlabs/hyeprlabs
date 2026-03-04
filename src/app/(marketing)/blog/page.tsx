import type { Metadata } from "next";
import { MarketingHero } from "@/components/marketing/marketing-hero";
import { BlogSection } from "@/components/blog/blog-section";
import { CallToAction } from "@/components/marketing/cta";
import { Footer } from "@/components/marketing/footer";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Thoughts on design, development, and building digital products for the modern web.",
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
