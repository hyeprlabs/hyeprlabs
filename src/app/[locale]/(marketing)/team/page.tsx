import type { Metadata } from "next";
import { MarketingHero } from "@/components/marketing/marketing-hero";
import { DataDisclaimer } from "@/components/marketing/data-disclaimer";
import { TeamList } from "@/components/marketing/team/team-list";
import { CallToAction } from "@/components/marketing/cta";
import { Footer } from "@/components/marketing/footer";
import { getTranslations } from "next-intl/server";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title: "Team",
  description:
    "Meet the talented designers, engineers, and strategists behind Hyepr Labs. Dedicated, creative, and passionate about building world-class digital products.",
  keywords: ["Hyepr Labs Team", "Expert Developers", "Top UI Designers", "Digital Innovators", "Next.js Engineers"],
  alternates: {
    canonical: "https://hyeprlabs.com/team",
  },
  openGraph: {
    type: "website",
    title: "Team | Hyepr Labs | Think Fast. Build Fast.",
    description: "Meet the talented designers, engineers, and strategists behind Hyepr Labs.",
    url: "https://hyeprlabs.com/team",
    siteName: "Hyepr Labs",
  },
  twitter: {
    card: "summary_large_image",
    title: "Team | Hyepr Labs",
    description: "Meet the talented designers, engineers, and strategists behind Hyepr Labs.",
    creator: "@hyeprlabs",
    site: "@hyeprlabs",
  },
};

export default async function Page() {
  const t = await getTranslations("TeamPage");

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Team", href: "/team" },
        ]}
      />
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
