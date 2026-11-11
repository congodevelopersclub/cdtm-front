import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Input } from "./input"
import { Label } from "./label"

const meta = {
  title: "Design System/Input",
  component: Input,
  tags: ["autodocs"],
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="grid w-full max-w-sm gap-2">
      <Label htmlFor="email">Email</Label>
      <Input id="email" placeholder="you@example.com" type="email" />
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <div className="grid w-full max-w-sm gap-2">
      <Label htmlFor="disabled">Email</Label>
      <Input disabled id="disabled" placeholder="Disabled" />
    </div>
  ),
}

export const Invalid: Story = {
  render: () => (
    <div className="grid w-full max-w-sm gap-2">
      <Label htmlFor="invalid">Email</Label>
      <Input aria-invalid id="invalid" placeholder="Invalid" />
    </div>
  ),
}
