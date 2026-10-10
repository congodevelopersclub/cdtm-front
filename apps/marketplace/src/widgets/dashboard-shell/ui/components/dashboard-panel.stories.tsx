import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { DashboardPanel } from "./dashboard-panel"

const meta = {
  title: "Marketplace/Widgets/DashboardShell/DashboardPanel",
  component: DashboardPanel,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    i18n: { app: "marketplace", locale: "en" },
  },
} satisfies Meta<typeof DashboardPanel>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithContent: Story = {
  render: () => (
    <DashboardPanel className="flex items-center justify-center p-8">
      <p className="text-sm text-muted-foreground">Panel content goes here</p>
    </DashboardPanel>
  ),
}
