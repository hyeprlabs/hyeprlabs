import type { Metadata } from "next";
import { MarketingHero } from "@/components/marketing/marketing-hero";
import { TeamList } from "@/components/team/team-list";
import { CallToAction } from "@/components/marketing/cta";
import { Footer } from "@/components/marketing/footer";

export const metadata: Metadata = {
  title: "Team",
  description:
    "The talented individuals behind our success. Dedicated, creative, and passionate about what we do.",
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
