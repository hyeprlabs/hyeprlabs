import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://hyeprlabs.com"),
  title: {
    default: "Hyepr Labs | Think Fast. Build Fast.",
    template: "%s | Hyepr Labs",
  },
  description:
    "Hyepr Labs is a premier digital product agency specializing in high-performance web applications, scalable Next.js engineering, AI integrations, and UI/UX design.",
  keywords: [
    "Digital Product Agency",
    "Next.js Development",
    "AI Integration",
    "High-Performance Web Apps",
    "UI/UX Design",
    "Tailwind CSS",
    "Hyepr Labs",
    "Custom Software Development",
  ],
  creator: "Hyepr Labs",
  alternates: {
    canonical: "https://hyeprlabs.com",
    languages: {
      "en": "https://hyeprlabs.com/en",
      "de": "https://hyeprlabs.com/de",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    url: "https://hyeprlabs.com",
    title: "Hyepr Labs | Think Fast. Build Fast.",
    description:
      "Hyepr Labs is a premier digital product agency specializing in high-performance web applications, scalable Next.js engineering, AI integrations, and UI/UX design.",
    siteName: "Hyepr Labs",
    images: [
      {
        url: "/apple-icon.png",
        width: 180,
        height: 180,
        alt: "Hyepr Labs logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hyepr Labs | Think Fast. Build Fast.",
    description:
      "Hyepr Labs is a premier digital product agency specializing in high-performance web applications, scalable Next.js engineering, AI integrations, and UI/UX design.",
    creator: "@hyeprlabs",
    site: "@hyeprlabs",
  },
};
