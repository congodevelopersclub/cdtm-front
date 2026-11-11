import { describe, expect, it } from "vitest"

import { clearBrowserCookies } from "./clear-browser-cookies"

describe("clearBrowserCookies", () => {
  it("expires every cookie visible to the browser", () => {
    document.cookie = "sidebar_state=true; path=/"
    document.cookie = "NEXT_LOCALE=en; path=/"

    clearBrowserCookies()

    expect(document.cookie).not.toContain("sidebar_state")
    expect(document.cookie).not.toContain("NEXT_LOCALE")
  })
})
