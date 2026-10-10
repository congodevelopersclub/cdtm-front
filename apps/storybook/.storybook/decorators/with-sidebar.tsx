"use client"

import type { Decorator } from "@storybook/nextjs-vite"

import { SidebarProvider } from "@workspace/ui/components/sidebar"

export const withSidebar: Decorator = (Story) => (
  <SidebarProvider defaultOpen>
    <div className="flex min-h-[480px] w-full">
      <Story />
    </div>
  </SidebarProvider>
)
