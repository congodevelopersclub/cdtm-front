export type PaginationItem = number | "ellipsis"

export function getPaginationPages(
  currentPage: number,
  lastPage: number
): PaginationItem[] {
  if (lastPage <= 5) {
    return Array.from({ length: lastPage }, (_, index) => index + 1)
  }

  const pages = new Set<number>()

  for (let page = 1; page <= Math.min(3, lastPage); page += 1) {
    pages.add(page)
  }

  for (let page = Math.max(lastPage - 1, 1); page <= lastPage; page += 1) {
    pages.add(page)
  }

  for (let page = currentPage - 1; page <= currentPage + 1; page += 1) {
    if (page >= 1 && page <= lastPage) {
      pages.add(page)
    }
  }

  const sortedPages = [...pages].sort((left, right) => left - right)
  const items: PaginationItem[] = []

  for (const [index, page] of sortedPages.entries()) {
    const previousPage = sortedPages[index - 1]

    if (previousPage != null && page - previousPage > 1) {
      items.push("ellipsis")
    }

    items.push(page)
  }

  return items
}
