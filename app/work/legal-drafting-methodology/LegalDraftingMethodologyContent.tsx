'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { BrushStrokeDivider } from '@/components/ui/BrushStrokeDivider'

/* ─── Data ─── */

const heroTags = [
  'Python',
  'FastAPI',
  'Postgres + pgvector',
  'Claude API',
  'Deterministic verification',
]

const metrics = [
  { num: '0', label: 'Adversarial hallucinations' },
  { num: '98.5%', label: 'Citation precision' },
  { num: '4 / 4', label: 'AI-judge pass band' },
  { num: '36', label: 'Indian jurisdictions' },
]

const phases = [
  {
    idx: 'Phase 0',
    title: 'Knowledge bootstrap',
    duration: 'Two weeks',
    body: 'Before any engineering activates, the orchestrator internalises the constitutional and procedural framework: Article 246 and the Union, State, Concurrent Lists, the Code of Civil Procedure, BNSS 2023, BSA 2023, the Registration Act 1908, the Indian Stamp Act 1899 with its state amendments, and the Information Technology Act with the Section 65B electronic-records rule. The phase closes with a knowledge audit. Failure on any gate question reopens the phase with a specialist consultant in the loop.',
  },
  {
    idx: 'Phase 1',
    title: 'Knowledge layer',
    duration: 'Six weeks, four tracks in parallel',
    body: 'A state-by-state drafting atlas covering all 28 states and 8 UTs (288 format skeletons before pruning, with a change-log pipeline flagging amendments within 48 hours of gazette notification). A statutory corpus with section-level granularity, where every reference is traceable to source URL and last-amendment date in under 200 ms. A stamp-duty decision engine that maps (instrument, jurisdiction, consideration, parties) to (duty, fee, e-stamp flow), calibrated against state portals. A clause library mined from senior practitioners, each clause carrying jurisdiction bias, risk profile, enforceability notes, and citation anchors.',
  },
  {
    idx: 'Phase 2',
    title: 'Drafting and verification',
    duration: 'Continuous',
    body: 'Drafting is the easy part once the knowledge layer is in place. Verification is where the engineering lives.',
  },
]

const reviewers = [
  {
    title: 'Citation hallucination check',
    body: 'Every section reference resolves against the corpus or the draft is flagged. The draft-time check reuses the same resolver the public corpus API uses, so search and review agree on what exists.',
  },
  {
    title: 'Jurisdictional consistency',
    body: 'Clauses whose recorded jurisdiction bias does not match the chosen state surface as warnings before the draft enters the editor.',
  },
  {
    title: 'Missing essential clauses',
    body: 'The template’s required sections list is enforced against the rendered draft. A defective skeleton fails this check before any human reads it.',
  },
  {
    title: 'Risk lint',
    body: 'Regex floor for named risk patterns (the cheap, certain catches); LLM ceiling for novel risk that escapes the regex. Regex catches block; LLM catches warn.',
  },
  {
    title: 'Hard-gate for protected-area transfers',
    body: 'Regulation 2 of 1956 in the Scheduled Areas of Odisha voids any non-tribal-to-tribal deed in violation. This check is the only block-severity reviewer that runs without an LLM in the loop; deterministic, auditable, and irreducible.',
  },
]

const demonstrates = [
  {
    title: 'Foundation before features.',
    body: 'A knowledge product cannot be vertically sliced. The corpus has to be right before any drafting code runs against it.',
  },
  {
    title: 'Deterministic floor, LLM ceiling.',
    body: 'The correctness-critical work is done by code that does not change with model versions; LLM judges add adaptability without becoming load-bearing.',
  },
  {
    title: 'Refuse to draft is a feature.',
    body: 'When the source data is stale, the system says so and stops. A platform that cannot say "no" cannot say "yes" with credibility.',
  },
  {
    title: 'Replay-ability.',
    body: 'Every block has a finding row; every finding has a payload; a future advocate audit can replay any draft’s reasoning end to end.',
  },
  {
    title: 'Drift is a first-class concern.',
    body: 'Without a sentinel, deterministic checks rot silently as gazettes amend. Drift handling lives in the build, not on a roadmap.',
  },
]

