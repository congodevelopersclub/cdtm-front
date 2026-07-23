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
        className="-mx-1 h-auto w-full justify-start gap-4 overflow-x-auto border-b border-border bg-transparent p-0 px-1 pb-0 scrollbar-none sm:gap-6"
      >
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className="shrink-0 rounded-none px-0 pb-3 whitespace-nowrap after:bg-brand-orange data-active:text-foreground"
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
