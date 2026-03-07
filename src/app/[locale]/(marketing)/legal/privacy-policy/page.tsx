import type { Metadata } from "next";
import { MarketingHero } from "@/components/marketing/marketing-hero";
import { FullWidthDivider } from "@/components/ui/full-width-divider";
import { LegalDisclaimer } from "@/components/marketing/legal/legal-disclaimer";
import { CallToAction } from "@/components/marketing/cta";
import { Footer } from "@/components/marketing/footer";
import { getTranslations } from "next-intl/server";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How we handle, protect, and process your personal data.",
  keywords: ["Privacy Policy", "Data Protection", "GDPR", "User Privacy", "Hyepr Labs Privacy"],
  openGraph: {
    title: "Privacy Policy | Hyepr Labs | Think Fast. Build Fast.",
    description: "How we handle, protect, and process your personal data.",
    url: "https://hyeprlabs.com/legal/privacy-policy",
    images: [
      {
        url: "/og?title=Privacy+Policy&description=How+we+handle%2C+protect%2C+and+process+your+personal+data.&type=Legal",
        width: 1200,
        height: 630,
        alt: "Privacy Policy | Hyepr Labs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | Hyepr Labs | Think Fast. Build Fast.",
    description: "How we handle, protect, and process your personal data.",
    creator: "@hyeprlabs",
    images: [
      "/og?title=Privacy+Policy&description=How+we+handle%2C+protect%2C+and+process+your+personal+data.&type=Legal",
    ],
  },
};

export default async function Page() {
  const t = await getTranslations("PrivacyPage");

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
  const t = await getTranslations("PrivacyPage");

  return (
    <div className="relative border-b border-border">
      <FullWidthDivider position="top" />
      <article className="mx-auto max-w-2xl px-4 py-16 md:py-24 text-sm sm:text-base font-mono text-muted-foreground pb-24 text-left">
        <LegalDisclaimer />
        <section>
          <h2 className="text-sm sm:text-base font-semibold text-foreground font-sans uppercase tracking-widest">
            {t("section1")}
          </h2>

          <h3 className="text-sm font-medium text-foreground font-sans uppercase tracking-wider mt-0">
            {t("section1sub1")}
          </h3>
          <p className="leading-relaxed mb-6">
            {t("section1sub1Text")}
          </p>

          <h3 className="text-sm font-medium text-foreground font-sans uppercase tracking-wider mt-0">
            {t("section1sub2")}
          </h3>
          <p className="leading-relaxed mb-6">
            <strong>{t("section1sub2q1")}</strong>
            <br />
            {t("section1sub2p1")}
          </p>
          <p className="leading-relaxed mb-6">
            <strong>{t("section1sub2q2")}</strong>
            <br />
            {t("section1sub2p2")}
          </p>
        </section>

        <section>
          <h2 className="text-sm sm:text-base font-semibold text-foreground font-sans uppercase tracking-widest">
            {t("section2")}
          </h2>

          <h3 className="text-sm font-medium text-foreground font-sans uppercase tracking-wider mt-0">
            {t("section2sub1")}
          </h3>
          <p className="leading-relaxed mb-6">
            {t("section2sub1Text")}
          </p>

          <h3 className="text-sm font-medium text-foreground font-sans uppercase tracking-wider mt-0">
            {t("section2sub2")}
          </h3>
          <address
            className="leading-relaxed mb-6 not-italic"
            suppressHydrationWarning
          >
            {t("section2sub2Intro")}
            <br />
            <br />
            <strong>[Company Name]</strong>
            <br />
            [Company Address]
            <br />
            [City, Zip]
            <br />
            {t("contactPhone")}{" "}
            <a
              href="tel:+1234567890"
              className="hover:underline text-foreground transition-colors"
            >
              [Phone Number]
            </a>
            <br />
            {t("contactEmail")}{" "}
            <a
              href="mailto:contact@hyeprlabs.com"
              className="hover:underline text-foreground transition-colors"
            >
              contact@hyeprlabs.com
            </a>
          </address>

          <h3 className="text-sm font-medium text-foreground font-sans uppercase tracking-wider mt-0">
            {t("section2sub3")}
          </h3>
          <p className="leading-relaxed mb-6">
            {t("section2sub3Text")}
          </p>

          <h3 className="text-sm font-medium text-foreground font-sans uppercase tracking-wider mt-0">
            {t("section2sub4")}
          </h3>
          <p className="leading-relaxed mb-6">
            {t("section2sub4Text")}
          </p>
        </section>

        <section>
          <h2 className="text-sm sm:text-base font-semibold text-foreground font-sans uppercase tracking-widest">
            {t("section3")}
          </h2>

          <h3 className="text-sm font-medium text-foreground font-sans uppercase tracking-wider mt-0">
            {t("section3sub1")}
          </h3>
          <p className="leading-relaxed mb-6">
            {t("section3sub1Text")}
          </p>

          <h3 className="text-sm font-medium text-foreground font-sans uppercase tracking-wider mt-0">
            {t("section3sub2")}
          </h3>
          <p className="leading-relaxed mb-6">
            {t("section3sub2Text")}
          </p>

          <h3 className="text-sm font-medium text-foreground font-sans uppercase tracking-wider mt-0">
            {t("section3sub3")}
          </h3>
          <p className="leading-relaxed mb-6">
            {t("section3sub3Text")}
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
      </article>
    </div>
  );
}
