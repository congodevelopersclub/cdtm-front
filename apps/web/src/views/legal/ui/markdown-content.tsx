import Link from "next/link"
import type { ReactNode } from "react"

import { cn } from "@workspace/ui/lib/utils"

type MarkdownContentProps = {
  markdown: string
  className?: string
}

function renderInline(text: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = []
  const pattern =
    /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\[[^\]]+\]\([^)]+\)|https?:\/\/[^\s)]+)/g
  let lastIndex = 0
  let match: RegExpExecArray | null
  let part = 0

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index))
    }

    const token = match[0]
    const key = `${keyPrefix}-${part++}`

    if (token.startsWith("**")) {
      nodes.push(<strong key={key}>{token.slice(2, -2)}</strong>)
    } else if (token.startsWith("*")) {
      nodes.push(<em key={key}>{token.slice(1, -1)}</em>)
    } else if (token.startsWith("`")) {
      nodes.push(
        <code
          key={key}
          className="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.9em]"
        >
          {token.slice(1, -1)}
        </code>
      )
    } else if (token.startsWith("[")) {
      const linkMatch = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
      const label = linkMatch?.[1]
      const href = linkMatch?.[2]

      if (label && href) {
        const isInternal = href.startsWith("/")
        nodes.push(
          isInternal ? (
            <Link
              key={key}
              href={href}
              className="font-medium text-primary underline underline-offset-4"
            >
              {label}
            </Link>
          ) : (
            <a
              key={key}
              href={href}
              className="font-medium text-primary underline underline-offset-4"
              target="_blank"
              rel="noopener noreferrer"
            >
              {label}
            </a>
          )
        )
      } else {
        nodes.push(token)
      }
    } else {
      nodes.push(
        <a
          key={key}
          href={token}
          className="font-medium text-primary underline underline-offset-4"
          target="_blank"
          rel="noopener noreferrer"
        >
          {token}
        </a>
      )
    }

    lastIndex = match.index + token.length
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex))
  }

  return nodes
}

function splitTableRow(line: string) {
  return line
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => cell.trim())
}

function isTableSeparator(line: string) {
  return /^\|?[\s:-]+\|[\s|:-]*\|?$/.test(line.trim())
}

export function MarkdownContent({ markdown, className }: MarkdownContentProps) {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n")
  const blocks: ReactNode[] = []
  let index = 0
  let block = 0

  while (index < lines.length) {
    const line = lines[index] ?? ""

    if (!line.trim()) {
      index += 1
      continue
    }

    if (line.startsWith("# ")) {
      blocks.push(
        <h1
          key={`h1-${block++}`}
          className="text-4xl font-extrabold tracking-tight md:text-5xl"
        >
          {renderInline(line.slice(2).trim(), `h1-${block}`)}
        </h1>
      )
      index += 1
      continue
    }

    if (line.startsWith("## ")) {
      blocks.push(
        <h2 key={`h2-${block++}`} className="mt-10 text-2xl font-bold">
          {renderInline(line.slice(3).trim(), `h2-${block}`)}
        </h2>
      )
      index += 1
      continue
    }

    if (line.startsWith("### ")) {
      blocks.push(
        <h3 key={`h3-${block++}`} className="mt-6 text-xl font-semibold">
          {renderInline(line.slice(4).trim(), `h3-${block}`)}
        </h3>
      )
      index += 1
      continue
    }

    if (line.trim().startsWith("|") && isTableSeparator(lines[index + 1] ?? "")) {
      const header = splitTableRow(line)
      index += 2
      const rows: string[][] = []

      while (index < lines.length && (lines[index] ?? "").trim().startsWith("|")) {
        rows.push(splitTableRow(lines[index] ?? ""))
        index += 1
      }

      blocks.push(
        <div key={`table-${block++}`} className="overflow-x-auto">
          <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-border">
                {header.map((cell, cellIndex) => (
                  <th
                    key={`th-${cellIndex}`}
                    className="px-3 py-2 font-semibold text-foreground"
                  >
                    {renderInline(cell, `th-${block}-${cellIndex}`)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, rowIndex) => (
                <tr key={`tr-${rowIndex}`} className="border-b border-border/70">
                  {row.map((cell, cellIndex) => (
                    <td
                      key={`td-${rowIndex}-${cellIndex}`}
                      className="px-3 py-2 align-top text-muted-foreground"
                    >
                      {renderInline(cell, `td-${block}-${rowIndex}-${cellIndex}`)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
      continue
    }

    if (line.trim().startsWith("- ")) {
      const items: string[] = []

      while (index < lines.length && (lines[index] ?? "").trim().startsWith("- ")) {
        items.push((lines[index] ?? "").trim().slice(2))
        index += 1
      }

      blocks.push(
        <ul key={`ul-${block++}`} className="list-disc space-y-2 pl-6 text-muted-foreground">
          {items.map((item, itemIndex) => (
            <li key={`li-${itemIndex}`}>
              {renderInline(item, `li-${block}-${itemIndex}`)}
            </li>
          ))}
        </ul>
      )
      continue
    }

    const paragraphLines: string[] = [line]
    index += 1

    while (
      index < lines.length &&
      (lines[index] ?? "").trim() &&
      !(lines[index] ?? "").startsWith("#") &&
      !(lines[index] ?? "").trim().startsWith("- ") &&
      !(lines[index] ?? "").trim().startsWith("|")
    ) {
      paragraphLines.push(lines[index] ?? "")
      index += 1
    }

    const paragraph = paragraphLines.join(" ").trim()
    const isEmphasisOnly =
      paragraph.startsWith("*") &&
      paragraph.endsWith("*") &&
      !paragraph.startsWith("**")

    blocks.push(
      <p
        key={`p-${block++}`}
        className={cn(
          "leading-7 text-muted-foreground",
          isEmphasisOnly && "text-sm"
        )}
      >
        {renderInline(paragraph, `p-${block}`)}
      </p>
    )
  }

  return <div className={cn("space-y-4", className)}>{blocks}</div>
}
