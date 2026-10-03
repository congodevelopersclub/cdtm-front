"use client"

import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { useLocale, useTranslations } from "next-intl"
import { useTheme } from "next-themes"
import { IconMoon, IconSun } from "@tabler/icons-react"

import { locales, type Locale } from "@workspace/i18n"
import { Button } from "@workspace/ui/components/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu"

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

export function LoginAuthToolbar() {
  const locale = useLocale() as Locale
  const tLocale = useTranslations("LocaleSwitcher")
  const tTheme = useTranslations("SidebarNav")
  const router = useRouter()
  const { setTheme } = useTheme()
  const [isPending, startTransition] = useTransition()

  const currentLanguageShort = locale === "en" ? tLocale("shortEnglish") : tLocale("shortFrench")

  function handleLocaleChange(nextLocale: Locale) {
    if (nextLocale === locale) return

    startTransition(async () => {
      await setLocale(nextLocale)
      router.refresh()
    })
  }

  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            aria-label={locale === "en" ? tLocale("english") : tLocale("french")}
            className="gap-1.5 px-2.5"
            disabled={isPending}
            size="lg"
            type="button"
            variant="outline"
          >
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
              {value === "en" ? tLocale("shortEnglish") : tLocale("shortFrench")}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            aria-label={tTheme("theme")}
            size="icon-lg"
            suppressHydrationWarning
            type="button"
            variant="outline"
          >
            <IconSun className="size-4 dark:hidden" />
            <IconMoon className="hidden size-4 dark:block" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onSelect={(event) => {
              event.preventDefault()
              setTheme("light")
            }}
          >
            <IconSun className="size-4" />
            {tTheme("themeLightShort")}
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={(event) => {
              event.preventDefault()
              setTheme("dark")
            }}
          >
            <IconMoon className="size-4" />
            {tTheme("themeDarkShort")}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
