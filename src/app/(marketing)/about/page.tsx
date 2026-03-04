import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import { Header } from "@/components/header";
import { MarketingHero } from "@/components/marketing-hero";
import { AboutItems } from "@/components/about/about-items";
import { CallToAction } from "@/components/cta";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "About",
  description: "Accelerating growth for ambitious brands through data-driven design, scalable engineering, and strategic innovation.",
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
          badge="ABOUT"
          title="Who are we?"
          description="Accelerating growth for ambitious brands through data-driven design, scalable engineering, and strategic innovation."
        />
        <AboutItems />
        <Article />
        <CallToAction />
        <Footer />
      </main>
    </div>
  );
}

function Article() {
  return (
    <article className="mx-auto max-w-2xl px-4 py-12 text-sm tracking-wider sm:text-lg font-mono text-muted-foreground">
      <header className="mb-10 text-center">
        <h2 className="text-xl sm:text-2xl font-medium text-foreground mb-4">
          Forging Digital Excellence
        </h2>
        <p className="leading-relaxed">
          At <span className="text-foreground">Hyepr Labs</span>, we bridge the gap between creative vision and technical reality. As a premier <span className="text-foreground">digital product agency</span>, our mission is to engineer solutions that drive meaningful growth.
        </p>
      </header>
      
      <div className="space-y-8 text-left">
        <p className="leading-relaxed">
          We are a collective of <span className="text-foreground">elite designers and systems engineers</span> dedicated to refining the web. We don&apos;t just build websites; we architect comprehensive <span className="text-foreground">digital ecosystems</span> that empower modern businesses to scale securely.
        </p>

        <p className="leading-relaxed">
          Collaboration is the heartbeat of our process. We function as an extension of your team, ensuring transparency at every stage. We deliver solutions that are <span className="text-foreground">scalable, secure, and tailored</span> to your specific market needs.
        </p>

        <p className="leading-relaxed">
          Innovation is our baseline. We rigorously test and adopt emerging technologies to ensure our clients receive <span className="text-foreground">future-proof strategies</span>. From edge computing to reactive UIs, we keep you ahead of the curve.
        </p>

        <p className="leading-relaxed">
          We listen, we care, and we deliver. Measuring success by your growth, we build enduring partnerships rooted in <span className="text-foreground">trust and integrity</span>.
        </p>
      </div>
    </article>
  );
}