const fullStack = [
  'Python',
  'FastAPI',
  'SQLAlchemy',
  'asyncpg',
  'Postgres',
  'pgvector',
  'Voyage embeddings',
  'Anthropic Claude',
  'OpenAI',
  'Google Gemini',
  'Next.js',
  'React',
  'Tailwind',
  'Clerk',
  'TipTap',
  'Sentry',
  'GitHub Actions',
]

/* ─── Verification flow diagram ─── */

function VerificationDiagram() {
  return (
    <figure className="my-10 rounded-card border border-text-primary/10 bg-surface-card p-5 md:p-7">
      <div className="overflow-x-auto -mx-1 md:mx-0 pb-2 md:pb-0">
        <svg
          viewBox="0 0 760 320"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          className="h-auto block mx-auto min-w-[680px] md:min-w-0 md:w-full max-w-[820px]"
          aria-label="Verification flow: intake to a refuse-to-draft pre-gate to drafting, then a parallel fan-out across four reviewers (citation, jurisdiction, risk lint, protected-area hard-gate) that converges at an aggregate, which routes to blocked, review, or accepted."
        >
        <defs>
          <marker id="ldmArrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" style={{ fill: 'rgb(var(--gold))' }} />
          </marker>
          <marker id="ldmArrowDashed" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" style={{ fill: 'rgb(var(--ink-3))' }} />
          </marker>
        </defs>

        {/* Column labels */}
        <text x="55" y="20" textAnchor="middle" style={{ fill: 'rgb(var(--ink-3))' }} fontSize="10" letterSpacing="1.4" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">INTAKE</text>
        <text x="180" y="20" textAnchor="middle" style={{ fill: 'rgb(var(--ink-3))' }} fontSize="10" letterSpacing="1.4" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">PRE-DRAFT</text>
        <text x="330" y="20" textAnchor="middle" style={{ fill: 'rgb(var(--ink-3))' }} fontSize="10" letterSpacing="1.4" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">DRAFT</text>
        <text x="490" y="20" textAnchor="middle" style={{ fill: 'rgb(var(--ink-3))' }} fontSize="10" letterSpacing="1.4" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">PARALLEL REVIEW</text>
        <text x="650" y="20" textAnchor="middle" style={{ fill: 'rgb(var(--ink-3))' }} fontSize="10" letterSpacing="1.4" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">AGGREGATE</text>

        {/* Intake */}
        <rect x="10" y="160" width="90" height="60" rx="8" style={{ fill: 'rgb(var(--surface))', stroke: 'rgb(var(--ink))' }} strokeWidth="1.2" />
        <text x="55" y="186" textAnchor="middle" style={{ fill: 'rgb(var(--ink))' }} fontSize="12" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">Intake</text>
        <text x="55" y="202" textAnchor="middle" style={{ fill: 'rgb(var(--ink-3))' }} fontSize="10" fontFamily="Inter, system-ui, sans-serif">facts, parties</text>

        {/* Refuse-to-draft gate */}
        <rect x="110" y="160" width="140" height="60" rx="8" style={{ fill: 'rgb(var(--surface))', stroke: 'rgb(var(--ink))' }} strokeWidth="1.2" strokeDasharray="4 3" />
        <text x="180" y="184" textAnchor="middle" style={{ fill: 'rgb(var(--ink))' }} fontSize="12" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">Refuse-to-draft</text>
        <text x="180" y="200" textAnchor="middle" style={{ fill: 'rgb(var(--ink-3))' }} fontSize="10" fontFamily="Inter, system-ui, sans-serif">stale schedule? refuse.</text>
        <text x="180" y="212" textAnchor="middle" style={{ fill: 'rgb(var(--ink-3))' }} fontSize="10" fontFamily="Inter, system-ui, sans-serif">missing skeleton? refuse.</text>

        {/* Drafting */}
        <rect x="270" y="160" width="120" height="60" rx="8" style={{ fill: 'rgb(var(--surface))', stroke: 'rgb(var(--ink))' }} strokeWidth="1.2" />
        <text x="330" y="186" textAnchor="middle" style={{ fill: 'rgb(var(--ink))' }} fontSize="12" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">Drafting</text>
        <text x="330" y="202" textAnchor="middle" style={{ fill: 'rgb(var(--ink-3))' }} fontSize="10" fontFamily="Inter, system-ui, sans-serif">Claude Opus, RAG</text>

        {/* Parallel reviewers */}
        <rect x="410" y="32" width="160" height="44" rx="8" style={{ fill: 'rgb(var(--surface))', stroke: 'rgb(var(--ink))' }} strokeWidth="1.2" />
        <text x="490" y="50" textAnchor="middle" style={{ fill: 'rgb(var(--ink))' }} fontSize="11" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">Citation check</text>
        <text x="490" y="64" textAnchor="middle" style={{ fill: 'rgb(var(--ink-3))' }} fontSize="10" fontFamily="Inter, system-ui, sans-serif">resolves or fails</text>

        <rect x="410" y="92" width="160" height="44" rx="8" style={{ fill: 'rgb(var(--surface))', stroke: 'rgb(var(--ink))' }} strokeWidth="1.2" />
        <text x="490" y="110" textAnchor="middle" style={{ fill: 'rgb(var(--ink))' }} fontSize="11" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">Jurisdiction & structure</text>
        <text x="490" y="124" textAnchor="middle" style={{ fill: 'rgb(var(--ink-3))' }} fontSize="10" fontFamily="Inter, system-ui, sans-serif">bias, must-include</text>

        <rect x="410" y="152" width="160" height="44" rx="1.5" style={{ fill: 'rgb(var(--surface))', stroke: 'rgb(var(--ink))' }} strokeWidth="2.2" />
        <text x="490" y="170" textAnchor="middle" style={{ fill: 'rgb(var(--ink))' }} fontSize="11" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">Reg-2 hard-gate</text>
        <text x="490" y="184" textAnchor="middle" style={{ fill: 'rgb(var(--ink-3))' }} fontSize="10" fontFamily="Inter, system-ui, sans-serif">deterministic, blocks</text>

        <rect x="410" y="212" width="160" height="44" rx="8" style={{ fill: 'rgb(var(--surface))', stroke: 'rgb(var(--ink))' }} strokeWidth="1.2" strokeDasharray="4 3" />
        <text x="490" y="230" textAnchor="middle" style={{ fill: 'rgb(var(--ink))' }} fontSize="11" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">Risk lint</text>
        <text x="490" y="244" textAnchor="middle" style={{ fill: 'rgb(var(--ink-3))' }} fontSize="10" fontFamily="Inter, system-ui, sans-serif">regex + LLM judge</text>

        {/* Aggregate */}
        <rect x="590" y="160" width="160" height="60" rx="8" style={{ fill: 'rgb(var(--surface))', stroke: 'rgb(var(--ink))' }} strokeWidth="1.2" />
        <text x="670" y="184" textAnchor="middle" style={{ fill: 'rgb(var(--ink))' }} fontSize="12" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">Aggregate</text>
        <text x="670" y="200" textAnchor="middle" style={{ fill: 'rgb(var(--ink-3))' }} fontSize="10" fontFamily="Inter, system-ui, sans-serif">block / review / accept</text>
        <text x="670" y="212" textAnchor="middle" style={{ fill: 'rgb(var(--ink-3))' }} fontSize="10" fontFamily="Inter, system-ui, sans-serif">findings written</text>

        {/* Sequential arrows: intake -> gate -> drafting */}
        <line x1="102" y1="190" x2="108" y2="190" style={{ stroke: 'rgb(var(--gold))' }} strokeWidth="1.5" markerEnd="url(#ldmArrow)" />
        <line x1="252" y1="190" x2="268" y2="190" style={{ stroke: 'rgb(var(--gold))' }} strokeWidth="1.5" markerEnd="url(#ldmArrow)" />

        {/* Refuse return path (downward dashed) */}
        <line x1="180" y1="222" x2="180" y2="262" style={{ stroke: 'rgb(var(--ink-3))' }} strokeWidth="1" strokeDasharray="3 3" markerEnd="url(#ldmArrowDashed)" />
        <text x="186" y="280" style={{ fill: 'rgb(var(--ink-3))' }} fontSize="10" fontStyle="italic" fontFamily="Inter, system-ui, sans-serif">refuse: name the missing artefact</text>

        {/* Fanout: drafting -> 4 reviewers */}
        <line x1="392" y1="190" x2="408" y2="54" style={{ stroke: 'rgb(var(--gold))' }} strokeWidth="1.3" markerEnd="url(#ldmArrow)" />
        <line x1="392" y1="190" x2="408" y2="114" style={{ stroke: 'rgb(var(--gold))' }} strokeWidth="1.3" markerEnd="url(#ldmArrow)" />
        <line x1="392" y1="190" x2="408" y2="174" style={{ stroke: 'rgb(var(--gold))' }} strokeWidth="1.3" markerEnd="url(#ldmArrow)" />
        <line x1="392" y1="190" x2="408" y2="234" style={{ stroke: 'rgb(var(--gold))' }} strokeWidth="1.3" markerEnd="url(#ldmArrow)" />

        {/* Fanin: 4 reviewers -> aggregate */}
        <line x1="572" y1="54" x2="588" y2="190" style={{ stroke: 'rgb(var(--gold))' }} strokeWidth="1.3" markerEnd="url(#ldmArrow)" />
        <line x1="572" y1="114" x2="588" y2="190" style={{ stroke: 'rgb(var(--gold))' }} strokeWidth="1.3" markerEnd="url(#ldmArrow)" />
        <line x1="572" y1="174" x2="588" y2="190" style={{ stroke: 'rgb(var(--gold))' }} strokeWidth="1.3" markerEnd="url(#ldmArrow)" />
        <line x1="572" y1="234" x2="588" y2="190" style={{ stroke: 'rgb(var(--gold))' }} strokeWidth="1.3" markerEnd="url(#ldmArrow)" />

        {/* Legend */}
        <line x1="10" y1="300" x2="40" y2="300" style={{ stroke: 'rgb(var(--ink))' }} strokeWidth="1.2" strokeDasharray="4 3" />
        <text x="46" y="304" style={{ fill: 'rgb(var(--ink-3))' }} fontSize="10" fontFamily="Inter, system-ui, sans-serif">dashed: gate or LLM in the loop</text>
        <line x1="320" y1="300" x2="350" y2="300" style={{ stroke: 'rgb(var(--ink))' }} strokeWidth="2.2" />
        <text x="356" y="304" style={{ fill: 'rgb(var(--ink-3))' }} fontSize="10" fontFamily="Inter, system-ui, sans-serif">heavy stroke: deterministic blocker</text>
        </svg>
      </div>
      <p className="md:hidden mt-2 text-xs text-text-tertiary text-center italic">Swipe to see the full diagram.</p>
      <figcaption className="mt-3 text-sm text-text-tertiary text-center">
        Figure 1 · Verification flow. Deterministic checks run first; LLM judges add adaptability without becoming load-bearing.
      </figcaption>
    </figure>
  )
}

