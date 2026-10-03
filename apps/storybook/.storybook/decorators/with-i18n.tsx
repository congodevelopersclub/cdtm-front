import { NextIntlClientProvider } from "next-intl"
import type { Decorator } from "@storybook/nextjs-vite"

import type { Locale } from "@workspace/i18n"

import marketplaceEn from "../../../../apps/marketplace/src/shared/i18n/messages/en.json"
import marketplaceFr from "../../../../apps/marketplace/src/shared/i18n/messages/fr.json"
import webEn from "../../../../apps/web/src/shared/i18n/messages/en.json"
import webFr from "../../../../apps/web/src/shared/i18n/messages/fr.json"

type I18nApp = "web" | "marketplace"

const messagesByApp: Record<I18nApp, Record<Locale, Record<string, unknown>>> =
  {
    web: { en: webEn, fr: webFr },
    marketplace: { en: marketplaceEn, fr: marketplaceFr },
  }

export const withI18n: Decorator = (Story, context) => {
  const app =
    (context.parameters.i18n?.app as I18nApp | undefined) ??
    (context.globals.i18nApp as I18nApp | undefined) ??
    "web"
  const locale =
    (context.parameters.i18n?.locale as Locale | undefined) ??
    (context.globals.locale as Locale | undefined) ??
    "en"

  const messages = messagesByApp[app][locale]

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <Story />
    </NextIntlClientProvider>
  )
}
