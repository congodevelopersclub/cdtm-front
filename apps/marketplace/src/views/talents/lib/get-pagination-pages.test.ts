import { describe, expect, it } from "vitest"

import { getPaginationPages } from "./get-pagination-pages"

describe("getPaginationPages", () => {
  it("shows all pages when there are five or fewer", () => {
    expect(getPaginationPages(1, 5)).toEqual([1, 2, 3, 4, 5])
  })

  it("shows first three, ellipsis, and last two on the first page", () => {
    expect(getPaginationPages(1, 11)).toEqual([1, 2, 3, "ellipsis", 10, 11])
  })

  it("reveals nearby pages while navigating in the middle", () => {
    expect(getPaginationPages(5, 11)).toEqual([
      1,
      2,
      3,
      4,
      5,
      6,
      "ellipsis",
      10,
      11,
    ])
  })

  it("reveals nearby pages near the end", () => {
    expect(getPaginationPages(9, 11)).toEqual([
      1,
      2,
      3,
      "ellipsis",
      8,
      9,
      10,
      11,
    ])
  })
})
