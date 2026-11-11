import { describe, expect, it } from "vitest"

import { apiErrorMessage } from "@workspace/api"

describe("apiErrorMessage", () => {
  it("uses the field errors instead of the generic validation message", () => {
    expect(
      apiErrorMessage(
        {
          message: "The given data was invalid.",
          errors: {
            "projects.0.link": ["The projects.0.link field must be a valid URL."],
            "skills.0.name": ["The selected skills.0.name is invalid."],
          },
        },
        "Request failed"
      )
    ).toBe(
      "projects.0.link: The projects.0.link field must be a valid URL. skills.0.name: The selected skills.0.name is invalid."
    )
  })
})
