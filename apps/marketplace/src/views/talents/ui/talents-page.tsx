"use client"

import { useSearchParams } from "next/navigation"
import { useTranslations } from "next-intl"

import { TalentsDirectoryTab } from "./components/talents-directory-tab"
import {
  parseTalentsDirectoryFilters,
  toProfilesQuery,
} from "../lib/parse-talents-directory-filters"
import {
  DashboardEmptyState,
  DashboardPageShell,
  type DashboardTab,
} from "@/widgets/dashboard-shell"

import { useAuth } from "@/features/auth"
import { useProfiles } from "@/entities/talent"
import { getUserSession } from "@/shared/auth/user-session"

export function TalentsPage() {
  const tShell = useTranslations("DashboardShell")
  const tTalents = useTranslations("Talents")
  const searchParams = useSearchParams()
  const page = Number(searchParams.get("page") ?? "1") || 1
  const filters = parseTalentsDirectoryFilters(searchParams)
  const { data } = useProfiles(toProfilesQuery(filters, page))
  const { user } = useAuth()
  const userRole = user?.role ?? getUserSession()?.role
  const showSavedTab = userRole !== "USER"

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
    ...(showSavedTab
      ? [
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
        ]
      : []),
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
