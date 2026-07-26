"use client"

import { useCallback, useState } from "react"

import { getLinkedInAuthUrl } from "../api/auth.api"

export function useLinkedInAuth() {
  const [isRedirecting, setIsRedirecting] = useState(false)

  const startLinkedInAuth = useCallback(() => {
    setIsRedirecting(true)
    window.location.href = getLinkedInAuthUrl()
  }, [])

  return { startLinkedInAuth, isRedirecting }
}
