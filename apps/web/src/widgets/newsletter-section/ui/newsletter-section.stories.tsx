import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { NewsletterSection } from "./newsletter-section"

const meta = {
  title: "Web/Widgets/NewsletterSection",
  component: NewsletterSection,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    i18n: { app: "web", locale: "en" },
  },
} satisfies Meta<typeof NewsletterSection>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
