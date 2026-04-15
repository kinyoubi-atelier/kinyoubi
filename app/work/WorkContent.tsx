'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { BrushStrokeDivider } from '@/components/ui/BrushStrokeDivider'

/* ─── Data ─── */

interface CaseStudy {
  eyebrow: string
  title: string
  summary: string
  metrics: { value: string; label: string }[]
  href: string
  tags: string[]
}

// Case study order reflects the three engagement shapes the studio publishes
// proof for: product and platform engineering, regulated builds, and
// workflow automation. The fourth slot is reserved for a research brief
// once sanitised for publication.
const caseStudies: CaseStudy[] = [
  {
    eyebrow: 'In house R&D · End to end product build',
    title: 'Building a timetable management engine from the solver up',
    summary:
      'An in house R&D build: a constraint engine, a multi tenant platform, an API, and a role aware front end, shipped end to end under one roof. Owned in house, published in outline, with architectural depth held to the case study itself.',
    metrics: [
      { value: '~30.8k', label: 'Lines of code' },
      { value: '68+', label: 'REST endpoints' },
      { value: '3.6s', label: 'Solve time, 5k variables' },
      { value: '94%', label: 'Allotment achieved flat' },
    ],
    href: '/work/timetable-engine',
    tags: ['In house R&D', 'Constraint engine', 'Multi tenant platform', 'End to end build'],
  },
  {
    eyebrow: 'Regulated platform · Financial services',
    title: 'Compliance first MIS platform for a regulated Indian financial institution',
    summary:
      'A multi site Management Information System engineered from day one for RBI alignment and DPDP Act readiness. Offline first field capture, tenant scoped data isolation, encryption designed in before the database, India data residency.',
    metrics: [
      { value: 'W1', label: 'Threat model' },
      { value: 'W3', label: 'Isolation in place' },
      { value: 'W5', label: 'RBI controls mapped' },
      { value: 'DPDP', label: 'Built in from day one' },
    ],
    href: '/work/bfsi-mis',
    tags: ['Regulated sector', 'Offline first capture', 'Compliance first', 'India data residency'],
  },
  {
    eyebrow: 'Workflow automation · Consumer archive',
    title: 'Replacing fourteen hours of manual triage with a one minute script',
    summary:
      'An idempotent Python reconciliation pipeline over a consumer archive. Fuzzy duplicate locality names merged, records rebalanced, and the whole run safe to re execute without drift. A spreadsheet problem converted into a system.',
    metrics: [
      { value: '3,905', label: 'Records reconciled' },
      { value: '116', label: 'Fuzzy merges' },
      { value: '~14 hrs', label: 'Manual work replaced' },
      { value: '<1 min', label: 'Full re run' },
    ],
    href: '/work/archive-automation',
    tags: ['Python', 'Fuzzy matching', 'Idempotent pipelines', 'Batch reconciliation'],
  },
]

/* ─── Page ─── */

export default function WorkContent() {
  return (
    <>
      {/* Hero */}
      <section className="py-24 md:py-36 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm font-medium text-gold uppercase tracking-widest mb-4">Work</p>
            <h1 className="font-heading text-hero-sm md:text-hero text-text-primary mb-6 tracking-tight">
              Three published case studies. Every number traceable.
            </h1>
            <p className="text-lg md:text-xl text-text-secondary max-w-2xl leading-relaxed">
              What we ship, how we ship it, and the numbers we are willing to stand behind. Client identifiers are sanitised. Metrics are counted, not rounded.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Case studies */}
      <section className="pb-24 md:pb-32 px-6 md:px-12">
        <div className="max-w-6xl mx-auto space-y-6 md:space-y-8">
          {caseStudies.map((cs, index) => (
            <motion.a
              key={cs.href}
              href={cs.href}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
              viewport={{ once: true, margin: '-60px' }}
              className="block group"
            >
              <article className="p-8 md:p-10 rounded-card border border-text-primary/10 hover:border-gold/40 transition-colors bg-surface-card">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-5">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gold uppercase tracking-widest mb-2">
                      {cs.eyebrow}
                    </p>
                    <h2 className="font-heading text-2xl md:text-3xl text-text-primary tracking-tight leading-tight">
                      {cs.title}
                    </h2>
                  </div>
                  <span className="text-sm font-medium text-gold inline-flex items-center gap-1 shrink-0 group-hover:gap-2 transition-all">
                    Read case study
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>

                {/* Summary */}
                <p className="text-text-secondary leading-relaxed mb-6 max-w-3xl">
                  {cs.summary}
                </p>

                {/* Metrics grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6 pt-6 border-t border-text-primary/5">
                  {cs.metrics.map((m) => (
                    <div key={m.label}>
                      <div className="font-heading text-2xl text-gold tracking-tight mb-1">
                        {m.value}
                      </div>
                      <div className="text-xs text-text-tertiary leading-snug">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {cs.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1.5 rounded-lg bg-background-alt text-text-secondary border border-text-primary/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            </motion.a>
          ))}

          {/* Roobaroo external reference */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="p-6 md:p-8 rounded-card border border-dashed border-text-primary/15 bg-background-alt"
          >
            <p className="text-sm font-medium text-gold uppercase tracking-widest mb-2">
              External · Live site
            </p>
            <h3 className="font-heading text-xl text-text-primary tracking-tight mb-2">
              Roobaroo Café website
            </h3>
            <p className="text-text-secondary leading-relaxed mb-4 max-w-3xl">
              A restaurant site we designed and shipped, live at roobaroo.vercel.app. Not a case study; a working reference.
            </p>
            <a
              href="https://roobaroo.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-gold hover:underline inline-flex items-center gap-1"
            >
              Visit site
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </motion.div>

        </div>
      </section>

      {/* ──────────────────────────────────────────────
          In flight
          Deliberately high level. No sector, no scope,
          no feature disclosure. Signals activity and
          posture only; IP protective by design.
      ────────────────────────────────────────────── */}
      <section className="py-20 md:py-24 px-6 md:px-12 bg-background-alt">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <p className="text-sm font-medium text-gold uppercase tracking-widest mb-3">
              In flight
            </p>
            <h2 className="font-heading text-display-sm text-text-primary tracking-tight mb-5">
              More work under build, under NDA
            </h2>
            <p className="text-text-secondary leading-relaxed max-w-2xl mx-auto">
              Additional engagements are currently in build. Client identifiers, platform internals, architectural designs, and commercial terms remain off this surface by design. Case studies are published only after client review and the studio&rsquo;s own sanitisation pass.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="py-8">
        <BrushStrokeDivider variant={1} />
      </div>

      {/* CTA */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-surface-dark relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gold/5 blur-3xl pointer-events-none" />
        <div className="max-w-2xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-display-sm md:text-display text-text-on-dark mb-4 tracking-tight">
              Have a problem shaped like one of these?
            </h2>
            <p className="text-text-on-dark/60 mb-10 text-lg">
              Tell us about it. We will tell you how we would approach it.
            </p>
            <Button href="/contact" variant="primary" size="lg">
              Start a conversation
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  )
}
