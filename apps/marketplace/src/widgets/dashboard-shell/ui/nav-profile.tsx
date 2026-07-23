"use client"

import Link from "next/link"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@workspace/ui/components/sidebar"

import type { DashboardUser } from "../config/types"

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("")
}

export function NavProfile({ user }: { user: DashboardUser }) {
  return (
    <SidebarMenu className="mb-5">
      <SidebarMenuItem>
        <SidebarMenuButton size="lg" asChild className="h-auto justify-center px-2">
          <Link
            href="/profile"
            className="flex w-full flex-col items-center justify-center gap-2 py-1"
          >
            <Avatar className="size-16 rounded-lg">
              {user.avatar ? (
                <AvatarImage src={user.avatar} alt={user.name} />
              ) : null}
              <AvatarFallback className="rounded-lg">
                {getInitials(user.name)}
              </AvatarFallback>
            </Avatar>
            <div className="grid w-full text-center text-sm leading-tight">
              <span className="truncate font-medium">{user.name}</span>
              <span className="truncate text-xs text-muted-foreground">
                Full Stack Developer
              </span>
            </div>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
