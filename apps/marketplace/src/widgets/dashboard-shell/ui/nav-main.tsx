"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTranslations } from "next-intl"

import { cn } from "@workspace/ui/lib/utils"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
} from "@workspace/ui/components/sidebar"

import type { NavItem } from "../config/types"

export function NavMain({ items }: { items: NavItem[] }) {
  const t = useTranslations("DashboardShell")
  const pathname = usePathname()

  return (
    <SidebarGroup className="p-0">
      <SidebarGroupContent>
        <SidebarMenu className="gap-1">
          {items.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(`${item.href}/`)

            return (
              <SidebarMenuItem key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex h-12 w-full items-center gap-3 rounded-full px-4 text-sm transition-colors",
                    isActive
                      ? "bg-surface-nav-active font-medium text-sidebar-accent-foreground"
                      : "text-sidebar-foreground hover:bg-muted/60"
                  )}
                >
                  <item.icon className="size-5 shrink-0" />
                  <span className="truncate">{t(item.titleKey)}</span>
                </Link>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
