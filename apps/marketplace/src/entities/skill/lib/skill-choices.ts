type NamedSkill = {
  id: string
  name: string
}

export function skillChoices(
  catalog: NamedSkill[],
  takenNames: string[],
  currentName: string
) {
  const taken = new Set(takenNames.map((name) => name.trim().toLowerCase()).filter(Boolean))
  const current = currentName.trim().toLowerCase()
  const options = catalog.filter((skill) => {
    const name = skill.name.trim().toLowerCase()

    return name === current || !taken.has(name)
  })

  if (current && !options.some((skill) => skill.name.trim().toLowerCase() === current)) {
    return [{ id: `current:${current}`, name: currentName.trim() }, ...options]
  }

  return options
}
