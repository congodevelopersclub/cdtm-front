import { getTranslations } from "next-intl/server"

import { DashboardOverviewGrid } from "./components/dashboard-overview-grid"

import {
  DashboardEmptyState,
  DashboardPageShell,
  type DashboardTab,
} from "@/widgets/dashboard-shell"

export async function DashboardPage() {
  const t = await getTranslations("DashboardShell")

  const tabs: DashboardTab[] = [
    {
      value: "overview",
      label: t("overview"),
      content: <DashboardOverviewGrid />,
    },
    {
      value: "activity",
      label: t("activity"),
      content: (
        <DashboardEmptyState
          title={t("activityEmptyTitle")}
          description={t("activityEmptyDescription")}
        />
      ),
    },
  ]

  return <DashboardPageShell tabs={tabs} defaultTab="overview" />
}
