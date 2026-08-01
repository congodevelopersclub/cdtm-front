import { describe, expect, it } from "vitest"

import type { TalentProfile } from "@/entities/talent"

import { filterTalentProfiles } from "./filter-talent-profiles"

const profile: TalentProfile = {
  id: "profile-1",
  name: "Demo Talent",
  email: "demo@example.com",
  title: "Full Stack Developer",
  location: "Kinshasa, DRC",
  experienceYears: 4,
  status: "open_to_opportunities",
  verified: true,
  bio: "React and Node.js specialist",
  superpowerSkills: ["React"],
  skills: ["React", "Node.js", "TypeScript"],
  projects: [],
  experience: [],
  socialLinks: {},
  categories: ["frontend", "fullstack"],
}

describe("filterTalentProfiles", () => {
  it("matches search query using shared search scoring", () => {
    const results = filterTalentProfiles([profile], {
      search: "react",
      category: null,
      verified: null,
    })

    expect(results).toHaveLength(1)
  })

  it("filters by category and verification", () => {
    const results = filterTalentProfiles([profile], {
      search: "",
      category: "frontend",
      verified: true,
    })

    expect(results).toHaveLength(1)

    const emptyResults = filterTalentProfiles([profile], {
      search: "",
      category: "design",
      verified: true,
    })

    expect(emptyResults).toHaveLength(0)
  })
})
