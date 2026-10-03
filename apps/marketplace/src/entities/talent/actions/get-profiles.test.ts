import { beforeEach, describe, expect, it, vi } from "vitest"

import { getProfilesAction } from "./get-profiles"

const { getMock } = vi.hoisted(() => ({
  getMock: vi.fn(),
}))

vi.mock("@/shared/api/server-client", () => ({
  createServerApiClient: () => ({
    get: getMock,
  }),
}))

describe("getProfilesAction", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("fetches paginated profiles and maps them", async () => {
    getMock.mockResolvedValue({
      data: {
        current_page: 1,
        data: [
          {
            id: "profile-1",
            user_id: "user-1",
            email: "demo@example.com",
            name: "Demo Talent",
            headline: "Developer",
            bio: null,
            avatar_url: null,
            location: "Kinshasa",
            status: "full-time",
            account_status: "VALIDATED",
            created_at: "2026-07-26T16:32:51.000000Z",
            updated_at: "2026-07-26T16:32:51.000000Z",
            skills: [],
            projects: [],
          },
        ],
        first_page_url: "https://example.com/profiles?page=1",
        from: 1,
        last_page: 11,
        last_page_url: "https://example.com/profiles?page=11",
        next_page_url: "https://example.com/profiles?page=2",
        path: "https://example.com/profiles",
        per_page: 20,
        prev_page_url: null,
        to: 20,
        total: 202,
      },
    })

    const result = await getProfilesAction({ page: 1 })

    expect(getMock).toHaveBeenCalledWith("/profiles?page=1")
    expect(result.profiles).toHaveLength(1)
    expect(result.profiles[0]?.name).toBe("Demo Talent")
    expect(result.pagination).toEqual({
      currentPage: 1,
      lastPage: 11,
      perPage: 20,
      total: 202,
      from: 1,
      to: 20,
    })
  })
})
