"use server"

import type { Locale } from "@workspace/i18n"

export async function setLocale(_locale: Locale) {
  void _locale
  // No-op in Storybook — avoids cookie writes during component review.
}
