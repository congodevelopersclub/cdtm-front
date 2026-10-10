import { beforeEach, describe, expect, it, vi } from "vitest"

import { TalentsPagination } from "./talents-pagination"
import { renderWithProviders, screen, userEvent } from "@/test/render"

const pushMock = vi.fn()

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
  }),
  useSearchParams: () => new URLSearchParams("page=1"),
}))

describe("TalentsPagination", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("disables previous on page 1", () => {
    renderWithProviders(
      <TalentsPagination currentPage={1} lastPage={3} total={60} />
    )

    expect(screen.getByRole("button", { name: /previous/i })).toBeDisabled()
  })

  it("navigates to selected page", async () => {
    const user = userEvent.setup()

    renderWithProviders(
      <TalentsPagination currentPage={1} lastPage={3} total={60} />
    )

    await user.click(screen.getByRole("button", { name: "2" }))

    expect(pushMock).toHaveBeenCalledWith("/talents?page=2")
  })

  it("shows first three, ellipsis, and last two for long page ranges", () => {
    renderWithProviders(
      <TalentsPagination currentPage={1} lastPage={11} total={110} />
    )

    expect(screen.getByRole("button", { name: "1" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "2" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "3" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "10" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "11" })).toBeInTheDocument()
    expect(screen.queryByRole("button", { name: "4" })).not.toBeInTheDocument()
    expect(screen.getByText("...")).toBeInTheDocument()
  })
})
