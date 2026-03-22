"use client";

import { MonitorIcon, MoonStarIcon, SunIcon } from "lucide-react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import type { JSX } from "react";
import { useSyncExternalStore } from "react";

import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

function ThemeOption({
  icon,
  value,
  ariaLabel,
  isActive,
  onClick,
}: {
  icon: JSX.Element;
  value: string;
  ariaLabel: string;
  isActive?: boolean;
  onClick: (value: string) => void;
}) {
  return (
    <button
      className={cn(
        "relative flex size-8 cursor-default items-center justify-center rounded-full transition-[color] [&_svg]:size-4",
        isActive
          ? "text-foreground"
          : "text-muted-foreground hover:text-foreground",
      )}
      role="radio"
      aria-checked={isActive}
      aria-label={ariaLabel}
      onClick={() => onClick(value)}
    >
      {icon}

      {isActive && (
        <motion.div
          layoutId="theme-option"
          transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
          className="absolute inset-px rounded-full border border-border"
        />
      )}
    </button>
  );
}

const THEME_OPTIONS = [
  {
    icon: <MonitorIcon />,
    value: "system",
  },
  {
    icon: <SunIcon />,
    value: "light",
  },
  {
    icon: <MoonStarIcon />,
    value: "dark",
  },
];

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const t = useTranslations("ThemeSwitcher");

  const isMounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  if (!isMounted) {
    return <Skeleton className="h-8 w-24 rounded-full" />;
  }

  return (
    <motion.div
      key={String(isMounted)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="relative inline-flex items-center overflow-hidden rounded-full"
      role="radiogroup"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 rounded-full ring-1 ring-border ring-inset"
      />
      {THEME_OPTIONS.map((option) => (
        <ThemeOption
          key={option.value}
          icon={option.icon}
          value={option.value}
          ariaLabel={t("switchTheme", { theme: t(option.value) })}
          isActive={theme === option.value}
          onClick={setTheme}
        />
      ))}
    </motion.div>
  );
}
