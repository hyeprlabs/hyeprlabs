import type { Metadata } from "next";
import { MarketingHero } from "@/components/marketing/marketing-hero";
import { ContactSection } from "@/components/contact/contact-section";
import { CallToAction } from "@/components/marketing/cta";
import { Footer } from "@/components/marketing/footer";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Have a project in mind or want to say hello? We'd love to hear from you.",
  keywords: ["Contact Hyepr Labs", "Hire a Web Agency", "Consulting", "Next.js Developers", "App Development Services"],
  openGraph: {
    title: "Contact | Hyepr Labs | Think Fast. Build Fast.",
    description: "Have a project in mind or want to say hello? We'd love to hear from you.",
    url: "https://hyeprlabs.com/contact",
  }
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
