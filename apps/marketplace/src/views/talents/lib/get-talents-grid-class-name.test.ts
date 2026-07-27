import { describe, expect, it } from "vitest"

import { getTalentsGridClassName } from "./get-talents-grid-class-name"

describe("getTalentsGridClassName", () => {
  it("uses three columns on xl when the sidebar is open", () => {
    const className = getTalentsGridClassName(true)
    const classes = className.split(/\s+/)

    expect(classes).toContain("xl:grid-cols-3")
    expect(classes).not.toContain("xl:grid-cols-4")
  })

  it("uses four columns on xl when the sidebar is closed", () => {
    const className = getTalentsGridClassName(false)
    const classes = className.split(/\s+/)

    expect(classes).toContain("xl:grid-cols-4")
    expect(classes).not.toContain("xl:grid-cols-3")
  })

  it("uses two columns from sm on all sidebar states", () => {
    expect(getTalentsGridClassName(true)).toContain("sm:grid-cols-2")
    expect(getTalentsGridClassName(false)).toContain("sm:grid-cols-2")
  })

  it("never collapses to one column on md when the sidebar is open", () => {
    expect(getTalentsGridClassName(true)).not.toContain("md:grid-cols-1")
  })

  it("caps at four columns on 2xl", () => {
    expect(getTalentsGridClassName(true)).toContain("2xl:grid-cols-4")
    expect(getTalentsGridClassName(false)).toContain("2xl:grid-cols-4")
    expect(getTalentsGridClassName(false)).not.toContain("2xl:grid-cols-5")
  })
})
