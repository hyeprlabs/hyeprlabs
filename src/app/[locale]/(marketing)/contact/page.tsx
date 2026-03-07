import type { Metadata } from "next";
import { MarketingHero } from "@/components/marketing/marketing-hero";
import { ContactSection } from "@/components/marketing/contact/contact-section";
import { CallToAction } from "@/components/marketing/cta";
import { Footer } from "@/components/marketing/footer";
import { getTranslations } from "next-intl/server";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Have a project in mind or want to say hello? Contact Hyepr Labs — we build high-performance web apps, AI integrations, and exceptional digital products.",
  keywords: ["Contact Hyepr Labs", "Hire a Web Agency", "Next.js Consulting", "App Development Services", "Digital Agency Contact"],
  alternates: {
    canonical: "https://hyeprlabs.com/contact",
  },
  openGraph: {
    type: "website",
    title: "Contact | Hyepr Labs | Think Fast. Build Fast.",
    description: "Have a project in mind? Contact Hyepr Labs and let's build something great together.",
    url: "https://hyeprlabs.com/contact",
    siteName: "Hyepr Labs",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact | Hyepr Labs",
    description: "Have a project in mind? Contact Hyepr Labs and let's build something great together.",
    creator: "@hyeprlabs",
    site: "@hyeprlabs",
  },
};

export default async function Page() {
  const t = await getTranslations("ContactPage");

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Contact", href: "/contact" },
        ]}
      />
      <MarketingHero
        badge={t("badge")}
        title={t("title")}
        description={t("description")}
      />
      <ContactSection />
      <CallToAction />
      <Footer />
    </>
  );
}
