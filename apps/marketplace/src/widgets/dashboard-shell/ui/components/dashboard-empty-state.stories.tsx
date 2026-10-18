import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { DashboardEmptyState } from "./dashboard-empty-state"

const meta = {
  title: "Marketplace/Widgets/DashboardShell/DashboardEmptyState",
  component: DashboardEmptyState,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    i18n: { app: "marketplace", locale: "en" },
  },
  args: {
    title: "No invites yet",
    description:
      "When you are invited to submit an application for jobs they will appear here.",
  },
} satisfies Meta<typeof DashboardEmptyState>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const French: Story = {
  parameters: {
    i18n: { app: "marketplace", locale: "fr" },
  },
  args: {
    title: "Aucune invitation pour le moment",
    description:
      "Lorsque vous serez invité à postuler, les offres apparaîtront ici.",
  },
}
