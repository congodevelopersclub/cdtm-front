import { describe, expect, it } from "vitest"

import {
  filterProfilesByName,
  hasActiveTalentsDirectoryFilters,
} from "./filter-talent-profiles"
import {
  buildTalentsDirectorySearchParams,
  parseSkillList,
  toProfilesQuery,
} from "./parse-talents-directory-filters"

const filters = {
  name: "Christian",
  location: "Goma",
  category: "frontend",
  skills: ["php", "laravel"],
}

describe("talent directory search", () => {
  it("keeps distinct skill names from a comma-separated list", () => {
    expect(parseSkillList("php, laravel, php")).toEqual(["php", "laravel"])
  })

  it("sends location, category, and skills to the search query", () => {
    expect(toProfilesQuery(filters, 2)).toEqual({
      page: 2,
      location: "Goma",
      category: "frontend",
      skills: "php,laravel",
    })
    expect(hasActiveTalentsDirectoryFilters(filters)).toBe(true)
  })

  it("filters the loaded profiles by name", () => {
    const profiles = [
      { name: "Christian Siku" },
      { name: "Patrick Nahayo" },
      { name: "Gracieux Sikuly" },
    ]

    expect(filterProfilesByName(profiles, "siku")).toEqual([
      { name: "Christian Siku" },
      { name: "Gracieux Sikuly" },
    ])
    expect(filterProfilesByName(profiles, "  ")).toEqual(profiles)
  })

  it("keeps the filters in the page link", () => {
    expect(buildTalentsDirectorySearchParams(filters, 2).toString()).toBe(
      "page=2&name=Christian&location=Goma&category=frontend&skills=php%2Claravel"
    )
  })
})