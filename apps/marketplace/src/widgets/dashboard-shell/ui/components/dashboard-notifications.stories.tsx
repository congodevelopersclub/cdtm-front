import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, userEvent, within } from "storybook/test"

import { DashboardNotifications } from "./dashboard-notifications"

const meta = {
  title: "Marketplace/Widgets/DashboardShell/DashboardNotifications",
  component: DashboardNotifications,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    i18n: { app: "marketplace", locale: "en" },
  },
} satisfies Meta<typeof DashboardNotifications>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const French: Story = {
  parameters: {
    i18n: { app: "marketplace", locale: "fr" },
  },
}

export const OpenDropdown: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole("button", { name: /notifications/i }))
    await expect(canvas.getByText("Notifications")).toBeVisible()
  },
}
