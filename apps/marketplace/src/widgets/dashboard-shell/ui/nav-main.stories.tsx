import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { getDashboardNav } from "@/widgets/dashboard-shell/config/menus"
import { sidebarDecorator } from "@/widgets/dashboard-shell/storybook/decorators"

import { NavMain } from "./nav-main"

const meta = {
  title: "Marketplace/Widgets/DashboardShell/NavMain",
  component: NavMain,
  tags: ["autodocs"],
  decorators: [sidebarDecorator],
  parameters: {
    layout: "padded",
    i18n: { app: "marketplace", locale: "en" },
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: "/dashboard",
      },
    },
  },
  args: {
    items: getDashboardNav("talent"),
  },
} satisfies Meta<typeof NavMain>

export default meta
type Story = StoryObj<typeof meta>

export const TalentNav: Story = {}

export const JobsActive: Story = {
  parameters: {
    nextjs: {
      navigation: {
        pathname: "/jobs",
      },
    },
  },
}
