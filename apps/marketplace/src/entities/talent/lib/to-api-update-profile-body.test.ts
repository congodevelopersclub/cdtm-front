import { describe, expect, it } from "vitest"

import { toApiUpdateProfileBody } from "./to-api-update-profile-body"

const input = {
  name: "tester something",
  email: "tester7@email.com",
  bio: "updated.",
  headline: "Forming Machine Operator updated",
  location: "goma",
  status: "part-time",
  account_status: "PENDING_VALIDATION",
  skills: [{ name: "Laravel", proficiency: 5, years_experience: 6 }],
  projects: [
    {
      id: "4",
      title: "Portfolio Website",
      description: "A personal portfolio website built with Laravel.",
      link: "github.com/congodevelopersclub/site",
    },
  ],
}

describe("toApiUpdateProfileBody", () => {
  it("sends the profile fields the API validates", () => {
    expect(toApiUpdateProfileBody(input)).toEqual({
      name: "tester something",
      email: "tester7@email.com",
      bio: "updated.",
      headline: "Forming Machine Operator updated",
      location: "goma",
      status: "part-time",
      account_status: "PENDING_VALIDATION",
      skills: [{ name: "Laravel", proficiency: 5, years_experience: 5 }],
      projects: [
        {
          id: 4,
          title: "Portfolio Website",
          description: "A personal portfolio website built with Laravel.",
          link: "https://github.com/congodevelopersclub/site",
        },
      ],
    })
  })

  it("keeps a new project id null and drops an empty link", () => {
    expect(
      toApiUpdateProfileBody({
        ...input,
        status: "",
        projects: [{ id: null, title: "Notes", description: "", link: "" }],
      }).projects
    ).toEqual([{ id: null, title: "Notes", description: "", link: null }])
  })

  it("uses the entered link instead of a localhost path", () => {
    expect(
      toApiUpdateProfileBody({
        ...input,
        projects: [
          {
            id: null,
            title: "Site",
            description: "Demo",
            link: "http://localhost:3000/github.com/congodevelopersclub/site",
          },
        ],
      }).projects[0]?.link
    ).toBe("https://github.com/congodevelopersclub/site")
  })
})
