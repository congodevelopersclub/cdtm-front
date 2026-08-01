"use server"

import { cookies } from "next/headers"

import { localeCookieName, locales, type Locale } from "@workspace/i18n"

export async function setLocale(locale: Locale) {
  if (!locales.includes(locale)) {
    return
  }

  const store = await cookies()
  store.set(localeCookieName, locale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  })
}
