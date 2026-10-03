import { cookies, headers } from "next/headers"
import { getRequestConfig } from "next-intl/server"

import { localeCookieName, resolveLocale, type Locale } from "@workspace/i18n"

async function loadMessages(locale: Locale) {
  switch (locale) {
    case "en":
      return (await import("./messages/en.json")).default
    case "fr":
      return (await import("./messages/fr.json")).default
  }
}

export default getRequestConfig(async () => {
  const cookieStore = await cookies()
  const headerStore = await headers()

  const locale = resolveLocale({
    cookie: cookieStore.get(localeCookieName)?.value,
    acceptLanguage: headerStore.get("accept-language"),
  })

  return {
    locale,
    messages: await loadMessages(locale),
  }
})
