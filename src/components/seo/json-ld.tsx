/**
 * JSON-LD structured data components for Schema.org markup.
 * Improves SEO, rich snippets, and AI-engine discoverability (AEO).
 */

const BASE_URL = "https://hyeprlabs.com";

// ─────────────────────────────────────────────
// Organization
// ─────────────────────────────────────────────
export function OrganizationJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${BASE_URL}/#organization`,
    name: "Hyepr Labs",
    url: BASE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${BASE_URL}/apple-icon.png`,
      width: 180,
      height: 180,
    },
    description:
      "Hyepr Labs is a premier digital product agency specializing in high-performance web applications, scalable Next.js engineering, AI integrations, and UI/UX design.",
    foundingDate: "2023",
    email: "contact@hyeprlabs.com",
    sameAs: [
      "https://github.com/hyeprlabs",
      "https://instagram.com/hyeprlabs",
      "https://linkedin.com/company/hyeprlabs",
      "https://x.com/hyeprlabs",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      email: "contact@hyeprlabs.com",
      contactType: "customer support",
      availableLanguage: ["English", "German"],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ─────────────────────────────────────────────
// WebSite (enables Sitelinks search box)
// ─────────────────────────────────────────────
export function WebSiteJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BASE_URL}/#website`,
    url: BASE_URL,
    name: "Hyepr Labs",
    description:
      "Think Fast. Build Fast. — Digital product agency for high-performance web apps.",
    publisher: { "@id": `${BASE_URL}/#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${BASE_URL}/blog?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ─────────────────────────────────────────────
// Service (for agency service offerings)
// ─────────────────────────────────────────────
export function ServiceJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${BASE_URL}/#service`,
    name: "Digital Product Development",
    provider: { "@id": `${BASE_URL}/#organization` },
    serviceType: "Digital Agency Services",
    description:
      "Full-stack digital product development including Next.js engineering, UI/UX design, AI integrations, and scalable web application architecture.",
    areaServed: "Worldwide",
    url: BASE_URL,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Hyepr Labs Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Next.js Web Application Development",
            description:
              "High-performance, SEO-optimized web applications built with Next.js, React, and Tailwind CSS.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "UI/UX Design",
            description:
              "User-centered interface design and design systems that convert visitors into customers.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "AI Integration",
            description:
              "Custom AI and LLM integrations that automate workflows and enhance digital products.",
          },
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ─────────────────────────────────────────────
// BreadcrumbList
// ─────────────────────────────────────────────
type BreadcrumbItem = { name: string; href: string };

export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.href.startsWith("http") ? item.href : `${BASE_URL}${item.href}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ─────────────────────────────────────────────
// BlogPosting
// ─────────────────────────────────────────────
type BlogPostingProps = {
  title: string;
  description: string;
  slug: string;
  date: string;
  author: string;
  category?: string;
  image?: string;
};

export function BlogPostingJsonLd({
  title,
  description,
  slug,
  date,
  author,
  category,
  image,
}: BlogPostingProps) {
  const url = `${BASE_URL}/blog/${slug}`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: title,
    description,
    url,
    datePublished: date,
    dateModified: date,
    author: {
      "@type": "Person",
      name: author,
    },
    publisher: { "@id": `${BASE_URL}/#organization` },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    ...(category ? { articleSection: category } : {}),
    ...(image ? { image: { "@type": "ImageObject", url: image } } : {}),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ─────────────────────────────────────────────
// FAQPage
// ─────────────────────────────────────────────
type FAQItem = { question: string; answer: string };

export function FAQPageJsonLd({ faqs }: { faqs: FAQItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
