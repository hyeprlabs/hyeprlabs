import { AlertTriangle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { getTranslations } from "next-intl/server";

export async function LegalDisclaimer() {
  const t = await getTranslations("LegalDisclaimer");

  return (
    <Alert className="border-red-200 bg-red-50 text-red-900 dark:border-red-900 dark:bg-red-950 dark:text-red-50 mb-6">
      <AlertTriangle />
      <AlertTitle>{t("title")}</AlertTitle>
      <AlertDescription>{t("description")}</AlertDescription>
    </Alert>
  );
}
