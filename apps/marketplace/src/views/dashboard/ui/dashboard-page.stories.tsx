import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { STORY_DASHBOARD_USER } from "@/widgets/dashboard-shell/storybook/fixtures"
import { DashboardShell } from "@/widgets/dashboard-shell"

import { SectionCards } from "./components/section-cards"
import { DashboardTabbedShell } from "@/widgets/dashboard-shell/ui/components/dashboard-tabbed-shell"

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
    children: (
      <DashboardTabbedShell
        defaultTab="overview"
        tabs={[
          {
            value: "overview",
            label: "Overview",
            content: <SectionCards />,
          },
          {
            value: "activity",
            label: "Activity",
            content: (
              <div className="rounded-3xl border border-border bg-card p-12 text-center">
                <p className="text-sm text-muted-foreground">No recent activity</p>
              </div>
            ),
          },
        ]}
      />
    ),
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
