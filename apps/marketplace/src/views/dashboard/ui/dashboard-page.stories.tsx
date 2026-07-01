import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { DashboardPage } from "./dashboard-page"

const meta = {
  title: "Marketplace/Pages/DashboardPage",
  component: DashboardPage,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    i18n: { app: "marketplace", locale: "en" },
  },
} satisfies Meta<typeof DashboardPage>

export default meta
type Story = StoryObj<typeof meta>

export const SessionLoading: Story = {
  parameters: {
    auth: {
      session: null,
    },
  },
}

export const SignedIn: Story = {
  parameters: {
    auth: {
      session: {
        userId: "user-1",
        email: "demo@example.com",
      },
    },
  },
}
