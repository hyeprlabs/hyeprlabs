const CATEGORY_ACCENT: Record<string, string> = {
  engineering: "bg-blue-500",
  design: "bg-violet-500",
  product: "bg-emerald-500",
  "ai-news": "bg-sky-500",
};

const CATEGORY_BADGE: Record<string, string> = {
  engineering:
    "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950/40 dark:text-blue-300",
  design:
    "border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-800 dark:bg-violet-950/40 dark:text-violet-300",
  product:
    "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300",
  "ai-news":
    "border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-800 dark:bg-sky-950/40 dark:text-sky-300",
};

const CATEGORY_TEXT: Record<string, string> = {
  engineering: "text-blue-600 dark:text-blue-400",
  design: "text-violet-600 dark:text-violet-400",
  product: "text-emerald-600 dark:text-emerald-400",
  "ai-news": "text-sky-600 dark:text-sky-400",
};

/**
 * Normalizes a category string to a stable slug.
 * e.g. "Engineering" -> "engineering"
 * e.g. "AI News" -> "ai-news"
 */
function getCategorySlug(category: string): string {
  return category.toLowerCase().trim().replace(/\s+/g, "-");
}

export function getCategoryAccentColor(category: string): string {
  const slug = getCategorySlug(category);
  return CATEGORY_ACCENT[slug] ?? "bg-amber-500";
}

export function getCategoryBadgeClass(category: string): string {
  const slug = getCategorySlug(category);
  return (
    CATEGORY_BADGE[slug] ??
    "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-300"
  );
}

export function getCategoryTextClass(category: string): string {
  const slug = getCategorySlug(category);
  return CATEGORY_TEXT[slug] ?? "text-amber-600 dark:text-amber-400";
}
