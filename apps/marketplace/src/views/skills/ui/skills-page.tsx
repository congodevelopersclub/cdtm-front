"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"

import { Button } from "@workspace/ui/components/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@workspace/ui/components/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@workspace/ui/components/dialog"
import { Input } from "@workspace/ui/components/input"

import { DashboardEmptyState, DashboardPanel } from "@/widgets/dashboard-shell"

import { useAuth } from "@/features/auth"
import {
  toUpdateProfileInput,
  useProfile,
  useUpdateProfile,
  type UpdateProfileSkillInput,
} from "@/entities/talent"

type SkillDraft = {
  name: string
  proficiency: string
  yearsExperience: string
}

const EMPTY_SKILL: SkillDraft = {
  name: "",
  proficiency: "1",
  yearsExperience: "0",
}

export function SkillsPage() {
  const t = useTranslations("SkillsPage")
  const { user, isLoading: isAuthLoading } = useAuth()
  const profileId = user?.profile?.id ?? ""
  const profileQuery = useProfile(profileId)
  const updateProfile = useUpdateProfile(profileId, user?.id)
  const profile = profileQuery.data
  const skills = profile ? toUpdateProfileInput(profile).skills : []

  const [editingIndex, setEditingIndex] = useState<number | "new" | null>(null)
  const [draft, setDraft] = useState<SkillDraft>(EMPTY_SKILL)
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null)
  const [formError, setFormError] = useState<string | null>(null)
  const [deleteError, setDeleteError] = useState<string | null>(null)

  function openCreate() {
    setDraft(EMPTY_SKILL)
    setFormError(null)
    setEditingIndex("new")
  }

  function openEdit(index: number) {
    const skill = skills[index]

    if (!skill) {
      return
    }

    setDraft({
      name: skill.name,
      proficiency: String(skill.proficiency),
      yearsExperience: String(skill.years_experience),
    })
    setFormError(null)
    setEditingIndex(index)
  }

  function closeForm() {
    setEditingIndex(null)
    setFormError(null)
  }

  function parseDraft(): UpdateProfileSkillInput | null {
    const name = draft.name.trim()

    if (!name) {
      setFormError(t("nameRequired"))
      return null
    }

    const proficiency = Number(draft.proficiency)
    const yearsExperience = Number(draft.yearsExperience)

    if (
      !Number.isInteger(proficiency) ||
      proficiency < 1 ||
      proficiency > 10 ||
      !Number.isInteger(yearsExperience) ||
      yearsExperience < 0
    ) {
      setFormError(t("skillInvalid"))
      return null
    }

    return {
      name,
      proficiency,
      years_experience: yearsExperience,
    }
  }

  async function saveSkill() {
    if (!profile) {
      return
    }

    const nextSkill = parseDraft()

    if (!nextSkill) {
      return
    }

    const nextSkills =
      editingIndex === "new"
        ? [...skills, nextSkill]
        : skills.map((skill, index) => (index === editingIndex ? nextSkill : skill))

    setFormError(null)

    try {
      await updateProfile.mutateAsync({
        ...toUpdateProfileInput(profile),
        skills: nextSkills,
      })
      closeForm()
    } catch (error) {
      setFormError(error instanceof Error ? error.message : t("saveError"))
    }
  }

  async function confirmDelete() {
    if (!profile || deleteIndex == null) {
      return
    }

    setDeleteError(null)

    try {
      await updateProfile.mutateAsync({
        ...toUpdateProfileInput(profile),
        skills: skills.filter((_, index) => index !== deleteIndex),
      })
      setDeleteIndex(null)
    } catch (error) {
      setDeleteError(error instanceof Error ? error.message : t("deleteError"))
    }
  }

  if (isAuthLoading || (profileId && profileQuery.isLoading)) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }, (_, index) => (
          <div key={index} className="h-36 animate-pulse rounded-2xl border border-border bg-card" />
        ))}
      </div>
    )
  }

  if (!profile) {
    return (
      <DashboardPanel className="flex flex-col items-center justify-center gap-4 px-4 py-12 text-center">
        <p className="text-sm text-muted-foreground">
          {profileQuery.isError ? t("loadError") : t("noProfile")}
        </p>
        {profileQuery.isError ? (
          <Button className="rounded-full" onClick={() => profileQuery.refetch()}>
            {t("retry")}
          </Button>
        ) : null}
      </DashboardPanel>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">{t("subtitle")}</p>
        <Button className="rounded-full" onClick={openCreate}>
          {t("add")}
        </Button>
      </div>

      {skills.length === 0 ? (
        <DashboardEmptyState title={t("emptyTitle")} description={t("emptyDescription")} />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {skills.map((skill, index) => (
            <Card key={`${skill.name}-${index}`} className="rounded-2xl shadow-none">
              <CardHeader>
                <CardTitle className="truncate text-base">{skill.name}</CardTitle>
                <CardDescription>
                  {t("skillMeta", {
                    proficiency: skill.proficiency,
                    years: skill.years_experience,
                  })}
                </CardDescription>
              </CardHeader>
              <div className="flex gap-2 px-(--card-spacing)">
                <Button variant="outline" size="sm" onClick={() => openEdit(index)}>
                  {t("edit")}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setDeleteError(null)
                    setDeleteIndex(index)
                  }}
                >
                  {t("delete")}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={editingIndex != null} onOpenChange={(open) => !open && closeForm()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingIndex === "new" ? t("createTitle") : t("editTitle")}</DialogTitle>
            <DialogDescription>
              {editingIndex === "new" ? t("createDescription") : t("editDescription")}
            </DialogDescription>
          </DialogHeader>
          <form
            className="flex flex-col gap-3"
            onSubmit={(event) => {
              event.preventDefault()
              void saveSkill()
            }}
          >
            <label className="flex flex-col gap-1.5 text-sm font-medium" htmlFor="skill-name">
              {t("name")}
              <Input
                id="skill-name"
                value={draft.name}
                placeholder={t("namePlaceholder")}
                onChange={(event) => setDraft((current) => ({ ...current, name: event.target.value }))}
              />
            </label>
            <label className="flex flex-col gap-1.5 text-sm font-medium" htmlFor="skill-proficiency">
              {t("proficiency")}
              <Input
                id="skill-proficiency"
                type="number"
                min={1}
                max={10}
                value={draft.proficiency}
                onChange={(event) =>
                  setDraft((current) => ({ ...current, proficiency: event.target.value }))
                }
              />
            </label>
            <label className="flex flex-col gap-1.5 text-sm font-medium" htmlFor="skill-years">
              {t("years")}
              <Input
                id="skill-years"
                type="number"
                min={0}
                value={draft.yearsExperience}
                onChange={(event) =>
                  setDraft((current) => ({ ...current, yearsExperience: event.target.value }))
                }
              />
            </label>
            {formError ? <p className="text-sm text-destructive">{formError}</p> : null}
            <DialogFooter>
              <Button type="button" variant="outline" onClick={closeForm}>
                {t("cancel")}
              </Button>
              <Button type="submit" disabled={updateProfile.isPending}>
                {updateProfile.isPending ? t("saving") : t("save")}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog
        open={deleteIndex != null}
        onOpenChange={(open) => {
          if (!open) {
            setDeleteIndex(null)
            setDeleteError(null)
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("deleteTitle")}</DialogTitle>
            <DialogDescription>
              {t("deleteDescription", {
                name: deleteIndex == null ? "" : (skills[deleteIndex]?.name ?? ""),
              })}
            </DialogDescription>
          </DialogHeader>
          {deleteError ? <p className="text-sm text-destructive">{deleteError}</p> : null}
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setDeleteIndex(null)}>
              {t("cancel")}
            </Button>
            <Button
              type="button"
              variant="destructive"
              disabled={updateProfile.isPending}
              onClick={() => void confirmDelete()}
            >
              {updateProfile.isPending ? t("deleting") : t("delete")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
