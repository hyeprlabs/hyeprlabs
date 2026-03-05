import type { Metadata } from "next";
import { MarketingHero } from "@/components/marketing/marketing-hero";
import { DataDisclaimer } from "@/components/marketing/data-disclaimer";
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
      <DataDisclaimer description="These blog posts are just dummies for now. They're here for demonstration purposes to show what the layout will look like, but they aren't real published articles just yet. Check back later for real technical content!" />
      <BlogSection />
      <CallToAction />
      <Footer />
    </>
  );
}
