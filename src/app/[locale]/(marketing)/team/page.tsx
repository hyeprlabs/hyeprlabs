import type { Metadata } from "next";
import { MarketingHero } from "@/components/marketing/marketing-hero";
import { DataDisclaimer } from "@/components/marketing/data-disclaimer";
import { TeamList } from "@/components/marketing/team/team-list";
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
      <DataDisclaimer description="These team members are just dummies for now. They're here for demonstration purposes to show what the layout will look like, but they aren't real people just yet. Check back later for the real team!" />
      <TeamList />
      <CallToAction />
      <Footer />
    </>
  );
}
