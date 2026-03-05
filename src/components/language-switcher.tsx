"use client";

import { DropdownMenu } from "radix-ui";
import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { CheckIcon, GlobeIcon } from "lucide-react";

const LOCALES = [
  { value: "en" },
  { value: "de" },
] as const;

function LanguageSwitcher() {
  const t = useTranslations("LanguageSwitcher");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const current = LOCALES.find((l) => l.value === locale);

  function handleSelect(value: string) {
    router.replace(pathname, { locale: value });
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          aria-label={t("label")}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-xs font-medium transition-colors",
            "ring-1 ring-zinc-200 ring-inset dark:ring-zinc-700",
            "text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          )}
        >
          <GlobeIcon className="size-3.5 shrink-0" aria-hidden />
          <span>{current ? t(current.value) : locale}</span>
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="end"
          sideOffset={8}
          className={cn(
            "z-50 min-w-[9rem] overflow-hidden rounded-lg border border-border bg-background p-1 shadow-md",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
            "data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2",
          )}
        >
          {LOCALES.map(({ value }) => (
            <DropdownMenu.Item
              key={value}
              onSelect={() => handleSelect(value)}
              className={cn(
                "relative flex cursor-default select-none items-center gap-2 rounded-md px-3 py-1.5 text-sm outline-none transition-colors",
                "text-foreground focus:bg-muted",
                "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
              )}
            >
              <span className="flex-1">{t(value)}</span>
              {locale === value && (
                <CheckIcon className="size-3.5 text-muted-foreground" aria-hidden />
              )}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

export { LanguageSwitcher };
