import type { Metadata } from "next";
import { MarketingHero } from "@/components/marketing/marketing-hero";
import { FullWidthDivider } from "@/components/ui/full-width-divider";
import { CallToAction } from "@/components/marketing/cta";
import { Footer } from "@/components/marketing/footer";

export const metadata: Metadata = {
  title: "Brand",
  description:
    "Access our brand guidelines and download our brand kit. Coming soon.",
  keywords: ["Brand Assets", "Brand Guidelines", "Hyepr Labs Logos", "Media Kit", "Press Kit"],
  openGraph: {
    title: "Brand | Hyepr Labs | Think Fast. Build Fast.",
    description: "Access our brand guidelines and download our brand kit. Coming soon.",
    url: "https://hyeprlabs.com/brand",
  }
};

export default function Page() {
  return (
    <>
      <MarketingHero
        badge="BRAND"
        title="Brand assets"
        description="Access our brand guidelines and download our brand kit. Coming soon."
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
            We&apos;re preparing comprehensive{" "}
            <span className="text-foreground">brand guidelines</span> and a
            complete brand kit for partners and collaborators.
          </p>
        </header>

        <div className="space-y-8 text-left">
          <p className="leading-relaxed">
            Our upcoming brand page will include{" "}
            <span className="text-foreground">downloadable assets</span> such as
            logos, icons, color palettes, and typography guidelines to ensure
            consistent representation of Hyepr Labs across all platforms.
          </p>

          <p className="leading-relaxed">
            You&apos;ll find detailed guidance on{" "}
            <span className="text-foreground">logo usage</span>, spacing
            requirements, approved color combinations, and best practices for
            co-branding opportunities.
          </p>

          <p className="leading-relaxed">
            In the meantime, for any brand-related inquiries or asset requests,
            please reach out through our{" "}
            <span className="text-foreground">contact page</span> and we&apos;ll be happy to assist.
          </p>
        </div>
      </article>
    </div>
  );
}
