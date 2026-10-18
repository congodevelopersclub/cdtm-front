import { describe, expect, it } from "vitest"

import {
  clampSkillProficiency,
  clampSkillYears,
  isValidSkillProficiency,
  isValidSkillYears,
} from "./skill-bounds"

describe("skill bounds", () => {
  it("accepts proficiency from 1 to 5 only", () => {
    expect(isValidSkillProficiency(1)).toBe(true)
    expect(isValidSkillProficiency(5)).toBe(true)
    expect(isValidSkillProficiency(0)).toBe(false)
    expect(isValidSkillProficiency(6)).toBe(false)
    expect(isValidSkillProficiency(4.5)).toBe(false)
  })

  it("accepts years from 1 to 100 only", () => {
    expect(isValidSkillYears(1)).toBe(true)
    expect(isValidSkillYears(100)).toBe(true)
    expect(isValidSkillYears(0)).toBe(false)
    expect(isValidSkillYears(101)).toBe(false)
    expect(isValidSkillYears(12.5)).toBe(false)
  })

  it("clamps proficiency and years to the allowed ranges", () => {
    expect(clampSkillProficiency(0)).toBe(1)
    expect(clampSkillProficiency(9)).toBe(5)
    expect(clampSkillYears(0)).toBe(1)
    expect(clampSkillYears(140)).toBe(100)
  })
})
