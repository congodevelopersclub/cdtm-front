import { describe, expect, it } from "vitest"

import type { ApiProfile } from "../model/api-types"

import { mapApiProfileToTalentProfile } from "./map-api-profile"

const baseApiProfile: ApiProfile = {
  id: "profile-1",
  user_id: "user-1",
  email: "demo@example.com",
  name: "Demo Talent",
  headline: "Full Stack Developer",
  bio: "Bio paragraph",
  avatar_url: "https://example.com/avatar.png",
  location: "Kinshasa, DRC",
  status: "full-time",
  account_status: "VALIDATED",
  created_at: "2026-07-26T16:32:51.000000Z",
  updated_at: "2026-07-26T16:32:51.000000Z",
  skills: [
    {
      id: "skill-1",
      name: "React",
      slug: "react",
      details: { proficiency: 5, years_experience: 4 },
    },
    {
      id: "skill-2",
      name: "Node.js",
      slug: "nodejs",
      details: { proficiency: 3, years_experience: 6 },
    },
  ],
  projects: [
    {
      id: "project-1",
      title: "Marketplace",
      description: "Built a marketplace",
      link: "https://example.com",
      profile_id: "profile-1",
      created_at: "2025-03-01T00:00:00.000000Z",
      updated_at: "2025-03-01T00:00:00.000000Z",
    },
  ],
}

describe("mapApiProfileToTalentProfile", () => {
  it("maps core fields and verified status", () => {
    const profile = mapApiProfileToTalentProfile(baseApiProfile)

    expect(profile.title).toBe("Full Stack Developer")
    expect(profile.verified).toBe(true)
    expect(profile.skills).toEqual(["React", "Node.js"])
    expect(profile.superpowerSkills).toEqual(["React", "Node.js"])
    expect(profile.experienceYears).toBe(6)
    expect(profile.employmentStatus).toBe("full-time")
    expect(profile.showAvailabilityBadge).toBe(false)
  })

  it("handles null headline and bio", () => {
    const profile = mapApiProfileToTalentProfile({
      ...baseApiProfile,
      headline: null,
      bio: null,
      location: null,
    })

    expect(profile.title).toBe("—")
    expect(profile.bio).toBe("")
    expect(profile.location).toBe("")
  })

  it("maps project year from created_at", () => {
    const profile = mapApiProfileToTalentProfile(baseApiProfile)

    expect(profile.projects[0]?.year).toBe("2025")
  })
})
