import type { Metadata } from "next";
import { MarketingHero } from "@/components/marketing/marketing-hero";
import { FullWidthDivider } from "@/components/ui/full-width-divider";
import { CallToAction } from "@/components/marketing/cta";
import { Footer } from "@/components/marketing/footer";

export const metadata: Metadata = {
  title: "Support",
  description:
    "Get help and support for your projects. Our dedicated support center. Coming soon.",
};

export default function Page() {
  return (
    <>
      <MarketingHero
        badge="SUPPORT"
        title="Support Center"
        description="Get help and support for your projects. Our dedicated support center. Coming soon."
      />
      <Article />
      <CallToAction />
      <Footer />
    </>
  );
}

function Article() {
  return (
    <div className="relative">
      <FullWidthDivider position="top" />
      <article className="mx-auto max-w-2xl px-4 py-12 text-sm tracking-wider sm:text-lg font-mono text-muted-foreground">
        <header className="mb-10 text-center">
          <h2 className="text-xl sm:text-2xl font-medium text-foreground mb-4">
            Coming Soon
          </h2>
          <p className="leading-relaxed">
            We&apos;re building a comprehensive{" "}
            <span className="text-foreground">support center</span> to help you
            get the most out of working with us.
          </p>
        </header>

        <div className="space-y-8 text-left">
          <p className="leading-relaxed">
            Our upcoming support hub will include{" "}
            <span className="text-foreground">detailed documentation</span>,
            step-by-step guides, and answers to frequently asked questions to
            help you navigate every aspect of our services.
          </p>

          <p className="leading-relaxed">
            Need assistance in the meantime? Reach out directly through our{" "}
            <span className="text-foreground">contact page</span> and our team
            will respond within 24 hours.
          </p>

          <p className="leading-relaxed">
            Stay tuned for updates as we continue to expand our resources and
            create a{" "}
            <span className="text-foreground">seamless support experience</span>{" "}
            for all our clients and partners.
          </p>
        </div>
      </article>
    </div>
  );
}
