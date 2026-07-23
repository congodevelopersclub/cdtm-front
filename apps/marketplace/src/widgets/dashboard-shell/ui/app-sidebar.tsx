"use client"

import Image from "next/image"
import Link from "next/link"

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@workspace/ui/components/sidebar"

import type { DashboardRole, DashboardUser } from "../config/types"
import { getDashboardNav } from "../config/menus"

import { NavMain } from "./nav-main"
import { NavProfile } from "./nav-profile"

type AppSidebarProps = React.ComponentProps<typeof Sidebar> & {
  role: DashboardRole
  user: DashboardUser
}

export function AppSidebar({ role, user, ...props }: AppSidebarProps) {
  const navItems = getDashboardNav(role)

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader className="gap-3 px-2">
        <SidebarMenu className="mb-5">
          <SidebarMenuItem >
            <SidebarMenuButton
              asChild
              className="h-auto justify-center data-[slot=sidebar-menu-button]:p-2!"
            >
              <Link
                href="/"
                className="flex flex-col items-center gap-2 py-1 text-center"
              >
                <div className="flex size-10 items-center justify-center overflow-hidden">
                  <Image
                    src="/images/logo.svg"
                    alt="Congo developers club Logo"
                    width={40}
                    height={40}
                    className="size-full object-contain"
                  />
                </div>
                <span className="text-sm leading-tight font-semibold">
                  CDC Marketplace
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <NavProfile user={user} />
      </SidebarHeader>
      <SidebarContent className="px-2">
        <NavMain items={navItems} />
      </SidebarContent>
    </Sidebar>
  )
}
