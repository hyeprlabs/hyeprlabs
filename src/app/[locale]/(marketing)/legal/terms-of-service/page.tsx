import type { Metadata } from "next";
import { MarketingHero } from "@/components/marketing/marketing-hero";
import { FullWidthDivider } from "@/components/ui/full-width-divider";
import { LegalDisclaimer } from "@/components/marketing/legal/legal-disclaimer";
import { CallToAction } from "@/components/marketing/cta";
import { Footer } from "@/components/marketing/footer";
import { getTranslations } from "next-intl/server";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Rules and guidelines for accessing and using our platforms.",
  keywords: ["Terms of Service", "Terms of Use", "TOS", "Legal Terms", "Platform Guidelines"],
  openGraph: {
    title: "Terms of Service | Hyepr Labs | Think Fast. Build Fast.",
    description: "Rules and guidelines for accessing and using our platforms.",
    url: "https://hyeprlabs.com/legal/terms-of-service",
    images: [
      {
        url: "/og?title=Terms+of+Service&description=Rules+and+guidelines+for+accessing+and+using+our+platforms.&type=Legal",
        width: 1200,
        height: 630,
        alt: "Terms of Service | Hyepr Labs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Service | Hyepr Labs | Think Fast. Build Fast.",
    description: "Rules and guidelines for accessing and using our platforms.",
    creator: "@hyeprlabs",
    images: [
      "/og?title=Terms+of+Service&description=Rules+and+guidelines+for+accessing+and+using+our+platforms.&type=Legal",
    ],
  },
};

export default async function Page() {
  const t = await getTranslations("TermsPage");

  return (
    <>
      <MarketingHero
        badge={t("badge")}
        title={t("title")}
        description={t("description")}
      />
      <Article />
      <CallToAction />
      <Footer />
    </>
  );
}

async function Article() {
  const t = await getTranslations("TermsPage");

  return (
    <div className="relative border-b border-border">
      <FullWidthDivider position="top" />
      <article className="mx-auto max-w-2xl px-4 py-16 md:py-24 text-sm sm:text-base font-mono text-muted-foreground pb-24 text-left">
        <LegalDisclaimer />
        <section>
          <h2 className="text-sm sm:text-base font-semibold text-foreground font-sans uppercase tracking-widest">
            {t("section1")}
          </h2>
          <p className="leading-relaxed mb-6">
            {t("section1Text")}
          </p>
        </section>

        <section>
          <h2 className="text-sm sm:text-base font-semibold text-foreground font-sans uppercase tracking-widest">
            {t("section2")}
          </h2>
          <p className="leading-relaxed mb-6">
            {t("section2Text")}
          </p>
        </section>

        <section>
          <h2 className="text-sm sm:text-base font-semibold text-foreground font-sans uppercase tracking-widest">
            {t("section3")}
          </h2>
          <p className="leading-relaxed mb-6">
            {t("section3Text")}
          </p>
        </section>

        <section>
          <h2 className="text-sm sm:text-base font-semibold text-foreground font-sans uppercase tracking-widest">
            {t("section4")}
          </h2>
          <p className="leading-relaxed mb-6">
            {t("section4Text")}
          </p>
        </section>

        <section>
          <h2 className="text-sm sm:text-base font-semibold text-foreground font-sans uppercase tracking-widest">
            {t("section5")}
          </h2>
          <p className="leading-relaxed mb-6">
            {t("section5Text")}
          </p>
        </section>

        <section>
          <h2 className="text-sm sm:text-base font-semibold text-foreground font-sans uppercase tracking-widest">
            {t("section6")}
          </h2>
          <p className="leading-relaxed mb-6">
            {t("section6Text")}
          </p>
        </section>

        <section>
          <h2 className="text-sm sm:text-base font-semibold text-foreground font-sans uppercase tracking-widest">
            {t("section7")}
          </h2>
          <p className="leading-relaxed mb-6">
            {t("section7Text")}
          </p>
        </section>

        <section>
          <h2 className="text-sm sm:text-base font-semibold text-foreground font-sans uppercase tracking-widest">
            {t("section8")}
          </h2>
          <p className="leading-relaxed mb-6">
            {t("section8Text1")}
          </p>
          <p className="leading-relaxed mb-6">
            {t("section8Text2")}
          </p>
        </section>
      </article>
    </div>
  );
}
