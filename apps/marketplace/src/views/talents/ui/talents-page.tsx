"use client"

import { useSearchParams } from "next/navigation"
import { useTranslations } from "next-intl"

import { TalentsDirectoryTab } from "./components/talents-directory-tab"
import {
  DashboardEmptyState,
  DashboardPageShell,
  type DashboardTab,
} from "@/widgets/dashboard-shell"

import { useProfiles } from "@/entities/talent"

export function TalentsPage() {
  const tShell = useTranslations("DashboardShell")
  const tTalents = useTranslations("Talents")
  const searchParams = useSearchParams()
  const page = Number(searchParams.get("page") ?? "1") || 1
  const { data } = useProfiles(page)

  const directoryLabel =
    data?.pagination.total != null
      ? tTalents("directoryCount", { total: data.pagination.total })
      : tShell("directory")

  const tabs: DashboardTab[] = [
    {
      value: "directory",
      label: directoryLabel,
      content: <TalentsDirectoryTab />,
    },
    {
      value: "saved",
      label: tShell("savedTalents"),
      content: (
        <DashboardEmptyState
          title={tShell("savedTalentsEmptyTitle")}
          description={tShell("savedTalentsEmptyDescription")}
        />
      ),
    },
    {
      value: "following",
      label: tShell("following"),
      content: (
        <DashboardEmptyState
          title={tShell("followingEmptyTitle")}
          description={tShell("followingEmptyDescription")}
        />
      ),
    },
  ]

  return <DashboardPageShell tabs={tabs} defaultTab="directory" />
}
