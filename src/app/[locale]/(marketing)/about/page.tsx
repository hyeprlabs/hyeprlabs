import type { Metadata } from "next";
import { MarketingHero } from "@/components/marketing/marketing-hero";
import { AboutItems } from "@/components/marketing/about/about-items";
import { CallToAction } from "@/components/marketing/cta";
import { Footer } from "@/components/marketing/footer";
import { getTranslations } from "next-intl/server";

export const metadata: Metadata = {
  title: "About",
  description:
    "Accelerating growth for ambitious brands through data-driven design, scalable engineering, and strategic innovation.",
  keywords: ["About Hyepr Labs", "Top Digital Agency", "Next.js Experts", "UI/UX Designers", "Software Engineers"],
  openGraph: {
    title: "About | Hyepr Labs | Think Fast. Build Fast.",
    description: "Accelerating growth for ambitious brands through data-driven design, scalable engineering, and strategic innovation.",
    url: "https://hyeprlabs.com/about",
  }
};

export default async function Page() {
  const t = await getTranslations("AboutPage");

  return (
    <>
      <MarketingHero
        badge={t("badge")}
        title={t("title")}
        description={t("description")}
      />
      <AboutItems />
      <Article />
      <CallToAction />
      <Footer />
    </>
  );
}

async function Article() {
  const t = await getTranslations("AboutPage");
  const hl = (chunks: React.ReactNode) => <span className="text-foreground">{chunks}</span>;

  return (
    <article className="mx-auto max-w-2xl px-4 py-12 text-sm tracking-wider sm:text-lg font-mono text-muted-foreground">
      <header className="mb-10 text-center">
        <h2 className="text-xl sm:text-2xl font-medium text-foreground mb-4">
          {t("articleHeading")}
        </h2>
        <p className="leading-relaxed">
          {t.rich("para1", { highlight: hl })}
        </p>
      </header>

      <div className="space-y-8 text-left">
        <p className="leading-relaxed">
          {t.rich("para2", { highlight: hl })}
        </p>

        <p className="leading-relaxed">
          {t.rich("para3", { highlight: hl })}
        </p>

        <p className="leading-relaxed">
          {t.rich("para4", { highlight: hl })}
        </p>

        <p className="leading-relaxed">
          {t.rich("para5", { highlight: hl })}
        </p>
      </div>
    </article>
  );
}
