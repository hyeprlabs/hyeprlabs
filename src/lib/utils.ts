import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Merge and normalize CSS class names while resolving conflicting Tailwind utility classes.
 *
 * @param inputs - Class values (strings, arrays, objects, or conditional mappings) to merge
 * @returns The merged class string with conflicting Tailwind utility classes resolved
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format an ISO/parsable date string into a human-readable date using the specified locale.
 *
 * If `input` cannot be parsed as a valid date, the original `input` string is returned unchanged.
 *
 * @param input - The date string to format (any value accepted by the Date constructor).
 * @param locale - Locale identifier or short code (defaults to `"en"`). Short codes `en` and `de` are mapped to `en-US` and `de-DE` respectively; other values are used as-provided.
 * @returns The formatted date (e.g., `December 31, 2023`) when parsing succeeds, or the original `input` string when parsing fails.
 */
export function formatDate(input: string, locale = "en"): string {
  const date = new Date(input)
  if (isNaN(date.getTime())) return input
  // Map short locale codes to BCP 47 locale codes for reliable formatting
  const localeMap: Record<string, string> = {
    en: "en-US",
    de: "de-DE",
  }
  const bcp47 = localeMap[locale] ?? locale
  return date.toLocaleDateString(bcp47, {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}
