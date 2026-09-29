"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
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

import {
  useCreateSkill,
  useDeleteSkill,
  useSkill,
  useSkills,
  useUpdateSkill,
  type Skill,
} from "@/entities/skill"

export function SkillsPage() {
  const t = useTranslations("SkillsPage")
  const router = useRouter()
  const searchParams = useSearchParams()
  const page = Number(searchParams.get("page") ?? "1") || 1
  const skillsQuery = useSkills(page)
  const createSkill = useCreateSkill()
  const updateSkill = useUpdateSkill()
  const deleteSkill = useDeleteSkill()

  const [formMode, setFormMode] = useState<"create" | number | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<Skill | null>(null)
  const [name, setName] = useState("")
  const [formError, setFormError] = useState<string | null>(null)
  const [deleteError, setDeleteError] = useState<string | null>(null)

  const editingId = typeof formMode === "number" ? formMode : null
  const skillQuery = useSkill(editingId)
  const isSaving = createSkill.isPending || updateSkill.isPending

  useEffect(() => {
    if (skillQuery.data) {
      setName(skillQuery.data.name)
    }
  }, [skillQuery.data])

  function openCreate() {
    setName("")
    setFormError(null)
    setFormMode("create")
  }

  function openEdit(id: number) {
    setName("")
    setFormError(null)
    setFormMode(id)
  }

  function closeForm() {
    setFormMode(null)
    setFormError(null)
  }

  function goToPage(nextPage: number) {
    router.push(nextPage <= 1 ? "/skills" : `/skills?page=${nextPage}`)
  }

  async function saveSkill() {
    const trimmedName = name.trim()

    if (!trimmedName) {
      setFormError(t("nameRequired"))
      return
    }

    setFormError(null)

    try {
      if (formMode === "create") {
        await createSkill.mutateAsync(trimmedName)
      } else if (typeof formMode === "number") {
        await updateSkill.mutateAsync({ id: formMode, name: trimmedName })
      }

      closeForm()
    } catch (error) {
      setFormError(error instanceof Error ? error.message : t("saveError"))
    }
  }

  async function confirmDelete() {
    if (!deleteTarget) {
      return
    }

    setDeleteError(null)

    try {
      await deleteSkill.mutateAsync(deleteTarget.id)
      setDeleteTarget(null)

      if ((skillsQuery.data?.skills.length ?? 0) <= 1 && page > 1) {
        goToPage(page - 1)
      }
    } catch (error) {
      setDeleteError(error instanceof Error ? error.message : t("deleteError"))
    }
  }

  const skills = skillsQuery.data?.skills ?? []
  const pagination = skillsQuery.data?.pagination

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          {pagination ? t("total", { total: pagination.total }) : t("subtitle")}
        </p>
        <Button className="rounded-full" onClick={openCreate}>
          {t("add")}
        </Button>
      </div>

      {skillsQuery.isLoading ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 8 }, (_, index) => (
            <div
              key={index}
              className="h-36 animate-pulse rounded-2xl border border-border bg-card"
            />
          ))}
        </div>
      ) : null}

      {skillsQuery.isError && !skillsQuery.data ? (
        <DashboardPanel className="flex flex-col items-center justify-center gap-4 px-4 py-12 text-center">
          <p className="text-sm text-muted-foreground">{t("loadError")}</p>
          <Button className="rounded-full" onClick={() => skillsQuery.refetch()}>
            {t("retry")}
          </Button>
        </DashboardPanel>
      ) : null}

      {skillsQuery.data && skills.length === 0 ? (
        <DashboardEmptyState title={t("emptyTitle")} description={t("emptyDescription")} />
      ) : null}

      {skills.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {skills.map((skill) => (
            <Card key={skill.id} className="rounded-2xl shadow-none">
              <CardHeader>
                <CardTitle className="truncate text-base">{skill.name}</CardTitle>
                <CardDescription className="truncate">{skill.slug}</CardDescription>
              </CardHeader>
              <div className="flex gap-2 px-(--card-spacing)">
                <Button variant="outline" size="sm" onClick={() => openEdit(skill.id)}>
                  {t("edit")}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setDeleteError(null)
                    setDeleteTarget(skill)
                  }}
                >
                  {t("delete")}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      ) : null}

      {pagination && pagination.lastPage > 1 ? (
        <nav
          aria-label={t("pageLabel")}
          className="flex items-center justify-center gap-3"
        >
          <Button
            variant="outline"
            className="rounded-full"
            disabled={pagination.currentPage <= 1}
            onClick={() => goToPage(pagination.currentPage - 1)}
          >
            {t("previous")}
          </Button>
          <span className="text-sm text-muted-foreground">
            {t("pageOf", {
              page: pagination.currentPage,
              lastPage: pagination.lastPage,
            })}
          </span>
          <Button
            variant="outline"
            className="rounded-full"
            disabled={pagination.currentPage >= pagination.lastPage}
            onClick={() => goToPage(pagination.currentPage + 1)}
          >
            {t("next")}
          </Button>
        </nav>
      ) : null}

      <Dialog open={formMode != null} onOpenChange={(open) => !open && closeForm()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {formMode === "create" ? t("createTitle") : t("editTitle")}
            </DialogTitle>
            <DialogDescription>
              {formMode === "create" ? t("createDescription") : t("editDescription")}
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
                value={name}
                placeholder={t("namePlaceholder")}
                disabled={editingId != null && skillQuery.isLoading}
                onChange={(event) => setName(event.target.value)}
              />
            </label>
            {editingId != null && skillQuery.isError ? (
              <p className="text-sm text-destructive">{t("loadOneError")}</p>
            ) : null}
            {formError ? <p className="text-sm text-destructive">{formError}</p> : null}
            <DialogFooter>
              <Button type="button" variant="outline" onClick={closeForm}>
                {t("cancel")}
              </Button>
              <Button type="submit" disabled={isSaving || (editingId != null && skillQuery.isLoading)}>
                {isSaving ? t("saving") : t("save")}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog
        open={deleteTarget != null}
        onOpenChange={(open) => {
          if (!open) {
            setDeleteTarget(null)
            setDeleteError(null)
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("deleteTitle")}</DialogTitle>
            <DialogDescription>
              {t("deleteDescription", { name: deleteTarget?.name ?? "" })}
            </DialogDescription>
          </DialogHeader>
          {deleteError ? <p className="text-sm text-destructive">{deleteError}</p> : null}
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setDeleteTarget(null)}>
              {t("cancel")}
            </Button>
            <Button
              type="button"
              variant="destructive"
              disabled={deleteSkill.isPending}
              onClick={() => void confirmDelete()}
            >
              {deleteSkill.isPending ? t("deleting") : t("delete")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
