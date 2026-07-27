import { describe, expect, it, vi } from "vitest"
import { renderWithProviders, screen, userEvent } from "@/test/render"

import { DashboardGlobalSearch } from "./dashboard-global-search"

const pushMock = vi.fn()

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
    refresh: vi.fn(),
  }),
  usePathname: vi.fn(() => "/dashboard"),
  useSearchParams: () => new URLSearchParams(),
}))

describe("DashboardGlobalSearch", () => {
  it("shows grouped results when typing a skill query", async () => {
    const user = userEvent.setup()

    renderWithProviders(<DashboardGlobalSearch role="talent" />)

    const input = screen.getByRole("combobox")
    await user.click(input)
    await user.type(input, "React")

    expect(screen.getByText("Skills")).toBeInTheDocument()
    expect(screen.getAllByText("React").length).toBeGreaterThan(0)
    expect(screen.getByText("People")).toBeInTheDocument()
  })

  it("navigates when a person result is selected", async () => {
    const user = userEvent.setup()
    pushMock.mockClear()

    renderWithProviders(<DashboardGlobalSearch role="talent" />)

    const input = screen.getByRole("combobox")
    await user.click(input)
    await user.type(input, "Amina")

    await user.click(screen.getByText("Amina Kabila"))

    expect(pushMock).toHaveBeenCalledWith("/talents/talent-002")
  })

  it("navigates when a result is selected", async () => {
    const user = userEvent.setup()
    pushMock.mockClear()

    renderWithProviders(<DashboardGlobalSearch role="talent" />)

    const input = screen.getByRole("combobox")
    await user.click(input)
    await user.type(input, "Jobs")

    await user.click(screen.getAllByText("Jobs")[0]!)

    expect(pushMock).toHaveBeenCalledWith("/jobs")
  })

  it("renders French group labels", async () => {
    const user = userEvent.setup()

    renderWithProviders(<DashboardGlobalSearch role="talent" />, { locale: "fr" })

    const input = screen.getByRole("combobox")
    await user.click(input)
    await user.type(input, "React")

    expect(screen.getByText("Compétences")).toBeInTheDocument()
  })
})
