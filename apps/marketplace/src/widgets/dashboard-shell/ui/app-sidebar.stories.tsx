import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { SidebarProvider } from "@workspace/ui/components/sidebar"

import { STORY_DASHBOARD_USER } from "@/widgets/dashboard-shell/storybook/fixtures"

import { AppSidebar } from "./app-sidebar"

const meta = {
  title: "Marketplace/Widgets/DashboardShell/AppSidebar",
  component: AppSidebar,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <SidebarProvider defaultOpen>
        <div className="flex min-h-[640px] w-full">
          <Story />
        </div>
      </SidebarProvider>
    ),
  ],
  parameters: {
    layout: "fullscreen",
    i18n: { app: "marketplace", locale: "en" },
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: "/dashboard",
      },
    },
  },
  args: {
    role: "talent" as const,
    user: STORY_DASHBOARD_USER,
  },
} satisfies Meta<typeof AppSidebar>

export default meta
type Story = StoryObj<typeof meta>

export const TalentRole: Story = {}

export const French: Story = {
  parameters: {
    i18n: { app: "marketplace", locale: "fr" },
  },
}

export const Collapsed: Story = {
  decorators: [
    (Story) => (
      <SidebarProvider defaultOpen={false}>
        <div className="flex min-h-[640px] w-full">
          <Story />
        </div>
      </SidebarProvider>
    ),
  ],
}
