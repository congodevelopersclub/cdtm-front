import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { LocaleSwitcher } from "./locale-switcher"

const meta = {
  title: "Web/Widgets/LocaleSwitcher",
  component: LocaleSwitcher,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    i18n: { app: "web", locale: "en" },
  },
} satisfies Meta<typeof LocaleSwitcher>

export default meta
type Story = StoryObj<typeof meta>

export const English: Story = {
  parameters: {
    i18n: { app: "web", locale: "en" },
  },
}

export const French: Story = {
  parameters: {
    i18n: { app: "web", locale: "fr" },
  },
}
