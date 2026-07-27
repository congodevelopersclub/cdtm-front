import { describe, expect, it } from "vitest"
import { renderWithProviders, screen } from "@/test/render"

import { DashboardEmptyState } from "./dashboard-empty-state"

describe("DashboardEmptyState", () => {
  it("renders title and description", () => {
    renderWithProviders(
      <DashboardEmptyState
        title="No invites yet"
        description="When you are invited to submit an application for jobs they will appear here."
      />
    )

    expect(screen.getByRole("heading", { name: "No invites yet" })).toBeInTheDocument()
    expect(
      screen.getByText(
        "When you are invited to submit an application for jobs they will appear here."
      )
    ).toBeInTheDocument()
  })
})
