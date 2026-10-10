"use client"

import { useEffect, useState } from "react"
import { IconPlus, IconTrash } from "@tabler/icons-react"
import { Info } from "lucide-react"
import { useTranslations } from "next-intl"

import { Button } from "@workspace/ui/components/button"
import { cn } from "@workspace/ui/lib/utils"
import {
  Dialog,
  DialogDescription,
  DialogTitle,
} from "@workspace/ui/components/dialog"
import { Input } from "@workspace/ui/components/input"
import { Tooltip, TooltipContent, TooltipTrigger } from "@workspace/ui/components/tooltip"

import {
  CancelDialogButton,
  FormDialogBody,
  FormDialogContent,
  FormDialogFooter,
  FormDialogHeader,
  FormField,
  mintButtonClassName,
  SaveDialogButton,
  selectControlClassName,
  textareaControlClassName,
} from "@/shared/ui/form-dialog"

import { useAuth } from "@/features/auth"
import { useCategories } from "@/entities/category"
import { skillChoices, useSkillCatalog } from "@/entities/skill"
import { toUpdateProfileInput, useUpdateProfile, type TalentProfile } from "@/entities/talent"

const STATUS_OPTIONS = ["full-time", "part-time", "feelance"] as const

type SkillDraft = {
  name: string
  proficiency: string
  yearsExperience: string
}

type ProfileEditDialogProps = {
  profile: TalentProfile
  open: boolean
  onOpenChange: (open: boolean) => void
}

function toDrafts(profile: TalentProfile): SkillDraft[] {
  const details = profile.skillDetails ?? []

  if (details.length > 0) {
    return details.map((skill) => ({
      name: skill.name,
      proficiency: String(skill.proficiency),
      yearsExperience: String(skill.yearsExperience),
    }))
  }

  return profile.skills.map((skill) => ({
    name: skill,
    proficiency: "1",
    yearsExperience: "0",
  }))
}

