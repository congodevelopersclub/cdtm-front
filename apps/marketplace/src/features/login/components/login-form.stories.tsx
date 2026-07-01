import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { http, HttpResponse } from "msw"
import { expect, userEvent, within } from "storybook/test"

import { LoginForm } from "./login-form"

const meta = {
  title: "Marketplace/Features/LoginForm",
  component: LoginForm,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    i18n: { app: "marketplace", locale: "en" },
  },
} satisfies Meta<typeof LoginForm>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const ValidationErrors: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole("button", { name: /sign in/i }))
    await expect(canvas.getAllByRole("alert").length).toBeGreaterThan(0)
  },
}

export const ApiError: Story = {
  parameters: {
    msw: {
      handlers: [
        http.post("*/auth/login", () =>
          HttpResponse.json({ message: "Invalid credentials" }, { status: 401 })
        ),
      ],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.type(canvas.getByLabelText(/email/i), "demo@example.com")
    await userEvent.type(canvas.getByLabelText(/password/i), "password123")
    await userEvent.click(canvas.getByRole("button", { name: /sign in/i }))
  },
}

export const Success: Story = {
  parameters: {
    msw: {
      handlers: [
        http.post("*/auth/login", () =>
          HttpResponse.json({
            tokens: { accessToken: "storybook-token" },
            user: { id: "1", email: "demo@example.com" },
          })
        ),
      ],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.type(canvas.getByLabelText(/email/i), "demo@example.com")
    await userEvent.type(canvas.getByLabelText(/password/i), "password123")
    await userEvent.click(canvas.getByRole("button", { name: /sign in/i }))
  },
}
