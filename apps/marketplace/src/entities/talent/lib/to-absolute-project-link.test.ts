import { describe, expect, it } from "vitest"

import { toAbsoluteProjectLink } from "./to-absolute-project-link"

describe("toAbsoluteProjectLink", () => {
  it("keeps an absolute url exactly as entered", () => {
    expect(toAbsoluteProjectLink("https://github.com/congodevelopersclub/site")).toBe(
      "https://github.com/congodevelopersclub/site"
    )
    expect(toAbsoluteProjectLink("  http://example.com/demo  ")).toBe("http://example.com/demo")
  })

  it("turns a bare host into an external url instead of a path on this site", () => {
    expect(toAbsoluteProjectLink("github.com/congodevelopersclub/site")).toBe(
      "https://github.com/congodevelopersclub/site"
    )
    expect(toAbsoluteProjectLink("//example.com/work")).toBe("https://example.com/work")
  })
})
