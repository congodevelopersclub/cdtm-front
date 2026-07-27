export const PLATFORM_STATS = [
  {
    key: "talents",
    valueKey: "statTalentsValue",
    labelKey: "statTalentsLabel",
    deltaKey: "statTalentsDelta",
  },
  {
    key: "companies",
    valueKey: "statCompaniesValue",
    labelKey: "statCompaniesLabel",
    deltaKey: "statCompaniesDelta",
  },
  {
    key: "roles",
    valueKey: "statRolesValue",
    labelKey: "statRolesLabel",
    deltaKey: "statRolesDelta",
  },
] as const

export const UPCOMING_EVENTS = [
  {
    key: "onboarding",
    titleKey: "eventOnboardingTitle",
    scheduleKey: "eventOnboardingSchedule",
    typeKey: "eventOnboardingType",
  },
  {
    key: "review",
    titleKey: "eventProfileReviewTitle",
    scheduleKey: "eventProfileReviewSchedule",
    typeKey: "eventProfileReviewType",
  },
  {
    key: "workshop",
    titleKey: "eventWorkshopTitle",
    scheduleKey: "eventWorkshopSchedule",
    typeKey: "eventWorkshopType",
  },
] as const
