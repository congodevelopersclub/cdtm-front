"use client"

import Image from "next/image"
import Link from "next/link"
import { useTranslations } from "next-intl"

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@workspace/ui/components/sidebar"

import type { DashboardRole, DashboardUser } from "../config/types"
import { getDashboardNav } from "../config/menus"

import { NavMain } from "./nav-main"

type AppSidebarProps = React.ComponentProps<typeof Sidebar> & {
  role: DashboardRole
  user: DashboardUser
}

export function AppSidebar({ role, user: _user, ...props }: AppSidebarProps) {
  const t = useTranslations("HomePage")
  const navItems = getDashboardNav(role)

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader className="px-4 pt-6 pb-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="h-auto p-0 hover:bg-transparent">
              <Link href="/" className="flex items-center gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-xl">
                  <Image
                    src="/images/logo.svg"
                    alt="Congo developers club Logo"
                    width={40}
                    height={40}
                    className="size-full object-contain"
                  />
                </div>
                <p className="text-sm leading-tight font-semibold whitespace-normal">
                  {t("title")}
                </p>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="px-2">
        <NavMain items={navItems} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
