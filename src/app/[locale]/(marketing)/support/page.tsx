import type { Metadata } from "next";
import { MarketingHero } from "@/components/marketing/marketing-hero";
import { FullWidthDivider } from "@/components/ui/full-width-divider";
import { CallToAction } from "@/components/marketing/cta";
import { Footer } from "@/components/marketing/footer";
import { getTranslations } from "next-intl/server";

export const metadata: Metadata = {
  title: "Support",
  description:
    "Get help and support for your projects. Our dedicated support center. Coming soon.",
  keywords: ["Customer Support", "Help Center", "Client Support", "Technical Support", "Hyepr Labs Help"],
  openGraph: {
    title: "Support | Hyepr Labs | Think Fast. Build Fast.",
    description: "Get help and support for your projects. Our dedicated support center. Coming soon.",
    url: "https://hyeprlabs.com/support",
    images: [
      {
        url: "/og?title=Support&description=Get+help+and+support+for+your+projects.+Our+dedicated+support+center.&type=Support",
        width: 1200,
        height: 630,
        alt: "Support | Hyepr Labs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Support | Hyepr Labs | Think Fast. Build Fast.",
    description: "Get help and support for your projects. Our dedicated support center. Coming soon.",
    creator: "@hyeprlabs",
    images: [
      "/og?title=Support&description=Get+help+and+support+for+your+projects.+Our+dedicated+support+center.&type=Support",
    ],
  },
};

export default async function Page() {
  const t = await getTranslations("SupportPage");

  return (
    <>
      <MarketingHero
        badge={t("badge")}
        title={t("title")}
        description={t("description")}
      />
      <Article />
      <CallToAction />
      <Footer />
    </>
  );
}

async function Article() {
  const t = await getTranslations("SupportPage");
  const hl = (chunks: React.ReactNode) => <span className="text-foreground">{chunks}</span>;

  return (
    <div className="relative">
      <FullWidthDivider position="top" />
      <article className="mx-auto max-w-2xl px-4 py-12 text-sm tracking-wider sm:text-lg font-mono text-muted-foreground">
        <header className="mb-10 text-center">
          <h2 className="text-xl sm:text-2xl font-medium text-foreground mb-4">
            {t("comingSoon")}
          </h2>
          <p className="leading-relaxed">
            {t.rich("intro", { highlight: hl })}
          </p>
        </header>

        <div className="space-y-8 text-left">
          <p className="leading-relaxed">
            {t.rich("para1", { highlight: hl })}
          </p>

          <p className="leading-relaxed">
            {t.rich("para2", { highlight: hl })}
          </p>

          <p className="leading-relaxed">
            {t.rich("para3", { highlight: hl })}
          </p>
        </div>
      </article>
    </div>
  );
}
