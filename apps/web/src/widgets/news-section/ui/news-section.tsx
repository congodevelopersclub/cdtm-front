"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { useTranslations } from "next-intl"
import { useMemo, useState } from "react"

type NewsItem = {
  title: string
  date: string
  tag: string
  excerpt: string
}

export function NewsSection() {
  const t = useTranslations("news")
  const items = t.raw("items") as NewsItem[]
  const [activeIndex, setActiveIndex] = useState(0)

  const featured = useMemo(() => items[activeIndex], [items, activeIndex])

  function goPrev() {
    setActiveIndex((current) =>
      current === 0 ? items.length - 1 : current - 1
    )
  }

  function goNext() {
    setActiveIndex((current) =>
      current === items.length - 1 ? 0 : current + 1
    )
  }

  if (!featured) {
    return null
  }

  return (
    <section className="bg-background border-border border-t py-24">
      <div className="page-container">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <div className="text-primary mb-4 font-mono text-[10px] font-bold tracking-[0.3em] uppercase italic">
              /insights
            </div>
            <h2 className="text-foreground text-4xl font-black tracking-tighter md:text-5xl">
              {t("title")}
            </h2>
          </div>
          <div className="hidden items-center gap-2 md:flex">
            <button
              type="button"
              onClick={goPrev}
              className="border-border hover:border-primary rounded-full border p-2 transition-colors"
              aria-label="Previous article"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={goNext}
              className="border-border hover:border-primary rounded-full border p-2 transition-colors"
              aria-label="Next article"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-border bg-card/50 mb-12 rounded-3xl border p-8 md:p-12"
        >
          <div className="text-muted-foreground mb-4 text-xs font-bold tracking-widest uppercase">
            {featured.date}
          </div>
          <span className="bg-brand-mint/15 text-brand-mint mb-4 inline-block rounded px-3 py-1 text-[10px] font-bold tracking-widest uppercase">
            {featured.tag}
          </span>
          <h3 className="text-foreground mb-4 text-2xl font-black tracking-tight md:text-3xl">
            {featured.title}
          </h3>
          <p className="text-muted-foreground mb-6 max-w-3xl leading-relaxed">
            {featured.excerpt}
          </p>
          <Link
            href="/blog"
            className="text-primary inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase"
          >
            {t("read")}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => (
            <button
              key={`${item.title}-${index}`}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`border-border rounded-2xl border p-5 text-left transition-colors ${
                index === activeIndex
                  ? "border-primary bg-primary/5"
                  : "bg-card/30 hover:border-primary/40"
              }`}
            >
              <div className="text-muted-foreground mb-2 text-[10px] font-bold tracking-widest uppercase">
                {item.date}
              </div>
              <div className="text-foreground line-clamp-2 font-bold">
                {item.title}
              </div>
            </button>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/blog"
            className="border-border hover:border-primary inline-flex items-center gap-2 rounded-full border px-6 py-3 text-xs font-bold tracking-widest uppercase transition-colors"
          >
            {t("view_all")}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
