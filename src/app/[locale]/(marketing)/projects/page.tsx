import type { Metadata } from "next";
import { MarketingHero } from "@/components/marketing/marketing-hero";
import { DataDisclaimer } from "@/components/marketing/data-disclaimer";
import { ProjectsList } from "@/components/marketing/projects/projects-list";
import { CallToAction } from "@/components/marketing/cta";
import { Footer } from "@/components/marketing/footer";
import { getTranslations } from "next-intl/server";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "A curated selection of projects by Hyepr Labs — showcasing expertise in Next.js, UI/UX design, AI integration, and scalable digital product development.",
  keywords: ["Next.js Projects", "Web App Case Studies", "Fintech Dashboards", "Headless E-Commerce", "Hyepr Labs Portfolio"],
  alternates: {
    canonical: "https://hyeprlabs.com/projects",
  },
  openGraph: {
    type: "website",
    title: "Projects | Hyepr Labs | Think Fast. Build Fast.",
    description: "A curated selection of projects by Hyepr Labs — showcasing expertise in Next.js, UI/UX design, and scalable product development.",
    url: "https://hyeprlabs.com/projects",
    siteName: "Hyepr Labs",
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects | Hyepr Labs",
    description: "Explore our portfolio of high-performance web applications, SaaS products, and digital experiences.",
    creator: "@hyeprlabs",
    site: "@hyeprlabs",
  },
};

export default async function Page() {
  const t = await getTranslations("ProjectsPage");

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Projects", href: "/projects" },
        ]}
      />
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
