import type { DashboardUser } from "../config/types"

import type { AuthUser } from "@/entities/user"

export function mapToDashboardUser(user: AuthUser): DashboardUser {
  return {
    name: user.name,
    email: user.email,
    avatar: user.avatar_url ?? user.profile?.avatar_url ?? undefined,
    title: user.profile?.headline ?? undefined,
  }
}
