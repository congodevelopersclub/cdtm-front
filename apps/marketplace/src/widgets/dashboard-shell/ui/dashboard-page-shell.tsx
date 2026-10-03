import {
  DashboardTabbedShell,
  type DashboardTab,
} from "./components/dashboard-tabbed-shell"

type DashboardPageShellProps = {
  tabs: DashboardTab[]
  defaultTab: string
}

export function DashboardPageShell({ tabs, defaultTab }: DashboardPageShellProps) {
  return (
    <div className="flex flex-col gap-6">
      <DashboardTabbedShell tabs={tabs} defaultTab={defaultTab} />
    </div>
  )
}

export type { DashboardTab }
