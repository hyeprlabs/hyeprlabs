import type { Metadata } from "next";
import { MarketingHero } from "@/components/marketing/marketing-hero";
import { ChangelogSection } from "@/components/marketing/changelog/changelog-section";
import { CallToAction } from "@/components/marketing/cta";
import { Footer } from "@/components/marketing/footer";
import { getTranslations } from "next-intl/server";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title: "Changelog",
  description:
    "Track all new features, improvements, and bug fixes across Hyepr Labs products. Stay up to date with our latest releases.",
  keywords: ["Changelog", "Product Updates", "Release Notes", "New Features", "Hyepr Labs Updates"],
  alternates: {
    canonical: "https://hyeprlabs.com/changelog",
  },
  openGraph: {
    type: "website",
    title: "Changelog | Hyepr Labs | Think Fast. Build Fast.",
    description: "Track all new features, improvements, and bug fixes across Hyepr Labs products.",
    url: "https://hyeprlabs.com/changelog",
    siteName: "Hyepr Labs",
  },
  twitter: {
    card: "summary_large_image",
    title: "Changelog | Hyepr Labs",
    description: "Track all new features, improvements, and bug fixes across Hyepr Labs products.",
    creator: "@hyeprlabs",
    site: "@hyeprlabs",
  },
};

export default async function Page() {
  const t = await getTranslations("ChangelogPage");

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Changelog", href: "/changelog" },
        ]}
      />
      <MarketingHero
        badge={t("badge")}
        title={t("title")}
        description={t("description")}
      />
      <ChangelogSection />
      <CallToAction />
      <Footer />
    </>
  );
}
