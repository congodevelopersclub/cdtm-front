import { describe, expect, it } from "vitest"
import { renderWithProviders, screen } from "@/test/render"

import { ProfileHeaderCard } from "./profile-header-card"

import { MOCK_TALENT_PROFILE } from "@/entities/talent"

describe("ProfileHeaderCard", () => {
  it("renders profile name, role, and skills", () => {
    renderWithProviders(<ProfileHeaderCard profile={MOCK_TALENT_PROFILE} />)

    expect(screen.getByText(MOCK_TALENT_PROFILE.name)).toBeInTheDocument()
    expect(screen.getByText(MOCK_TALENT_PROFILE.title)).toBeInTheDocument()
    expect(screen.getByText("React")).toBeInTheDocument()
  })

  it("shows verified indicator when profile is verified", () => {
    renderWithProviders(
      <ProfileHeaderCard profile={{ ...MOCK_TALENT_PROFILE, verified: true }} />
    )

    expect(screen.getAllByTitle(/verified/i).length).toBeGreaterThan(0)
  })
})