export function ProfileEditDialog({
  profile,
  open,
  onOpenChange,
}: ProfileEditDialogProps) {
  const t = useTranslations("Profile")
  const { user } = useAuth()
  const updateProfile = useUpdateProfile(profile.id, user?.id)
  const catalogQuery = useSkillCatalog()
  const categoriesQuery = useCategories()
  const [name, setName] = useState(profile.name)
  const [headline, setHeadline] = useState(profile.title === "—" ? "" : profile.title)
  const [bio, setBio] = useState(profile.bio)
  const [location, setLocation] = useState(profile.location)
  const [status, setStatus] = useState(profile.employmentStatus || "full-time")
  const [categoryId, setCategoryId] = useState(
    profile.categoryId == null ? "" : String(profile.categoryId)
  )
  const [skills, setSkills] = useState<SkillDraft[]>(() => toDrafts(profile))
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!open) {
      return
    }

    setName(profile.name)
    setHeadline(profile.title === "—" ? "" : profile.title)
    setBio(profile.bio)
    setLocation(profile.location)
    setStatus(profile.employmentStatus || "full-time")
    setCategoryId(profile.categoryId == null ? "" : String(profile.categoryId))
    setSkills(toDrafts(profile))
    setError(null)
  }, [open, profile])

  function updateSkill(index: number, patch: Partial<SkillDraft>) {
    setSkills((current) =>
      current.map((skill, skillIndex) =>
        skillIndex === index ? { ...skill, ...patch } : skill
      )
    )
  }

  async function save() {
    const trimmedName = name.trim()

    if (!trimmedName) {
      setError(t("nameRequired"))
      return
    }

    const nextSkills = skills
      .map((skill) => ({
        name: skill.name.trim(),
        proficiency: Number(skill.proficiency),
        years_experience: Number(skill.yearsExperience),
      }))
      .filter((skill) => skill.name)

    if (
      nextSkills.some(
        (skill) =>
          !Number.isInteger(skill.proficiency) ||
          skill.proficiency < 1 ||
          skill.proficiency > 10 ||
          !Number.isInteger(skill.years_experience) ||
          skill.years_experience < 0 ||
          skill.years_experience > 5
      )
    ) {
      setError(t("skillInvalid"))
      return
    }

    setError(null)

    try {
      await updateProfile.mutateAsync({
        ...toUpdateProfileInput(profile),
        name: trimmedName,
        headline: headline.trim(),
        bio: bio.trim(),
        location: location.trim(),
        status,
        category_id: /^\d+$/.test(categoryId) ? Number(categoryId) : null,
        skills: nextSkills,
      })
      onOpenChange(false)
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : t("saveError"))
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <FormDialogContent>
        <FormDialogHeader>
          <DialogTitle>{t("editProfile")}</DialogTitle>
          <DialogDescription>{t("editDescription")}</DialogDescription>
        </FormDialogHeader>
        <form
          className="flex min-h-0 flex-1 flex-col"
          onSubmit={(event) => {
            event.preventDefault()
            void save()
          }}
        >
          <FormDialogBody className="gap-5">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormField label={t("name")} htmlFor="profile-name" className="sm:col-span-2">
                <Input
                  id="profile-name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
              </FormField>
              <FormField label={t("role")} htmlFor="profile-headline">
                <Input
                  id="profile-headline"
                  value={headline}
                  onChange={(event) => setHeadline(event.target.value)}
                />
              </FormField>
              <FormField label={t("location")} htmlFor="profile-location">
                <Input
                  id="profile-location"
                  value={location}
                  onChange={(event) => setLocation(event.target.value)}
                />
              </FormField>
              <FormField label={t("employmentStatus")} htmlFor="profile-status">
                <select
                  id="profile-status"
                  value={status}
                  onChange={(event) => setStatus(event.target.value)}
                  className={selectControlClassName}
                >
                  {STATUS_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option === "full-time"
                        ? t("fullTime")
                        : option === "part-time"
                          ? t("partTime")
                          : t("freelance")}
                    </option>
                  ))}
                  {status && !STATUS_OPTIONS.includes(status as (typeof STATUS_OPTIONS)[number]) ? (
                    <option value={status}>{status}</option>
                  ) : null}
                </select>
              </FormField>
              <FormField label={t("category")} htmlFor="profile-category">
                <select
                  id="profile-category"
                  value={categoryId}
                  disabled={categoriesQuery.isLoading}
                  onChange={(event) => setCategoryId(event.target.value)}
                  className={selectControlClassName}
                >
                  <option value="">{t("categoryEmpty")}</option>
                  {(categoriesQuery.data ?? []).map((category) => (
                    <option key={category.id} value={String(category.id)}>
                      {category.name}
                    </option>
                  ))}
                  {categoryId &&
                  !(categoriesQuery.data ?? []).some(
                    (category) => String(category.id) === categoryId
                  ) ? (
                    <option value={categoryId}>{categoryId}</option>
                  ) : null}
                </select>
              </FormField>
              <FormField label={t("myStory")} htmlFor="profile-bio" className="sm:col-span-2">
                <textarea
                  id="profile-bio"
                  value={bio}
                  rows={4}
                  onChange={(event) => setBio(event.target.value)}
                  className={textareaControlClassName}
                />
              </FormField>
            </div>

            <div className="flex flex-col gap-3 border-t border-border pt-5">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-1.5">
                  <p className="text-sm font-medium">{t("skills")}</p>
                  <InfoTip label={t("skills")} text={t("skillsInfo")} />
                </div>
                <Button
                  type="button"
                  size="sm"
                  className={cn("shrink-0", mintButtonClassName)}
                  onClick={() =>
                    setSkills((current) => [
                      ...current,
                      { name: "", proficiency: "1", yearsExperience: "0" },
                    ])
                  }
                >
                  <IconPlus />
                  {t("addSkill")}
                </Button>
              </div>
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-3 rounded-xl border border-border bg-muted/40 p-3 sm:p-4"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-medium">{t("skillName")}</p>
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="shrink-0"
                      onClick={() =>
                        setSkills((current) =>
                          current.filter((_, skillIndex) => skillIndex !== index)
                        )
                      }
                    >
                      <IconTrash />
                      {t("removeSkill")}
                    </Button>
                  </div>
                  <select
                    aria-label={t("skillName")}
                    value={skill.name}
                    disabled={catalogQuery.isLoading}
                    onChange={(event) => updateSkill(index, { name: event.target.value })}
                    className={selectControlClassName}
                  >
                    <option value="">{t("skillName")}</option>
                    {skillChoices(
                      catalogQuery.data ?? [],
                      skills
                        .filter((_, skillIndex) => skillIndex !== index)
                        .map((item) => item.name),
                      skill.name
                    ).map((option) => (
                      <option key={option.id} value={option.name}>
                        {option.name}
                      </option>
                    ))}
                  </select>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <label className="flex flex-col gap-2 text-sm font-medium">
                      <span className="flex items-center gap-1.5 leading-none">
                        {t("proficiency")}
                        <InfoTip label={t("proficiency")} text={t("proficiencyInfo")} />
                      </span>
                      <Input
                        aria-label={t("proficiency")}
                        type="number"
                        min={1}
                        max={10}
                        value={skill.proficiency}
                        onChange={(event) =>
                          updateSkill(index, { proficiency: event.target.value })
                        }
                      />
                    </label>
                    <label className="flex flex-col gap-2 text-sm font-medium">
                      <span className="flex items-center gap-1.5 leading-none">
                        {t("yearsExperience")}
                        <InfoTip label={t("yearsExperience")} text={t("yearsInfo")} />
                      </span>
                      <Input
                        aria-label={t("yearsExperience")}
                        type="number"
                        min={0}
                        max={5}
                        value={skill.yearsExperience}
                        onChange={(event) =>
                          updateSkill(index, { yearsExperience: event.target.value })
                        }
                      />
                    </label>
                  </div>
                </div>
              ))}
            </div>
            {error ? <p className="text-sm text-destructive">{error}</p> : null}
          </FormDialogBody>
          <FormDialogFooter>
            <CancelDialogButton onClick={() => onOpenChange(false)}>
              {t("cancel")}
            </CancelDialogButton>
            <SaveDialogButton pending={updateProfile.isPending} pendingLabel={t("saving")}>
              {t("save")}
            </SaveDialogButton>
          </FormDialogFooter>
        </form>
      </FormDialogContent>
    </Dialog>
  )
}

function InfoTip({ label, text }: { label: string; text: string }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          className="text-muted-foreground inline-flex size-4 items-center justify-center rounded-full"
          aria-label={label}
        >
          <Info className="size-3.5" />
        </button>
      </TooltipTrigger>
      <TooltipContent className="z-[60] max-w-56 text-balance">{text}</TooltipContent>
    </Tooltip>
  )
}

