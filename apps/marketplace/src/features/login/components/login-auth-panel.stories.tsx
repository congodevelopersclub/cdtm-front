import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, userEvent, within } from "storybook/test"

import { LoginAuthPanel } from "./login-auth-panel"

const meta = {
  title: "Marketplace/Features/LoginAuthPanel",
  component: LoginAuthPanel,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    i18n: { app: "marketplace", locale: "en" },
  },
} satisfies Meta<typeof LoginAuthPanel>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const French: Story = {
  parameters: {
    i18n: { app: "marketplace", locale: "fr" },
  },
}

export const LinkedInRedirect: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(
      canvas.getByRole("button", { name: /sign in with linkedin/i })
    )
  },
}