/* ─── Small helpers ─── */

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-xs font-medium px-3 py-1.5 rounded-full border border-text-primary/10 bg-background-alt text-text-secondary">
      {children}
    </span>
  )
}

/* ─── Page ─── */

export default function LegalDraftingMethodologyContent() {
  return (
    <div>
      {/* Hero */}
      <section className="pt-24 md:pt-36 pb-16 md:pb-20 px-6 md:px-12">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              href="/#built-with-care"
              className="inline-flex items-center gap-2 text-sm text-text-tertiary hover:text-gold transition-colors mb-10"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to work
            </Link>

            <p className="text-sm font-medium text-gold uppercase tracking-widest mb-5">
              Case study · Methodology
            </p>
            <h1 className="font-heading text-hero-sm md:text-hero text-text-primary tracking-tight mb-6 leading-[1.1]">
              AI-assisted legal drafting for Indian advocates: a methodology
            </h1>
            <p className="text-lg md:text-xl text-text-secondary leading-relaxed mb-8 max-w-2xl">
              A working methodology, in private build with an Odisha pilot in preparation. The architecture is shaped by a hard constraint: no practising advocate is on the team pre-launch. The system has to defend itself.
            </p>

            <div className="flex flex-wrap gap-2">
              {heroTags.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Metrics */}
      <section className="pb-20 md:pb-24 px-6 md:px-12">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5"
          >
            {metrics.map((m) => (
              <div
                key={m.label}
                className="rounded-card border border-text-primary/5 bg-background-alt p-5 md:p-6"
              >
                <div className="font-heading text-2xl md:text-3xl text-gold mb-1.5 tracking-tight">
                  {m.num}
                </div>
                <div className="text-[11px] text-text-tertiary uppercase tracking-widest leading-tight">
                  {m.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* The problem */}
      <section className="py-12 md:py-16 px-6 md:px-12">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-display-sm md:text-display text-text-primary tracking-tight mb-6">
              The problem
            </h2>
            <p className="text-text-secondary text-lg leading-relaxed mb-5">
              Indian legal drafting is not one practice; it is thirty-six. Stamp duty, registration workflow, vakalatnama format, language requirement, rent-control regime, e-stamping vendor: every one of these is jurisdiction-specific. A rental agreement in Maharashtra is not the same instrument as one in Karnataka. An affidavit verification clause turns on Order XIX CPC, not Order VI Rule 15, and a generic LLM that confuses the two will be embarrassed in court.
            </p>
            <p className="text-text-secondary text-lg leading-relaxed">
              The dominant failure mode of &ldquo;AI for law&rdquo; is the same pattern in three costumes: hallucinated citations, jurisdictionally wrong stamps, and missing essential clauses. The advocate carries the consequence of every mistake the system ships. Most products solve this by putting a senior attorney on the QA gate. I had a constraint that ruled that out.
            </p>
          </motion.div>
        </div>
      </section>

      {/* The constraint */}
      <section className="py-12 md:py-16 px-6 md:px-12 bg-background-alt">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-display-sm md:text-display text-text-primary tracking-tight mb-6">
              The constraint that shaped the architecture
            </h2>
            <p className="text-text-secondary text-lg leading-relaxed mb-5">
              No practising advocate is on the team pre-launch. The platform cannot ship in 2027 with an architecture that depends on a senior attorney who is not there. Every quality gate that would have leaned on a human attestation has to be either machine-enforceable or replaced with a refuse-to-draft.
            </p>
            <p className="text-text-secondary text-lg leading-relaxed">
              When advocates do come on board, post-launch and as the public faces of the brand, their sign-off becomes additive provenance. The deterministic floor remains the floor. The system never weakens when humans are added.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Methodology */}
      <section className="py-16 md:py-20 px-6 md:px-12">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-display-sm md:text-display text-text-primary tracking-tight mb-4">
              The methodology
            </h2>
            <p className="text-text-secondary text-lg leading-relaxed mb-10">
              Foundation before features. A knowledge product cannot be vertically sliced. The corpus has to be right before any drafting code runs against it.
            </p>
          </motion.div>

          <div className="space-y-10">
            {phases.map((p, i) => (
              <motion.div
                key={p.idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
                viewport={{ once: true }}
              >
                <p className="text-sm font-medium text-gold uppercase tracking-widest mb-2">
                  {p.idx} · {p.duration}
                </p>
                <h3 className="font-heading text-2xl md:text-3xl text-text-primary tracking-tight mb-3">
                  {p.title}
                </h3>
                <p className="text-text-secondary text-lg leading-relaxed">
                  {p.body}
                </p>
              </motion.div>
            ))}
          </div>

          <BrushStrokeDivider variant={0} className="mt-16 opacity-50" />
        </div>
      </section>

      {/* Verification architecture */}
      <section className="py-12 md:py-16 px-6 md:px-12 bg-background-alt">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-display-sm md:text-display text-text-primary tracking-tight mb-6">
              The verification architecture
            </h2>
            <p className="text-text-secondary text-lg leading-relaxed mb-5">
              I picked a tiered design: deterministic floor first, LLM ceiling on top. Cheap, sub-second, auditable checks run before any LLM judge does. The reasoning is straightforward. A legal product challenged in court has to show its work, and a structured deterministic finding (&ldquo;Section 8(1)(c) of the Notaries Act, 1952 does not exist&rdquo;) audits cleanly in a way a probabilistic LLM verdict cannot. The judges add adaptability; they do not replace the floor.
            </p>
            <p className="text-text-secondary text-lg leading-relaxed mb-8">
              <span className="font-semibold text-text-primary">Pre-draft refuse gate.</span> If the system does not have a current Odisha stamp schedule for a sale deed, effective today and revised within the last ninety days, it refuses. It does not guess. The refuse message names the missing artefact so the operator knows what is needed. There is a one-click bypass that records <code className="text-sm text-gold bg-surface-card px-1.5 py-0.5 rounded border border-text-primary/10">actor.bypassed=true</code> in the audit log and downgrades the draft to <code className="text-sm text-gold bg-surface-card px-1.5 py-0.5 rounded border border-text-primary/10">unverified</code>; the bypass is meant to be rare.
            </p>

            <h3 className="font-heading text-2xl text-text-primary tracking-tight mb-3">
              Five reviewers, in parallel
            </h3>
            <p className="text-text-secondary text-lg leading-relaxed mb-6">
              The post-draft checks run together, not in series, with per-check timeouts and a partial-result contract: if one LLM judge times out, the deterministic findings still surface and the LLM finding is recorded as degraded rather than absent.
            </p>

            <ol className="space-y-5 text-text-secondary text-lg leading-relaxed mb-10 list-decimal pl-6 marker:text-gold marker:font-semibold">
              {reviewers.map((r) => (
                <li key={r.title}>
                  <span className="font-semibold text-text-primary">{r.title}.</span>{' '}
                  {r.body}
                </li>
              ))}
            </ol>

            <div className="border-l-2 border-gold pl-5 md:pl-6 py-3 my-10 text-text-secondary italic text-base md:text-lg leading-relaxed">
              Refuse to draft is the feature, not the failure.
            </div>

            <p className="text-text-secondary text-lg leading-relaxed mb-5">
              <span className="font-semibold text-text-primary">Aggregate and route.</span> The orchestrator writes one finding row per check. If any check returns severity <code className="text-sm text-gold bg-surface-card px-1.5 py-0.5 rounded border border-text-primary/10">block</code>, the draft is held. Otherwise it enters the editor with findings shown in a left-rail collapsible list grouped by severity; the operator resolves or overrides each before export.
            </p>
            <p className="text-text-secondary text-lg leading-relaxed">
              <span className="font-semibold text-text-primary">Drift sentinel.</span> Statutes amend. Schedules change. Without a sentinel, the deterministic floor rots silently. A weekly job re-fetches the corpus archives, a monthly job re-runs the citation and judge benchmarks, a quarterly job re-checks Presidential notifications on Scheduled Areas. CI fails the release if the last sentinel run is older than seven days.
            </p>

            <VerificationDiagram />
          </motion.div>
        </div>
      </section>

      {/* Benchmarks */}
      <section className="py-16 md:py-20 px-6 md:px-12">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-display-sm md:text-display text-text-primary tracking-tight mb-8">
              The benchmarks
            </h2>

            <p className="text-sm font-medium text-gold uppercase tracking-widest mb-3">Citation benchmark · 29 April 2026</p>
            <p className="text-text-secondary text-lg leading-relaxed mb-4">
              Five hundred and two fixtures, including a one-hundred-fixture adversarial set covering impossible sections, supersession, fabricated acts, wrong years, misspelled acts, and cross-jurisdictional confusion. Zero hallucinations on the adversarial set. Precision and recall both at 98.51% on the full set.
            </p>
            <p className="text-text-secondary text-lg leading-relaxed mb-12">
              The thresholds the system has to clear are 98% precision, 85% recall, and zero adversarial hallucinations. It cleared all three.
            </p>

            <p className="text-sm font-medium text-gold uppercase tracking-widest mb-3">AI-judge benchmark · 29 April 2026</p>
            <p className="text-text-secondary text-lg leading-relaxed mb-4">
              Six fixtures across two bands: four clean drafts that should pass, two adversarial drafts that should be rejected. The judge passed all four and rejected both.
            </p>
            <p className="text-text-secondary text-lg leading-relaxed">
              On the clean Odisha name-correction affidavit it scored 4 / 3 / 4 / 5 / 4 across structure, citations, jurisdiction, risk, and quality. The 3 on citations is the catch worth reading: the judge correctly flagged that the verification clause cited Order VI Rule 15 CPC where Order XIX CPC governs verification of affidavits. That is a citation a careless reviewer would let through. The system is designed to find catches like that.
            </p>
          </motion.div>
        </div>
      </section>

      {/* What this demonstrates */}
      <section className="py-16 md:py-24 px-6 md:px-12 bg-background-alt">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-display-sm md:text-display text-text-primary tracking-tight mb-4">
              What this demonstrates
            </h2>
            <p className="text-text-secondary text-lg leading-relaxed mb-10">
              Five principles that ride out from this build into every other knowledge-heavy system I work on.
            </p>
          </motion.div>

          <div className="space-y-5">
            {demonstrates.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
                viewport={{ once: true }}
                className="rounded-card border border-text-primary/5 bg-surface-card p-6"
              >
                <h3 className="text-base font-semibold text-text-primary mb-2">{item.title}</h3>
                <p className="text-text-secondary leading-relaxed">{item.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech stack */}
      <section className="py-16 md:py-20 px-6 md:px-12">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-display-sm md:text-display text-text-primary tracking-tight mb-6">
              Tech stack
            </h2>
            <div className="flex flex-wrap gap-2.5">
              {fullStack.map((s) => (
                <span
                  key={s}
                  className="text-sm font-mono px-3 py-1.5 rounded border border-text-primary/10 bg-background-alt text-text-secondary"
                >
                  {s}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Confidentiality footer */}
      <section className="py-12 px-6 md:px-12 border-t border-text-primary/5">
        <div className="max-w-3xl mx-auto">
          <p className="text-sm text-text-tertiary leading-relaxed">
            The methodology described on this page is live in a private build with an Odisha pilot in preparation. The platform brand and product name are withheld pending trademark filing. Benchmark figures and architecture details are reproduced from internal reports dated 29 April 2026 and will be re-run before any public-tier release.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-surface-dark">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-display-sm md:text-display text-text-on-dark mb-4 tracking-tight">
              Have a problem shaped like this?
            </h2>
            <p className="text-text-on-dark/70 mb-8 text-lg">
              Drafting workflows where correctness has to defend itself, with a paper trail that holds up when challenged; tell us about it.
            </p>
            <Button href="/contact" variant="primary" size="lg">
              Start a conversation
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
