import type { Metadata } from "next";
import { MarketingHero } from "@/components/marketing/marketing-hero";
import { ChangelogSection } from "@/components/marketing/changelog/changelog-section";
import { CallToAction } from "@/components/marketing/cta";
import { Footer } from "@/components/marketing/footer";
import { getTranslations } from "next-intl/server";

export const metadata: Metadata = {
  title: "Changelog",
  description:
    "New features, improvements, and bug fixes for our complete suite of products.",
  keywords: ["Changelog", "Product Updates", "Release Notes", "New Features", "Hyepr Labs Updates"],
  openGraph: {
    title: "Changelog | Hyepr Labs | Think Fast. Build Fast.",
    description: "New features, improvements, and bug fixes for our complete suite of products.",
    url: "https://hyeprlabs.com/changelog",
  }
};

export default async function Page() {
  const t = await getTranslations("ChangelogPage");

  return (
    <>
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
