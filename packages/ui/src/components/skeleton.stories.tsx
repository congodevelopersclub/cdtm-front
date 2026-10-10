import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Skeleton } from "./skeleton"

const meta = {
  title: "Design System/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
} satisfies Meta<typeof Skeleton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-24 w-full rounded-xl" />
    </div>
  ),
}
