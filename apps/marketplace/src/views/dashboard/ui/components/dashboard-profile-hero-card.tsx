import Image from "next/image"

import { cn } from "@workspace/ui/lib/utils"

import { getInitials } from "@/entities/talent"

type DashboardProfileHeroCardProps = {
  name: string
  title: string
  avatarUrl?: string | null
  location?: string
  className?: string
}

export function DashboardProfileHeroCard({
  name,
  title,
  avatarUrl,
  location,
  className,
}: DashboardProfileHeroCardProps) {
  const initials = getInitials(name)

  return (
    <div
      className={cn(
        "relative min-h-[180px] overflow-hidden rounded-3xl border border-border bg-card sm:min-h-[220px] lg:min-h-[260px]",
        className,
      )}
    >
      {avatarUrl ? (
        <Image
          src={avatarUrl}
          alt=""
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 40vw"
          priority
        />
      ) : (
        <div className="absolute inset-0 bg-linear-to-br from-brand-steel-blue to-brand-mint" />
      )}
      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
        <div className="inline-flex max-w-full flex-col gap-1 rounded-2xl border border-white/20 bg-white/10 px-4 py-3 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-steel-blue text-sm font-semibold text-white">
              {initials}
            </div>
            <div className="min-w-0">
              <p className="truncate text-lg font-semibold text-white">{name}</p>
              <p className="truncate text-sm text-white/80">{title}</p>
            </div>
          </div>
          {location ? (
            <p className="text-xs text-white/70">{location}</p>
          ) : null}
        </div>
      </div>
    </div>
  )
}
