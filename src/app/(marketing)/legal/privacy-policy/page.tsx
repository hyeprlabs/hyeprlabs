import type { Metadata } from "next";
import { MarketingHero } from "@/components/marketing/marketing-hero";
import { FullWidthDivider } from "@/components/ui/full-width-divider";
import { LegalDisclaimer } from "@/components/legal/legal-disclaimer";
import { CallToAction } from "@/components/marketing/cta";
import { Footer } from "@/components/marketing/footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How we handle, protect, and process your personal data.",
  keywords: ["Privacy Policy", "Data Protection", "GDPR", "User Privacy", "Hyepr Labs Privacy"],
  openGraph: {
    title: "Privacy Policy | Hyepr Labs | Think Fast. Build Fast.",
    description: "How we handle, protect, and process your personal data.",
    url: "https://hyeprlabs.com/legal/privacy-policy",
  }
};

export default function Page() {
  return (
    <>
      <MarketingHero
        badge="PRIVACY"
        title="Privacy Policy"
        description="Your privacy is important to us. Learn how we collect, use, and protect your data."
      />
      <Article />
      <CallToAction />
      <Footer />
    </>
  );
}

function Article() {
  return (
    <div className="relative border-b border-border">
      <FullWidthDivider position="top" />
      <article className="mx-auto max-w-2xl px-4 py-16 md:py-24 text-sm sm:text-base font-mono text-muted-foreground pb-24 text-left">
        <LegalDisclaimer />
        <section>
          <h2 className="text-sm sm:text-base font-semibold text-foreground font-sans uppercase tracking-widest">
            1. An Overview of Data Protection
          </h2>

          <h3 className="text-sm font-medium text-foreground font-sans uppercase tracking-wider mt-0">
            General Information
          </h3>
          <p className="leading-relaxed mb-6">
            The following information provides a simple overview of what happens
            to your personal data when you visit this website. Personal data is
            any data with which you could be personally identified. Detailed
            information on the subject of data protection can be found in our
            privacy policy found below.
          </p>

          <h3 className="text-sm font-medium text-foreground font-sans uppercase tracking-wider mt-0">
            Data Collection on this Website
          </h3>
          <p className="leading-relaxed mb-6">
            <strong>
              Who is responsible for the data collection on this website?
            </strong>
            <br />
            The data processing on this website is carried out by the website
            operator. Their contact details can be found in the section
            "Information about the responsible party" in this privacy policy.
          </p>
          <p className="leading-relaxed mb-6">
            <strong>How do we collect your data?</strong>
            <br />
            Some data are collected when you provide it to us. This could, for
            example, be data you enter into a contact form. Other data are
            collected automatically by our IT systems when you visit the
            website. These data are primarily technical data (e.g. the browser
            and operating system you are using or when you accessed the page).
          </p>
        </section>

        <section>
          <h2 className="text-sm sm:text-base font-semibold text-foreground font-sans uppercase tracking-widest">
            2. General Information and Mandatory Information
          </h2>

          <h3 className="text-sm font-medium text-foreground font-sans uppercase tracking-wider mt-0">
            Data Protection
          </h3>
          <p className="leading-relaxed mb-6">
            The operators of this website take the protection of your personal
            data very seriously. We treat your personal data as confidential and
            in accordance with the statutory data protection regulations and
            this privacy policy. When you use this website, various personal
            data are collected. Personal data is data with which you can be
            personally identified.
          </p>

          <h3 className="text-sm font-medium text-foreground font-sans uppercase tracking-wider mt-0">
            Information about the responsible party
          </h3>
          <address
            className="leading-relaxed mb-6 not-italic"
            suppressHydrationWarning
          >
            The responsible party for data processing on this website is:
            <br />
            <br />
            <strong>Oskar Seeberger</strong>
            <br />
            Musterstraße 123
            <br />
            10115 Berlin
            <br />
            Phone:{" "}
            <a
              href="tel:+493012345678"
              className="hover:underline text-foreground transition-colors"
            >
              +49 (0) 30 12345678
            </a>
            <br />
            Email:{" "}
            <a
              href="mailto:o.seeberger@hyeprlabs.com"
              className="hover:underline text-foreground transition-colors"
            >
              o.seeberger@hyeprlabs.com
            </a>
          </address>

          <h3 className="text-sm font-medium text-foreground font-sans uppercase tracking-wider mt-0">
            Revocation of your consent to data processing
          </h3>
          <p className="leading-relaxed mb-6">
            Many data processing operations are only possible with your express
            consent. You can revoke this consent at any time. The legality of
            the data processing carried out before the revocation remains
            unaffected by the revocation.
          </p>

          <h3 className="text-sm font-medium text-foreground font-sans uppercase tracking-wider mt-0">
            Right to lodge a complaint with the competent supervisory authority
          </h3>
          <p className="leading-relaxed mb-6">
            In the event of violations of the GDPR, data subjects are entitled
            to log a complaint with a supervisory authority, in particular in
            the member state of their habitual residence, their place of work or
            the place of the alleged violation.
          </p>
        </section>

        <section>
          <h2 className="text-sm sm:text-base font-semibold text-foreground font-sans uppercase tracking-widest">
            3. Data Collection on this Website
          </h2>

          <h3 className="text-sm font-medium text-foreground font-sans uppercase tracking-wider mt-0">
            Cookies
          </h3>
          <p className="leading-relaxed mb-6">
            Our websites and pages use what the industry refers to as "cookies."
            Cookies are small text files that do not cause any damage to your
            device. They are either stored temporarily for the duration of a
            session (session cookies) or permanently (permanent cookies) on your
            device. Session cookies are automatically deleted after your visit.
          </p>

          <h3 className="text-sm font-medium text-foreground font-sans uppercase tracking-wider mt-0">
            Server Log Files
          </h3>
          <p className="leading-relaxed mb-6">
            The provider of the pages automatically collects and stores
            information in so-called server log files, which your browser
            automatically transmits to us. These are: browser type and browser
            version, operating system used, referrer URL, host name of the
            accessing computer, time of the server request, and IP address.
            These data are not merged with other data sources.
          </p>

          <h3 className="text-sm font-medium text-foreground font-sans uppercase tracking-wider mt-0">
            Contact Form / Email Contact
          </h3>
          <p className="leading-relaxed mb-6">
            If you send us inquiries via the contact form or email, your details
            from the inquiry form, including the contact details you provided
            there, will be stored by us for the purpose of processing the
            inquiry and in the event of follow-up questions. We do not pass on
            this data without your consent. The processing of this data is based
            on Art. 6 (1) lit. b GDPR.
          </p>
        </section>

        <section>
          <h2 className="text-sm sm:text-base font-semibold text-foreground font-sans uppercase tracking-widest">
            4. SSL/TLS Encryption
          </h2>
          <p className="leading-relaxed mb-6">
            This site uses SSL or TLS encryption for security reasons and for
            the protection of the transmission of confidential content, such as
            the inquiries you send to us as the site operator. You can recognize
            an encrypted connection in your browser's address line when it
            changes from "http://" to "https://" and the lock icon is displayed
            in your browser's address bar. If SSL or TLS encryption is
            activated, the data you transfer to us cannot be read by third
            parties.
          </p>
        </section>
      </article>
    </div>
  );
}
