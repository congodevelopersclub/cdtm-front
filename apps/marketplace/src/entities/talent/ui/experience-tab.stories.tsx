import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { MOCK_TALENT_PROFILE } from "@/entities/talent"

import { ExperienceTab } from "./experience-tab"

const meta = {
  title: "Marketplace/Views/Profile/ExperienceTab",
  component: ExperienceTab,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    i18n: { app: "marketplace", locale: "en" },
  },
  args: {
    profile: MOCK_TALENT_PROFILE,
  },
} satisfies Meta<typeof ExperienceTab>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const French: Story = {
  parameters: {
    i18n: { app: "marketplace", locale: "fr" },
  },
}
