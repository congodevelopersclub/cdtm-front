"use client"

import Link from "next/link"
import { useTranslations } from "next-intl"
import { IconExternalLink } from "@tabler/icons-react"

const HELP_CENTER_URL = "https://congodevclub.com"

export function SidebarHelpLink() {
  const t = useTranslations("DashboardShell")

  return (
    <Link
      href={HELP_CENTER_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 px-4 py-2 text-sm text-sidebar-foreground hover:underline"
    >
      {t("helpCenter")}
      <IconExternalLink className="size-3.5 text-muted-foreground" />
    </Link>
  )
}
