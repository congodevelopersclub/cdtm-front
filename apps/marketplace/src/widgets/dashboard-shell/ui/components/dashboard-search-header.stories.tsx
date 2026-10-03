import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { sidebarDecorator } from "@/widgets/dashboard-shell/storybook/decorators"
import { STORY_DASHBOARD_USER } from "@/widgets/dashboard-shell/storybook/fixtures"

import { DashboardSearchHeader } from "./dashboard-search-header"

const meta = {
  title: "Marketplace/Widgets/DashboardShell/DashboardSearchHeader",
  component: DashboardSearchHeader,
  tags: ["autodocs"],
  decorators: [sidebarDecorator],
  parameters: {
    layout: "fullscreen",
    i18n: { app: "marketplace", locale: "en" },
  },
  args: {
    role: "talent" as const,
    user: STORY_DASHBOARD_USER,
  },
} satisfies Meta<typeof DashboardSearchHeader>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const French: Story = {
  parameters: {
    i18n: { app: "marketplace", locale: "fr" },
  },
}

export const WithQuery: Story = {
  parameters: {
    docs: {
      description: {
        story: "Type in the search field to see grouped platform results.",
      },
    },
  },
}
