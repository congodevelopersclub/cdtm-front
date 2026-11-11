import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { SectionCards } from "./section-cards"

const meta = {
  title: "Marketplace/Pages/SectionCards",
  component: SectionCards,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    i18n: { app: "marketplace", locale: "en" },
  },
} satisfies Meta<typeof SectionCards>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
