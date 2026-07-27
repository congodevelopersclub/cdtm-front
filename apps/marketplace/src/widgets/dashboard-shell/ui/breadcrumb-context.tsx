"use client"

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"

type DashboardBreadcrumbContextValue = {
  dynamicLabel: string | null
  setDynamicLabel: (label: string | null) => void
}

const DashboardBreadcrumbContext =
  createContext<DashboardBreadcrumbContextValue | null>(null)

export function DashboardBreadcrumbProvider({
  children,
}: {
  children: ReactNode
}) {
  const [dynamicLabel, setDynamicLabel] = useState<string | null>(null)

  const value = useMemo(
    () => ({
      dynamicLabel,
      setDynamicLabel,
    }),
    [dynamicLabel]
  )

  return (
    <DashboardBreadcrumbContext.Provider value={value}>
      {children}
    </DashboardBreadcrumbContext.Provider>
  )
}

export function useDashboardBreadcrumb() {
  const context = useContext(DashboardBreadcrumbContext)

  if (!context) {
    throw new Error(
      "useDashboardBreadcrumb must be used within DashboardBreadcrumbProvider"
    )
  }

  return context
}

export function useSetDashboardBreadcrumbLabel(label: string | null) {
  const { setDynamicLabel } = useDashboardBreadcrumb()

  useEffect(() => {
    setDynamicLabel(label)

    return () => setDynamicLabel(null)
  }, [label, setDynamicLabel])
}
