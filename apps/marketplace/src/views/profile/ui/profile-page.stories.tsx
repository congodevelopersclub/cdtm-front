import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { ProfilePage } from "./profile-page"

const meta = {
  title: "Marketplace/Views/Profile/ProfilePage",
  component: ProfilePage,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    i18n: { app: "marketplace", locale: "en" },
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-5xl">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ProfilePage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const French: Story = {
  parameters: {
    i18n: { app: "marketplace", locale: "fr" },
  },
}
