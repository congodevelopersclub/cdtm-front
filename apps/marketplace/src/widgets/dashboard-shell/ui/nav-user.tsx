"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useLocale, useTranslations } from "next-intl"
import { useTheme } from "next-themes"
import { useTransition } from "react"
import {
  IconDotsVertical,
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
import {
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@workspace/ui/components/sidebar"

import { clearToken } from "@/shared/auth"
import { setLocale } from "@/shared/i18n/actions/set-locale"
import { useAuth } from "@/shared/providers/auth-provider"

import type { DashboardUser } from "../config/types"

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("")
}

export function NavUser({ user }: { user: DashboardUser }) {
  const t = useTranslations("SidebarNav")
  const locale = useLocale() as Locale
  const router = useRouter()
  const { refreshSession } = useAuth()
  const { resolvedTheme, setTheme } = useTheme()
  const { isMobile } = useSidebar()
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
    clearToken()
    refreshSession()
    router.push("/login")
  }

  return (
    <SidebarFooter className="px-2 pb-3">
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
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
                <IconDotsVertical className="ml-auto size-4" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
              side={isMobile ? "bottom" : "right"}
              align="end"
              sideOffset={4}
            >
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
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  )
}
