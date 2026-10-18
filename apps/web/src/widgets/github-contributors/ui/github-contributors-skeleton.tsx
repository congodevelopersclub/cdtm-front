import { Skeleton } from "@workspace/ui/components/skeleton"

const SKELETON_CARDS = Array.from({ length: 6 }, (_, index) => index)

export function GithubContributorsSkeleton() {
  return (
    <section className="border-border bg-card/30 border-y py-24">
      <div className="page-container">
        <div className="mb-12 space-y-4">
          <Skeleton className="h-10 w-72 max-w-full" />
          <Skeleton className="h-5 w-full max-w-2xl" />
        </div>
        <div className="flex gap-6 overflow-hidden">
          {SKELETON_CARDS.map((index) => (
            <div
              key={index}
              className="border-border bg-card flex-[0_0_50%] rounded-xl border p-6 md:flex-[0_0_33%] lg:flex-[0_0_16.66%]"
            >
              <div className="flex flex-col items-center">
                <Skeleton className="mb-4 h-20 w-20 rounded-full" />
                <Skeleton className="mb-2 h-4 w-24" />
                <Skeleton className="mb-2 h-3 w-16" />
                <Skeleton className="h-3 w-20" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
