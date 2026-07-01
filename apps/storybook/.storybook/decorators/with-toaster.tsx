import { Toaster } from "@workspace/ui/components/sonner"
import type { Decorator } from "@storybook/nextjs-vite"

export const withToaster: Decorator = (Story) => (
  <>
    <Story />
    <Toaster />
  </>
)
