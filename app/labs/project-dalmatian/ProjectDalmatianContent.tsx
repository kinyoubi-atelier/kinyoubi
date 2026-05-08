'use client'

import { useState, type ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Plus, Minus } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { BrushStrokeDivider } from '@/components/ui/BrushStrokeDivider'

const REDACTED_NAME = '█████EX'

const heroMeta: { k: string; v: string }[] = [
  { k: 'Codename', v: 'Project Dalmatian' },
  { k: 'Working name', v: `${REDACTED_NAME} (mark not yet registered)` },
  { k: 'Audience', v: 'Advocates practising in India' },
  { k: 'Phase', v: 'Pre-launch · Odisha pilot in preparation' },
  { k: 'Stack', v: 'Next.js 16 · FastAPI · PostgreSQL · IndiaCode anchors' },
]

const stateNumbers: { num: string; label: string; sub: string }[] = [
  { num: '29', label: 'Primary statutes archived', sub: 'PDFs on disk, SHA256-verified, indexed' },
  { num: '8 / 88', label: 'Skeleton templates loaded', sub: 'Odisha (IN-OD), one per document family' },
  { num: '6 / 2,000', label: 'Clauses indexed', sub: 'Each carries citation anchors and risk profile' },
  { num: '2 / 11', label: 'Fee jurisdictions wired', sub: 'Maharashtra, Odisha; remainder pending' },
]

const positions = [
  {
    title: 'The work belongs to the supervising advocate, not the model.',
    body: 'No section reaches a draft without a verifiable footnote pointing at the gazette PDF on disk. Every retrieval result resolves to an instrument identifier and a section reference. The advocate signs off; the system does not.',
  },
  {
    title: 'A gazette-anchored corpus, not a scrape.',
    body: 'Each statute is fetched once, hashed, and stored. The chunk index that powers retrieval is rebuilt from the same files. If the source on disk changes, the hash check breaks and the build fails — the advocate is never quietly served a different statute than the one cited.',
  },
  {
    title: 'Local-first jurisdictional fidelity.',
    body: 'Stamp-paper conventions, fee schedules, and procedural quirks are encoded per state, not assumed national. The Odisha build encodes the Court-Fees Act position for that state, the SHCIL e-Stamp denominations, and the formats that the Orissa High Court actually accepts on filing.',
  },
  {
    title: 'Discreet by design.',
    body: 'No marketing carousel inside the workspace, no synthetic demos, no testimonials. The audience is sceptical advocates. The product earns its place by saving the advocate typing they would otherwise have done themselves.',
  },
]

const buildLog = [
  { state: 'done', text: 'Source archive: 29 central statutes fetched from IndiaCode, SHA256-verified, retained on disk.' },
  { state: 'done', text: 'Two-state jurisdictional atlas (Maharashtra, Odisha) with stamp-paper, court-fee, and procedural data.' },
  { state: 'done', text: 'Stamp-paper format registry: 4 all-India formats plus 26 state-specific entries; 17 verified.' },
  { state: 'done', text: 'Eight Odisha skeleton templates: affidavit, vakalatnama, legal notice, NDA, employment, service, rental, power of attorney.' },
  { state: 'wip', text: 'Clause library: 6 clauses indexed against the planned 2,000; risk profile and citation anchors live.' },
  { state: 'wip', text: 'Research surface: structured citation lookup and free-text retrieval, both grounded against the corpus.' },
  { state: 'wip', text: 'Drafting surface: template instantiation against jurisdictional defaults; advocate sign-off as a first-class state.' },
  { state: 'next', text: 'Pilot onboarding: Koraput district pilot, then Cuttack and Bhubaneswar.' },
  { state: 'next', text: 'Licensed-source integration (SCC, Manupatra, LexisNexis) is deferred until pilot. Development runs on the public IndiaCode tier.' },
  { state: 'next', text: 'Coverage targets: 88 templates, 2,000 clauses, all 11 fee jurisdictions.' },
] as const

