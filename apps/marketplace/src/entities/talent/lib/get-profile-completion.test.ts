import { describe, expect, it } from "vitest"

import type { TalentProfile } from "../model/types"

import { getProfileCompletion } from "./get-profile-completion"

function profile(overrides: Partial<TalentProfile> = {}): TalentProfile {
  return {
    id: "profile-1",
    name: "Demo Talent",
    email: "demo@example.com",
    title: "",
    location: "",
    experienceYears: 0,
    status: "open_to_opportunities",
    verified: false,
    bio: "",
    superpowerSkills: [],
    skills: [],
    projects: [],
    experience: [],
    socialLinks: {},
    ...overrides,
  }
}

describe("getProfileCompletion", () => {
  it("scores location, role, and top skills out of 100", () => {
    const { percent, items } = getProfileCompletion(
      profile({
        location: "Goma",
        title: "Developer",
        skills: ["React", "TypeScript", "Node.js"],
      })
    )

    expect(items.map((item) => item.key)).toEqual(["location", "role", "topSkills"])
    expect(items.every((item) => item.done)).toBe(true)
    expect(percent).toBe(100)
  })

  it("counts only the completed items", () => {
    const { percent, items } = getProfileCompletion(profile({ location: "Goma" }))

    expect(percent).toBe(25)
    expect(items.find((item) => item.key === "location")?.done).toBe(true)
    expect(items.find((item) => item.key === "role")?.done).toBe(false)
    expect(items.find((item) => item.key === "topSkills")?.done).toBe(false)
  })

  it("treats placeholder role as incomplete", () => {
    const { items, percent } = getProfileCompletion(
      profile({ title: "—", location: "Goma" })
    )

    expect(items.find((item) => item.key === "role")?.done).toBe(false)
    expect(percent).toBe(25)
  })

  it("marks top skills complete from skillDetails or skills", () => {
    const fromSkills = getProfileCompletion(
      profile({
        skills: ["React", "TypeScript", "Node.js"],
      })
    )
    const fromDetails = getProfileCompletion(
      profile({
        skillDetails: [
          {
            id: "1",
            name: "React",
            slug: "react",
            proficiency: 8,
            yearsExperience: 2,
          },
          {
            id: "2",
            name: "TypeScript",
            slug: "typescript",
            proficiency: 7,
            yearsExperience: 2,
          },
          {
            id: "3",
            name: "Node.js",
            slug: "nodejs",
            proficiency: 6,
            yearsExperience: 1,
          },
        ],
      })
    )

    expect(fromSkills.items.find((item) => item.key === "topSkills")?.done).toBe(
      true
    )
    expect(fromDetails.items.find((item) => item.key === "topSkills")?.done).toBe(
      true
    )
    expect(fromSkills.percent).toBe(25)
    expect(fromDetails.percent).toBe(25)
  })

  it("keeps top skills incomplete with fewer than 3 skills", () => {
    const { items, percent } = getProfileCompletion(
      profile({
        location: "Goma",
        title: "Developer",
        skills: ["React", "TypeScript"],
      })
    )

    expect(items.find((item) => item.key === "topSkills")?.done).toBe(false)
    expect(percent).toBe(75)
  })
})
