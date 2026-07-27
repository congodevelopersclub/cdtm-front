import { cn } from "@workspace/ui/lib/utils"

export function getTalentsGridClassName(isSidebarOpen: boolean) {
  return cn(
    "grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4",
    isSidebarOpen ? "xl:grid-cols-3 2xl:grid-cols-4 md:grid-cols-1" : "xl:grid-cols-4 2xl:grid-cols-5 md:grid-cols-2"
  )
}
