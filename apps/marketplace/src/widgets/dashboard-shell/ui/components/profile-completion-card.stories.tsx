import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { ProfileCompletionCard } from "./profile-completion-card"

const meta = {
  title: "Marketplace/Widgets/DashboardShell/ProfileCompletionCard",
  component: ProfileCompletionCard,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    i18n: { app: "marketplace", locale: "en" },
  },
  decorators: [
    (Story) => (
      <div className="w-60">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ProfileCompletionCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const French: Story = {
  parameters: {
    i18n: { app: "marketplace", locale: "fr" },
  },
}
