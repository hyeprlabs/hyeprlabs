import type { Metadata } from "next";
import { MarketingHero } from "@/components/marketing/marketing-hero";
import { DataDisclaimer } from "@/components/marketing/data-disclaimer";
import { ServicesSection } from "@/components/marketing/services/services-section";
import { CallToAction } from "@/components/marketing/cta";
import { Footer } from "@/components/marketing/footer";
import { getTranslations } from "next-intl/server";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore Hyepr Labs services and pricing: tailored Next.js and WordPress business websites plus monthly SEO and content growth support.",
  keywords: [
    "Next.js Agency Services",
    "WordPress Website Development",
    "SEO Subscription",
    "Content Marketing Services",
    "Hyepr Labs Services",
  ],
  openGraph: {
    title: "Services | Hyepr Labs | Think Fast. Build Fast.",
    description:
      "Explore Hyepr Labs services and pricing: tailored Next.js and WordPress business websites plus monthly SEO and content growth support.",
    url: "https://hyeprlabs.com/services",
    images: [
      {
        url: "/og?title=Services&description=Explore+Hyepr+Labs+services+and+pricing%3A+tailored+Next.js+and+WordPress+business+websites+plus+monthly+SEO+and+content+growth+support.&type=Services",
        width: 1200,
        height: 630,
        alt: "Services | Hyepr Labs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Services | Hyepr Labs | Think Fast. Build Fast.",
    description:
      "Explore Hyepr Labs services and pricing: tailored Next.js and WordPress business websites plus monthly SEO and content growth support.",
    creator: "@hyeprlabs",
    images: [
      "/og?title=Services&description=Explore+Hyepr+Labs+services+and+pricing%3A+tailored+Next.js+and+WordPress+business+websites+plus+monthly+SEO+and+content+growth+support.&type=Services",
    ],
  },
};

export default async function Page() {
  const t = await getTranslations("ServicesPage");

  return (
    <>
      <MarketingHero
        badge={t("badge")}
        title={t("title")}
        description={t("description")}
      />
      <DataDisclaimer description={t("disclaimer")} />
      <ServicesSection />
      <CallToAction />
      <Footer />
    </>
  );
}
