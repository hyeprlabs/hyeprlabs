import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

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
