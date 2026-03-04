import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import { Header } from "@/components/header";
import { ChangelogHero } from "@/components/changelog/changelog-hero";
import { ChangelogSection } from "@/components/changelog/changelog-section";
import { CallToAction } from "@/components/cta";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Changelog",
  description: "New features, improvements, and bug fixes for our complete suite of products.",
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
        <ChangelogHero />
        <ChangelogSection />
        <CallToAction />
        <Footer />
      </main>
    </div>
  );
}
