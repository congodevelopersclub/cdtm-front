export const locales = ["en", "fr"] as const

export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = "en"

export const localeCookieName = "NEXT_LOCALE"

export function isLocale(value: string | undefined | null): value is Locale {
  return locales.includes(value as Locale)
}