const screenshots: {
  slug: string
  caption: string
  what: string
  src: string
}[] = [
  {
    slug: 'work',
    caption: 'Daily landing — the workspace shell.',
    what:
      'Three primary actions, the corpus state strip, and the navigation tree for templates, clauses, citations, stamp papers, and jurisdictions. Empty by design when no drafts are open.',
    src: '/labs/project-dalmatian/work.png',
  },
  {
    slug: 'coverage',
    caption: 'Coverage — what is loaded, what is pending.',
    what:
      'The pre-launch progress dashboard. Three counters track templates, clauses, and fee jurisdictions against their targets. The table below lists every document family that has at least one jurisdictional template loaded. Numbers come from the live database, not from a static page.',
    src: '/labs/project-dalmatian/coverage.png',
  },
  {
    slug: 'corpus',
    caption: 'The archived primary-source corpus.',
    what:
      'Twenty-nine instruments on disk, each carrying its instrument identifier, full title, source, byte size, SHA256 anchor, and retrieval date. The chunk index that backs every retrieval result rebuilds from the same files; if a hash changes, the build fails before reaching an advocate.',
    src: '/labs/project-dalmatian/corpus.png',
  },
  {
    slug: 'citations',
    caption: 'Section lookup — resolve by reference, or search the corpus.',
    what:
      'Resolve a known section by instrument identifier and section reference, or run a keyword search across the corpus. Every result links to its source PDF and surfaces its SHA256 anchor.',
    src: '/labs/project-dalmatian/citations.png',
  },
  {
    slug: 'templates',
    caption: 'Skeleton library — Odisha, eight document families.',
    what:
      'Each template card carries its document family, jurisdictional slug, template version, and advocate sign-off state. Templates start as drafts and only become signed-off after the supervising advocate reviews the anchor list and the body.',
    src: '/labs/project-dalmatian/templates.png',
  },
  {
    slug: 'clauses',
    caption: 'Clause library — citation anchors and risk profile.',
    what:
      'Each clause is filed by document family and source instrument. The card surfaces source-anchor counts, citation anchors, jurisdictional applicability, and a coarse risk profile. Six clauses are indexed today; the target is two thousand.',
    src: '/labs/project-dalmatian/clauses.png',
  },
  {
    slug: 'stamp-papers',
    caption: 'Stamp-paper format registry — the part nobody else encodes.',
    what:
      'Stamp-paper conventions vary by state, by document family, and by the issuing authority for that paper. The drafter resolves the recommended format from the (jurisdiction, family) tuple at print time. The editor reserves the top zone visually but never prints over it; the actual stamp paper remains the source of truth.',
    src: '/labs/project-dalmatian/stamp-papers.png',
  },
  {
    slug: 'jurisdictions',
    caption: 'Drafting atlas — local procedural fidelity.',
    what:
      'One row per state or union territory captures stamp duty, rent control, courts, language, and local procedural quirks. Two states are wired today (Maharashtra, Odisha); the schema accommodates the rest.',
    src: '/labs/project-dalmatian/jurisdictions.png',
  },
  {
    slug: 'research',
    caption: 'Research — look up a section, get verbatim text.',
    what:
      'A structured citation (e.g. "Section 138 NI Act") short-circuits straight to the section text. A free-text question is answered against the corpus, with the chunks that grounded the answer shown alongside. Recent queries persist; nothing is invented.',
    src: '/labs/project-dalmatian/research.png',
  },
  {
    slug: 'draft-new',
    caption: 'Start a draft — by template, or by one-line brief.',
    what:
      'The advocate can pick a template directly, or type a one-line brief in their own words ("Affidavit for name correction in school records, Cuttack" or "Send a 138 NI Act notice for a ₹4.5 lakh cheque bounce"). Jurisdictional defaults are resolved from the firm profile, not asked again.',
    src: '/labs/project-dalmatian/draft-new.png',
  },
]

function StateBadge({ state }: { state: 'done' | 'wip' | 'next' }) {
  const styles =
    state === 'done'
      ? 'bg-success/10 text-success border-success/30'
      : state === 'wip'
        ? 'bg-gold/10 text-gold border-gold/30'
        : 'bg-text-primary/5 text-text-tertiary border-text-primary/15'
  const label = state === 'done' ? 'Live' : state === 'wip' ? 'In flight' : 'Next'
  return (
    <span
      className={`inline-flex items-center text-[10px] font-semibold uppercase tracking-widest px-2 py-1 rounded border ${styles}`}
    >
      {label}
    </span>
  )
}

