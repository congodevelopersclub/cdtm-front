import { beforeEach, describe, expect, it, vi } from "vitest"

import {
  createSkillAction,
  getSkillsAction,
  updateSkillAction,
} from "./skills"

const { getMock, postMock, putMock } = vi.hoisted(() => ({
  getMock: vi.fn(),
  postMock: vi.fn(),
  putMock: vi.fn(),
}))

vi.mock("@/shared/api/server-client", () => ({
  createServerApiClient: () => ({
    get: getMock,
    post: postMock,
    put: putMock,
  }),
}))

describe("skill actions", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("maps a paginated skills list", async () => {
    getMock.mockResolvedValue({
      data: {
        data: [{ id: 1, name: "Java", slug: "java" }],
        meta: { current_page: 2, last_page: 3, total: 22 },
      },
    })

    const result = await getSkillsAction(2)

    expect(getMock).toHaveBeenCalledWith("/skills", { params: { page: 2 } })
    expect(result.skills).toEqual([{ id: 1, name: "Java", slug: "java" }])
    expect(result.pagination).toEqual({
      currentPage: 2,
      lastPage: 3,
      total: 22,
    })
  })

  it("creates a skill with a name", async () => {
    postMock.mockResolvedValue({
      data: { data: { id: 22, name: "rails", slug: "rails" } },
    })

    const skill = await createSkillAction("rails")

    expect(postMock).toHaveBeenCalledWith("/skills", { name: "rails" })
    expect(skill).toEqual({ id: 22, name: "rails", slug: "rails" })
  })

  it("updates a skill with a name", async () => {
    putMock.mockResolvedValue({
      data: { data: { id: 22, name: "ruby", slug: "rails" } },
    })

    const skill = await updateSkillAction(22, "ruby")

    expect(putMock).toHaveBeenCalledWith("/skills/22", { name: "ruby" })
    expect(skill.name).toBe("ruby")
    expect(skill.slug).toBe("rails")
  })
})
