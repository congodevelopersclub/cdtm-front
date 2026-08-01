import { cn } from "@workspace/ui/lib/utils"

import { ProfileCompletionPanel, type TalentProfile } from "@/entities/talent"

type DashboardProfileTasksCardProps = {
  profile: TalentProfile
  className?: string
}

export function DashboardProfileTasksCard({
  profile,
  className,
}: DashboardProfileTasksCardProps) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-border bg-card p-5 sm:p-6",
        className,
      )}
    >
      <ProfileCompletionPanel profile={profile} variant="dashboard" />
    </div>
  )
}
