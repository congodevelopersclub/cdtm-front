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
    skills: ["React", "TypeScript", "Node.js", "Next.js", "PostgreSQL"],
    projects: [],
    experience: [],
    socialLinks: {},
    ...overrides,
  }
}

describe("getProfileCompletion", () => {
  it("scores location, role, top skills, and experience out of 100", () => {
    const { percent, items } = getProfileCompletion(
      profile({
        location: "Goma",
        title: "Developer",
        superpowerSkills: ["React", "TypeScript", "Node.js"],
        experience: [
          { role: "Developer", company: "CDC", period: "2024", description: "Built apps" },
        ],
      })
    )

    expect(items.map((item) => item.key)).toEqual([
      "location",
      "role",
      "topSkills",
      "experience",
    ])
    expect(items.map((item) => item.percent)).toEqual([20, 40, 20, 20])
    expect(percent).toBe(100)
  })

  it("counts only the completed items", () => {
    const { percent } = getProfileCompletion(profile({ location: "Goma" }))

    expect(percent).toBe(20)
  })
})
