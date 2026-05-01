'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, CheckCircle2, Clock3, CalendarClock } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { VaultMotif, VaultSealMark } from '@/components/motifs/VaultMotif'

/* ─── Wave 3 motif: vault, sumi-shifted accent ───
   Accent hue: #a08535 (gold) is shifted toward deeper sumi at
   #6B5A28 for this study only. The override is scoped by a local
   CSS variable on the page wrapper; it does not leak. */
const BFSI_ACCENT_SUMI = '#6B5A28'

/* ─────────────────────────────────────────────────────────────
   IP protective version. Vendor names, service choices, schemas,
   code samples, and tooling specifics are held as studio IP and
   kept off this surface by design. Qualified engagements receive
   the architectural depth they need under NDA.
   ───────────────────────────────────────────────────────────── */

const heroChips = [
  'Sector: Regulated financial services',
  'Region: India',
  'Engagement: Greenfield build',
]

const heroMeta = [
  { k: 'Client', v: 'Regulated Indian financial institution (anonymised)' },
  { k: 'Stakeholder', v: 'Senior operations & compliance leadership' },
  { k: 'Phase', v: 'Foundation phase: data & infrastructure' },
  { k: 'Posture', v: 'RBI aligned · DPDP ready · India residency' },
]

const clientProblem = [
  'Leadership needed a single pane of glass across the field network, not a once a month deck.',
  'Field officers in low connectivity geographies needed to capture daily numbers without depending on a stable mobile data connection.',
  'Risk and compliance needed cryptographic assurance that sensitive fields were protected at rest, in transit, and across the AI layer.',
  'Leadership wanted natural language insights (for example, "why did this product line soften in a specific region this week?") without exposing any row level customer data to a third party model.',
]

const architectureKv = [
  { k: 'Identity', v: 'A managed identity provider with MFA enforced across every human path, and role claims carried through the API layer.' },
  { k: 'Edge & API', v: 'A hardened API edge with TLS enforced end to end, short lived session tokens, and request level audit logging. Specific services chosen for the engagement remain with the client.' },
  { k: 'Data', v: 'A relational database hosted in India, with isolation enforced at the database layer per role and client side encryption applied to sensitive free text fields before insert.' },
  { k: 'AI layer', v: 'Inference invoked from inside the trust boundary, reading only aggregated, de identified views. No IAM path exists to raw customer identifying rows.' },
  { k: 'Mobile', v: 'A mobile capture client with an encrypted local store and a conflict aware sync protocol for low connectivity field work.' },
  { k: 'Residency', v: 'All primary data, compute, and model inference pinned to an India region. No cross border data movement.' },
]

const compliance = [
  { concern: 'Data residency (RBI cloud guidance)', how: 'Primary storage, compute, and model inference pinned to an India region. No cross border data movement.' },
  { concern: 'Transport security', how: 'Modern TLS enforced on every API surface, no downgrade paths.' },
  { concern: 'PII protection at rest', how: 'Client side field level encryption for sensitive free text fields before they reach the database. Keys rotate on a documented schedule.' },
  { concern: 'Tenant isolation', how: 'Database layer isolation per role; tenancy boundaries survive application bugs.' },
  { concern: 'Least privilege', how: 'Scoped roles on every service; no broad wildcards on data plane resources.' },
  { concern: 'AI data exposure (DPDP Act readiness)', how: 'The AI layer consumes only aggregated, de identified views through a hardened view layer. No IAM path to raw rows.' },
  { concern: 'Auditability', how: "Full audit trail of read and write events, retained per the institution's record keeping requirements." },
]

type ArtifactStatus = 'done' | 'wip' | 'next'
const artifacts: { label: string; scope: string; status: ArtifactStatus }[] = [
  { label: 'Schema pack', scope: 'Core data model with encryption annotations and indexing strategy', status: 'wip' },
  { label: 'Isolation policies', scope: 'Database layer isolation across the full role matrix', status: 'wip' },
  { label: 'Infrastructure scaffold', scope: 'Identity, data, and compute scaffolding as code', status: 'wip' },
  { label: 'Encryption policy', scope: 'Written policy identifying every encrypted field and its rationale', status: 'done' },
  { label: 'RBI control mapping', scope: 'Control by control mapping to RBI outsourcing guidance', status: 'done' },
  { label: 'Role matrix test suite', scope: 'Negative path test suite for every role and scope combination', status: 'next' },
]

