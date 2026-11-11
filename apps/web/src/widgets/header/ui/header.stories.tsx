import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Header } from "./header"

const meta = {
  title: "Web/Widgets/Header",
  component: Header,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    i18n: { app: "web", locale: "en" },
  },
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const French: Story = {
  parameters: {
    i18n: { app: "web", locale: "fr" },
  },
}
