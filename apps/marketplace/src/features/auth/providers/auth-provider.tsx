"use client"

import * as React from "react"
import { useQueryClient } from "@tanstack/react-query"

import { userQueryKey, useCurrentUser } from "@/entities/user"
import type { AuthUser } from "@/entities/user"
import { getToken } from "@/shared/auth"
import { AUTH_SESSION_CHANGED } from "@/shared/auth/session-events"
import { getUserId, setUserId } from "@/shared/auth/user-id"
import { getUserSession } from "@/shared/auth/user-session"

type Session = {
  userId: string
  email: string
  name: string
  avatarUrl?: string | null
}

type AuthContextValue = {
  session: Session | null
  user: AuthUser | null
  isAuthenticated: boolean
  isLoading: boolean
  refreshSession: () => void
}

const AuthContext = React.createContext<AuthContextValue>({
  session: null,
  user: null,
  isAuthenticated: false,
  isLoading: false,
  refreshSession: () => {},
})

function resolveUserId(): string | null {
  const storedId = getUserId()

  if (storedId) {
    return storedId
  }

  const cachedUser = getUserSession()

  if (cachedUser?.id) {
    setUserId(cachedUser.id)
    return cachedUser.id
  }

  return null
}

function toSession(user: AuthUser): Session {
  return {
    userId: user.id,
    email: user.email,
    name: user.name,
    avatarUrl: user.avatar_url ?? user.profile?.avatar_url,
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const queryClient = useQueryClient()
  const [userId, setUserIdState] = React.useState<string | null>(() => resolveUserId())
  const [hasToken, setHasToken] = React.useState(() => Boolean(getToken()))

  const { data: user, isLoading, isFetching, isError } = useCurrentUser(userId)

  const syncSessionState = React.useCallback(() => {
    const nextHasToken = Boolean(getToken())
    const nextUserId = resolveUserId()

    setHasToken(nextHasToken)
    setUserIdState(nextUserId)

    if (!nextUserId) {
      queryClient.removeQueries({ queryKey: ["user"] })
      return
    }

    void queryClient.invalidateQueries({ queryKey: userQueryKey(nextUserId) })
  }, [queryClient])

  React.useEffect(() => {
    function handleSessionChanged() {
      syncSessionState()
    }

    window.addEventListener(AUTH_SESSION_CHANGED, handleSessionChanged)

    return () => {
      window.removeEventListener(AUTH_SESSION_CHANGED, handleSessionChanged)
    }
  }, [syncSessionState])

  const cachedUser = user ?? getUserSession()
  const isAuthenticated = hasToken && Boolean(userId) && Boolean(cachedUser) && !isError
  const session = cachedUser ? toSession(cachedUser as AuthUser) : null

  return (
    <AuthContext.Provider
      value={{
        session,
        user: user ?? null,
        isAuthenticated,
        isLoading: hasToken && Boolean(userId) && (isLoading || isFetching) && !cachedUser,
        refreshSession: syncSessionState,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return React.useContext(AuthContext)
}
