import type { Metadata } from "next";
import { HeroSection } from "@/components/marketing/hero";
import { LogosSection } from "@/components/marketing/logos-section";
import { BlogCta } from "@/components/marketing/blog/blog-cta";
import { CallToAction } from "@/components/marketing/cta";
import { Footer } from "@/components/marketing/footer";
import { ServiceJsonLd, BreadcrumbJsonLd, FAQPageJsonLd } from "@/components/seo/json-ld";
import { Link } from "@/i18n/navigation";

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

const homeFaqs = [
  {
    question: "What does Hyepr Labs do?",
    answer:
      "Hyepr Labs is a digital product agency that designs and builds high-performance web applications using Next.js, React, and modern AI tools. We help ambitious brands scale faster through smart design, scalable engineering, and strategic execution.",
  },
  {
    question: "What services does Hyepr Labs offer?",
    answer:
      "We offer Next.js web application development, UI/UX design, AI and LLM integrations, design systems, headless e-commerce, SaaS dashboards, and ongoing product strategy.",
  },
  {
    question: "How can I hire Hyepr Labs for my project?",
    answer:
      "You can get in touch with us through our contact page at hyeprlabs.com/contact. Describe your project and we will respond within one business day.",
  },
  {
    question: "Where is Hyepr Labs based?",
    answer:
      "Hyepr Labs is based in Germany and works with clients worldwide. We communicate in English and German.",
  },
  {
    question: "Does Hyepr Labs offer Next.js templates?",
    answer:
      "Yes. We publish production-ready Next.js starter templates and boilerplates that are freely available on our templates page at hyeprlabs.com/templates.",
  },
];

export default function Home() {
  return (
    <>
      <ServiceJsonLd />
      <BreadcrumbJsonLd items={[{ name: "Home", href: "/" }]} />
      <FAQPageJsonLd faqs={homeFaqs} />
      <HeroSection />
      <LogosSection />
      <BlogCta />
      <HomeFaqSection />
      <CallToAction />
      <Footer />
    </>
  );
}

function HomeFaqSection() {
  return (
    <section
      aria-labelledby="faq-heading"
      className="mx-auto w-full max-w-5xl px-4 py-12 mb-12 md:mb-24"
    >
      <h2
        id="faq-heading"
        className="mb-8 text-center text-2xl font-serif md:text-3xl"
      >
        Frequently Asked Questions
      </h2>
      <dl className="mx-auto max-w-2xl space-y-6 font-mono text-sm text-muted-foreground">
        {homeFaqs.map((faq) => (
          <div key={faq.question} className="border-b pb-6">
            <dt className="mb-2 font-medium text-foreground">{faq.question}</dt>
            <dd className="leading-relaxed tracking-wide">{faq.answer}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-8 text-center font-mono text-sm text-muted-foreground">
        Ready to build?{" "}
        <Link href="/contact" className="underline hover:text-foreground">
          Contact us
        </Link>{" "}
        or explore our{" "}
        <Link href="/projects" className="underline hover:text-foreground">
          past projects
        </Link>
        .
      </p>
    </section>
  );
}
