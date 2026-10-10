import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { MOCK_TALENT_PROFILE } from "@/entities/talent"

import { MyStoryTab } from "./my-story-tab"

const meta = {
  title: "Marketplace/Views/Profile/MyStoryTab",
  component: MyStoryTab,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    i18n: { app: "marketplace", locale: "en" },
  },
  args: {
    profile: MOCK_TALENT_PROFILE,
  },
} satisfies Meta<typeof MyStoryTab>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const French: Story = {
  parameters: {
    i18n: { app: "marketplace", locale: "fr" },
  },
}
