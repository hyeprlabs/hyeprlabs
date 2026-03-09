import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { SignInForm } from "@/components/auth/sign-in-form";
import { DecorIcon } from "@/components/ui/decor-icon";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("SignIn");
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function Page() {
  return (
    <div className="relative overflow-hidden rounded-lg border border-border bg-linear-to-br from-muted/30 to-background p-6 shadow-sm">
      <DecorIcon className="size-4" position="top-left" />
      <DecorIcon className="size-4" position="top-right" />
      <DecorIcon className="size-4" position="bottom-left" />
      <DecorIcon className="size-4" position="bottom-right" />

      <SignInForm />
    </div>
  );
}
