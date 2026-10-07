import { ApiError } from "@workspace/api"
import { beforeEach, describe, expect, it, vi } from "vitest"

import { updateProfileAction } from "./update-profile"

const { patchMock, getUserMock, getSessionMock, ensureSkillMock, cookieState } = vi.hoisted(() => ({
  patchMock: vi.fn(),
  getUserMock: vi.fn(),
  getSessionMock: vi.fn(),
  ensureSkillMock: vi.fn(),
  cookieState: { token: "token" as string | undefined },
}))

vi.mock("@/entities/skill/actions/skills", () => ({
  ensureSkillAction: ensureSkillMock,
}))

vi.mock("@/shared/api/server-client", () => ({
  createServerApiClient: () => ({
    patch: patchMock,
  }),
}))

vi.mock("next/headers", () => ({
  cookies: async () => ({
    get: () => (cookieState.token ? { value: cookieState.token } : undefined),
  }),
}))

vi.mock("@/shared/auth/session", () => ({
  getSessionFromToken: getSessionMock,
}))

vi.mock("@/entities/user/actions/get-user", () => ({
  getUserAction: getUserMock,
}))

const profileResponse = {
  data: {
    data: {
      id: 1,
      user_id: 1,
      email: "cathryn@email.com",
      name: "tester something",
      headline: "Forming Machine Operator updated",
      bio: "updated.",
      avatar_url: null,
      location: "goma",
      status: "feelance",
      account_status: "PENDING_VALIDATION",
      created_at: "2026-09-19T12:24:31.000000Z",
      updated_at: "2026-09-29T13:15:30.000000Z",
      skills: [
        {
          id: 15,
          name: "Laravel",
          slug: "laravel",
          details: { proficiency: 5, years_experience: 6 },
        },
      ],
      projects: [],
    },
  },
}

const input = {
  name: "tester something",
  email: "cathryn@email.com",
  bio: "updated.",
  headline: "Forming Machine Operator updated",
  location: "goma",
  status: "part-time",
  account_status: "PENDING_VALIDATION",
  skills: [{ name: "Laravel", proficiency: 5, years_experience: 4 }],
  projects: [
    {
      id: null,
      title: "Portfolio Website",
      description: "A personal portfolio website built with Laravel.",
      link: "https://portfolio.example.com",
    },
  ],
}

describe("updateProfileAction", () => {
  beforeEach(() => {
    vi.clearAllMocks()
    cookieState.token = "token"
    getSessionMock.mockReturnValue({ userId: "user-1", email: "cathryn@email.com" })
  })

  it("updates the signed-in user's profile", async () => {
    getUserMock.mockResolvedValue({ profile: { id: "1" } })
    patchMock.mockResolvedValue(profileResponse)

    const profile = await updateProfileAction("1", input)

    expect(getUserMock).toHaveBeenCalledWith("user-1", "token")
    expect(patchMock).toHaveBeenCalledWith("/profiles/1", input, {
      headers: { Authorization: "Bearer token" },
    })
    expect(profile.name).toBe("tester something")
    expect(profile.location).toBe("goma")
    expect(profile.skillDetails?.[0]?.name).toBe("Laravel")
    expect(ensureSkillMock).not.toHaveBeenCalled()
  })

  it("creates a missing catalog skill and retries the profile update", async () => {
    getUserMock.mockResolvedValue({ profile: { id: "1" } })
    patchMock
      .mockRejectedValueOnce(
        new ApiError("The given data was invalid.", 422, undefined, {
          message: "The given data was invalid.",
          errors: {
            "skills.0.name": ["The selected skills.0.name is invalid."],
          },
        })
      )
      .mockResolvedValueOnce(profileResponse)

    await updateProfileAction("1", input, "user-1")

    expect(ensureSkillMock).toHaveBeenCalledWith("Laravel")
    expect(patchMock).toHaveBeenCalledTimes(2)
  })

  it("sends the access token when the session is not a jwt", async () => {
    cookieState.token = "4|plain-text-token"
    getSessionMock.mockReturnValue(null)
    getUserMock.mockResolvedValue({ profile: { id: "1" } })
    patchMock.mockResolvedValue(profileResponse)

    await updateProfileAction("1", input, "user-1")

    expect(getUserMock).toHaveBeenCalledWith("user-1", "4|plain-text-token")
    expect(patchMock).toHaveBeenCalledWith("/profiles/1", input, {
      headers: { Authorization: "Bearer 4|plain-text-token" },
    })
  })

  it("rejects updates without an access token", async () => {
    cookieState.token = undefined

    await expect(updateProfileAction("1", input, "user-1")).rejects.toThrow("Unauthorized")
    expect(patchMock).not.toHaveBeenCalled()
  })

  it("rejects updates to another profile", async () => {
    getUserMock.mockResolvedValue({ profile: { id: "2" } })

    await expect(updateProfileAction("1", input)).rejects.toThrow(
      "You can only update your own profile"
    )
    expect(patchMock).not.toHaveBeenCalled()
  })
})
