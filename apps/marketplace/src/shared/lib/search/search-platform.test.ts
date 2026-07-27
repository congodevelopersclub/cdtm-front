import { describe, expect, it } from "vitest"

import type { SearchResult } from "./types"
import { searchPlatform } from "./search-platform"

const INDEX: SearchResult[] = [
  {
    id: "page-jobs",
    type: "page",
    title: "Jobs",
    href: "/jobs",
    keywords: ["jobs", "careers", "employment"],
  },
  {
    id: "skill-react",
    type: "skill",
    title: "React",
    subtitle: "Superpower skill",
    href: "/skills",
    keywords: ["react", "frontend", "javascript"],
  },
  {
    id: "person-christian",
    type: "person",
    title: "Christian Siku",
    subtitle: "Full Stack Developer",
    href: "/profile",
    keywords: ["christian", "siku", "developer", "react"],
  },
  {
    id: "job-senior-fe",
    type: "job",
    title: "Senior Frontend Developer",
    subtitle: "Kinshasa, DRC",
    href: "/jobs",
    keywords: ["frontend", "react", "senior"],
  },
]

describe("searchPlatform", () => {
  it("returns quick page links when query is empty", () => {
    const results = searchPlatform("", INDEX)

    expect(results).toHaveLength(1)
    expect(results[0]?.type).toBe("page")
    expect(results[0]?.title).toBe("Jobs")
  })

  it("finds skills and people for react query", () => {
    const results = searchPlatform("react", INDEX)

    expect(results.map((item) => item.id)).toEqual([
      "skill-react",
      "person-christian",
      "job-senior-fe",
    ])
  })

  it("finds jobs page and job listing for jobs query", () => {
    const results = searchPlatform("jobs", INDEX)

    expect(results.some((item) => item.id === "page-jobs")).toBe(true)
    expect(results.some((item) => item.id === "job-senior-fe")).toBe(false)
  })

  it("prioritizes title matches over keyword-only matches", () => {
    const results = searchPlatform("christian", INDEX)

    expect(results[0]?.id).toBe("person-christian")
  })
})
