import {
  DashboardTabbedShell,
  type DashboardTab,
} from "./components/dashboard-tabbed-shell"

type DashboardPageShellProps = {
  title?: string
  tabs: DashboardTab[]
  defaultTab: string
}

export function DashboardPageShell({ title, tabs, defaultTab }: DashboardPageShellProps) {
  return (
    <div className="flex flex-col gap-4">
      {title ? (
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">{title}</h1>
      ) : null}
      <DashboardTabbedShell tabs={tabs} defaultTab={defaultTab} />
    </div>
  )
}

export type { DashboardTab }
