import type { DashboardTab } from "../ui/components/dashboard-tabbed-shell"

import { MOCK_TALENT_USER } from "../config/menus"
import type { DashboardUser } from "../config/types"

export { MOCK_TALENT_USER }

export const STORY_AUTH_SESSION = {
  userId: "storybook-user-1",
  email: MOCK_TALENT_USER.email,
}

export const STORY_DASHBOARD_USER: DashboardUser = MOCK_TALENT_USER

export const STORY_SAMPLE_TABS: DashboardTab[] = [
  {
    value: "overview",
    label: "Overview",
    content: (
      <div className="rounded-lg border border-border bg-card p-6">
        <p className="text-sm text-muted-foreground">Overview panel content</p>
      </div>
    ),
  },
  {
    value: "activity",
    label: "Activity",
    content: (
      <div className="rounded-lg border border-border bg-card p-6">
        <p className="text-sm text-muted-foreground">Activity panel content</p>
      </div>
    ),
  },
]
