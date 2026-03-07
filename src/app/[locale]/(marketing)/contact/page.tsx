import type { Metadata } from "next";
import { MarketingHero } from "@/components/marketing/marketing-hero";
import { ContactSection } from "@/components/marketing/contact/contact-section";
import { CallToAction } from "@/components/marketing/cta";
import { Footer } from "@/components/marketing/footer";
import { getTranslations } from "next-intl/server";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Have a project in mind or want to say hello? We'd love to hear from you.",
  keywords: ["Contact Hyepr Labs", "Hire a Web Agency", "Consulting", "Next.js Developers", "App Development Services"],
  openGraph: {
    title: "Contact | Hyepr Labs | Think Fast. Build Fast.",
    description: "Have a project in mind or want to say hello? We'd love to hear from you.",
    url: "https://hyeprlabs.com/contact",
    images: [
      {
        url: "/og?title=Contact&description=Have+a+project+in+mind%3F+We%27d+love+to+hear+from+you.&type=Contact",
        width: 1200,
        height: 630,
        alt: "Contact | Hyepr Labs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact | Hyepr Labs | Think Fast. Build Fast.",
    description: "Have a project in mind or want to say hello? We'd love to hear from you.",
    creator: "@hyeprlabs",
    images: [
      "/og?title=Contact&description=Have+a+project+in+mind%3F+We%27d+love+to+hear+from+you.&type=Contact",
    ],
  },
};

export default async function Page() {
  const t = await getTranslations("ContactPage");

  return (
    <>
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
