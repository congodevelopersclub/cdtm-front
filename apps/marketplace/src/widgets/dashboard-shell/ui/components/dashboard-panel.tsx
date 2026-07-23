import { cn } from "@workspace/ui/lib/utils"

type DashboardPanelProps = React.ComponentProps<"div">

export function DashboardPanel({ className, ...props }: DashboardPanelProps) {
  return (
    <div
      className={cn(
        "min-h-64 rounded-3xl border border-border bg-card sm:min-h-80",
        className
      )}
      {...props}
    />
  )
}
