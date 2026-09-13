"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { MoveRight } from "lucide-react"
import { useTranslations } from "next-intl"

import { JOIN_URL } from "@/shared/config/site-links"

export function CtaSection() {
  const t = useTranslations("cta")
  const [isClicked, setIsClicked] = useState(false)

  function handleTriggerEffect() {
    setIsClicked(true)
    setTimeout(() => setIsClicked(false), 800)
  }

  return (
    <section className="bg-background relative flex items-center justify-center">
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="bg-primary/10 pointer-events-none absolute top-0 right-0 h-150 w-150 translate-x-1/3 -translate-y-1/3 rounded-full blur-[120px]"
      />

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="border-brand-orange/30 bg-brand-orange/5 mb-8 inline-block rounded-full border px-5 py-2"
        >
          <code className="text-primary font-mono text-[10px] font-bold tracking-widest uppercase">
            {t("label")}
          </code>
        </motion.div>

        <h2 className="text-foreground mb-4 text-3xl leading-none font-black tracking-tighter md:text-5xl">
          {t("title_1")}{" "}
          <span className="text-primary">{t("title_2")}</span>
        </h2>

        <p className="text-muted-foreground mx-auto mb-8 max-w-xl text-base leading-relaxed">
          {t("description")}
        </p>

        <div className="relative inline-block">
          <AnimatePresence>
            {isClicked ? (
              <motion.span
                initial={{ scale: 0, opacity: 0.8 }}
                animate={{ scale: 4, opacity: 0 }}
                exit={{ opacity: 0 }}
                className="bg-primary absolute inset-0 rounded-full"
              />
            ) : null}
          </AnimatePresence>
          <a
            href={JOIN_URL}
            onClick={handleTriggerEffect}
            className="group bg-primary text-primary-foreground relative inline-flex items-center gap-3 rounded-2xl px-8 py-4 text-xs font-black tracking-[0.2em] uppercase shadow-primary-md transition-all hover:scale-[1.02]"
          >
            {t("button")}
            <MoveRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  )
}
