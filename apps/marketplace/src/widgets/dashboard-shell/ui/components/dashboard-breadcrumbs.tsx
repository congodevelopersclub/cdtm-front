"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTranslations } from "next-intl"
import { Fragment } from "react"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@workspace/ui/components/breadcrumb"

import { getBreadcrumbTrail } from "../../lib/get-breadcrumbs"
import type { DashboardRole } from "../../config/types"

import { useDashboardBreadcrumb } from "../breadcrumb-context"

type DashboardBreadcrumbsProps = {
  role: DashboardRole
}

export function DashboardBreadcrumbs({ role }: DashboardBreadcrumbsProps) {
  const pathname = usePathname()
  const t = useTranslations("DashboardShell")
  const { dynamicLabel } = useDashboardBreadcrumb()
  const trail = getBreadcrumbTrail(pathname, role)

  return (
    <Breadcrumb className="px-4 sm:px-6">
      <BreadcrumbList>
        {trail.map((segment, index) => {
          return (
            <Fragment key={`${segment.kind}-${index}`}>
              {index > 0 ? (
                <BreadcrumbSeparator className="text-muted-foreground/70" />
              ) : null}
              <BreadcrumbItem>
                {segment.kind === "link" ? (
                  <BreadcrumbLink asChild>
                    <Link href={segment.href}>{t(segment.labelKey)}</Link>
                  </BreadcrumbLink>
                ) : null}
                {segment.kind === "current" ? (
                  <BreadcrumbPage>{t(segment.labelKey)}</BreadcrumbPage>
                ) : null}
                {segment.kind === "dynamic" ? (
                  <BreadcrumbPage>
                    {dynamicLabel ?? t("breadcrumbLoading")}
                  </BreadcrumbPage>
                ) : null}
              </BreadcrumbItem>
            </Fragment>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
