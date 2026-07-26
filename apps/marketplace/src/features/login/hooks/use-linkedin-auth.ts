"use client"

import { useCallback, useState } from "react"

export function useLinkedInAuth() {
  const [isRedirecting, setIsRedirecting] = useState(false)

  const startLinkedInAuth = useCallback(() => {
    setIsRedirecting(true)
    window.location.href = "/api/auth/linkedin"
  }, [])

  return { startLinkedInAuth, isRedirecting }
}
