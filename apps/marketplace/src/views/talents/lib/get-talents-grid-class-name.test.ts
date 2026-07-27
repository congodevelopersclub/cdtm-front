import { describe, expect, it } from "vitest"

import { getTalentsGridClassName } from "./get-talents-grid-class-name"

describe("getTalentsGridClassName", () => {
  it("uses three columns on xl when the sidebar is open", () => {
    expect(getTalentsGridClassName(true)).toContain("xl:grid-cols-3")
    expect(getTalentsGridClassName(true)).not.toContain("xl:grid-cols-4")
  })

  it("uses four columns on xl when the sidebar is closed", () => {
    expect(getTalentsGridClassName(false)).toContain("xl:grid-cols-4")
    expect(getTalentsGridClassName(false)).not.toContain("xl:grid-cols-3")
  })
})
