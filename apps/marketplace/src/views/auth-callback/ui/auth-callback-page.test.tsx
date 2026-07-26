import { describe, expect, it, vi, beforeEach } from "vitest"

import { AuthCallbackPage } from "./auth-callback-page"
import { renderWithProviders, waitFor } from "@/test/render"

const { mutateMock } = vi.hoisted(() => ({
  mutateMock: vi.fn(),
}))

vi.mock("@/features/login/hooks/use-exchange-code", () => ({
  useExchangeCode: () => ({
    mutate: mutateMock,
    isPending: false,
    isError: false,
    isSuccess: false,
  }),
}))

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    refresh: vi.fn(),
  }),
  usePathname: vi.fn(() => "/auth/callback"),
  useSearchParams: vi.fn(() => new URLSearchParams("code=mock-code")),
}))

describe("AuthCallbackPage", () => {
  beforeEach(() => {
    mutateMock.mockClear()
  })

  it("exchanges authorization code on mount", async () => {
    renderWithProviders(<AuthCallbackPage />)

    await waitFor(() => {
      expect(mutateMock).toHaveBeenCalledWith("mock-code")
    })
  })
})
