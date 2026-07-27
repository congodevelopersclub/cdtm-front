"use client"

import { useTransition, type ReactNode } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useLocale, useTranslations } from "next-intl"
import { useTheme } from "next-themes"
import { IconLogout, IconMoon, IconSettings, IconSun } from "@tabler/icons-react"

import { locales, type Locale } from "@workspace/i18n"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu"
import { cn } from "@workspace/ui/lib/utils"

import type { DashboardUser } from "../../config/types"

import { useLogout } from "@/features/auth"
import { setLocale } from "@/shared/i18n/actions/set-locale"

const LOCALE_FLAGS: Record<Locale, string> = {
  en: "🇬🇧",
  fr: "🇫🇷",
}

const LOCALE_SHORT_KEYS: Record<Locale, "shortEnglish" | "shortFrench"> = {
  en: "shortEnglish",
  fr: "shortFrench",
}

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("")
}

function LocaleFlag({ locale }: { locale: Locale }) {
  return (
    <span aria-hidden className="text-base leading-none">
      {LOCALE_FLAGS[locale]}
    </span>
  )
}

type SegmentedButtonProps = {
  isSelected: boolean
  onClick: () => void
  disabled?: boolean
  "aria-label": string
  children: ReactNode
  className?: string
}

function SegmentedButton({
  isSelected,
  onClick,
  disabled,
  "aria-label": ariaLabel,
  children,
  className,
}: SegmentedButtonProps) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      aria-pressed={isSelected}
      disabled={disabled}
      onClick={(event) => {
        event.preventDefault()
        event.stopPropagation()
        onClick()
      }}
      className={cn(
        "inline-flex flex-1 items-center justify-center gap-1.5 rounded-md px-2.5 py-1.5 text-sm transition-colors",
        isSelected
          ? "bg-background font-medium text-foreground shadow-sm"
          : "text-muted-foreground hover:text-foreground",
        className,
      )}
    >
      {children}
    </button>
  )
}

type DashboardUserMenuProps = {
  user: DashboardUser
}

export function DashboardUserMenu({ user }: DashboardUserMenuProps) {
  const t = useTranslations("SidebarNav")
  const tLocale = useTranslations("LocaleSwitcher")
  const locale = useLocale() as Locale
  const router = useRouter()
  const logout = useLogout()
  const { resolvedTheme, setTheme } = useTheme()
  const [isPending, startTransition] = useTransition()

  const activeTheme = resolvedTheme === "dark" ? "dark" : "light"
  const subtitle = user.title ?? user.email

  function handleLocaleChange(nextLocale: Locale) {
    if (nextLocale === locale) return

    startTransition(async () => {
      await setLocale(nextLocale)
      router.refresh()
    })
  }

  function handleLogout() {
    void logout()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Avatar className="size-8 rounded-full">
            {user.avatar ? (
              <AvatarImage src={user.avatar} alt={user.name} />
            ) : null}
            <AvatarFallback className="rounded-full bg-brand-steel-blue text-primary-foreground">
              {getInitials(user.name)}
            </AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-56 rounded-lg">
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <Avatar className="size-8 rounded-lg">
              {user.avatar ? (
                <AvatarImage src={user.avatar} alt={user.name} />
              ) : null}
              <AvatarFallback className="rounded-lg">
                {getInitials(user.name)}
              </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">{user.name}</span>
              <span className="truncate text-xs text-muted-foreground">
                {subtitle}
              </span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/profile">
              <IconSettings />
              {t("settings")}
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <div className="space-y-3 px-2 py-2">
          <div>
            <p className="mb-1.5 px-1 text-xs font-medium text-muted-foreground">
              {t("language")}
            </p>
            <div className="flex rounded-lg bg-muted p-1">
              {locales.map((value) => (
                <SegmentedButton
                  key={value}
                  isSelected={locale === value}
                  disabled={isPending}
                  aria-label={value === "en" ? tLocale("english") : tLocale("french")}
                  onClick={() => handleLocaleChange(value)}
                >
                  <LocaleFlag locale={value} />
                  {tLocale(LOCALE_SHORT_KEYS[value])}.
                </SegmentedButton>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-1.5 px-1 text-xs font-medium text-muted-foreground">
              {t("theme")}
            </p>
            <div className="flex rounded-lg bg-muted p-1">
              <SegmentedButton
                isSelected={activeTheme === "light"}
                aria-label={t("themeLight")}
                onClick={() => setTheme("light")}
                className="flex-1"
              >
                <IconSun className="size-4" />
              </SegmentedButton>
              <SegmentedButton
                isSelected={activeTheme === "dark"}
                aria-label={t("themeDark")}
                onClick={() => setTheme("dark")}
                className="flex-1"
              >
                <IconMoon className="size-4" />
              </SegmentedButton>
            </div>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          variant="destructive"
          onSelect={(event) => {
            event.preventDefault()
            handleLogout()
          }}
        >
          <IconLogout />
          {t("logout")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
