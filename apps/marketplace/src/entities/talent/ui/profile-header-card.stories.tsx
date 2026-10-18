import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { MOCK_TALENT_PROFILE } from "@/entities/talent"

import { ProfileHeaderCard } from "./profile-header-card"

const meta = {
  title: "Marketplace/Views/Profile/ProfileHeaderCard",
  component: ProfileHeaderCard,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    i18n: { app: "marketplace", locale: "en" },
  },
  args: {
    profile: MOCK_TALENT_PROFILE,
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-4xl">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ProfileHeaderCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Verified: Story = {
  args: {
    profile: { ...MOCK_TALENT_PROFILE, verified: true },
  },
}

export const French: Story = {
  parameters: {
    i18n: { app: "marketplace", locale: "fr" },
  },
}

export const Mobile: Story = {
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
}
