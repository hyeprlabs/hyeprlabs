import type { Metadata } from "next";
import { MarketingHero } from "@/components/marketing/marketing-hero";
import { DataDisclaimer } from "@/components/marketing/data-disclaimer";
import { ProjectsList } from "@/components/marketing/projects/projects-list";
import { CallToAction } from "@/components/marketing/cta";
import { Footer } from "@/components/marketing/footer";
import { getTranslations } from "next-intl/server";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "A selection of projects that showcase our expertise in design, development, and strategic execution.",
  keywords: ["Next.js Projects", "Web App Case Studies", "Fintech Dashboards", "Headless E-Commerce", "Hyepr Labs Portfolio"],
  openGraph: {
    title: "Projects | Hyepr Labs | Think Fast. Build Fast.",
    description: "A selection of projects that showcase our expertise in design, development, and strategic execution.",
    url: "https://hyeprlabs.com/projects",
    images: [
      {
        url: "/og?title=Projects&description=A+selection+of+projects+that+showcase+our+expertise+in+design%2C+development%2C+and+strategic+execution.&type=Projects",
        width: 1200,
        height: 630,
        alt: "Projects | Hyepr Labs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects | Hyepr Labs | Think Fast. Build Fast.",
    description: "A selection of projects that showcase our expertise in design, development, and strategic execution.",
    creator: "@hyeprlabs",
    images: [
      "/og?title=Projects&description=A+selection+of+projects+that+showcase+our+expertise+in+design%2C+development%2C+and+strategic+execution.&type=Projects",
    ],
  },
};

export default async function Page() {
  const t = await getTranslations("ProjectsPage");

  return (
    <>
      <MarketingHero
        badge={t("badge")}
        title={t("title")}
        description={t("description")}
      />
      <DataDisclaimer description={t("disclaimer")} />
      <ProjectsList />
      <CallToAction />
      <Footer />
    </>
  );
}
