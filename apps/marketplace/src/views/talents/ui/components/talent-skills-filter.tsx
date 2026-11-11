"use client"

import { useTranslations } from "next-intl"

import { Button } from "@workspace/ui/components/button"
import { Checkbox } from "@workspace/ui/components/checkbox"
import { Popover, PopoverContent, PopoverTrigger } from "@workspace/ui/components/popover"

type SkillOption = {
  id: string
  name: string
}

type TalentSkillsFilterProps = {
  skills: string[]
  options: SkillOption[]
  onChange: (skills: string[]) => void
}

export function TalentSkillsFilter({ skills, options, onChange }: TalentSkillsFilterProps) {
  const t = useTranslations("Talents")
  const selected = new Set(skills.map((skill) => skill.toLowerCase()))
  const extraSkills = skills.filter(
    (skill) => !options.some((option) => option.name.toLowerCase() === skill.toLowerCase())
  )
  const choices = [
    ...extraSkills.map((name) => ({ id: `selected:${name.toLowerCase()}`, name })),
    ...options,
  ]

  function toggleSkill(name: string) {
    const key = name.toLowerCase()

    if (selected.has(key)) {
      onChange(skills.filter((skill) => skill.toLowerCase() !== key))
      return
    }

    onChange([...skills, name])
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className="h-10 w-full justify-start rounded-xl font-normal sm:w-auto sm:min-w-44"
        >
          <span className="truncate">
            {skills.length > 0 ? skills.join(", ") : t("skillsFilterLabel")}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-64 p-2">
        <div className="max-h-64 overflow-y-auto">
          {choices.length === 0 ? (
            <p className="text-muted-foreground px-2 py-1.5 text-sm">{t("skillsFilterEmpty")}</p>
          ) : (
            choices.map((skill) => (
              <label
                key={skill.id}
                className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-muted"
              >
                <Checkbox
                  checked={selected.has(skill.name.toLowerCase())}
                  onCheckedChange={() => toggleSkill(skill.name)}
                />
                <span>{skill.name}</span>
              </label>
            ))
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}
