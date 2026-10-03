import { Card } from "@workspace/ui/components/card"
import { Skeleton } from "@workspace/ui/components/skeleton"

export function TalentProfileSkeleton() {
  return (
    <div className="flex w-full min-w-0 flex-col gap-6">
      <Card className="rounded-3xl border border-border bg-card p-6 shadow-none sm:p-8">
        <div className="flex flex-col gap-6 md:flex-row">
          <Skeleton className="size-28 shrink-0 rounded-full" />
          <div className="flex flex-1 flex-col gap-4">
            <Skeleton className="h-9 w-1/2" />
            <Skeleton className="h-10 w-full max-w-md" />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-16 w-full" />
            </div>
            <div className="flex flex-wrap gap-2">
              <Skeleton className="h-8 w-20 rounded-full" />
              <Skeleton className="h-8 w-24 rounded-full" />
              <Skeleton className="h-8 w-16 rounded-full" />
            </div>
          </div>
        </div>
      </Card>
      <div className="flex gap-6 border-b border-border pb-3">
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-5 w-16" />
        <Skeleton className="h-5 w-20" />
      </div>
      <Skeleton className="h-40 w-full rounded-3xl" />
    </div>
  )
}
