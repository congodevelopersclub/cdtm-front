import { describe, expect, it } from "vitest"
import { renderWithProviders, screen } from "@/test/render"

import { ProfileCompletionCard } from "./profile-completion-card"

describe("ProfileCompletionCard", () => {
  it("renders completion percent and checklist links", () => {
    renderWithProviders(<ProfileCompletionCard />)

    expect(screen.getByText(/your profile is/i)).toBeInTheDocument()
    expect(screen.getByRole("link", { name: /location/i })).toBeInTheDocument()
    expect(screen.getByRole("link", { name: /role/i })).toBeInTheDocument()
  })
})
