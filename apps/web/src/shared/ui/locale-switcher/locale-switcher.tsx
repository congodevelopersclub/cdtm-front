"use client"

import { useTransition } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useLocale, useTranslations } from "next-intl"

import { locales, type Locale } from "@workspace/i18n"
import { Button } from "@workspace/ui/components/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu"
import { cn } from "@workspace/ui/lib/utils"

import { setLocale } from "@/shared/i18n/actions/set-locale"

const LOCALE_FLAGS: Record<Locale, string> = {
  en: "🇬🇧",
  fr: "🇫🇷",
}

function LocaleFlag({ locale }: { locale: Locale }) {
  return (
    <span aria-hidden className="text-base leading-none">
      {LOCALE_FLAGS[locale]}
    </span>
  )
}

type LocaleSwitcherProps = {
  compact?: boolean
}

export function LocaleSwitcher({ compact = false }: LocaleSwitcherProps) {
  const locale = useLocale() as Locale
  const t = useTranslations("LocaleSwitcher")
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const currentLanguageShort =
    locale === "en" ? t("shortEnglish") : t("shortFrench")

  function handleLocaleChange(nextLocale: Locale) {
    if (nextLocale === locale) {
      return
    }

    startTransition(async () => {
      await setLocale(nextLocale)
      router.refresh()
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          aria-label={locale === "en" ? t("english") : t("french")}
          className={cn("gap-1.5", compact ? "px-2.5" : "px-3")}
          disabled={isPending}
          size={compact ? "sm" : "default"}
          type="button"
          variant="outline"
        >
          <Image
            alt=""
            aria-hidden
            className="size-4 dark:invert"
            height={16}
            src="/globe.svg"
            width={16}
          />
          <LocaleFlag locale={locale} />
          {currentLanguageShort}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {locales.map((value) => (
          <DropdownMenuItem
            key={value}
            onSelect={(event) => {
              event.preventDefault()
              handleLocaleChange(value)
            }}
          >
            <LocaleFlag locale={value} />
            {value === "en" ? t("shortEnglish") : t("shortFrench")}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