const workRhythm = [
  { wk: 'W1', focus: 'Scope lock, threat model, data classification', artifact: 'threat model v1' },
  { wk: 'W2', focus: 'Schema draft & review with risk team', artifact: 'schema draft' },
  { wk: 'W3', focus: 'Isolation policy authoring & role matrix', artifact: 'policy set' },
  { wk: 'W4', focus: 'Infrastructure scaffold, identity & data tier', artifact: 'scaffold v1' },
  { wk: 'W5', focus: 'Encryption policy & RBI control mapping', artifact: 'policy docs v1' },
  { wk: 'W6', focus: 'Internal review, hardening, handoff to phase 2', artifact: 'review sign off' },
]

/* ─── Presentational helpers ─── */

function StatusChip({ status }: { status: ArtifactStatus }) {
  if (status === 'done') {
    return (
      <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full bg-success/10 text-success border border-success/20">
        <CheckCircle2 className="h-3 w-3" />
        Delivered
      </span>
    )
  }
  if (status === 'wip') {
    return (
      <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full bg-gold/10 text-gold border border-gold/25">
        <Clock3 className="h-3 w-3" />
        In review
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full bg-navy/10 text-navy border border-navy/20">
      <CalendarClock className="h-3 w-3" />
      Scheduled
    </span>
  )
}

/* ─── Architecture diagram — abstract flow, no vendor names ─── */

function ArchitectureDiagram() {
  return (
    <figure className="my-8 rounded-card border border-text-primary/10 bg-surface-card p-6 md:p-8">
      <svg viewBox="0 0 720 290" xmlns="http://www.w3.org/2000/svg" role="img" className="w-full h-auto max-w-[760px] mx-auto block" aria-label="End to end flow: mobile capture client to a hardened API edge to application services to a database with isolation and field level encryption, and from a de identified view layer to an inference layer inside the trust boundary.">
        <defs>
          <marker id="bfsiArrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" style={{ fill: 'rgb(var(--gold))' }} />
          </marker>
        </defs>

        {/* Mobile client (outside the region box) */}
        <rect x="10" y="95" width="110" height="70" rx="8" style={{ fill: 'rgb(var(--surface))', stroke: 'rgb(var(--ink))' }} strokeWidth="1.2" />
        <text x="65" y="120" textAnchor="middle" style={{ fill: 'rgb(var(--ink))' }} fontSize="12" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">Mobile capture</text>
        <text x="65" y="138" textAnchor="middle" style={{ fill: 'rgb(var(--ink-3))' }} fontSize="11" fontFamily="Inter, system-ui, sans-serif">encrypted</text>
        <text x="65" y="152" textAnchor="middle" style={{ fill: 'rgb(var(--ink-3))' }} fontSize="11" fontFamily="Inter, system-ui, sans-serif">local store</text>

        {/* Region dashed box */}
        <rect x="150" y="30" width="560" height="230" rx="10" fill="none" style={{ stroke: 'rgb(var(--ink))' }} strokeWidth="1" strokeDasharray="4 4" opacity="0.4" />
        <text x="160" y="50" style={{ fill: 'rgb(var(--ink-3))' }} fontSize="10" letterSpacing="1.4" fontFamily="Inter, system-ui, sans-serif">INDIA REGION · TRUST BOUNDARY</text>

        {/* API edge */}
        <rect x="170" y="95" width="120" height="70" rx="8" style={{ fill: 'rgb(var(--surface))', stroke: 'rgb(var(--ink))' }} strokeWidth="1.2" />
        <text x="230" y="120" textAnchor="middle" style={{ fill: 'rgb(var(--ink))' }} fontSize="12" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">API edge</text>
        <text x="230" y="138" textAnchor="middle" style={{ fill: 'rgb(var(--ink-3))' }} fontSize="11" fontFamily="Inter, system-ui, sans-serif">TLS enforced</text>
        <text x="230" y="152" textAnchor="middle" style={{ fill: 'rgb(var(--ink-3))' }} fontSize="11" fontFamily="Inter, system-ui, sans-serif">role carried</text>

        {/* Services */}
        <rect x="310" y="95" width="120" height="70" rx="8" style={{ fill: 'rgb(var(--surface))', stroke: 'rgb(var(--ink))' }} strokeWidth="1.2" />
        <text x="370" y="120" textAnchor="middle" style={{ fill: 'rgb(var(--ink))' }} fontSize="12" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">Services</text>
        <text x="370" y="138" textAnchor="middle" style={{ fill: 'rgb(var(--ink-3))' }} fontSize="11" fontFamily="Inter, system-ui, sans-serif">role to session</text>
        <text x="370" y="152" textAnchor="middle" style={{ fill: 'rgb(var(--ink-3))' }} fontSize="11" fontFamily="Inter, system-ui, sans-serif">audit log</text>

        {/* Data */}
        <rect x="450" y="95" width="120" height="70" rx="8" style={{ fill: 'rgb(var(--surface))', stroke: 'rgb(var(--ink))' }} strokeWidth="1.2" />
        <text x="510" y="120" textAnchor="middle" style={{ fill: 'rgb(var(--ink))' }} fontSize="12" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">Data layer</text>
        <text x="510" y="138" textAnchor="middle" style={{ fill: 'rgb(var(--ink-3))' }} fontSize="11" fontFamily="Inter, system-ui, sans-serif">isolated by role</text>
        <text x="510" y="152" textAnchor="middle" style={{ fill: 'rgb(var(--ink-3))' }} fontSize="11" fontFamily="Inter, system-ui, sans-serif">field encryption</text>

        {/* Inference */}
        <rect x="590" y="95" width="110" height="70" rx="8" style={{ fill: 'rgb(var(--surface))', stroke: 'rgb(var(--ink))' }} strokeWidth="1.2" />
        <text x="645" y="120" textAnchor="middle" style={{ fill: 'rgb(var(--ink))' }} fontSize="12" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">Inference</text>
        <text x="645" y="138" textAnchor="middle" style={{ fill: 'rgb(var(--ink-3))' }} fontSize="11" fontFamily="Inter, system-ui, sans-serif">inside boundary</text>
        <text x="645" y="152" textAnchor="middle" style={{ fill: 'rgb(var(--ink-3))' }} fontSize="11" fontFamily="Inter, system-ui, sans-serif">de id views only</text>

        {/* Arrows */}
        <line x1="122" y1="130" x2="168" y2="130" style={{ stroke: 'rgb(var(--gold))' }} strokeWidth="1.5" markerEnd="url(#bfsiArrow)" />
        <line x1="292" y1="130" x2="308" y2="130" style={{ stroke: 'rgb(var(--gold))' }} strokeWidth="1.5" markerEnd="url(#bfsiArrow)" />
        <line x1="432" y1="130" x2="448" y2="130" style={{ stroke: 'rgb(var(--gold))' }} strokeWidth="1.5" markerEnd="url(#bfsiArrow)" />
        <line x1="572" y1="130" x2="588" y2="130" style={{ stroke: 'rgb(var(--gold))' }} strokeWidth="1.5" markerEnd="url(#bfsiArrow)" />

        {/* Footer text */}
        <text x="365" y="210" textAnchor="middle" style={{ fill: 'rgb(var(--ink-3))' }} fontSize="11" fontFamily="Inter, system-ui, sans-serif">
          Data, compute, and inference all pinned to region. No raw PII crosses the de identification boundary.
        </text>
        <text x="365" y="226" textAnchor="middle" style={{ fill: 'rgb(var(--ink-3))' }} fontSize="11" fontStyle="italic" fontFamily="Inter, system-ui, sans-serif">
          Vendor agnostic view. Specific services are selected for the engagement and held under NDA.
        </text>
      </svg>
      <figcaption className="mt-4 text-sm text-text-tertiary text-center">
        Figure 1 · End to end flow. Vendor and service selections are not published on this surface.
      </figcaption>
    </figure>
  )
}

/* ─── Page ─── */

export default function BfsiMisContent() {
  return (
    <div
      style={{
        ['--study-accent' as string]: BFSI_ACCENT_SUMI,
      }}
    >
      {/* Hero */}
      <section className="relative pt-24 md:pt-36 pb-14 md:pb-16 px-6 md:px-12 overflow-hidden">
        {/* Wave 3 · vault motif, mounted once inside the hero as a
            landmark. Centred concentric hairlines sit behind the
            heading; the respiration is slow and low contrast. */}
        <VaultMotif color={BFSI_ACCENT_SUMI} rings={6} />
        <div className="relative max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Link
              href="/work"
              className="inline-flex items-center gap-2 text-sm text-text-tertiary hover:text-gold transition-colors mb-10"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to work
            </Link>

            <p className="text-sm font-medium text-gold uppercase tracking-widest mb-5">
              Case study · BFSI · Regulated SaaS
            </p>
            <h1 className="font-heading text-hero-sm md:text-hero text-text-primary tracking-tight mb-6 leading-[1.1]">
              A compliance first MIS platform for a regulated Indian financial institution
            </h1>
            <p className="text-lg md:text-xl text-text-secondary leading-relaxed mb-8 max-w-2xl">
              How Kinyoubi Atelier &amp; Co. designed the secure data foundation, offline first capture layer, and AI assisted insight engine for a multi site Management Information System, engineered from day one for RBI alignment and DPDP Act readiness.
            </p>

            <div className="flex flex-wrap gap-2 mb-10">
              {heroChips.map((c) => (
                <span
                  key={c}
                  className="text-xs font-medium px-3 py-1.5 rounded-full border border-text-primary/10 bg-background-alt text-text-secondary"
                >
                  {c}
                </span>
              ))}
            </div>

            <dl className="grid grid-cols-2 md:grid-cols-4 gap-5 pt-8 border-t border-text-primary/10">
              {heroMeta.map((m) => (
                <div key={m.k}>
                  <dt className="text-[11px] font-semibold text-text-tertiary uppercase tracking-widest mb-1">
                    {m.k}
                  </dt>
                  <dd className="text-sm text-text-primary leading-snug">{m.v}</dd>
                </div>
              ))}
            </dl>
          </motion.div>
        </div>
      </section>

      {/* Provenance band */}
      <section className="py-3 px-6 md:px-12 bg-surface-dark text-text-on-dark/70 border-t border-b border-text-primary/10 font-mono text-[12px]">
        <div className="max-w-3xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <span>v1.1 · published 2026-04 · publisher: Kinyoubi Atelier &amp; Co.</span>
          <span className="text-text-on-dark/50">provenance: founder attestation below</span>
        </div>
      </section>

      {/* At a glance */}
      <section className="py-16 md:py-20 px-6 md:px-12">
        <div className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
            <h2 className="font-heading text-display-sm md:text-display text-text-primary tracking-tight mb-6">
              At a glance
            </h2>
            <p className="text-text-secondary text-lg leading-relaxed mb-5">
              A regulated Indian financial institution engaged Kinyoubi Atelier &amp; Co. to replace an Excel and email reporting loop that senior operations leadership relied on to track daily field performance. The brief sounded deceptively simple (&ldquo;give us one pane of glass&rdquo;), but three hard constraints shape every serious build in this segment: strict regulatory posture under RBI supervision, patchy connectivity across field sites, and the non negotiable rule that raw personally identifiable information must never leave the institution&rsquo;s trust boundary, least of all through a third party AI API.
            </p>
            <p className="text-text-secondary text-lg leading-relaxed">
              This case study describes the foundation phase: the secure data layer, identity, and infrastructure scaffolding, at a level qualified readers can evaluate. Implementation specifics stay between the studio and the client.
            </p>

            <div className="mt-8 border-l-2 border-gold pl-5 py-3 bg-background-alt rounded-r-card">
              <p className="text-text-secondary text-base leading-relaxed mb-0">
                <strong className="text-text-primary">Note on confidentiality.</strong> Client identity, site data, internal product taxonomies, named stakeholders, vendor selections, service names, schema details, and any proprietary metrics have been redacted or generalised. Qualified engagements receive the architectural depth they need under NDA.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* The opportunity */}
      <section className="py-12 md:py-16 px-6 md:px-12 bg-background-alt">
        <div className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
            <h2 className="font-heading text-display-sm md:text-display text-text-primary tracking-tight mb-6">
              The opportunity
            </h2>
            <p className="text-text-secondary text-lg leading-relaxed mb-5">
              Large regulated financial institutions in India operate at a scale that makes operational visibility genuinely hard. Daily reporting across a wide field network still happens through spreadsheets stitched together locally, emailed upstream, and rekeyed into leadership decks the night before review calls. The data is always at least a day stale, frequently inconsistent across sites, and carries enough embedded PII that even informal sharing creates regulatory exposure.
            </p>
            <p className="text-text-secondary text-lg leading-relaxed">
              Our thesis going in: the opportunity is not &ldquo;another dashboard.&rdquo; It is a <em>compliance native operating layer</em>, a system of record for daily field activity that is secure by construction, usable on weak networks, and capable of generating narrative insights without ever shipping raw customer data out of the institution&rsquo;s trust boundary.
            </p>
          </motion.div>
        </div>
      </section>

      {/* The problem */}
      <section className="py-12 md:py-16 px-6 md:px-12">
        <div className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
            <h2 className="font-heading text-display-sm md:text-display text-text-primary tracking-tight mb-6">
              The problem, in the client&rsquo;s words
            </h2>
            <ul className="space-y-3 text-text-secondary text-lg leading-relaxed list-disc pl-6 marker:text-gold">
              {clientProblem.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Our approach */}
      <section className="py-12 md:py-16 px-6 md:px-12 bg-background-alt">
        <div className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
            <h2 className="font-heading text-display-sm md:text-display text-text-primary tracking-tight mb-6">
              Our approach
            </h2>
            <p className="text-text-secondary text-lg leading-relaxed mb-5">
              We scoped the foundation phase tightly: before writing a single line of front end code, we would finalise the secure data foundation. Three deliverables shaped this work: a data schema with isolation enforced at the database layer, an infrastructure scaffold covering identity and data services, and a clear written policy on which fields require client side encryption before they are allowed to touch the database at all.
            </p>
            <p className="text-text-secondary text-lg leading-relaxed mb-8">
              Three principles guided the design:
            </p>

            <div className="space-y-6">
              <div className="rounded-card border border-text-primary/5 bg-surface-card p-6 md:p-7">
                <h3 className="text-base font-semibold text-gold mb-2">1 · Zero raw PII to external APIs.</h3>
                <p className="text-text-secondary leading-relaxed mb-0">
                  AI assisted insight generation runs against <em>aggregated, tokenised, de identified</em> views; never against raw rows. The inference layer sits inside the trust boundary, reads pre aggregated shapes through a hardened view layer, and has no IAM path to customer identifying columns. This is an architectural guarantee, not a policy promise.
                </p>
              </div>
              <div className="rounded-card border border-text-primary/5 bg-surface-card p-6 md:p-7">
                <h3 className="text-base font-semibold text-gold mb-2">2 · Tenancy enforced at the database, not the application.</h3>
                <p className="text-text-secondary leading-relaxed mb-0">
                  Multi role access, from site level to regional level to compliance read only, is enforced at the database layer. Even if a developer shipped a query without the right scope, the database would still refuse to return rows outside the caller&rsquo;s authorised scope. Application bugs cannot become data leak incidents.
                </p>
              </div>
              <div className="rounded-card border border-text-primary/5 bg-surface-card p-6 md:p-7">
                <h3 className="text-base font-semibold text-gold mb-2">3 · Offline first is a first class concern, not a retrofit.</h3>
                <p className="text-text-secondary leading-relaxed mb-0">
                  The mobile capture layer runs with an encrypted local store and a conflict aware sync protocol. Officers can complete an entire day&rsquo;s capture in a no signal site and have it reconcile cleanly when they step back into coverage.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Architecture */}
      <section className="py-12 md:py-16 px-6 md:px-12">
        <div className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
            <h2 className="font-heading text-display-sm md:text-display text-text-primary tracking-tight mb-6">
              Architecture in brief
            </h2>

            <ArchitectureDiagram />

            <dl className="divide-y divide-text-primary/5 border-t border-b border-text-primary/5 mt-6">
              {architectureKv.map((row) => (
                <div key={row.k} className="grid grid-cols-1 md:grid-cols-[180px,1fr] gap-y-1 md:gap-x-6 py-4">
                  <dt className="text-[11px] font-semibold text-text-tertiary uppercase tracking-widest pt-1">
                    {row.k}
                  </dt>
                  <dd className="text-text-secondary leading-relaxed">{row.v}</dd>
                </div>
              ))}
            </dl>
          </motion.div>
        </div>
      </section>

      {/* Compliance posture */}
      <section className="py-12 md:py-16 px-6 md:px-12 bg-background-alt">
        <div className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
            <h2 className="font-heading text-display-sm md:text-display text-text-primary tracking-tight mb-6">
              Compliance posture
            </h2>
            <p className="text-text-secondary text-lg leading-relaxed mb-8">
              The foundation phase was designed against the Reserve Bank of India&rsquo;s guidance on outsourcing of IT services and cloud computing for regulated entities, and against the data handling obligations set by the Digital Personal Data Protection Act, 2023. The controls that matter most to a BFSI buyer are built in, not bolted on.
            </p>

            <div className="rounded-card border border-text-primary/10 overflow-hidden bg-surface-card">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-background-alt">
                    <th className="text-[11px] font-semibold text-text-tertiary uppercase tracking-widest px-5 py-3 border-b border-text-primary/10 align-top w-[38%]">Regulatory concern</th>
                    <th className="text-[11px] font-semibold text-text-tertiary uppercase tracking-widest px-5 py-3 border-b border-text-primary/10 align-top">How we address it</th>
                  </tr>
                </thead>
                <tbody>
                  {compliance.map((row) => (
                    <tr key={row.concern} className="border-b border-text-primary/5 last:border-b-0 align-top">
                      <td className="px-5 py-4 text-text-primary font-medium text-[15px]">{row.concern}</td>
                      <td className="px-5 py-4 text-text-secondary text-[15px] leading-relaxed">{row.how}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Proof & provenance */}
      <section className="py-16 md:py-20 px-6 md:px-12">
        <div className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
            <h2 className="font-heading text-display-sm md:text-display text-text-primary tracking-tight mb-4">
              Proof &amp; provenance
            </h2>
            <p className="text-text-secondary text-lg leading-relaxed mb-10">
              Public case studies in regulated industries often read as hand wavy marketing. The manifest below lets a qualified reader see that the posture described above maps to a defined set of engineering artifacts, without publishing the artifacts themselves.
            </p>

            {/* Artifact manifest */}
            <h3 className="font-heading text-xl text-text-primary mb-3">Artifact manifest</h3>
            <p className="text-text-secondary leading-relaxed mb-5">
              The foundation phase produces a defined set of deliverables. Names and scopes are listed at the category level; file names, schemas, and contents stay with the studio and the client under NDA.
            </p>

            <div className="rounded-card border border-text-primary/10 overflow-hidden bg-surface-card mb-14">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-background-alt">
                    <th className="text-[11px] font-semibold text-text-tertiary uppercase tracking-widest px-5 py-3 border-b border-text-primary/10 align-top">Artifact</th>
                    <th className="text-[11px] font-semibold text-text-tertiary uppercase tracking-widest px-5 py-3 border-b border-text-primary/10 align-top">Scope</th>
                    <th className="text-[11px] font-semibold text-text-tertiary uppercase tracking-widest px-5 py-3 border-b border-text-primary/10 align-top">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {artifacts.map((row) => (
                    <tr key={row.label} className="border-b border-text-primary/5 last:border-b-0 align-top">
                      <td className="px-5 py-4 text-[14.5px] text-gold whitespace-nowrap font-medium">{row.label}</td>
                      <td className="px-5 py-4 text-text-secondary text-[14.5px] leading-relaxed">{row.scope}</td>
                      <td className="px-5 py-4 whitespace-nowrap"><StatusChip status={row.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Work rhythm */}
            <h3 className="font-heading text-xl text-text-primary mb-3 mt-4">Foundation phase · work rhythm</h3>
            <p className="text-text-secondary leading-relaxed mb-5">
              A week by week view of how the foundation phase was executed. No absolute dates; the cadence itself is the signal.
            </p>

            <div className="rounded-card border border-text-primary/10 overflow-hidden bg-surface-card">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-background-alt">
                    <th className="text-[11px] font-semibold text-text-tertiary uppercase tracking-widest px-5 py-3 border-b border-text-primary/10 w-[60px]">Week</th>
                    <th className="text-[11px] font-semibold text-text-tertiary uppercase tracking-widest px-5 py-3 border-b border-text-primary/10">Focus</th>
                    <th className="text-[11px] font-semibold text-text-tertiary uppercase tracking-widest px-5 py-3 border-b border-text-primary/10">Artifact</th>
                  </tr>
                </thead>
                <tbody>
                  {workRhythm.map((row) => (
                    <tr key={row.wk} className="border-b border-text-primary/5 last:border-b-0">
                      <td className="px-5 py-4 font-mono text-sm text-gold align-top">{row.wk}</td>
                      <td className="px-5 py-4 text-text-secondary text-[14.5px] leading-relaxed align-top">{row.focus}</td>
                      <td className="px-5 py-4 text-text-primary text-[13.5px] align-top">{row.artifact}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Founder attestation */}
      <section className="py-16 md:py-20 px-6 md:px-12 bg-background-alt">
        <div className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
            <h3 className="font-heading text-xl text-text-primary mb-5">Founder attestation</h3>
            <div className="rounded-card border-2 border-gold/30 bg-surface-card p-7 md:p-9 shadow-soft">
              <div className="flex items-start gap-4 mb-5">
                <div className="h-11 w-11 rounded-full bg-navy flex items-center justify-center flex-shrink-0">
                  <span className="text-gold-bright font-heading text-base font-semibold">AS</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-text-primary font-semibold text-base">Ankit Sahu</div>
                  <div className="text-text-tertiary text-sm">Founder, Kinyoubi Atelier &amp; Co.</div>
                </div>
              </div>
              <p className="text-text-secondary text-base leading-relaxed mb-4">
                I attest that the engagement, architecture, and artifacts described in this case study are real and were produced by Kinyoubi Atelier &amp; Co. for a regulated Indian financial institution. Client identity, vendor selections, and proprietary details have been redacted in accordance with confidentiality obligations and with the studio&rsquo;s own IP protective publication policy. Qualified prospects, investors, and partners can request a technical deep dive, a walkthrough of unredacted artifacts, and direct client references under mutual NDA.
              </p>
              <p className="text-sm text-text-tertiary pt-4 border-t border-text-primary/5">
                Contact:{' '}
                <a
                  href="mailto:ankit@kinyoubiatelier.com"
                  className="text-gold hover:underline"
                >
                  ankit@kinyoubiatelier.com
                </a>
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What the foundation phase delivered */}
      <section className="py-12 md:py-16 px-6 md:px-12">
        <div className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
            <h2 className="font-heading text-display-sm md:text-display text-text-primary tracking-tight mb-6">
              What the foundation phase delivered
            </h2>
            <p className="text-text-secondary text-lg leading-relaxed mb-5">
              At the close of the foundation phase, the institution had a defensible base to build on: a reviewed data schema with isolation policies written and tested against the role matrix, an infrastructure scaffold covering identity and the data tier, and a written encryption policy identifying every field that must be client side encrypted before storage. The architecture decisions were documented in a form the client&rsquo;s internal risk and compliance team could review against RBI guidance line by line.
            </p>
            <p className="text-sm text-text-tertiary leading-relaxed">
              Phase 2 (the officer capture app, leadership dashboards, and the AI assisted insight layer) is in active build. Outcome metrics will be added here once the system is in production and the client has approved their disclosure. We do not publish fabricated KPIs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why this build matters */}
      <section className="py-12 md:py-16 px-6 md:px-12 bg-background-alt">
        <div className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
            <h2 className="font-heading text-display-sm md:text-display text-text-primary tracking-tight mb-6">
              Why this build matters
            </h2>
            <p className="text-text-secondary text-lg leading-relaxed mb-5">
              Every large regulated financial institution in India has some version of the same problem: operational data trapped in spreadsheets, reporting that is stale by the time leadership sees it, and a regulatory environment that makes &ldquo;just pipe it into an AI tool&rdquo; a non starter. The pattern we have built here (offline first capture, database enforced tenancy, encryption at the edge, and an AI layer that only ever sees de identified aggregates) is not specific to one institution. It is a template for regulated SaaS in the Indian BFSI market.
            </p>
            <p className="text-text-secondary text-lg leading-relaxed">
              Kinyoubi Atelier &amp; Co. builds compliance first software for regulated industries. If you are a partner or investor interested in how we turn regulated pilots into repeatable product patterns, we would be glad to share more under NDA.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Further reading — companion notes from the studio that pull
          their patterns from this engagement. Sits before the vault
          seal so the seal stamps the body and the further reading as
          a single artifact. */}
      <section className="py-16 md:py-20 px-6 md:px-12">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <p className="text-sm font-medium text-gold uppercase tracking-widest mb-4">
              Further reading
            </p>
            <h2 className="font-heading text-2xl md:text-3xl text-text-primary tracking-tight mb-6">
              From the studio
            </h2>
            <div className="space-y-5">
              <Link
                href="/notes/dpdp-for-saas-builders"
                className="group block card-hover-lift rounded-card border border-text-primary/5 hover:border-gold/25 bg-background-alt shadow-card p-6 md:p-8"
              >
                <p className="text-xs text-text-tertiary uppercase tracking-widest mb-2">
                  Note · Regulated SaaS · DPDP
                </p>
                <h3 className="font-heading text-xl md:text-2xl text-text-primary tracking-tight mb-2">
                  DPDP for SaaS builders: where the Act meets the schema
                </h3>
                <p className="text-text-secondary leading-relaxed mb-4">
                  The architect&rsquo;s reading of DPDP. Notice, consent, retention, data principal rights, and breach notification mapped to schema and request-flow patterns from this engagement.
                </p>
                <span className="text-sm font-medium text-gold group-hover:underline inline-flex items-center gap-1.5">
                  Read the note
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
              <Link
                href="/notes/postgres-rls-multitenant"
                className="group block card-hover-lift rounded-card border border-text-primary/5 hover:border-gold/25 bg-background-alt shadow-card p-6 md:p-8"
              >
                <p className="text-xs text-text-tertiary uppercase tracking-widest mb-2">
                  Note · Postgres · Multi-tenant · RLS
                </p>
                <h3 className="font-heading text-xl md:text-2xl text-text-primary tracking-tight mb-2">
                  Multi-tenant Postgres with Row-Level Security: a working pattern
                </h3>
                <p className="text-text-secondary leading-relaxed mb-4">
                  The exact RLS pattern that shipped on this engagement. The clause, the connection-pool problem, the BYPASSRLS trap, and the audit answer the regulator wants.
                </p>
                <span className="text-sm font-medium text-gold group-hover:underline inline-flex items-center gap-1.5">
                  Read the note
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Wave 3 · vault seal, stamped once above the compliance
          footer area. The seal is the single crimson on this page;
          it sits above the IP protective language, never inside it. */}
      <section className="pt-8 px-6 md:px-12" aria-hidden="true">
        <div className="max-w-3xl mx-auto flex justify-center">
          <VaultSealMark size={56} />
        </div>
      </section>

      {/* Footer disclosure */}
      <section className="py-10 px-6 md:px-12 border-t border-text-primary/5">
        <div className="max-w-3xl mx-auto space-y-3">
          <p className="text-sm text-text-tertiary leading-relaxed">
            © Kinyoubi Atelier &amp; Co. · All client identifying details have been redacted in accordance with applicable confidentiality obligations and regulatory norms.
          </p>
          <p className="text-sm text-text-tertiary leading-relaxed">
            Implementation specifics, including vendor selections, service names, schemas, code, and infrastructure configurations, are held as studio intellectual property and are not published on this surface by design.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-surface-dark">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
            <h2 className="font-heading text-display-sm md:text-display text-text-on-dark mb-4 tracking-tight">
              Building something in a regulated sector?
            </h2>
            <p className="text-text-on-dark/70 mb-8 text-lg">
              If you need software that has to hold up to a risk and compliance review on day one, we would like to hear about it.
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
