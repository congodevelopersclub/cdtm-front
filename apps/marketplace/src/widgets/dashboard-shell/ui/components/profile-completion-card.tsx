"use client"

import { MOCK_TALENT_PROFILE, ProfileCompletionPanel } from "@/entities/talent"

export function ProfileCompletionCard() {
  return <ProfileCompletionPanel profile={MOCK_TALENT_PROFILE} variant="sidebar" />
}
