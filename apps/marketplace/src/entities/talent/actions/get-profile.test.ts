import { beforeEach, describe, expect, it, vi } from "vitest"

import { getProfileAction } from "./get-profile"

const { getMock } = vi.hoisted(() => ({
  getMock: vi.fn(),
}))

vi.mock("@/shared/api/server-client", () => ({
  createServerApiClient: () => ({
    get: getMock,
  }),
}))

describe("getProfileAction", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("fetches a profile by id and maps it", async () => {
    getMock.mockResolvedValue({
      data: {
        data: {
          id: "profile-1",
          user_id: "user-1",
          email: "demo@example.com",
          name: "Demo Talent",
          headline: "Developer",
          bio: "Bio",
          avatar_url: null,
          location: "Kinshasa",
          status: "full-time",
          account_status: "VALIDATED",
          created_at: "2026-07-26T16:32:51.000000Z",
          updated_at: "2026-07-26T16:32:51.000000Z",
          skills: [],
          projects: [],
        },
      },
    })

    const profile = await getProfileAction("profile-1")

    expect(getMock).toHaveBeenCalledWith("/profiles/profile-1")
    expect(profile.name).toBe("Demo Talent")
    expect(profile.bio).toBe("Bio")
  })
})
