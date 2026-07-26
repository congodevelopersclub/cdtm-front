import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { http, HttpResponse } from "msw"

import { AuthCallbackPage } from "./auth-callback-page"

const meta = {
  title: "Marketplace/Pages/AuthCallbackPage",
  component: AuthCallbackPage,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    i18n: { app: "marketplace", locale: "en" },
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: "/auth/callback",
        query: { code: "mock-auth-code" },
      },
    },
    msw: {
      handlers: [
        http.post("*/auth/exchange-code", () =>
          HttpResponse.json({
            token: "storybook-token",
            user: {
              id: "1",
              name: "Christian Siku",
              email: "demo@example.com",
              avatar_url: null,
            },
          })
        ),
        http.get("*/users/1", () =>
          HttpResponse.json({
            data: {
              id: "1",
              name: "Christian Siku",
              email: "demo@example.com",
              avatar_url: null,
              role: "USER",
              profile: {
                id: "profile-1",
                user_id: "1",
                email: "demo@example.com",
                name: "Christian Siku",
                account_status: "PENDING_VALIDATION",
              },
            },
          })
        ),
      ],
    },
  },
} satisfies Meta<typeof AuthCallbackPage>

export default meta
type Story = StoryObj<typeof meta>

export const ExchangingCode: Story = {}

export const MissingCode: Story = {
  parameters: {
    nextjs: {
      navigation: {
        pathname: "/auth/callback",
        query: {},
      },
    },
  },
}
