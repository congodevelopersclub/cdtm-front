"use client"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { toast } from "sonner"

import { Button } from "./button"
import { Toaster } from "./sonner"

const meta = {
  title: "Design System/Sonner",
  component: Toaster,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Toaster>

export default meta
type Story = StoryObj<typeof meta>

export const ToastDemo: Story = {
  render: () => (
    <>
      <div className="flex flex-wrap gap-2">
        <Button
          onClick={() => toast.success("Changes saved successfully.")}
          variant="outline"
        >
          Success
        </Button>
        <Button
          onClick={() => toast.error("Something went wrong.")}
          variant="outline"
        >
          Error
        </Button>
        <Button
          onClick={() => toast.info("New update available.")}
          variant="outline"
        >
          Info
        </Button>
      </div>
      <Toaster />
    </>
  ),
}
