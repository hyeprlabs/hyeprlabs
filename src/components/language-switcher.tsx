"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { CheckIcon } from "lucide-react";
import { GB, DE } from "country-flag-icons/react/3x2";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function LanguageSwitcher() {
  const t = useTranslations("LanguageSwitcher");
  const currentLocale = useLocale();
  const pathname = usePathname();

  const CurrentFlag = currentLocale === "de" ? DE : GB;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-8 bg-transparent text-muted-foreground font-normal gap-2"
          aria-label={t("label")}
        >
          <CurrentFlag />
          {t(currentLocale)}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {routing.locales.map((locale) => {
          const Flag = locale === "de" ? DE : GB;
          return (
            <Link
              key={locale}
              href={pathname}
              locale={locale}
              className="flex w-full items-center justify-between text-sm cursor-pointer"
            >
              <DropdownMenuItem className="w-full flex justify-between">
                <div className="flex items-center gap-2">
                  <Flag />
                  {t(locale)}
                </div>
                {currentLocale === locale && (
                  <CheckIcon className="text-muted-foreground" />
                )}
              </DropdownMenuItem>
            </Link>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
