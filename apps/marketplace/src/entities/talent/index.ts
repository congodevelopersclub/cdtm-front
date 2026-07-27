export { ProfileCompletionPanel } from "./ui/profile-completion-panel"
export { TalentAvatar } from "./ui/talent-avatar"
export { ProfileHeaderCard } from "./ui/profile-header-card"
export { ProfileTabs } from "./ui/profile-tabs"
export { TalentProfileSkeleton } from "./ui/talent-profile-skeleton"
export { mapApiProfileToTalentProfile } from "./lib/map-api-profile"
export { useProfiles } from "./hooks/use-profiles"
export { useProfile } from "./hooks/use-profile"
export { getInitials } from "./lib/get-initials"
export { formatTalentCategory, TALENT_CATEGORIES } from "./model/talent-category"
export {
  getProfileCompletion,
  type ProfileCompletion,
  type ProfileCompletionItem,
} from "./lib/get-profile-completion"
export { MOCK_TALENT_PROFILE } from "./model/mock-talent-profile"
export type {
  TalentCategory,
} from "./model/talent-category"
export type {
  TalentExperience,
  TalentProfile,
  TalentProfileStatus,
  TalentProject,
  TalentSocialLinks,
} from "./model/types"
export type {
  ApiProfile,
  ApiProfilesPaginatedResponse,
  ProfilesPagination,
  ProfilesQuery,
  ProfilesResult,
} from "./model/api-types"
