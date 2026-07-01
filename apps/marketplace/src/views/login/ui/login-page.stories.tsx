import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { LoginPage } from "./login-page"

const meta = {
  title: "Marketplace/Pages/LoginPage",
  component: LoginPage,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    i18n: { app: "marketplace", locale: "en" },
  },
} satisfies Meta<typeof LoginPage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
