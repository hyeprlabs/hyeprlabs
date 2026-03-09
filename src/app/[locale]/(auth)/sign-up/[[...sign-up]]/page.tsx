import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { SignUpForm } from "@/components/auth/sign-up-form";
import { DecorIcon } from "@/components/ui/decor-icon";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("SignUp");
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function Page() {
  const t = await getTranslations("SignUp");

  return (
    <div className="relative overflow-hidden rounded-lg border border-border bg-linear-to-br from-muted/30 to-background p-6 shadow-sm">
      <DecorIcon className="size-4" position="top-left" />
      <DecorIcon className="size-4" position="top-right" />
      <DecorIcon className="size-4" position="bottom-left" />
      <DecorIcon className="size-4" position="bottom-right" />

      {/* Heading */}
      <div className="mb-6 text-center">
        <h1 className="font-serif text-2xl">{t("title")}</h1>
        <p className="mt-1 font-mono text-xs text-muted-foreground">
          {t("description")}
        </p>
      </div>

      <SignUpForm />
    </div>
  );
}
