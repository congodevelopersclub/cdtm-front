import { describe, expect, it } from "vitest"

import { buildProfilesRequestPath } from "./build-profiles-request-path"

describe("buildProfilesRequestPath", () => {
  it("builds paginated request path", () => {
    expect(buildProfilesRequestPath({ page: 2 })).toBe("/profiles/search?page=2")
  })

  it("includes location, category, and comma-separated skills", () => {
    expect(
      buildProfilesRequestPath({
        page: 1,
        location: "Goma",
        category: "frontend",
        skills: "php,laravel",
      })
    ).toBe("/profiles/search?page=1&location=Goma&category=frontend&skills=php%2Claravel")
  })
})
