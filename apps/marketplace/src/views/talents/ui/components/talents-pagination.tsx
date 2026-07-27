"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useTranslations } from "next-intl"

import { Button } from "@workspace/ui/components/button"

import { getPaginationPages } from "../../lib/get-pagination-pages"

type TalentsPaginationProps = {
  currentPage: number
  lastPage: number
  total: number
}

export function TalentsPagination({
  currentPage,
  lastPage,
}: TalentsPaginationProps) {
  const t = useTranslations("Talents")
  const router = useRouter()
  const searchParams = useSearchParams()
  const pages = getPaginationPages(currentPage, lastPage)

  function goToPage(page: number) {
    const params = new URLSearchParams(searchParams.toString())
    params.set("page", String(page))
    router.push(`/talents?${params.toString()}`)
  }

  return (
    <nav
      aria-label={t("pageLabel")}
      className="flex flex-wrap items-center justify-center gap-2"
    >
      <Button
        variant="outline"
        className="rounded-full"
        disabled={currentPage <= 1}
        onClick={() => goToPage(currentPage - 1)}
      >
        {t("previous")}
      </Button>

      {pages.map((page, index) =>
        page === "ellipsis" ? (
          <span
            key={`ellipsis-${index}`}
            aria-hidden="true"
            className="inline-flex min-w-10 items-center justify-center px-2 text-sm text-muted-foreground"
          >
            ...
          </span>
        ) : (
          <Button
            key={page}
            variant={page === currentPage ? "default" : "outline"}
            className="min-w-10 rounded-full"
            onClick={() => goToPage(page)}
          >
            {page}
          </Button>
        )
      )}

      <Button
        variant="outline"
        className="rounded-full"
        disabled={currentPage >= lastPage}
        onClick={() => goToPage(currentPage + 1)}
      >
        {t("next")}
      </Button>
    </nav>
  )
}
