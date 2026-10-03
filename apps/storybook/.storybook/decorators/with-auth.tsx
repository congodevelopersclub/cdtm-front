"use client"

import * as React from "react"
import type { Decorator } from "@storybook/nextjs-vite"

import type { StoryAuthParameters, StoryAuthSession } from "./types"

type AuthContextValue = {
  session: StoryAuthSession
  isAuthenticated: boolean
  refreshSession: () => void
}

const StoryAuthContext = React.createContext<AuthContextValue>({
  session: null,
  isAuthenticated: false,
  refreshSession: () => {},
})

function StoryAuthProvider({
  children,
  session,
}: {
  children: React.ReactNode
  session: StoryAuthSession
}) {
  const value = React.useMemo(
    () => ({
      session,
      isAuthenticated: session !== null,
      refreshSession: () => {},
    }),
    [session]
  )

  return (
    <StoryAuthContext.Provider value={value}>
      {children}
    </StoryAuthContext.Provider>
  )
}

export function useStoryAuth() {
  return React.useContext(StoryAuthContext)
}

export const withAuth: Decorator = (Story, context) => {
  const authParams = context.parameters.auth as StoryAuthParameters | undefined
  const session = authParams?.session ?? null

  return (
    <StoryAuthProvider key={session?.email ?? "anonymous"} session={session}>
      <Story />
    </StoryAuthProvider>
  )
}
