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
  steelOutlineClassName,
  textareaControlClassName,
} from "@/shared/ui/form-dialog"
import { Input } from "@workspace/ui/components/input"

import { DashboardEmptyState, DashboardPanel } from "@/widgets/dashboard-shell"

import { useAuth } from "@/features/auth"
import {
  toAbsoluteProjectLink,
  toUpdateProfileInput,
  useProfile,
  useUpdateProfile,
  type UpdateProfileProjectInput,
} from "@/entities/talent"

type ProjectDraft = {
  id: string | null
  title: string
  description: string
  link: string
}

const EMPTY_PROJECT: ProjectDraft = {
  id: null,
  title: "",
  description: "",
  link: "",
}

export function ProjectsPage() {
  const t = useTranslations("ProjectsPage")
  const tNav = useTranslations("DashboardShell")
  const { user, isLoading: isAuthLoading } = useAuth()
  const profileId = user?.profile?.id ?? ""
  const profileQuery = useProfile(profileId)
  const updateProfile = useUpdateProfile(profileId, user?.id)
  const profile = profileQuery.data
  const projects = profile ? toUpdateProfileInput(profile).projects : []

  const [editingIndex, setEditingIndex] = useState<number | "new" | null>(null)
  const [draft, setDraft] = useState<ProjectDraft>(EMPTY_PROJECT)
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null)
  const [formError, setFormError] = useState<string | null>(null)
  const [deleteError, setDeleteError] = useState<string | null>(null)

  function openCreate() {
    setDraft(EMPTY_PROJECT)
    setFormError(null)
    setEditingIndex("new")
  }

  function openEdit(index: number) {
    const project = projects[index]

    if (!project) {
      return
    }

    setDraft({
      id: project.id,
      title: project.title,
      description: project.description,
      link: project.link,
    })
    setFormError(null)
    setEditingIndex(index)
  }

  function closeForm() {
    setEditingIndex(null)
    setFormError(null)
  }

  function parseDraft(): UpdateProfileProjectInput | null {
    const title = draft.title.trim()

    if (!title) {
      setFormError(t("titleRequired"))
      return null
    }

    return {
      id: draft.id,
      title,
      description: draft.description.trim(),
      link: toAbsoluteProjectLink(draft.link),
    }
  }

  async function saveProject() {
    if (!profile) {
      return
    }

    const nextProject = parseDraft()

    if (!nextProject) {
      return
    }

    const nextProjects =
      editingIndex === "new"
        ? [...projects, nextProject]
        : projects.map((project, index) => (index === editingIndex ? nextProject : project))

    setFormError(null)

    try {
      await updateProfile.mutateAsync({
        ...toUpdateProfileInput(profile),
        projects: nextProjects,
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
        projects: projects.filter((_, index) => index !== deleteIndex),
      })
      setDeleteIndex(null)
    } catch (error) {
      setDeleteError(error instanceof Error ? error.message : t("deleteError"))
    }
  }

  if (isAuthLoading || (profileId && profileQuery.isLoading)) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {Array.from({ length: 2 }, (_, index) => (
          <div key={index} className="h-40 animate-pulse rounded-3xl border border-border bg-card" />
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
            {tNav("navProjects")}
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

      {projects.length === 0 ? (
        <DashboardEmptyState title={t("emptyTitle")} description={t("emptyDescription")} />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {projects.map((project, index) => (
            <Card key={project.id ?? `${project.title}-${index}`} className="rounded-3xl border border-border bg-card shadow-none ring-0">
              <CardHeader>
                <CardTitle className="text-base">{project.title}</CardTitle>
                {project.description ? (
                  <CardDescription className="line-clamp-3">{project.description}</CardDescription>
                ) : null}
                {project.link ? (
                  <a
                    href={toAbsoluteProjectLink(project.link)}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 inline-flex text-sm font-medium text-primary underline-offset-4 hover:underline"
                  >
                    {t("viewProject")}
                  </a>
                ) : null}
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
              void saveProject()
            }}
          >
            <FormDialogBody>
              <FormField label={t("title")} htmlFor="project-title">
                <Input
                  id="project-title"
                  value={draft.title}
                  onChange={(event) => setDraft((current) => ({ ...current, title: event.target.value }))}
                />
              </FormField>
              <FormField label={t("description")} htmlFor="project-description">
                <textarea
                  id="project-description"
                  rows={4}
                  value={draft.description}
                  onChange={(event) =>
                    setDraft((current) => ({ ...current, description: event.target.value }))
                  }
                  className={textareaControlClassName}
                />
              </FormField>
              <FormField label={t("link")} htmlFor="project-link">
                <Input
                  id="project-link"
                  value={draft.link}
                  placeholder="https://"
                  autoComplete="off"
                  onChange={(event) => setDraft((current) => ({ ...current, link: event.target.value }))}
                />
              </FormField>
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
                name: deleteIndex == null ? "" : (projects[deleteIndex]?.title ?? ""),
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
