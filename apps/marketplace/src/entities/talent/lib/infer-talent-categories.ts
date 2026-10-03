import { TALENT_CATEGORIES, type TalentCategory } from "../model/talent-category"

const CATEGORY_PATTERNS: Record<TalentCategory, RegExp[]> = {
  fullstack: [/full[\s-]?stack/i],
  frontend: [/front[\s-]?end/i, /\breact\b/i, /\bvue\b/i, /\bangular\b/i, /\bnext\.?js\b/i],
  backend: [/back[\s-]?end/i, /\bnode\.?js\b/i, /\bgo\b/i, /\bjava\b/i, /\bapi\b/i],
  mobile: [/mobile/i, /react native/i, /\bflutter\b/i, /\bios\b/i, /\bandroid\b/i],
  devops: [/devops/i, /\bdocker\b/i, /\bkubernetes\b/i, /\baws\b/i, /ci\/cd/i],
  data: [/\bdata\b/i, /analytics/i, /\bsql\b/i, /postgres/i, /database/i],
  ai: [/\bai\b/i, /machine learning/i, /\bml\b/i, /\bllm\b/i],
  security: [/security/i, /cyber/i],
  design: [/design/i, /\bfigma\b/i, /\bux\b/i, /\bui\b/i],
  product: [/product/i],
  marketing: [/marketing/i],
  sales: [/sales/i],
  hr: [/\bhr\b/i, /human resources/i],
  legal: [/legal/i],
  finance: [/finance/i, /fintech/i],
}

function getSearchableText(input: {
  title: string
  bio: string
  skills: string[]
}) {
  return [input.title, input.bio, ...input.skills].join(" ").toLowerCase()
}

export function inferTalentCategories(input: {
  title: string
  bio: string
  skills: string[]
}): TalentCategory[] {
  const searchableText = getSearchableText(input)

  return TALENT_CATEGORIES.filter((category) =>
    CATEGORY_PATTERNS[category].some((pattern) => pattern.test(searchableText))
  )
}
