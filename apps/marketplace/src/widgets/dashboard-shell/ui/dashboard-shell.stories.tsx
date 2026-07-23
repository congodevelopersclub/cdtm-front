import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { DashboardEmptyState } from "./components/dashboard-empty-state"
import { STORY_DASHBOARD_USER } from "@/widgets/dashboard-shell/storybook/fixtures"

import { DashboardShell } from "./dashboard-shell"

const meta = {
  title: "Marketplace/Widgets/DashboardShell/DashboardShell",
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
    children: (
      <DashboardEmptyState
        title="No recent activity"
        description="Your job applications, profile updates, and other activity will appear here."
      />
    ),
  },
} satisfies Meta<typeof DashboardShell>

export default meta
type Story = StoryObj<typeof meta>

export const FullLayout: Story = {}

export const French: Story = {
  parameters: {
    i18n: { app: "marketplace", locale: "fr" },
  },
  args: {
    children: (
      <DashboardEmptyState
        title="Aucune activité récente"
        description="Vos candidatures, mises à jour de profil et autres activités apparaîtront ici."
      />
    ),
  },
}
