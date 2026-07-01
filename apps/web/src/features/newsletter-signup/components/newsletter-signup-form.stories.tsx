import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, userEvent, within } from "storybook/test"

import { NewsletterSignupForm } from "./newsletter-signup-form"

const meta = {
  title: "Web/Features/NewsletterSignupForm",
  component: NewsletterSignupForm,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    i18n: { app: "web", locale: "en" },
  },
} satisfies Meta<typeof NewsletterSignupForm>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const SubmitSuccess: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.type(
      canvas.getByLabelText(/email/i),
      "demo@example.com"
    )
    await userEvent.click(
      canvas.getByRole("button", { name: /subscribe/i })
    )
    await expect(document.body).toBeTruthy()
  },
}
