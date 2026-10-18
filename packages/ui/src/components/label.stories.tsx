import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Label } from "./label"

const meta = {
  title: "Design System/Label",
  component: Label,
  tags: ["autodocs"],
} satisfies Meta<typeof Label>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: "Email address",
    htmlFor: "label-demo",
  },
}
