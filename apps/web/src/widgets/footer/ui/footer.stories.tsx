import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Footer } from "./footer"

const meta = {
  title: "Web/Widgets/Footer",
  component: Footer,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    i18n: { app: "web", locale: "en" },
  },
} satisfies Meta<typeof Footer>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const French: Story = {
  parameters: {
    i18n: { app: "web", locale: "fr" },
  },
}
