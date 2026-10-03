import { cn } from "@workspace/ui/lib/utils"

export function getTalentsGridClassName(isSidebarOpen: boolean) {
  return cn(
    "grid grid-cols-1 gap-4 sm:grid-cols-2",
    isSidebarOpen
      ? "lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
      : "lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4"
  )
}
