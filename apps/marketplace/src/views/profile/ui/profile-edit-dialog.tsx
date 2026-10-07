"use client"

import { useEffect, useState, type ReactNode } from "react"
import { useTranslations } from "next-intl"

import { Button } from "@workspace/ui/components/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@workspace/ui/components/dialog"
import { Input } from "@workspace/ui/components/input"

import { useAuth } from "@/features/auth"
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
  const [name, setName] = useState(profile.name)
  const [headline, setHeadline] = useState(profile.title === "—" ? "" : profile.title)
  const [bio, setBio] = useState(profile.bio)
  const [location, setLocation] = useState(profile.location)
  const [status, setStatus] = useState(profile.employmentStatus || "full-time")
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
        skills: nextSkills,
      })
      onOpenChange(false)
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : t("saveError"))
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{t("editProfile")}</DialogTitle>
          <DialogDescription>{t("editDescription")}</DialogDescription>
        </DialogHeader>
        <form
          className="flex flex-col gap-3"
          onSubmit={(event) => {
            event.preventDefault()
            void save()
          }}
        >
          <Field label={t("name")} htmlFor="profile-name">
            <Input id="profile-name" value={name} onChange={(event) => setName(event.target.value)} />
          </Field>
          <Field label={t("role")} htmlFor="profile-headline">
            <Input
              id="profile-headline"
              value={headline}
              onChange={(event) => setHeadline(event.target.value)}
            />
          </Field>
          <Field label={t("location")} htmlFor="profile-location">
            <Input
              id="profile-location"
              value={location}
              onChange={(event) => setLocation(event.target.value)}
            />
          </Field>
          <Field label={t("employmentStatus")} htmlFor="profile-status">
            <select
              id="profile-status"
              value={status}
              onChange={(event) => setStatus(event.target.value)}
              className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm"
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
          </Field>
          <Field label={t("myStory")} htmlFor="profile-bio">
            <textarea
              id="profile-bio"
              value={bio}
              rows={4}
              onChange={(event) => setBio(event.target.value)}
              className="w-full rounded-lg border border-input bg-transparent px-2.5 py-2 text-sm"
            />
          </Field>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-medium">{t("skills")}</p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() =>
                  setSkills((current) => [
                    ...current,
                    { name: "", proficiency: "1", yearsExperience: "0" },
                  ])
                }
              >
                {t("addSkill")}
              </Button>
            </div>
            {skills.map((skill, index) => (
              <div key={index} className="grid grid-cols-[1fr_5rem_5rem_auto] gap-2">
                <select
                  aria-label={t("skillName")}
                  value={skill.name}
                  disabled={catalogQuery.isLoading}
                  onChange={(event) => updateSkill(index, { name: event.target.value })}
                  className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm"
                >
                  <option value="">{t("skillName")}</option>
                  {skillChoices(
                    catalogQuery.data ?? [],
                    skills.filter((_, skillIndex) => skillIndex !== index).map((item) => item.name),
                    skill.name
                  ).map((option) => (
                    <option key={option.id} value={option.name}>
                      {option.name}
                    </option>
                  ))}
                </select>
                <Input
                  aria-label={t("proficiency")}
                  type="number"
                  min={1}
                  max={10}
                  value={skill.proficiency}
                  onChange={(event) => updateSkill(index, { proficiency: event.target.value })}
                />
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
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setSkills((current) => current.filter((_, skillIndex) => skillIndex !== index))
                  }
                >
                  {t("removeSkill")}
                </Button>
              </div>
            ))}
          </div>
          {error ? <p className="text-sm text-destructive">{error}</p> : null}
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              {t("cancel")}
            </Button>
            <Button type="submit" disabled={updateProfile.isPending}>
              {updateProfile.isPending ? t("saving") : t("save")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string
  htmlFor: string
  children: ReactNode
}) {
  return (
    <label className="flex flex-col gap-1.5 text-sm font-medium" htmlFor={htmlFor}>
      {label}
      {children}
    </label>
  )
}
