import { match } from "@formatjs/intl-localematcher"
import Negotiator from "negotiator"

import {
  defaultLocale,
  isLocale,
  locales,
  type Locale,
} from "./config"

type ResolveLocaleInput = {
  cookie?: string | null
  acceptLanguage?: string | null
}

function getLocaleFromAcceptLanguage(acceptLanguage: string | null | undefined): Locale {
  if (!acceptLanguage) {
    return defaultLocale
  }

  const headers = { "accept-language": acceptLanguage }
  const languages = new Negotiator({ headers }).languages()

  return match(languages, [...locales], defaultLocale) as Locale
}

export function resolveLocale({
  cookie,
  acceptLanguage,
}: ResolveLocaleInput): Locale {
  if (isLocale(cookie)) {
    return cookie
  }

  return getLocaleFromAcceptLanguage(acceptLanguage)
}
