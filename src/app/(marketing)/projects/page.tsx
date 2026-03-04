import type { Metadata } from "next";
import { MarketingHero } from "@/components/marketing/marketing-hero";
import { ProjectsList } from "@/components/marketing/projects/projects-list";
import { CallToAction } from "@/components/marketing/cta";
import { Footer } from "@/components/marketing/footer";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "A selection of projects that showcase our expertise in design, development, and strategic execution.",
  keywords: ["Next.js Projects", "Web App Case Studies", "Fintech Dashboards", "Headless E-Commerce", "Hyepr Labs Portfolio"],
  openGraph: {
    title: "Projects | Hyepr Labs | Think Fast. Build Fast.",
    description: "A selection of projects that showcase our expertise in design, development, and strategic execution.",
    url: "https://hyeprlabs.com/projects",
  }
};

export default function Page() {
  return (
    <>
      <MarketingHero
        badge="PROJECTS"
        title="Our Featured Work"
        description="A selection of projects that showcase our expertise in design, development, and strategic execution."
      />
      <ProjectsList />
      <CallToAction />
      <Footer />
    </>
  );
}
