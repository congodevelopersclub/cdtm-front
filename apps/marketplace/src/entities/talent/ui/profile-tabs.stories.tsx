import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, userEvent, within } from "storybook/test"

import { MOCK_TALENT_PROFILE } from "@/entities/talent"

import { ProfileTabs } from "./profile-tabs"

const meta = {
  title: "Marketplace/Views/Profile/ProfileTabs",
  component: ProfileTabs,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    i18n: { app: "marketplace", locale: "en" },
  },
  args: {
    profile: MOCK_TALENT_PROFILE,
  },
} satisfies Meta<typeof ProfileTabs>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const French: Story = {
  parameters: {
    i18n: { app: "marketplace", locale: "fr" },
  },
}

export const TabSwitch: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole("tab", { name: /skills/i }))
    await expect(canvas.getByText(/all skills/i)).toBeVisible()
  },
}
