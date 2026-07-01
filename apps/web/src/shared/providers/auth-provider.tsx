"use client"

import * as React from "react"

type AuthContextValue = {
  isAuthenticated: boolean
}

const AuthContext = React.createContext<AuthContextValue>({
  isAuthenticated: false,
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <AuthContext.Provider value={{ isAuthenticated: false }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return React.useContext(AuthContext)
}
