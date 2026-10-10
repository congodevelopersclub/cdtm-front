import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, userEvent, within } from "storybook/test"

import { STORY_SAMPLE_TABS } from "@/widgets/dashboard-shell/storybook/fixtures"

import { DashboardTabbedShell } from "./dashboard-tabbed-shell"

const meta = {
  title: "Marketplace/Widgets/DashboardShell/DashboardTabbedShell",
  component: DashboardTabbedShell,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    i18n: { app: "marketplace", locale: "en" },
  },
  args: {
    tabs: STORY_SAMPLE_TABS,
    defaultTab: "overview",
  },
} satisfies Meta<typeof DashboardTabbedShell>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const TabSwitch: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole("tab", { name: "Activity" }))
    await expect(canvas.getByText("Activity panel content")).toBeVisible()
    await expect(
      canvas.queryByText("Overview panel content")
    ).not.toBeInTheDocument()
  },
}
