"use client"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@workspace/ui/components/tabs"

export type DashboardTab = {
  value: string
  label: string
  content: React.ReactNode
}

type DashboardTabbedShellProps = {
  tabs: DashboardTab[]
  defaultTab: string
}

export function DashboardTabbedShell({
  tabs,
  defaultTab,
}: DashboardTabbedShellProps) {
  return (
    <Tabs defaultValue={defaultTab} className="w-full">
      <TabsList
        variant="line"
        className="-mx-1 w-full gap-4 overflow-x-auto px-1 scrollbar-none sm:gap-6"
      >
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className="shrink-0 whitespace-nowrap"
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value} className="mt-6">
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  )
}
