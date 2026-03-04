import type { Metadata } from "next";
import { MarketingHero } from "@/components/marketing/marketing-hero";
import { ProjectsList } from "@/components/projects/projects-list";
import { CallToAction } from "@/components/marketing/cta";
import { Footer } from "@/components/marketing/footer";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "A selection of projects that showcase our expertise in design, development, and strategic execution.",
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
