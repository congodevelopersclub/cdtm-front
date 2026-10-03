import { describe, expect, it, vi, beforeEach } from "vitest"
import { renderWithProviders, screen, userEvent } from "@/test/render"

import { LoginAuthPanel } from "./login-auth-panel"

const { startLinkedInAuthMock } = vi.hoisted(() => ({
  startLinkedInAuthMock: vi.fn(),
}))

vi.mock("../hooks/use-linkedin-auth", () => ({
  useLinkedInAuth: () => ({
    startLinkedInAuth: startLinkedInAuthMock,
    isRedirecting: false,
  }),
}))

describe("LoginAuthPanel", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("renders LinkedIn sign-in button", () => {
    renderWithProviders(<LoginAuthPanel />)

    expect(
      screen.getByRole("button", { name: /continue with linkedin/i })
    ).toBeInTheDocument()
  })

  it("starts LinkedIn auth on click", async () => {
    const user = userEvent.setup()

    renderWithProviders(<LoginAuthPanel />)

    await user.click(
      screen.getByRole("button", { name: /continue with linkedin/i })
    )

    expect(startLinkedInAuthMock).toHaveBeenCalled()
  })
})
