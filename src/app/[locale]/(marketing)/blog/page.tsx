import type { Metadata } from "next";
import { MarketingHero } from "@/components/marketing/marketing-hero";
import { BlogSection } from "@/components/marketing/blog/blog-section";
import { CallToAction } from "@/components/marketing/cta";
import { Footer } from "@/components/marketing/footer";
import { getTranslations } from "next-intl/server";

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
    images: [
      {
        url: "/og?title=Blog&description=Insights+on+design%2C+engineering%2C+AI%2C+and+building+high-performance+digital+products.&type=Blog",
        width: 1200,
        height: 630,
        alt: "Blog | Hyepr Labs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Hyepr Labs",
    description:
      "Insights on design, engineering, AI, and building high-performance digital products. Expert articles from the Hyepr Labs team.",
    creator: "@hyeprlabs",
    images: [
      "/og?title=Blog&description=Insights+on+design%2C+engineering%2C+AI%2C+and+building+high-performance+digital+products.&type=Blog",
    ],
  },
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
      <BlogSection />
      <CallToAction />
      <Footer />
    </>
  );
}
