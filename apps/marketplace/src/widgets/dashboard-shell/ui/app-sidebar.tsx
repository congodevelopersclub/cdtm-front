"use client"

import Image from "next/image"
import Link from "next/link"
import { useTranslations } from "next-intl"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@workspace/ui/components/sidebar"

import type { DashboardRole, DashboardUser } from "../config/types"
import { getDashboardNav } from "../config/menus"

import { SidebarHelpLink } from "./components/sidebar-help-link"
import { NavMain } from "./nav-main"

type AppSidebarProps = React.ComponentProps<typeof Sidebar> & {
  role: DashboardRole
  user: DashboardUser
}

export function AppSidebar({ role, ...props }: AppSidebarProps) {
  const t = useTranslations("HomePage")
  const navItems = getDashboardNav(role)

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader className="px-4 pt-6 pb-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="h-auto p-0 hover:bg-transparent">
              <Link href="/" className="flex items-center gap-2">
                <div className="flex size-8 items-center justify-center overflow-hidden">
                  <Image
                    src="/images/logo.svg"
                    alt="Congo developers club Logo"
                    width={32}
                    height={32}
                    className="size-full object-contain"
                  />
                </div>
                <span className="text-sm font-semibold">{t("title")}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="px-2">
        <NavMain items={navItems} />
      </SidebarContent>
      <SidebarFooter className="px-2 pb-4">
        <SidebarHelpLink />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
