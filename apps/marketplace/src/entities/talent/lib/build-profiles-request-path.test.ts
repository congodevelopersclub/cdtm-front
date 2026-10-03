import { describe, expect, it } from "vitest"

import { buildProfilesRequestPath } from "./build-profiles-request-path"

describe("buildProfilesRequestPath", () => {
  it("builds paginated request path", () => {
    expect(buildProfilesRequestPath({ page: 2 })).toBe("/profiles?page=2")
  })

  it("includes search and filter params when provided", () => {
    expect(
      buildProfilesRequestPath({
        page: 1,
        search: "react",
        category: "frontend",
        verified: true,
      })
    ).toBe("/profiles?page=1&search=react&category=frontend&verified=1")
  })
})
