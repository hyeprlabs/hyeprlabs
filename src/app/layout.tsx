import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = localFont({
  src: "./fonts/GeistSans-Variable.woff2",
  variable: "--font-geist-sans",
  display: "swap",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMono-Variable.woff2",
  variable: "--font-geist-mono",
  display: "swap",
  weight: "100 900",
});

const instrumentSerif = localFont({
  src: "./fonts/InstrumentSerif-Regular.woff2",
  variable: "--font-instrument-serif",
  display: "swap",
  weight: "400",
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
        </ThemeProvider>
      </body>
    </html>
  );
}
