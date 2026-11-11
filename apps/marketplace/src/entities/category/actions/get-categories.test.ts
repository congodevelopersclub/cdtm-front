import { beforeEach, describe, expect, it, vi } from "vitest"

import { getCategoriesAction } from "./get-categories"

const { getMock } = vi.hoisted(() => ({
  getMock: vi.fn(),
}))

vi.mock("@/shared/api/server-client", () => ({
  createServerApiClient: () => ({
    get: getMock,
  }),
}))

describe("getCategoriesAction", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("keeps active categories from every page, sorted by sort order", async () => {
    getMock
      .mockResolvedValueOnce({
        data: {
          current_page: 1,
          last_page: 2,
          data: [
            {
              id: 2,
              name: "Backend",
              slug: "backend",
              is_active: true,
              sort_order: 2,
            },
            {
              id: 9,
              name: "Archived",
              slug: "archived",
              is_active: false,
              sort_order: 1,
            },
          ],
        },
      })
      .mockResolvedValueOnce({
        data: {
          current_page: 2,
          last_page: 2,
          data: [
            {
              id: 1,
              name: "Frontend",
              slug: "frontend",
              is_active: true,
              sort_order: 1,
            },
          ],
        },
      })

    const categories = await getCategoriesAction()

    expect(getMock).toHaveBeenNthCalledWith(1, "/categories", { params: { page: 1 } })
    expect(getMock).toHaveBeenNthCalledWith(2, "/categories", { params: { page: 2 } })
    expect(categories).toEqual([
      { id: 1, name: "Frontend", slug: "frontend", sortOrder: 1 },
      { id: 2, name: "Backend", slug: "backend", sortOrder: 2 },
    ])
  })
})
