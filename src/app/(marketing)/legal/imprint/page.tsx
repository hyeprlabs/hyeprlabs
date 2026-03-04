import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import { Header } from "@/components/marketing/header";
import { MarketingHero } from "@/components/marketing/marketing-hero";
import { FullWidthDivider } from "@/components/ui/full-width-divider";
import { CallToAction } from "@/components/marketing/cta";
import { Footer } from "@/components/marketing/footer";

export const metadata: Metadata = {
  title: "Imprint",
  description: "Legal information and imprint for Hyepr Labs.",
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
          badge="IMPRINT"
          title="Legal Notice"
          description="Mandatory legal information and statutory disclosures for our business operations."
        />
        <Article />
        <CallToAction />
        <Footer />
      </main>
    </div>
  );
}

function Article() {
  return (
    <div className="relative border-b border-border">
      <FullWidthDivider position="top" />
      <article className="mx-auto max-w-2xl px-4 py-16 md:py-24 text-sm sm:text-base font-mono text-muted-foreground pb-24 text-left">
        <section>
          <h2 className="text-sm sm:text-base font-semibold text-foreground font-sans uppercase tracking-widest">
            Information pursuant to § 5 TMG
          </h2>
          <address className="leading-relaxed mb-6 not-italic">
            <strong>Oskar Seeberger</strong>
            <br />
            Am Einlass 4<br />
            80469 Munich
            <br />
            Germany
          </address>
        </section>

        <section>
          <h2 className="text-sm sm:text-base font-semibold text-foreground font-sans uppercase tracking-widest">
            Contact
          </h2>
          <address
            className="leading-relaxed mb-6 not-italic"
            suppressHydrationWarning
          >
            Phone:{" "}
            <a
              href="#"
              className="hover:underline text-foreground transition-colors"
            >
              Coming Soon.
            </a>
            <br />
            Email:{" "}
            <a
              href="mailto:o.seeberger@hyeprlabs.com"
              className="hover:underline text-foreground transition-colors"
            >
              o.seeberger@hyeprlabs.com
            </a>
            <br />
            Website:{" "}
            <a
              href="https://hyeprlabs.com"
              className="hover:underline text-foreground transition-colors"
              target="_blank"
              rel="noreferrer"
            >
              hyeprlabs.com
            </a>
          </address>
        </section>

        <section>
          <h2 className="text-sm sm:text-base font-semibold text-foreground font-sans uppercase tracking-widest">
            VAT ID
          </h2>
          <p className="leading-relaxed mb-6">
            Value added tax identification number pursuant to § 27 a
            Umsatzsteuergesetz:
            <br />
            DE 123456789
          </p>
        </section>

        <section>
          <h2 className="text-sm sm:text-base font-semibold text-foreground font-sans uppercase tracking-widest">
            Responsible for Content acc. to § 18 para. 2 MStV
          </h2>
          <address className="leading-relaxed mb-6 not-italic">
            Oskar Seeberger
            <br />
            Am Einlass 4<br />
            80469 Munich
          </address>
        </section>

        <section>
          <h2 className="text-sm sm:text-base font-semibold text-foreground font-sans uppercase tracking-widest">
            EU Dispute Resolution
          </h2>
          <p className="leading-relaxed mb-6">
            The European Commission provides a platform for online dispute
            resolution (OS):{" "}
            <a
              href="https://ec.europa.eu/consumers/odr/"
              className="hover:underline text-foreground transition-colors"
              target="_blank"
              rel="noreferrer"
            >
              https://ec.europa.eu/consumers/odr/
            </a>
            .<br />
            You can find our email address in the imprint above.
          </p>
        </section>

        <section>
          <h2 className="text-sm sm:text-base font-semibold text-foreground font-sans uppercase tracking-widest">
            Consumer Dispute Resolution
          </h2>
          <p className="leading-relaxed mb-6">
            We are not willing or obliged to participate in dispute resolution
            proceedings before a consumer arbitration board.
          </p>
        </section>

        <section>
          <h2 className="text-sm sm:text-base font-semibold text-foreground font-sans uppercase tracking-widest">
            Liability for Contents
          </h2>
          <p className="leading-relaxed mb-6">
            As service providers, we are liable for our own content on these
            websites according to Section 7, Paragraph 1 of the German Telemedia
            Act (TMG). However, according to Sections 8 to 10 of the TMG,
            service providers are not obligated to permanently monitor submitted
            or stored information or to search for evidences that indicate
            illegal activities. Legal obligations to removing information or to
            blocking the use of information remain unchallenged. In this case,
            liability is only possible at the time of knowledge about a specific
            violation of law. Illegal contents will be removed immediately at
            the time we get knowledge of them.
          </p>
        </section>

        <section>
          <h2 className="text-sm sm:text-base font-semibold text-foreground font-sans uppercase tracking-widest">
            Copyright
          </h2>
          <p className="leading-relaxed mb-6">
            Contents and compilations published on these websites by the
            providers are subject to German copyright laws. Reproduction,
            editing, distribution as well as the use of any kind outside the
            scope of the copyright law require a written permission of the
            author or originator. Downloads and copies of these websites are
            permitted for private use only. The commercial use of our contents
            without permission of the originator is prohibited. Copyright laws
            of third parties are respected as long as the contents on these
            websites do not originate from the provider. Contributions of third
            parties on this site are indicated as such. However, if you notice
            any violations of copyright law, please inform us. Such contents
            will be removed immediately.
          </p>
        </section>
      </article>
    </div>
  );
}