function RevealArtifact({
  caption,
  what,
  src,
  slug,
}: {
  caption: string
  what: string
  src: string
  slug: string
}) {
  const [open, setOpen] = useState(false)
  const labelId = `reveal-${slug}`
  return (
    <div className="my-8 rounded-card border border-text-primary/10 bg-surface-card overflow-hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={labelId}
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 px-5 md:px-6 py-4 text-left hover:bg-background-alt transition-colors"
      >
        <span className="flex flex-col">
          <span className="text-[11px] font-semibold uppercase tracking-widest text-gold">Artefact</span>
          <span className="mt-1 text-text-primary text-base md:text-[17px] font-medium leading-snug">
            {caption}
          </span>
        </span>
        <span
          aria-hidden
          className="shrink-0 inline-flex items-center gap-2 text-xs font-medium text-text-tertiary"
        >
          {open ? (
            <>
              <Minus className="h-3.5 w-3.5" />
              Hide
            </>
          ) : (
            <>
              <Plus className="h-3.5 w-3.5" />
              Reveal
            </>
          )}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={labelId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-text-primary/10 bg-background-alt"
          >
            <div className="px-5 md:px-6 py-6">
              <p className="text-text-secondary text-[15px] leading-relaxed mb-4">{what}</p>
              <figure className="rounded-md overflow-hidden border border-text-primary/10 bg-surface-card">
                <img
                  src={src}
                  alt={caption}
                  loading="lazy"
                  className="w-full h-auto block"
                />
              </figure>
              <p className="mt-3 text-[11px] text-text-tertiary uppercase tracking-widest">
                Captured from the live development build · product name partially redacted
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function ScreenshotBySlug({ slug }: { slug: string }) {
  const s = screenshots.find((x) => x.slug === slug)
  if (!s) return null
  return <RevealArtifact slug={s.slug} caption={s.caption} what={s.what} src={s.src} />
}

function Section({ children, alt }: { children: ReactNode; alt?: boolean }) {
  return (
    <section
      className={`py-12 md:py-16 px-6 md:px-12 ${alt ? 'bg-background-alt' : ''}`}
    >
      <div className="max-w-3xl mx-auto">{children}</div>
    </section>
  )
}

export default function ProjectDalmatianContent() {
  return (
    <>
      <section className="pt-24 md:pt-36 pb-12 md:pb-16 px-6 md:px-12">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-text-tertiary hover:text-gold transition-colors mb-10"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Kinyoubi Atelier
            </Link>

            <p className="text-sm font-medium text-gold uppercase tracking-widest mb-5">
              Labs · in-progress build
            </p>
            <h1 className="font-heading text-hero-sm md:text-hero text-text-primary tracking-tight mb-6 leading-[1.05]">
              Project Dalmatian
            </h1>
            <p className="text-lg md:text-xl text-text-secondary leading-relaxed mb-8 max-w-2xl">
              An Indian legal-drafting workspace anchored to the gazette. Every section the
              advocate signs comes back to a hashed PDF on disk. This page is the working
              build log, not a brochure. The product mark is unregistered and partially
              redacted below as <span className="font-mono text-text-primary">{REDACTED_NAME}</span>.
            </p>

            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-sm border-t border-text-primary/10 pt-6">
              {heroMeta.map((m) => (
                <div key={m.k} className="flex flex-col gap-0.5">
                  <dt className="text-[11px] font-semibold uppercase tracking-widest text-text-tertiary">
                    {m.k}
                  </dt>
                  <dd className="text-text-primary leading-snug">{m.v}</dd>
                </div>
              ))}
            </dl>
          </motion.div>
        </div>
      </section>

      <Section>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5"
        >
          {stateNumbers.map((m) => (
            <div
              key={m.label}
              className="rounded-card border border-text-primary/5 bg-background-alt p-5 md:p-6"
            >
              <div className="font-heading text-2xl md:text-3xl text-gold mb-1.5 tracking-tight">
                {m.num}
              </div>
              <div className="text-[11px] text-text-tertiary uppercase tracking-widest leading-tight mb-2">
                {m.label}
              </div>
              <div className="text-[12px] text-text-secondary leading-snug">{m.sub}</div>
            </div>
          ))}
        </motion.div>
      </Section>

      <Section>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="font-heading text-display-sm md:text-display text-text-primary tracking-tight mb-6">
            What is being built
          </h2>
          <p className="text-text-secondary text-lg leading-relaxed mb-5">
            The drafting that fills an advocate&apos;s daily list — affidavits, vakalatnamas,
            legal notices, sale deeds, NDAs, rental agreements — is procedurally precise but
            structurally repetitive. The same skeleton, the same statutory anchors, the same
            jurisdictional quirks, retyped in chamber after chamber across the country.
          </p>
          <p className="text-text-secondary text-lg leading-relaxed mb-5">
            Project Dalmatian assembles those drafts directly from the source statutes the
            advocate already cites. The corpus is fetched once from public gazette sources,
            hashed, and stored locally; the templates carry their own anchor lists; the
            jurisdictional layer encodes stamp-paper conventions, court-fee schedules, and
            local procedural rules per state.
          </p>
          <p className="text-text-secondary text-lg leading-relaxed">
            Nothing reaches a draft without a footnote pointing at its source. The supervising
            advocate stays on the line, signs off, and ships.
          </p>
        </motion.div>
      </Section>

      <Section alt>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <p className="text-sm font-medium text-gold uppercase tracking-widest mb-3">
            Position
          </p>
          <h2 className="font-heading text-display-sm md:text-display text-text-primary tracking-tight mb-8">
            Four things this build refuses to do
          </h2>
          <div className="space-y-5">
            {positions.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
                viewport={{ once: true }}
                className="rounded-card border border-text-primary/5 bg-surface-card p-6"
              >
                <h3 className="text-base font-semibold text-text-primary mb-2">{p.title}</h3>
                <p className="text-text-secondary leading-relaxed">{p.body}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Section>

      <Section>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <p className="text-sm font-medium text-gold uppercase tracking-widest mb-3">
            Surface 1 of 4
          </p>
          <h2 className="font-heading text-display-sm md:text-display text-text-primary tracking-tight mb-4">
            The workspace, and the coverage it answers to
          </h2>
          <p className="text-text-secondary text-lg leading-relaxed mb-2">
            The daily landing answers one question: what does the advocate need to do today.
            Three primary actions sit above a strip showing the live state of the corpus, a
            sidebar opens onto the library and settings, nothing else competes for attention.
          </p>
          <p className="text-text-secondary text-lg leading-relaxed">
            A second surface — coverage — exists to keep the build honest. It pulls counts
            from the live database, not a static page, and lays out exactly which document
            families and jurisdictions are loaded against the targets. Today: 9% of the
            template target, 18% of the fee-jurisdiction target, the clause library at the
            beginning of its journey.
          </p>
        </motion.div>

        <ScreenshotBySlug slug="work" />
        <ScreenshotBySlug slug="coverage" />

        <BrushStrokeDivider variant={0} className="mt-12 opacity-40" />
      </Section>

      <Section alt>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <p className="text-sm font-medium text-gold uppercase tracking-widest mb-3">
            Surface 2 of 4
          </p>
          <h2 className="font-heading text-display-sm md:text-display text-text-primary tracking-tight mb-4">
            The corpus — gazette in, footnote out
          </h2>
          <p className="text-text-secondary text-lg leading-relaxed mb-2">
            Twenty-nine central statutes are archived as PDFs on disk: the 1908 CPC, the 1973
            CrPC, the Indian Contract Act, the Companies Act 2013, the new Bharatiya Nyaya
            Sanhita and Bharatiya Sakshya Adhiniyam, the Court-Fees Act, the Constitution,
            and the rest of the daily-list reference set. Each file is recorded with its
            instrument identifier, byte size, SHA256 hash, and retrieval date.
          </p>
          <p className="text-text-secondary text-lg leading-relaxed">
            The retrieval index that powers research and drafting rebuilds from the same
            files. If the bytes on disk change, the hash check fails and the build refuses to
            ship. The advocate is never quietly served a different statute than the one
            cited.
          </p>
        </motion.div>

        <ScreenshotBySlug slug="corpus" />
        <ScreenshotBySlug slug="citations" />
      </Section>

      <Section>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <p className="text-sm font-medium text-gold uppercase tracking-widest mb-3">
            Surface 3 of 4
          </p>
          <h2 className="font-heading text-display-sm md:text-display text-text-primary tracking-tight mb-4">
            The skeleton — templates, clauses, stamp papers
          </h2>
          <p className="text-text-secondary text-lg leading-relaxed mb-2">
            Each template carries its own anchor list — the statutes and rules its sections
            depend on. Each clause is filed by document family and source instrument, with a
            risk profile and citation anchors attached. Templates start as drafts and are
            promoted to signed-off only after the supervising advocate has reviewed the body
            and the anchors.
          </p>
          <p className="text-text-secondary text-lg leading-relaxed">
            The stamp-paper registry is the part nobody else encodes. Conventions vary by
            state, by document family, and by issuing authority. The drafter resolves the
            recommended format from the (jurisdiction, document family) tuple at print time.
            The editor reserves the top zone visually but never prints over it; the actual
            stamp paper remains the source of truth.
          </p>
        </motion.div>

        <ScreenshotBySlug slug="templates" />
        <ScreenshotBySlug slug="clauses" />
        <ScreenshotBySlug slug="stamp-papers" />
        <ScreenshotBySlug slug="jurisdictions" />
      </Section>

      <Section alt>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <p className="text-sm font-medium text-gold uppercase tracking-widest mb-3">
            Surface 4 of 4
          </p>
          <h2 className="font-heading text-display-sm md:text-display text-text-primary tracking-tight mb-4">
            Research, and starting a draft
          </h2>
          <p className="text-text-secondary text-lg leading-relaxed mb-2">
            Research is the surface an advocate uses before — and during — a draft. A
            structured citation resolves directly to the section text. A free-text question
            is answered against the corpus, with the chunks that grounded the answer shown
            alongside; a result without grounding is shown as ungrounded, never smoothed
            over.
          </p>
          <p className="text-text-secondary text-lg leading-relaxed">
            A draft begins either by picking a template or by typing a one-line brief.
            Jurisdictional defaults — the firm&apos;s primary court, the relevant High Court
            registry, the local language — are resolved from the firm profile, not asked
            again. The advocate then works from a skeleton with its anchors already in place.
          </p>
        </motion.div>

        <ScreenshotBySlug slug="research" />
        <ScreenshotBySlug slug="draft-new" />
      </Section>

      <Section>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="font-heading text-display-sm md:text-display text-text-primary tracking-tight mb-4">
            The build log
          </h2>
          <p className="text-text-secondary text-lg leading-relaxed mb-8">
            Where the work stands today, what is in flight, and what is queued before the
            Odisha pilot opens. No aspirational items.
          </p>

          <ul className="space-y-3">
            {buildLog.map((row, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04, duration: 0.35 }}
                viewport={{ once: true }}
                className="flex items-start gap-4 rounded-card border border-text-primary/5 bg-background-alt px-5 py-4"
              >
                <span className="shrink-0 pt-0.5">
                  <StateBadge state={row.state} />
                </span>
                <span className="text-text-secondary leading-relaxed text-[15px]">
                  {row.text}
                </span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </Section>

      <section className="py-12 px-6 md:px-12 border-t border-text-primary/5">
        <div className="max-w-3xl mx-auto">
          <p className="text-sm text-text-tertiary leading-relaxed">
            This page is a private artefact for invited readers. Project Dalmatian is the
            internal codename. The product mark is partially redacted because the trademark
            application has not yet been filed. The page is not linked from the site
            navigation, not in the public sitemap, and is excluded from search-engine
            indexing. Screenshots are captured from the development build; surfaces that
            disclose internal model identifiers have been hidden for this artefact and are
            tracked separately for product review.
          </p>
        </div>
      </section>

      <section className="py-20 md:py-28 px-6 md:px-12 bg-surface-dark">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-display-sm md:text-display text-text-on-dark mb-4 tracking-tight">
              Want to walk the build in person?
            </h2>
            <p className="text-text-on-dark/70 mb-8 text-lg">
              The pilot opens by invitation. If you are an advocate practising in India and
              want to see the surfaces above driven against your own daily list, write to us.
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
