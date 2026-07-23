"use client"

import type { ComponentType, ReactNode } from "react"

import { SidebarProvider } from "@workspace/ui/components/sidebar"

export function SidebarStoryWrapper({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider defaultOpen>
      <div className="flex min-h-[480px] w-full">{children}</div>
    </SidebarProvider>
  )
}

export function sidebarDecorator(Story: ComponentType) {
  return (
    <SidebarStoryWrapper>
      <Story />
    </SidebarStoryWrapper>
  )
}

export const marketplaceStoryParams = {
  layout: "padded" as const,
  i18n: { app: "marketplace" as const, locale: "en" as const },
}
