import { describe, expect, it } from "vitest"

import { getSkillAccentClass, getSkillOverflowLabel } from "./get-skill-accent-class"

describe("getSkillOverflowLabel", () => {
  it("returns null when there is no overflow", () => {
    expect(getSkillOverflowLabel(0)).toBeNull()
  })

  it("returns exact count up to 9", () => {
    expect(getSkillOverflowLabel(3)).toBe("+3")
    expect(getSkillOverflowLabel(9)).toBe("+9")
  })

  it("caps label at +9 when overflow exceeds 9", () => {
    expect(getSkillOverflowLabel(10)).toBe("+9")
    expect(getSkillOverflowLabel(15)).toBe("+9")
  })
})

describe("getSkillAccentClass", () => {
  it("returns a stable accent class for a skill", () => {
    expect(getSkillAccentClass("React")).toBe(getSkillAccentClass("React"))
    expect(getSkillAccentClass("React")).toMatch(/bg-/)
  })
})
