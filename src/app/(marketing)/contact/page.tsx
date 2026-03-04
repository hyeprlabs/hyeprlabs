import type { Metadata } from "next";
import { MarketingHero } from "@/components/marketing/marketing-hero";
import { ContactSection } from "@/components/contact/contact-section";
import { CallToAction } from "@/components/marketing/cta";
import { Footer } from "@/components/marketing/footer";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Have a project in mind or want to say hello? We'd love to hear from you.",
};

export default function Page() {
  return (
    <>
      <MarketingHero
        badge="CONTACT"
        title="Get in Touch"
        description="Have a project in mind or want to say hello? We'd love to hear from you."
      />
      <ContactSection />
      <CallToAction />
      <Footer />
    </>
  );
}
