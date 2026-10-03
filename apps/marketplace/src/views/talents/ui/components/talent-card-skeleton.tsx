import { Card } from "@workspace/ui/components/card"
import { Skeleton } from "@workspace/ui/components/skeleton"

export function TalentCardSkeleton() {
  return (
    <Card className="flex h-full flex-col gap-3 rounded-2xl border border-border bg-white p-2 shadow-none">
      <div className="flex min-w-0 w-full flex-col gap-3 sm:flex-row">
        <div className="relative flex flex-col items-center gap-2 rounded-2xl bg-muted p-2">
          <Skeleton className="absolute -top-1 -left-1 size-5 rounded-full" />
          <Skeleton className="size-16 shrink-0 rounded-full lg:size-20" />
          <div className="flex flex-wrap items-center justify-center gap-1">
            <Skeleton className="h-7 w-16 rounded-md" />
            <Skeleton className="size-7 rounded-md" />
          </div>
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <Skeleton className="h-6 w-full rounded-md" />

          <div className="flex flex-col gap-1.5">
            <Skeleton className="h-4 w-4/5" />
            <Skeleton className="h-4 w-3/5" />
          </div>

          <div className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-20" />
          </div>

          <div className="flex min-w-0 flex-wrap items-center gap-1 sm:flex-nowrap sm:overflow-hidden">
            <Skeleton className="h-5 w-16 shrink-0 rounded-md" />
            <Skeleton className="h-5 w-14 shrink-0 rounded-md" />
            <Skeleton className="h-5 w-12 shrink-0 rounded-md" />
          </div>
        </div>
      </div>
    </Card>
  )
}
