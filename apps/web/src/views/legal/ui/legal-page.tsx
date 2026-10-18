import { getTranslations } from "next-intl/server"

import { getLegalMarkdown, type LegalPageKey } from "../lib/get-legal-markdown"
import { MarkdownContent } from "./markdown-content"

type LegalPageProps = {
  page: LegalPageKey
}

export async function LegalPage({ page }: LegalPageProps) {
  const t = await getTranslations("legal")
  const markdown = await getLegalMarkdown(page)

  return (
    <article className="page-container py-16 md:py-24">
      <div className="mx-auto max-w-3xl">
        <p className="mb-6 text-xs font-bold tracking-widest text-primary uppercase">
          {t("label")}
        </p>
        <MarkdownContent markdown={markdown} />
      </div>
    </article>
  )
}
