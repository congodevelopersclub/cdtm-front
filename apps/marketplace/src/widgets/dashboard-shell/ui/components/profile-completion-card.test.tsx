import { describe, expect, it } from "vitest"
import { renderWithProviders, screen } from "@/test/render"

import { ProfileCompletionCard } from "./profile-completion-card"

describe("ProfileCompletionCard", () => {
  it("stays hidden when the profile is already complete", () => {
    renderWithProviders(<ProfileCompletionCard />)

    expect(screen.queryByText(/your profile is/i)).not.toBeInTheDocument()
    expect(screen.queryByRole("link", { name: /work experience/i })).not.toBeInTheDocument()
  })
})
