import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, userEvent, within } from "storybook/test"

import { STORY_AUTH_SESSION, STORY_DASHBOARD_USER } from "@/widgets/dashboard-shell/storybook/fixtures"

import { DashboardUserMenu } from "./dashboard-user-menu"

const meta = {
  title: "Marketplace/Widgets/DashboardShell/DashboardUserMenu",
  component: DashboardUserMenu,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    i18n: { app: "marketplace", locale: "en" },
    auth: { session: STORY_AUTH_SESSION },
  },
  args: {
    user: STORY_DASHBOARD_USER,
  },
} satisfies Meta<typeof DashboardUserMenu>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const French: Story = {
  parameters: {
    i18n: { app: "marketplace", locale: "fr" },
  },
}

export const OpenMenu: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole("button"))
    await expect(canvas.getByText(/account settings|settings/i)).toBeVisible()
  },
}
