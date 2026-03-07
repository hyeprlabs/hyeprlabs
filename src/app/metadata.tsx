import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://hyeprlabs.com"),
  title: {
    default: "Hyepr Labs | Digital Product Agency & Next.js Experts",
    template: "%s | Hyepr Labs",
  },
  description:
    "Premier digital product agency specializing in high-performance web apps, Next.js engineering, AI integrations, and UI/UX design.",
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
  openGraph: {
    type: "website",
    url: "https://hyeprlabs.com",
    title: "Hyepr Labs | Digital Product Agency & Next.js Experts",
    description:
      "Premier digital product agency specializing in high-performance web apps, Next.js engineering, AI integrations, and UI/UX design.",
    siteName: "Hyepr Labs",
    images: [
      {
        url: "/og?title=Premier+Digital+Product+Agency&description=High-performance+web+apps%2C+Next.js+engineering%2C+AI+integrations%2C+and+world-class+UI%2FUX+design.&cta=Work+With+Us+%E2%86%92",
        width: 1200,
        height: 630,
        alt: "Hyepr Labs | Digital Product Agency & Next.js Experts",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hyepr Labs | Digital Product Agency & Next.js Experts",
    description:
      "Premier digital product agency specializing in high-performance web apps, Next.js engineering, AI integrations, and UI/UX design.",
    creator: "@hyeprlabs",
    images: [
      "/og?title=Premier+Digital+Product+Agency&description=High-performance+web+apps%2C+Next.js+engineering%2C+AI+integrations%2C+and+world-class+UI%2FUX+design.&cta=Work+With+Us+%E2%86%92",
    ],
  },
};
