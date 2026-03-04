import type { Metadata } from "next";
import { MarketingHero } from "@/components/marketing/marketing-hero";
import { AboutItems } from "@/components/about/about-items";
import { CallToAction } from "@/components/marketing/cta";
import { Footer } from "@/components/marketing/footer";

export const metadata: Metadata = {
  title: "About",
  description:
    "Accelerating growth for ambitious brands through data-driven design, scalable engineering, and strategic innovation.",
  keywords: ["About Hyepr Labs", "Top Digital Agency", "Next.js Experts", "UI/UX Designers", "Software Engineers"],
  openGraph: {
    title: "About | Hyepr Labs | Think Fast. Build Fast.",
    description: "Accelerating growth for ambitious brands through data-driven design, scalable engineering, and strategic innovation.",
    url: "https://hyeprlabs.com/about",
  }
};

export default function Page() {
  return (
    <>
      <MarketingHero
        badge="ABOUT"
        title="Who are we?"
        description="Accelerating growth for ambitious brands through data-driven design, scalable engineering, and strategic innovation."
      />
      <AboutItems />
      <Article />
      <CallToAction />
      <Footer />
    </>
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
          At <span className="text-foreground">Hyepr Labs</span>, we bridge the
          gap between creative vision and technical reality. As a premier{" "}
          <span className="text-foreground">digital product agency</span>, our
          mission is to engineer solutions that drive meaningful growth.
        </p>
      </header>

      <div className="space-y-8 text-left">
        <p className="leading-relaxed">
          We are a collective of{" "}
          <span className="text-foreground">
            elite designers and systems engineers
          </span>{" "}
          dedicated to refining the web. We don&apos;t just build websites; we
          architect comprehensive{" "}
          <span className="text-foreground">digital ecosystems</span> that
          empower modern businesses to scale securely.
        </p>

        <p className="leading-relaxed">
          Collaboration is the heartbeat of our process. We function as an
          extension of your team, ensuring transparency at every stage. We
          deliver solutions that are{" "}
          <span className="text-foreground">
            scalable, secure, and tailored
          </span>{" "}
          to your specific market needs.
        </p>

        <p className="leading-relaxed">
          Innovation is our baseline. We rigorously test and adopt emerging
          technologies to ensure our clients receive{" "}
          <span className="text-foreground">future-proof strategies</span>. From
          edge computing to reactive UIs, we keep you ahead of the curve.
        </p>

        <p className="leading-relaxed">
          We listen, we care, and we deliver. Measuring success by your growth,
          we build enduring partnerships rooted in{" "}
          <span className="text-foreground">trust and integrity</span>.
        </p>
      </div>
    </article>
  );
}
