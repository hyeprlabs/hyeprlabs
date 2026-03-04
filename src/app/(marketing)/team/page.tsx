import type { Metadata } from "next";
import { MarketingHero } from "@/components/marketing/marketing-hero";
import { TeamList } from "@/components/team/team-list";
import { CallToAction } from "@/components/marketing/cta";
import { Footer } from "@/components/marketing/footer";

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

export default function Page() {
  return (
    <>
      <MarketingHero
        badge="TEAM"
        title="Meet Our Team"
        description="The talented individuals behind our success. Dedicated, creative, and passionate about what we do."
      />
      <TeamList />
      <CallToAction />
      <Footer />
    </>
  );
}
