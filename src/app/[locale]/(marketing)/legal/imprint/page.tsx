import type { Metadata } from "next";
import { MarketingHero } from "@/components/marketing/marketing-hero";
import { FullWidthDivider } from "@/components/ui/full-width-divider";
import { LegalDisclaimer } from "@/components/marketing/legal/legal-disclaimer";
import { CallToAction } from "@/components/marketing/cta";
import { Footer } from "@/components/marketing/footer";
import { getTranslations } from "next-intl/server";

const data = {
  name: "Hyepr Labs",
  address: {
    street: "[Street Address]",
    zipCity: "[ZIP Code and City]",
    country: "Germany",
  },
  director: "[Managing Director(s) / Name of Authorized Representative]",
  contact: {
    email: "contact@hyeprlabs.com",
    phone: "+49 123 4567890",
    websiteUrl: "https://hyeprlabs.com",
    websiteDisplay: "hyeprlabs.com",
  },
  registration: {
    court: "[Name of the court, e.g., Amtsgericht Hamburg]",
    number: "[Registration number, e.g., HRB 123456]",
  },
  vatId: "[Your VAT ID, e.g., DE 123456789]",
  contentResponsible: {
    name: "[Name of responsible person]",
    street: "[Street Address]",
    zipCity: "[ZIP Code and City]",
  },
};

export const metadata: Metadata = {
  title: "Imprint",
  description: "Legal information and imprint for Hyepr Labs.",
  keywords: ["Imprint", "Legal Notice", "Impressum", "Business Disclosure", "Hyepr Labs Legal"],
  openGraph: {
    title: "Imprint | Hyepr Labs | Think Fast. Build Fast.",
    description: "Legal information and imprint for Hyepr Labs.",
    url: "https://hyeprlabs.com/legal/imprint",
  }
};

export default async function Page() {
  const t = await getTranslations("ImprintPage");

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
  const t = await getTranslations("ImprintPage");

  return (
    <div className="relative border-b border-border">
      <FullWidthDivider position="top" />
      <article className="mx-auto max-w-2xl px-4 py-16 md:py-24 text-sm sm:text-base font-mono text-muted-foreground pb-24 text-left">
        <LegalDisclaimer />
        <section>
          <h2 className="text-sm sm:text-base font-semibold text-foreground font-sans uppercase tracking-widest">
            {t("tmgSection")}
          </h2>
          <address className="leading-relaxed mb-6 not-italic">
            <strong>{data.name}</strong>
            <br />
            {data.address.street}
            <br />
            {data.address.zipCity}
            <br />
            {data.address.country}
          </address>
        </section>

        <section>
          <h2 className="text-sm sm:text-base font-semibold text-foreground font-sans uppercase tracking-widest">
            {t("representedBy")}
          </h2>
          <p className="leading-relaxed mb-6">{data.director}</p>
        </section>

        <section>
          <h2 className="text-sm sm:text-base font-semibold text-foreground font-sans uppercase tracking-widest">
            {t("contact")}
          </h2>
          <address
            className="leading-relaxed mb-6 not-italic"
            suppressHydrationWarning
          >
            {t("contactPhone")} {data.contact.phone}
            <br />
            {t("contactEmail")}{" "}
            <a
              href={`mailto:${data.contact.email}`}
              className="hover:underline text-foreground transition-colors"
            >
              {data.contact.email}
            </a>
            <br />
            {t("contactWebsite")}{" "}
            <a
              href={data.contact.websiteUrl}
              className="hover:underline text-foreground transition-colors"
              target="_blank"
              rel="noreferrer"
            >
              {data.contact.websiteDisplay}
            </a>
          </address>
        </section>

        <section>
          <h2 className="text-sm sm:text-base font-semibold text-foreground font-sans uppercase tracking-widest">
            {t("commercialRegister")}
          </h2>
          <p className="leading-relaxed mb-6">
            {t("registrationCourt")} {data.registration.court}
            <br />
            {t("registrationNumber")} {data.registration.number}
          </p>
        </section>

        <section>
          <h2 className="text-sm sm:text-base font-semibold text-foreground font-sans uppercase tracking-widest">
            {t("vatId")}
          </h2>
          <p className="leading-relaxed mb-6">
            {t("vatText")}
            <br />
            {data.vatId}
          </p>
        </section>

        <section>
          <h2 className="text-sm sm:text-base font-semibold text-foreground font-sans uppercase tracking-widest">
            {t("contentResponsible")}
          </h2>
          <address className="leading-relaxed mb-6 not-italic">
            {data.contentResponsible.name}
            <br />
            {data.contentResponsible.street}
            <br />
            {data.contentResponsible.zipCity}
          </address>
        </section>

        <section>
          <h2 className="text-sm sm:text-base font-semibold text-foreground font-sans uppercase tracking-widest">
            {t("euDispute")}
          </h2>
          <p className="leading-relaxed mb-6">
            {t("euDisputeText1")}{" "}
            <a
              href="https://ec.europa.eu/consumers/odr/"
              className="hover:underline text-foreground transition-colors"
              target="_blank"
              rel="noreferrer"
            >
              https://ec.europa.eu/consumers/odr/
            </a>
            .<br />
            {t("euDisputeText2")}
          </p>
        </section>

        <section>
          <h2 className="text-sm sm:text-base font-semibold text-foreground font-sans uppercase tracking-widest">
            {t("consumerDispute")}
          </h2>
          <p className="leading-relaxed mb-6">
            {t("consumerDisputeText")}
          </p>
        </section>

        <section>
          <h2 className="text-sm sm:text-base font-semibold text-foreground font-sans uppercase tracking-widest">
            {t("liabilityContents")}
          </h2>
          <p className="leading-relaxed mb-6">
            {t("liabilityContentsText")}
          </p>
        </section>

        <section>
          <h2 className="text-sm sm:text-base font-semibold text-foreground font-sans uppercase tracking-widest">
            {t("copyright")}
          </h2>
          <p className="leading-relaxed mb-6">
            {t("copyrightText")}
          </p>
        </section>
      </article>
    </div>
  );
}
