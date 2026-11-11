import { DashboardPanel } from "./dashboard-panel"

type DashboardEmptyStateProps = {
  title: string
  description: string
}

export function DashboardEmptyState({
  title,
  description,
}: DashboardEmptyStateProps) {
  return (
    <DashboardPanel className="flex flex-col items-center justify-center px-4 py-12 text-center sm:px-6 sm:py-16">
      <h2 className="text-xl font-semibold tracking-tight text-foreground">
        {title}
      </h2>
      <p className="mt-2 max-w-lg text-sm text-muted-foreground">{description}</p>
    </DashboardPanel>
  )
}
