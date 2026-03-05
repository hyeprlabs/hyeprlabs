import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: ["400"],
});

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
  },
  twitter: {
    card: "summary_large_image",
    title: "Hyepr Labs | Think Fast. Build Fast.",
    description:
      "Hyepr Labs is a premier digital product agency specializing in high-performance web applications, scalable Next.js engineering, AI integrations, and UI/UX design.",
    creator: "@hyeprlabs",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
