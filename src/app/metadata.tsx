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
  openGraph: {
    type: "website",
    url: "https://hyeprlabs.com",
    title: "Hyepr Labs | Think Fast. Build Fast.",
    description:
      "Hyepr Labs is a premier digital product agency specializing in high-performance web applications, scalable Next.js engineering, AI integrations, and UI/UX design.",
    siteName: "Hyepr Labs",
    images: [
      {
        url: "/og?title=Think+Fast.+Build+Fast.&description=Premier+digital+product+agency+specializing+in+high%E2%80%91performance+web+apps%2C+Next.js+engineering%2C+AI+integrations%2C+and+UI%2FUX+design.",
        width: 1200,
        height: 630,
        alt: "Hyepr Labs | Think Fast. Build Fast.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hyepr Labs | Think Fast. Build Fast.",
    description:
      "Hyepr Labs is a premier digital product agency specializing in high-performance web applications, scalable Next.js engineering, AI integrations, and UI/UX design.",
    creator: "@hyeprlabs",
    images: [
      "/og?title=Think+Fast.+Build+Fast.&description=Premier+digital+product+agency+specializing+in+high%E2%80%91performance+web+apps%2C+Next.js+engineering%2C+AI+integrations%2C+and+UI%2FUX+design.",
    ],
  },
};
