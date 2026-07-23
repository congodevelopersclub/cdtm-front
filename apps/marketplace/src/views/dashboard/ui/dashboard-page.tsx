import { getTranslations } from "next-intl/server"

import { SectionCards } from "./components/section-cards"

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
      content: <SectionCards />,
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
