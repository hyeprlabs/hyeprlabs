import type { Metadata } from "next";
import { MarketingHero } from "@/components/marketing/marketing-hero";
import { DataDisclaimer } from "@/components/marketing/data-disclaimer";
import { TemplatesList } from "@/components/marketing/templates/templates-list";
import { CallToAction } from "@/components/marketing/cta";
import { Footer } from "@/components/marketing/footer";
import { getTranslations } from "next-intl/server";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title: "Templates",
  description:
    "Production-ready Next.js templates and React boilerplates by Hyepr Labs. Jumpstart your SaaS, e-commerce, or marketing site with modern, open-source starters.",
  keywords: ["Next.js Templates", "React Templates", "Tailwind CSS Templates", "Open Source Boilerplates", "SaaS Starter Kit", "Hyepr Labs Templates"],
  alternates: {
    canonical: "https://hyeprlabs.com/templates",
  },
  openGraph: {
    type: "website",
    title: "Templates | Hyepr Labs | Think Fast. Build Fast.",
    description: "Production-ready Next.js templates and React boilerplates. Jumpstart your next project.",
    url: "https://hyeprlabs.com/templates",
    siteName: "Hyepr Labs",
  },
  twitter: {
    card: "summary_large_image",
    title: "Templates | Hyepr Labs",
    description: "Production-ready Next.js templates and React boilerplates. Jumpstart your next project.",
    creator: "@hyeprlabs",
    site: "@hyeprlabs",
  },
};

export default async function Page() {
  const t = await getTranslations("TemplatesPage");

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Templates", href: "/templates" },
        ]}
      />
      <MarketingHero
        badge={t("badge")}
        title={t("title")}
        description={t("description")}
      />
      <DataDisclaimer description={t("disclaimer")} />
      <TemplatesList />
      <Article />
      <CallToAction />
      <Footer />
    </>
  );
}

async function Article() {
  const t = await getTranslations("TemplatesPage");
  const hl = (chunks: React.ReactNode) => <span className="text-foreground">{chunks}</span>;

  return (
    <article className="mx-auto max-w-2xl px-4 py-12 text-sm tracking-wider sm:text-lg font-mono text-muted-foreground">
      <header className="mb-10 text-center">
        <h2 className="text-xl sm:text-2xl font-medium text-foreground mb-4">
          {t("articleHeading")}
        </h2>
        <p className="leading-relaxed">
          {t.rich("articleIntro", { highlight: hl })}
        </p>
      </header>

      <div className="space-y-8 text-left">
        <p className="leading-relaxed">
          {t.rich("articlePara1", { highlight: hl })}
        </p>

        <p className="leading-relaxed">
          {t.rich("articlePara2", { highlight: hl })}
        </p>

        <p className="leading-relaxed">
          {t.rich("articlePara3", { highlight: hl })}
        </p>
      </div>
    </article>
  );
}
