import { describe, expect, it } from "vitest"

import { ProfileTabs } from "./profile-tabs"
import { renderWithProviders, screen, userEvent } from "@/test/render"

import { MOCK_TALENT_PROFILE } from "@/entities/talent"

describe("ProfileTabs", () => {
  it("renders all profile tabs", () => {
    renderWithProviders(<ProfileTabs profile={MOCK_TALENT_PROFILE} />)

    expect(screen.getByRole("tab", { name: /my story/i })).toBeInTheDocument()
    expect(screen.getByRole("tab", { name: /skills/i })).toBeInTheDocument()
    expect(screen.getByRole("tab", { name: /projects/i })).toBeInTheDocument()
    expect(screen.getByRole("tab", { name: /experience/i })).toBeInTheDocument()
  })

  it("switches to skills tab content", async () => {
    const user = userEvent.setup()

    renderWithProviders(<ProfileTabs profile={MOCK_TALENT_PROFILE} />)

    await user.click(screen.getAllByRole("tab", { name: /^skills$/i })[0]!)

    expect(screen.getByText(/all skills/i)).toBeInTheDocument()
  })
})
