import { describe, expect, it, beforeEach, afterEach } from "vitest"
import { renderWithProviders, screen, userEvent } from "@/test/render"

import { LoginAuthPanel } from "./login-auth-panel"

describe("LoginAuthPanel", () => {
  const originalLocation = window.location

  beforeEach(() => {
    Object.defineProperty(window, "location", {
      configurable: true,
      value: { ...originalLocation, href: "http://localhost:3001/auth" },
    })
  })

  afterEach(() => {
    Object.defineProperty(window, "location", {
      configurable: true,
      value: originalLocation,
    })
  })

  it("renders LinkedIn sign-in button", () => {
    renderWithProviders(<LoginAuthPanel />)

    expect(
      screen.getByRole("button", { name: /sign in with linkedin/i })
    ).toBeInTheDocument()
  })

  it("redirects to LinkedIn auth URL on click", async () => {
    const user = userEvent.setup()

    renderWithProviders(<LoginAuthPanel />)

    await user.click(
      screen.getByRole("button", { name: /sign in with linkedin/i })
    )

    expect(window.location.href).toContain("/auth")
  })
})
