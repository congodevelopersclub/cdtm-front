import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { STORY_DASHBOARD_USER } from "@/widgets/dashboard-shell/storybook/fixtures"
import { DashboardShell } from "@/widgets/dashboard-shell"

import { DashboardOverviewGrid } from "./components/dashboard-overview-grid"

const meta = {
  title: "Marketplace/Pages/DashboardPage",
  component: DashboardShell,
  tags: ["autodocs"],
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
    children: <DashboardOverviewGrid />,
  },
} satisfies Meta<typeof DashboardShell>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const French: Story = {
  parameters: {
    i18n: { app: "marketplace", locale: "fr" },
  },
}
