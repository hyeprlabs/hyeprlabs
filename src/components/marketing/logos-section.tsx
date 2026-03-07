import { DecorIcon } from "@/components/ui/decor-icon";
import { FullWidthDivider } from "@/components/ui/full-width-divider";
import { LogoCloud } from "@/components/marketing/logo-cloud"; // @efferd/logo-cloud-2
import { getTranslations } from "next-intl/server";

export async function LogosSection() {
  const t = await getTranslations("LogosSection");

  return (
    <section className="mb-12 md:mb-36">
      <h2 className="py-6 text-center font-medium text-lg text-muted-foreground tracking-tight md:text-xl">
        {t("heading")}{" "}
        <span className="text-foreground">{t("headingHighlight")}</span>
      </h2>
      <div className="relative *:border-0">
        <DecorIcon className="size-4" position="top-left" />
        <DecorIcon className="size-4" position="top-right" />
        <DecorIcon className="size-4" position="bottom-left" />
        <DecorIcon className="size-4" position="bottom-right" />

        <FullWidthDivider className="-top-px" />
        <LogoCloud />
        <FullWidthDivider className="-bottom-px" />
      </div>
    </section>
  );
}
