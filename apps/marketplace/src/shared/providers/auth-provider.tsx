"use client"

import * as React from "react"

import { getSessionFromToken, getToken } from "@/shared/auth"

type Session = {
  userId: string
  email: string
}

type AuthContextValue = {
  session: Session | null
  isAuthenticated: boolean
  refreshSession: () => void
}

const AuthContext = React.createContext<AuthContextValue>({
  session: null,
  isAuthenticated: false,
  refreshSession: () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = React.useState<Session | null>(() => {
    const token = getToken()
    return token ? getSessionFromToken(token) : null
  })

  const refreshSession = React.useCallback(() => {
    const token = getToken()
    setSession(token ? getSessionFromToken(token) : null)
  }, [])

  return (
    <AuthContext.Provider
      value={{
        session,
        isAuthenticated: session !== null,
        refreshSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return React.useContext(AuthContext)
}
