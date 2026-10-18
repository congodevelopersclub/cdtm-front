import { describe, expect, it } from "vitest"
import { renderWithProviders, screen, userEvent } from "@/test/render"

import { ProfileHeaderCard } from "./profile-header-card"

import { MOCK_TALENT_PROFILE } from "@/entities/talent"

describe("ProfileHeaderCard", () => {
  it("renders profile name, role, and skills", () => {
    renderWithProviders(<ProfileHeaderCard profile={MOCK_TALENT_PROFILE} />)

    expect(screen.getByText(MOCK_TALENT_PROFILE.name)).toBeInTheDocument()
    expect(screen.getByText(MOCK_TALENT_PROFILE.title)).toBeInTheDocument()
    expect(screen.getByText("React")).toBeInTheDocument()
  })

  it("links LinkedIn and GitHub when they are set", () => {
    renderWithProviders(<ProfileHeaderCard profile={MOCK_TALENT_PROFILE} />)

    expect(screen.getByRole("link", { name: /linkedin/i })).toHaveAttribute(
      "href",
      MOCK_TALENT_PROFILE.socialLinks.linkedin
    )
    expect(screen.getByRole("link", { name: /github/i })).toHaveAttribute(
      "href",
      MOCK_TALENT_PROFILE.socialLinks.github
    )
  })

  it("shows a disabled button when LinkedIn or GitHub is missing", async () => {
    const user = userEvent.setup()

    renderWithProviders(
      <ProfileHeaderCard
        profile={{
          ...MOCK_TALENT_PROFILE,
          socialLinks: {},
        }}
      />
    )

    const linkedIn = screen.getByRole("button", { name: /linkedin/i })
    const gitHub = screen.getByRole("button", { name: /github/i })

    expect(linkedIn).toBeDisabled()
    expect(gitHub).toBeDisabled()

    await user.hover(linkedIn.parentElement as HTMLElement)

    expect(await screen.findByRole("tooltip")).toHaveTextContent(/not configured/i)
  })

  it("shows verified indicator when profile is verified", () => {
    renderWithProviders(
      <ProfileHeaderCard profile={{ ...MOCK_TALENT_PROFILE, verified: true }} />
    )

    expect(screen.getAllByTitle(/verified/i).length).toBeGreaterThan(0)
  })
})
