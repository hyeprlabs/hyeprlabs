import type { Metadata } from "next";
import { HeroSection } from "@/components/marketing/hero";
import { LogosSection } from "@/components/marketing/logos-section";
import { BlogCta } from "@/components/marketing/blog/blog-cta";
import { FaqSection } from "@/components/marketing/faq/faq-section";
import { CallToAction } from "@/components/marketing/cta";
import { Footer } from "@/components/marketing/footer";
import { ServiceJsonLd, BreadcrumbJsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title: "Hyepr Labs | Think Fast. Build Fast.",
  description:
    "Hyepr Labs is a premier digital product agency. We build high-performance Next.js web applications, AI integrations, and exceptional UI/UX design for ambitious brands.",
  keywords: [
    "Digital Product Agency",
    "Next.js Development Agency",
    "AI Integration Services",
    "High-Performance Web Applications",
    "UI/UX Design Agency",
    "Custom Software Development",
    "React Development Agency",
    "Hyepr Labs",
  ],
  alternates: {
    canonical: "https://hyeprlabs.com",
  },
  openGraph: {
    type: "website",
    url: "https://hyeprlabs.com",
    title: "Hyepr Labs | Think Fast. Build Fast.",
    description:
      "Hyepr Labs is a premier digital product agency. We build high-performance Next.js web applications, AI integrations, and exceptional UI/UX design for ambitious brands.",
    siteName: "Hyepr Labs",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hyepr Labs | Think Fast. Build Fast.",
    description:
      "Hyepr Labs is a premier digital product agency. We build high-performance Next.js web applications, AI integrations, and exceptional UI/UX design for ambitious brands.",
    creator: "@hyeprlabs",
    site: "@hyeprlabs",
  },
};

export default function Home() {
  return (
    <>
      <ServiceJsonLd />
      <BreadcrumbJsonLd items={[{ name: "Home", href: "/" }]} />
      <HeroSection />
      <LogosSection />
      <BlogCta />
      <FaqSection />
      <CallToAction />
      <Footer />
    </>
  );
}
