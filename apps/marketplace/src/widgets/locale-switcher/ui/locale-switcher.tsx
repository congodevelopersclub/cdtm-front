"use client"

import { useRouter } from "next/navigation"
import { useLocale, useTranslations } from "next-intl"
import { useTransition } from "react"

import { Button } from "@workspace/ui/components/button"
import { Label } from "@workspace/ui/components/label"
import { locales, type Locale } from "@workspace/i18n"

import { setLocale } from "@/shared/i18n/actions/set-locale"

export function LocaleSwitcher() {
  const locale = useLocale() as Locale
  const t = useTranslations("LocaleSwitcher")
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  function handleChange(nextLocale: Locale) {
    if (nextLocale === locale) {
      return
    }

    startTransition(async () => {
      await setLocale(nextLocale)
      router.refresh()
    })
  }

  return (
    <div className="flex items-center gap-2">
      <Label className="text-muted-foreground text-xs">{t("label")}</Label>
      <div className="flex gap-1">
        {locales.map((value) => (
          <Button
            key={value}
            disabled={isPending}
            onClick={() => handleChange(value)}
            size="sm"
            type="button"
            variant={locale === value ? "default" : "outline"}
          >
            {value === "en" ? t("english") : t("french")}
          </Button>
        ))}
      </div>
    </div>
  )
}
