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
          <div key={index} className="h-40 animate-pulse rounded-2xl border border-border bg-card" />
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

      {projects.length === 0 ? (
        <DashboardEmptyState title={t("emptyTitle")} description={t("emptyDescription")} />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {projects.map((project, index) => (
            <Card key={project.id ?? `${project.title}-${index}`} className="rounded-2xl shadow-none">
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
              void saveProject()
            }}
          >
            <label className="flex flex-col gap-1.5 text-sm font-medium" htmlFor="project-title">
              {t("title")}
              <Input
                id="project-title"
                value={draft.title}
                onChange={(event) => setDraft((current) => ({ ...current, title: event.target.value }))}
              />
            </label>
            <label className="flex flex-col gap-1.5 text-sm font-medium" htmlFor="project-description">
              {t("description")}
              <textarea
                id="project-description"
                rows={4}
                value={draft.description}
                onChange={(event) =>
                  setDraft((current) => ({ ...current, description: event.target.value }))
                }
                className="w-full rounded-lg border border-input bg-transparent px-2.5 py-2 text-sm"
              />
            </label>
            <label className="flex flex-col gap-1.5 text-sm font-medium" htmlFor="project-link">
              {t("link")}
              <Input
                id="project-link"
                value={draft.link}
                placeholder="https://"
                autoComplete="off"
                onChange={(event) => setDraft((current) => ({ ...current, link: event.target.value }))}
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
                name: deleteIndex == null ? "" : (projects[deleteIndex]?.title ?? ""),
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
