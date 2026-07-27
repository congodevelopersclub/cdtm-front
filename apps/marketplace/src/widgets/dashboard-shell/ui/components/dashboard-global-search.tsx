"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { useTranslations } from "next-intl"
import {
  IconBell,
  IconBook,
  IconBriefcase,
  IconCertificate,
  IconFolder,
  IconLayoutDashboard,
  IconSearch,
  IconUsers,
} from "@tabler/icons-react"

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@workspace/ui/components/command"
import { Input } from "@workspace/ui/components/input"
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
} from "@workspace/ui/components/popover"

import { buildSearchIndex } from "../../lib/build-search-index"
import type { DashboardRole } from "../../config/types"

import {
  searchPlatform,
  type SearchResult,
  type SearchResultType,
} from "@/shared/lib/search"

const GROUP_ORDER: SearchResultType[] = [
  "page",
  "person",
  "job",
  "skill",
  "project",
  "course",
  "notification",
]

const TYPE_ICONS: Record<SearchResultType, typeof IconLayoutDashboard> = {
  page: IconLayoutDashboard,
  person: IconUsers,
  job: IconBriefcase,
  skill: IconCertificate,
  project: IconFolder,
  course: IconBook,
  notification: IconBell,
}

const GROUP_LABEL_KEYS: Record<SearchResultType, string> = {
  page: "groupPages",
  person: "groupPeople",
  job: "groupJobs",
  skill: "groupSkills",
  project: "groupProjects",
  course: "groupCourses",
  notification: "groupNotifications",
}

function groupResults(results: SearchResult[]) {
  const groups = new Map<SearchResultType, SearchResult[]>()

  for (const type of GROUP_ORDER) {
    groups.set(type, [])
  }

  for (const result of results) {
    groups.get(result.type)?.push(result)
  }

  return GROUP_ORDER.flatMap((type) => {
    const items = groups.get(type) ?? []

    if (items.length === 0) {
      return []
    }

    return [{ type, items }]
  })
}

type DashboardGlobalSearchProps = {
  role: DashboardRole
}

export function DashboardGlobalSearch({ role }: DashboardGlobalSearchProps) {
  const tShell = useTranslations("DashboardShell")
  const tSearch = useTranslations("DashboardSearch")
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")

  const index = useMemo(
    () => buildSearchIndex(role, (key) => tShell(key)),
    [role, tShell],
  )

  const results = useMemo(() => searchPlatform(query, index), [query, index])
  const groupedResults = useMemo(() => groupResults(results), [results])

  const handleSelect = useCallback(
    (href: string) => {
      setOpen(false)
      setQuery("")
      router.push(href)
    },
    [router],
  )

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault()
        inputRef.current?.focus()
        setOpen(true)
      }
    }

    window.addEventListener("keydown", onKeyDown)

    return () => window.removeEventListener("keydown", onKeyDown)
  }, [])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverAnchor asChild>
        <div className="relative min-w-0 flex-1">
          <IconSearch className="pointer-events-none absolute top-1/2 left-4 z-10 size-4 -translate-y-1/2 text-muted-foreground sm:size-5" />
          <Input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value)
              setOpen(true)
            }}
            onFocus={() => setOpen(true)}
            placeholder={tShell("searchPlaceholder")}
            aria-label={tShell("searchAriaLabel")}
            aria-expanded={open}
            aria-controls="dashboard-global-search-results"
            role="combobox"
            autoComplete="off"
            className="h-10 rounded-full border-input bg-background pl-11 text-sm shadow-none sm:h-10"
          />
        </div>
      </PopoverAnchor>
      <PopoverContent
        id="dashboard-global-search-results"
        align="start"
        sideOffset={8}
        className="w-[var(--radix-popover-trigger-width)] p-0"
        onOpenAutoFocus={(event) => event.preventDefault()}
      >
        <Command shouldFilter={false}>
          <CommandList className="max-h-80">
            {query.trim() === "" ? (
              <div className="px-3 py-2 text-xs font-medium text-muted-foreground">
                {tSearch("quickLinks")}
              </div>
            ) : null}
            {groupedResults.map(({ type, items }) => {
              const Icon = TYPE_ICONS[type]

              return (
                <CommandGroup
                  key={type}
                  heading={tSearch(GROUP_LABEL_KEYS[type])}
                >
                  {items.map((item) => (
                    <CommandItem
                      key={item.id}
                      value={item.id}
                      onSelect={() => handleSelect(item.href)}
                    >
                      <Icon className="size-4 text-muted-foreground" />
                      <div className="flex min-w-0 flex-1 flex-col">
                        <span className="truncate">{item.title}</span>
                        {item.subtitle ? (
                          <span className="truncate text-xs text-muted-foreground">
                            {item.subtitle}
                          </span>
                        ) : null}
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )
            })}
            {query.trim() !== "" && results.length === 0 ? (
              <CommandEmpty>{tSearch("noResults", { query })}</CommandEmpty>
            ) : null}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
