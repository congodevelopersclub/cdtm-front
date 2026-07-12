"use client"

import { motion } from "framer-motion"
import { useTranslations } from "next-intl"

export function ImpactSection() {
  const t = useTranslations("impact")

  const stats = [
    { title: t("stat1_title"), desc: t("stat1_desc") },
    { title: t("stat2_title"), desc: t("stat2_desc") },
    { title: t("stat3_title"), desc: t("stat3_desc") },
  ]

  return (
    <section className="bg-background border-border border-t py-24 transition-colors duration-500">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-primary mb-6 font-mono text-[10px] font-bold tracking-[0.3em] uppercase italic">
              &lt;our_impact&gt;
            </div>
            <h2 className="text-foreground mb-8 text-4xl leading-[0.9] font-black tracking-tighter md:text-6xl">
              {t("title_part1")} <br />
              <span className="text-primary">{t("title_part2")}</span>
            </h2>
            <p className="text-muted-foreground max-w-xl text-lg leading-relaxed">
              {t("description")}
            </p>
          </motion.div>

          <div className="space-y-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="border-border bg-card/50 hover:border-primary/40 rounded-2xl border p-6 transition-colors"
              >
                <h3 className="text-foreground mb-2 font-bold">{stat.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {stat.desc}
                </p>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="border-primary/20 bg-primary/5 rounded-2xl border p-8 text-center"
            >
              <div className="text-primary text-5xl font-black">12K+</div>
              <div className="text-muted-foreground mt-2 text-xs tracking-[0.2em] uppercase">
                {t("members_count")}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
