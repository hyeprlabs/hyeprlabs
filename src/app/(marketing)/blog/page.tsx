import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import { Header } from "@/components/marketing/header";
import { MarketingHero } from "@/components/marketing/marketing-hero";
import { BlogSection } from "@/components/blog/blog-section";
import { CallToAction } from "@/components/marketing/cta";
import { Footer } from "@/components/marketing/footer";

export const metadata: Metadata = {
  title: "Blog",
  description: "Thoughts on design, development, and building digital products for the modern web.",
};

export default function Page() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden px-4 supports-[overflow:clip]:overflow-clip">
      <Header />
      <main
        className={cn(
          "relative mx-auto max-w-4xl grow",
          // X Borders
          "before:absolute before:-inset-y-14 before:-left-px before:w-px before:bg-border",
          "after:absolute after:-inset-y-14 after:-right-px after:w-px after:bg-border",
        )}
      >
        <MarketingHero
          badge="BLOG"
          title="Insights & News"
          description="Thoughts on design, development, and building digital products for the modern web."
        />
        <BlogSection />
        <CallToAction />
        <Footer />
      </main>
    </div>
  );
}
