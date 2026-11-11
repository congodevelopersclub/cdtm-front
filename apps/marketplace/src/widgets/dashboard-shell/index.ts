export { DashboardShell } from "./ui/dashboard-shell"
export { DashboardLayout } from "./ui/dashboard-layout"
export { mapToDashboardUser } from "./lib/map-to-dashboard-user"
export { DashboardPageShell } from "./ui/dashboard-page-shell"
export { DashboardPanel } from "./ui/components/dashboard-panel"
export { DashboardEmptyState } from "./ui/components/dashboard-empty-state"
export { DashboardTabbedShell } from "./ui/components/dashboard-tabbed-shell"
export { DashboardNotifications } from "./ui/components/dashboard-notifications"
export { DashboardBreadcrumbs } from "./ui/components/dashboard-breadcrumbs"
export {
  DashboardBreadcrumbProvider,
  useSetDashboardBreadcrumbLabel,
} from "./ui/breadcrumb-context"
export type { DashboardTab } from "./ui/components/dashboard-tabbed-shell"
export {
  getDashboardNav,
  getPageTitle,
  MOCK_TALENT_USER,
} from "./config/menus"
export { getBreadcrumbTrail } from "./lib/get-breadcrumbs"
export type { DashboardRole, DashboardUser, NavItem } from "./config/types"
export type { BreadcrumbSegment } from "./lib/get-breadcrumbs"
