import { describe, expect, it } from "vitest"

import { inferTalentCategories } from "./infer-talent-categories"

describe("inferTalentCategories", () => {
  it("infers frontend and fullstack from profile text", () => {
    expect(
      inferTalentCategories({
        title: "Full Stack Developer",
        bio: "React specialist",
        skills: ["React", "Node.js"],
      })
    ).toEqual(["fullstack", "frontend", "backend"])
  })

  it("returns empty array when no categories match", () => {
    expect(
      inferTalentCategories({
        title: "Consultant",
        bio: "",
        skills: [],
      })
    ).toEqual([])
  })
})
