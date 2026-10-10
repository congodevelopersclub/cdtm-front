"use client"

import { useState } from "react"
import { IconPencil, IconPlus, IconTrash } from "@tabler/icons-react"
import { useTranslations } from "next-intl"

import { Button } from "@workspace/ui/components/button"
import { cn } from "@workspace/ui/lib/utils"
import { Card, CardDescription, CardHeader, CardTitle } from "@workspace/ui/components/card"
import {
  Dialog,
  DialogDescription,
  DialogTitle,
} from "@workspace/ui/components/dialog"

import {
  CancelDialogButton,
  DeleteDialogButton,
  FormDialogBody,
  FormDialogContent,
  FormDialogFooter,
  FormDialogHeader,
  FormField,
  mintButtonClassName,
  SaveDialogButton,
  selectControlClassName,
  steelOutlineClassName,
} from "@/shared/ui/form-dialog"
import { Input } from "@workspace/ui/components/input"

import { DashboardEmptyState, DashboardPanel } from "@/widgets/dashboard-shell"

import { useAuth } from "@/features/auth"
import { skillChoices, useSkillCatalog } from "@/entities/skill"
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
  const tNav = useTranslations("DashboardShell")
  const { user, isLoading: isAuthLoading } = useAuth()
  const profileId = user?.profile?.id ?? ""
  const profileQuery = useProfile(profileId)
  const updateProfile = useUpdateProfile(profileId, user?.id)
  const profile = profileQuery.data
  const skills = profile ? toUpdateProfileInput(profile).skills : []
  const catalogQuery = useSkillCatalog()
  const [editingIndex, setEditingIndex] = useState<number | "new" | null>(null)
  const [draft, setDraft] = useState<SkillDraft>(EMPTY_SKILL)
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null)
  const [formError, setFormError] = useState<string | null>(null)
  const [deleteError, setDeleteError] = useState<string | null>(null)
  const skillOptions = skillChoices(
    catalogQuery.data ?? [],
    skills.filter((_, index) => index !== editingIndex).map((skill) => skill.name),
    draft.name
  )

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
      yearsExperience < 0 ||
      yearsExperience > 5
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
          <div key={index} className="h-36 animate-pulse rounded-3xl border border-border bg-card" />
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
          <Button className="rounded-xl" onClick={() => profileQuery.refetch()}>
            {t("retry")}
          </Button>
        ) : null}
      </DashboardPanel>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">
            {tNav("navSkills")}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">{t("subtitle")}</p>
        </div>
        <Button
          className={cn("rounded-xl", mintButtonClassName)}
          onClick={openCreate}
        >
          <IconPlus />
          {t("add")}
        </Button>
      </div>

      {skills.length === 0 ? (
        <DashboardEmptyState title={t("emptyTitle")} description={t("emptyDescription")} />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {skills.map((skill, index) => (
            <Card key={`${skill.name}-${index}`} className="rounded-3xl border border-border bg-card shadow-none ring-0">
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
                <Button
                  variant="outline"
                  size="sm"
                  className={steelOutlineClassName}
                  onClick={() => openEdit(index)}
                >
                  <IconPencil />
                  {t("edit")}
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => {
                    setDeleteError(null)
                    setDeleteIndex(index)
                  }}
                >
                  <IconTrash />
                  {t("delete")}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={editingIndex != null} onOpenChange={(open) => !open && closeForm()}>
        <FormDialogContent>
          <FormDialogHeader>
            <DialogTitle>{editingIndex === "new" ? t("createTitle") : t("editTitle")}</DialogTitle>
            <DialogDescription>
              {editingIndex === "new" ? t("createDescription") : t("editDescription")}
            </DialogDescription>
          </FormDialogHeader>
          <form
            className="flex min-h-0 flex-1 flex-col"
            onSubmit={(event) => {
              event.preventDefault()
              void saveSkill()
            }}
          >
            <FormDialogBody>
              <FormField label={t("name")} htmlFor="skill-name">
                <select
                  id="skill-name"
                  value={draft.name}
                  disabled={catalogQuery.isLoading}
                  onChange={(event) => setDraft((current) => ({ ...current, name: event.target.value }))}
                  className={selectControlClassName}
                >
                  <option value="">{t("namePlaceholder")}</option>
                  {skillOptions.map((skill) => (
                    <option key={skill.id} value={skill.name}>
                      {skill.name}
                    </option>
                  ))}
                </select>
              </FormField>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField label={t("proficiency")} htmlFor="skill-proficiency">
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
                </FormField>
                <FormField label={t("years")} htmlFor="skill-years">
                  <Input
                    id="skill-years"
                    type="number"
                    min={0}
                    max={5}
                    value={draft.yearsExperience}
                    onChange={(event) =>
                      setDraft((current) => ({ ...current, yearsExperience: event.target.value }))
                    }
                  />
                </FormField>
              </div>
              {formError ? <p className="text-sm text-destructive">{formError}</p> : null}
            </FormDialogBody>
            <FormDialogFooter>
              <CancelDialogButton onClick={closeForm}>{t("cancel")}</CancelDialogButton>
              <SaveDialogButton pending={updateProfile.isPending} pendingLabel={t("saving")}>
                {t("save")}
              </SaveDialogButton>
            </FormDialogFooter>
          </form>
        </FormDialogContent>
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
        <FormDialogContent className="sm:max-w-md">
          <FormDialogHeader>
            <DialogTitle>{t("deleteTitle")}</DialogTitle>
            <DialogDescription>
              {t("deleteDescription", {
                name: deleteIndex == null ? "" : (skills[deleteIndex]?.name ?? ""),
              })}
            </DialogDescription>
          </FormDialogHeader>
          {deleteError ? <p className="text-sm text-destructive">{deleteError}</p> : null}
          <FormDialogFooter>
            <CancelDialogButton onClick={() => setDeleteIndex(null)}>
              {t("cancel")}
            </CancelDialogButton>
            <DeleteDialogButton
              pending={updateProfile.isPending}
              pendingLabel={t("deleting")}
              onClick={() => void confirmDelete()}
            >
              {t("delete")}
            </DeleteDialogButton>
          </FormDialogFooter>
        </FormDialogContent>
      </Dialog>
    </div>
  )
}
