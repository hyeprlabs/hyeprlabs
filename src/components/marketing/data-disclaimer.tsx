import { Construction } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FullWidthDivider } from "@/components/ui/full-width-divider";
import { getTranslations } from "next-intl/server";

type Props = {
  description: string;
};

export async function DataDisclaimer({
  description,
}: Props) {
  const t = await getTranslations("DataDisclaimer");

  return (
    <div className="relative mx-auto w-full max-w-5xl px-6 py-8 md:px-8 md:py-12">
      <FullWidthDivider position="top" />
      <Alert className="border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900/50 dark:bg-amber-950/50 dark:text-amber-100 font-mono">
        <Construction className="h-4 w-4" />
        <AlertTitle>{t("title")}</AlertTitle>
        <AlertDescription>{description}</AlertDescription>
      </Alert>
    </div>
  );
}
