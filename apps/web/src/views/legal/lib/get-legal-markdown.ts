import { readFile } from "node:fs/promises"
import path from "node:path"

import { defaultLocale, isLocale, type Locale } from "@workspace/i18n"
import { getLocale } from "next-intl/server"

export type LegalPageKey = "privacy" | "terms" | "cookies"

function resolveLocale(locale: string): Locale {
  return isLocale(locale) ? locale : defaultLocale
}

export async function getLegalMarkdown(page: LegalPageKey) {
  const locale = resolveLocale(await getLocale())
  const filePath = path.join(
    process.cwd(),
    "content",
    "legal",
    locale,
    `${page}.md`
  )

  return readFile(filePath, "utf8")
}
