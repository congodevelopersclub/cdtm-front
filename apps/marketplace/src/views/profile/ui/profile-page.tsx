import {
  ProfileHeaderCard,
  ProfileTabs,
  MOCK_TALENT_PROFILE,
} from "@/entities/talent"

export function ProfilePage() {
  const profile = MOCK_TALENT_PROFILE

  return (
    <div className="flex w-full min-w-0 max-w-full flex-col gap-6">
      <ProfileHeaderCard profile={profile} />
      <ProfileTabs profile={profile} />
    </div>
  )
}
