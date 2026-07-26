"use client"

import { useTransition } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useLocale, useTranslations } from "next-intl"
import { useTheme } from "next-themes"
import {
  IconLanguage,
  IconLogout,
  IconMoon,
  IconSettings,
  IconSun,
} from "@tabler/icons-react"

import { type Locale } from "@workspace/i18n"
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

import type { DashboardUser } from "../../config/types"

import { useLogout } from "@/features/auth"
import { setLocale } from "@/shared/i18n/actions/set-locale"

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("")
}

type DashboardUserMenuProps = {
  user: DashboardUser
}

export function DashboardUserMenu({ user }: DashboardUserMenuProps) {
  const t = useTranslations("SidebarNav")
  const locale = useLocale() as Locale
  const router = useRouter()
  const logout = useLogout()
  const { resolvedTheme, setTheme } = useTheme()
  const [isPending, startTransition] = useTransition()

  const nextLocale = locale === "en" ? "fr" : "en"
  const isDark = resolvedTheme === "dark"
  const subtitle = user.title ?? user.email

  function handleLocaleChange() {
    startTransition(async () => {
      await setLocale(nextLocale)
      router.refresh()
    })
  }

  function handleThemeToggle() {
    setTheme(isDark ? "light" : "dark")
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
          <Avatar className="size-10 rounded-full sm:size-12">
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
          <DropdownMenuItem
            disabled={isPending}
            onSelect={(event) => {
              event.preventDefault()
              handleLocaleChange()
            }}
          >
            <IconLanguage />
            {nextLocale === "en" ? t("english") : t("french")}
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={(event) => {
              event.preventDefault()
              handleThemeToggle()
            }}
          >
            {isDark ? <IconSun /> : <IconMoon />}
            {isDark ? t("themeLight") : t("themeDark")}
          </DropdownMenuItem>
        </DropdownMenuGroup>
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
