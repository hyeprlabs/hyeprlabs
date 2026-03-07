import type { Metadata } from "next";
import { MarketingHero } from "@/components/marketing/marketing-hero";
import { DataDisclaimer } from "@/components/marketing/data-disclaimer";
import { TeamList } from "@/components/marketing/team/team-list";
import { CallToAction } from "@/components/marketing/cta";
import { Footer } from "@/components/marketing/footer";
import { getTranslations } from "next-intl/server";

export const metadata: Metadata = {
  title: "Team",
  description:
    "The talented individuals behind our success. Dedicated, creative, and passionate about what we do.",
  keywords: ["Hyepr Labs Team", "Expert Developers", "Top UI Designers", "Digital Innovators"],
  openGraph: {
    title: "Team | Hyepr Labs | Think Fast. Build Fast.",
    description: "The talented individuals behind our success. Dedicated, creative, and passionate about what we do.",
    url: "https://hyeprlabs.com/team",
  }
};

export default async function Page() {
  const t = await getTranslations("TeamPage");

  return (
    <>
      <MarketingHero
        badge={t("badge")}
        title={t("title")}
        description={t("description")}
      />
      <DataDisclaimer description={t("disclaimer")} />
      <TeamList />
      <CallToAction />
      <Footer />
    </>
  );
}
