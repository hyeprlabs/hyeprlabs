const CATEGORY_ACCENT: Record<string, string> = {
  Engineering: "bg-blue-500",
  Design: "bg-violet-500",
  Product: "bg-emerald-500",
};

const CATEGORY_BADGE: Record<string, string> = {
  Engineering:
    "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950/40 dark:text-blue-300",
  Design:
    "border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-800 dark:bg-violet-950/40 dark:text-violet-300",
  Product:
    "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300",
};

const CATEGORY_TEXT: Record<string, string> = {
  Engineering: "text-blue-600 dark:text-blue-400",
  Design: "text-violet-600 dark:text-violet-400",
  Product: "text-emerald-600 dark:text-emerald-400",
};

export function getCategoryAccentColor(category: string): string {
  return CATEGORY_ACCENT[category] ?? "bg-amber-500";
}

export function getCategoryBadgeClass(category: string): string {
  return (
    CATEGORY_BADGE[category] ??
    "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-300"
  );
}

export function getCategoryTextClass(category: string): string {
  return CATEGORY_TEXT[category] ?? "text-amber-600 dark:text-amber-400";
}
