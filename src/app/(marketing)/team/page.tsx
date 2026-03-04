import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import { Header } from "@/components/marketing/header";
import { MarketingHero } from "@/components/marketing/marketing-hero";
import { TeamList } from "@/components/team/team-list";
import { CallToAction } from "@/components/marketing/cta";
import { Footer } from "@/components/marketing/footer";

export const metadata: Metadata = {
  title: "Team",
  description: "The talented individuals behind our success. Dedicated, creative, and passionate about what we do.",
};

export default function Page() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden px-4 supports-[overflow:clip]:overflow-clip">
      <Header />
      <main
        className={cn(
          "relative mx-auto max-w-4xl grow",
          // X Borders
          "before:absolute before:-inset-y-14 before:-left-px before:w-px before:bg-border",
          "after:absolute after:-inset-y-14 after:-right-px after:w-px after:bg-border",
        )}
      >
        <MarketingHero
          badge="TEAM"
          title="Meet Our Team"
          description="The talented individuals behind our success. Dedicated, creative, and passionate about what we do."
        />
        <TeamList />
        <CallToAction />
        <Footer />
      </main>
    </div>
  );
}
