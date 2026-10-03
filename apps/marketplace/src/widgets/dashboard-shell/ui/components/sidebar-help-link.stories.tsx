import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { SidebarHelpLink } from "./sidebar-help-link"

const meta = {
  title: "Marketplace/Widgets/DashboardShell/SidebarHelpLink",
  component: SidebarHelpLink,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    i18n: { app: "marketplace", locale: "en" },
  },
} satisfies Meta<typeof SidebarHelpLink>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const French: Story = {
  parameters: {
    i18n: { app: "marketplace", locale: "fr" },
  },
}
