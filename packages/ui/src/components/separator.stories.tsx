import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Separator } from "./separator"

const meta = {
  title: "Design System/Separator",
  component: Separator,
  tags: ["autodocs"],
} satisfies Meta<typeof Separator>

export default meta
type Story = StoryObj<typeof meta>

export const Horizontal: Story = {
  render: () => (
    <div className="w-64 space-y-2">
      <p className="text-sm">Section one</p>
      <Separator />
      <p className="text-sm">Section two</p>
    </div>
  ),
}

export const Vertical: Story = {
  render: () => (
    <div className="flex h-8 items-center gap-3">
      <span className="text-sm">Left</span>
      <Separator orientation="vertical" />
      <span className="text-sm">Right</span>
    </div>
  ),
}
