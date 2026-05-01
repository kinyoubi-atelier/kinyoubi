'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Code2, Cpu, Database, Lightbulb, FileSearch, Layers } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { BrushStrokeDivider } from '@/components/ui/BrushStrokeDivider'
import { Card } from '@/components/ui/Card'
import { FAQAccordion, faqStructuredData } from '@/components/ui/FAQAccordion'
import { ProjectEstimator } from '@/components/ui/ProjectEstimator'
import { Reveal } from '@/design/primitives/Reveal'
import { STAGGER_LONG } from '@/design/tokens/motion'

/* ─── Mini diagrams for services ─── */

function DevStackVisual() {
  // Category level capability chips. Specific libraries, frameworks, and
  // cloud configurations are matched to the engagement and stay between
  // the studio and the client.
  const items = [
    'Web applications',
    'Mobile capture',
    'Backend services',
    'Relational data',
    'Batch pipelines',
    'Cloud deployments',
    'API design',
  ]
  return (
    <div className="flex flex-wrap gap-2 mt-6">
      {items.map((item) => (
        <span key={item} className="text-xs px-3 py-1.5 rounded-full bg-gold/8 text-gold border border-gold/15 font-medium">
          {item}
        </span>
      ))}
    </div>
  )
}

function ProductPlatformVisual() {
  // Abstract layering chips. The concrete stack for any given build
  // lives inside its case study. This row signals end to end coverage
  // without republishing architectural choices on a marketing surface.
  const items = ['Engine core', 'Data platform', 'API', 'Front end', 'Monorepo']
  return (
    <div className="flex flex-wrap gap-2 mt-6">
      {items.map((item) => (
        <span key={item} className="text-xs px-3 py-1.5 rounded-full bg-gold/8 text-gold border border-gold/15 font-medium">
          {item}
        </span>
      ))}
    </div>
  )
}

function ArchitectureVisual() {
  return (
    <div className="w-full overflow-x-auto mt-6">
      <svg viewBox="0 0 380 80" className="w-full min-w-[280px] max-w-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="0" y="8" width="80" height="38" rx="8" style={{ fill: 'rgb(var(--surface))', stroke: 'rgb(var(--hairline))' }} strokeWidth="1.5" />
        <text x="40" y="32" textAnchor="middle" style={{ fill: 'rgb(var(--ink))' }} fontSize="12" fontFamily="system-ui" fontWeight="500">Audit</text>

        <path d="M82 27 L96 27" style={{ stroke: 'rgb(var(--gold))' }} strokeWidth="1.5" />

        <rect x="98" y="8" width="80" height="38" rx="8" style={{ fill: 'rgb(var(--surface))', stroke: 'rgb(var(--hairline))' }} strokeWidth="1.5" />
        <text x="138" y="32" textAnchor="middle" style={{ fill: 'rgb(var(--ink))' }} fontSize="12" fontFamily="system-ui" fontWeight="500">Design</text>

        <path d="M180 27 L194 27" style={{ stroke: 'rgb(var(--gold))' }} strokeWidth="1.5" />

        <rect x="196" y="8" width="86" height="38" rx="8" style={{ fill: 'rgb(var(--surface))', stroke: 'rgb(var(--hairline))' }} strokeWidth="1.5" />
        <text x="239" y="32" textAnchor="middle" style={{ fill: 'rgb(var(--ink))' }} fontSize="12" fontFamily="system-ui" fontWeight="500">Roadmap</text>

        <path d="M284 27 L298 27" style={{ stroke: 'rgb(var(--gold))' }} strokeWidth="1.5" />

        <rect x="300" y="8" width="76" height="38" rx="8" style={{ fill: 'rgb(var(--ink))' }} />
        <text x="338" y="32" textAnchor="middle" style={{ fill: 'rgb(var(--gold))' }} fontSize="12" fontFamily="system-ui" fontWeight="500">Deliver</text>

        <text x="190" y="68" textAnchor="middle" style={{ fill: 'rgb(var(--ink-3))' }} fontSize="11" fontFamily="system-ui">
          Typical consulting engagement flow
        </text>
      </svg>
    </div>
  )
}

function AgentWorkflowVisual() {
  return (
    <div className="w-full overflow-x-auto mt-6">
      <svg viewBox="0 0 380 140" className="w-full min-w-[280px] max-w-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Orchestrator */}
        <rect x="120" y="4" width="140" height="38" rx="19" style={{ fill: 'rgb(var(--ink))' }} />
        <text x="190" y="28" textAnchor="middle" style={{ fill: 'rgb(var(--bg))' }} fontSize="13" fontFamily="system-ui" fontWeight="500">Orchestrator</text>

        {/* Lines */}
        <line x1="150" y1="42" x2="70" y2="64" style={{ stroke: 'rgb(var(--gold))' }} strokeWidth="1.5" strokeDasharray="3 2" />
        <line x1="190" y1="42" x2="190" y2="64" style={{ stroke: 'rgb(var(--gold))' }} strokeWidth="1.5" strokeDasharray="3 2" />
        <line x1="230" y1="42" x2="310" y2="64" style={{ stroke: 'rgb(var(--gold))' }} strokeWidth="1.5" strokeDasharray="3 2" />

        {/* Workers */}
        <rect x="20" y="64" width="100" height="34" rx="17" style={{ fill: 'rgb(var(--surface))', stroke: 'rgb(var(--hairline))' }} strokeWidth="1" />
        <text x="70" y="86" textAnchor="middle" style={{ fill: 'rgb(var(--ink-3))' }} fontSize="12" fontFamily="system-ui">Agent A</text>

        <rect x="140" y="64" width="100" height="34" rx="17" style={{ fill: 'rgb(var(--surface))', stroke: 'rgb(var(--hairline))' }} strokeWidth="1" />
        <text x="190" y="86" textAnchor="middle" style={{ fill: 'rgb(var(--ink-3))' }} fontSize="12" fontFamily="system-ui">Agent B</text>

        <rect x="260" y="64" width="100" height="34" rx="17" style={{ fill: 'rgb(var(--surface))', stroke: 'rgb(var(--hairline))' }} strokeWidth="1" />
        <text x="310" y="86" textAnchor="middle" style={{ fill: 'rgb(var(--ink-3))' }} fontSize="12" fontFamily="system-ui">Agent C</text>

        {/* Synthesis */}
        <line x1="70" y1="98" x2="155" y2="116" style={{ stroke: 'rgb(var(--gold))' }} strokeWidth="1.5" strokeDasharray="3 2" />
        <line x1="190" y1="98" x2="190" y2="116" style={{ stroke: 'rgb(var(--gold))' }} strokeWidth="1.5" strokeDasharray="3 2" />
        <line x1="310" y1="98" x2="225" y2="116" style={{ stroke: 'rgb(var(--gold))' }} strokeWidth="1.5" strokeDasharray="3 2" />

        <rect x="130" y="116" width="120" height="28" rx="14" style={{ fill: 'rgb(var(--ink))' }} />
        <text x="190" y="134" textAnchor="middle" style={{ fill: 'rgb(var(--gold))' }} fontSize="12" fontFamily="system-ui" fontWeight="500">Synthesis</text>
      </svg>
    </div>
  )
}

function ResearchVisual() {
  const tiers = ['Scan', 'Research', 'Map', 'Brief']
  return (
    <div className="flex items-center gap-3 mt-6 flex-wrap">
      {tiers.map((tier, i) => (
        <div key={tier} className="flex items-center gap-3">
          <div className={`px-4 py-2 rounded-full text-xs font-medium ${i === tiers.length - 1 ? 'bg-navy text-gold-bright' : 'bg-background-alt text-text-secondary border border-text-primary/10'}`}>
            {tier}
          </div>
          {i < tiers.length - 1 && (
            <ArrowRight className="h-3 w-3 text-gold" />
          )}
        </div>
      ))}
    </div>
  )
}

/* ─── Service Data ─── */

interface ServiceData {
  icon: React.ElementType
  id: string
  label: string
  title: string
  description: string
  deliverables: string[]
  visual: React.ReactNode
  disclaimer?: string
}

// ─────────────────────────────────────────────────────────────
// Service headlines are written around buyer outcomes, not
// technology categories. Each one maps to a published case
// study or engagement pattern the studio can defend in
// conversation. Concrete architecture stays in the case study
// page itself and under NDA beyond that.
// ─────────────────────────────────────────────────────────────
const services: ServiceData[] = [
  {
    icon: Code2,
    id: 'software-development',
    label: 'Software Development',
    title: 'Field capture apps that work without a signal. Pipelines that run in under a minute.',
    description:
      'We build for the operating conditions your system actually sees: low connectivity geographies, brittle legacy spreadsheets, audits that cannot break production. The toolchain is modern and picked to fit the engagement rather than signalled on the marketing page. The commitment is that we ship in weeks, not quarters, and hand you something that runs without us.',
    deliverables: ['Offline first mobile capture', 'Idempotent batch pipelines', 'Backend services & APIs', 'Workflow automation', 'CI/CD with security headers baked in'],
    visual: <DevStackVisual />,
  },
  {
    icon: Layers,
    id: 'product-platform-engineering',
    label: 'Product & Platform Engineering',
    title: 'From engine core to front end, built as one coherent system.',
    description:
      'Our in house timetable management engine is the worked example: an engine, a multi tenant data platform, an API, and a role aware front end, shipped end to end under one roof. We build products so the decisions at the core reach the decisions at the surface without a handoff seam. Architectural depth is in the case study, not in the marketing copy.',
    deliverables: ['Engine and solver cores', 'Multi tenant platforms', 'APIs', 'Role aware front ends', 'Mobile scaffolds'],
    visual: <ProductPlatformVisual />,
  },
  {
    icon: Lightbulb,
    id: 'technical-consulting',
    label: 'Technical Consulting',
    title: 'The architecture review that costs less than the rewrite it prevents.',
    description:
      'For teams staring at a decision that will compound for years: data model, auth model, sync strategy, cloud region, build-vs-buy. We sit with your team, model the access patterns and failure modes, and write an ADR you can point to in six months when someone asks why you chose what you chose. No retainer. No vendor lock-in. No padding.',
    deliverables: ['Architecture decision records', 'Threat models', 'Technical audits', 'Implementation roadmaps', 'Build-vs-buy memos'],
    visual: <ArchitectureVisual />,
  },
  {
    icon: Cpu,
    id: 'ai-workflows',
    label: 'AI-Powered Workflow Development',
    title: 'Replace fourteen hours of manual work with a one-minute script.',
    description:
      'That number is a real outcome from our archive-automation engagement: 3,905 records reconciled, 116 fuzzy-duplicate locality names merged, ~14 hours of manual triage replaced with an idempotent pipeline that re-runs in under a minute. We build orchestrators that decompose problems into verifiable stages; each has its own failure mode and its own retry logic. This stops your team from living inside the spreadsheet.',
    deliverables: ['Multi-agent orchestration', 'Document processing pipelines', 'Fuzzy-match & dedupe workflows', 'LLM integrations with guardrails', 'Idempotent re-runnable scripts'],
    visual: <AgentWorkflowVisual />,
  },
  {
    icon: Database,
    id: 'enterprise-systems',
    label: 'Enterprise & Institutional Systems',
    title: 'Custom ERPs, accounting modules, and data platforms for private institutions and government.',
    description:
      'Custom ERPs, accounting modules, SQL data platforms, DBMS migrations, and institutional websites. Built directly for the team that has to operate them, not handed off to a vendor pool. Where the sector requires it (DPDP, RBI, MeitY guidelines, ministry IT spec), the compliance posture is designed in, not bolted on. Our BFSI-MIS engagement was built this way: threat model before schema, row-level security before API, client-side field-level encryption on every sensitive free-text field before a row hits the database.',
    deliverables: [
      'Custom ERPs and internal tools',
      'Accounting modules and Tally migrations',
      'SQL data platforms and DBMS migrations',
      'Government department and institutional websites',
      'Compliance posture: DPDP, RBI, sector-specific',
      'Regulatory research and control-to-framework mappings',
    ],
    visual: <ResearchVisual />,
    disclaimer: 'Where regulatory research is part of an engagement, we provide research and analysis to support decision-making. We do not provide legal advice or representation. For legal matters, we recommend working with qualified legal counsel.',
  },
]

/* ─── FAQ Data ─── */

const faqItems = [
  {
    question: 'How quickly can you start on a new project?',
    answer: 'Typically within 1–2 weeks. We keep our pipeline lean specifically so we can onboard fast. After an initial discovery call, we provide a scope document and can begin work as soon as it\'s approved.',
  },
  {
    question: 'Do you work with startups or only established companies?',
    answer: 'Both. We\'ve worked with early-stage founders who need an MVP built fast, and with established teams that need senior-level architecture support. The common thread is a clear problem and a willingness to collaborate.',
  },
  {
    question: 'What does "accelerated timelines" actually mean?',
    answer: 'We\'ve systematized our development workflow so that parallel workstreams, structured reviews, and automated testing happen concurrently rather than sequentially. This means faster delivery without cutting corners on quality or documentation.',
  },
  {
    question: 'Can you work with our existing codebase?',
    answer: 'Absolutely. Many of our engagements start with a codebase audit. We assess the current architecture, identify bottlenecks or technical debt, and either refactor in place or build new modules that integrate cleanly.',
  },
  {
    question: 'What happens after the project is delivered?',
    answer: 'Every engagement includes documentation, knowledge transfer, and a post-launch support window. We don\'t build systems that depend on us to run. The goal is always a clean handoff.',
  },
  {
    question: 'Do you provide legal advice?',
    answer: 'No. Our regulatory research and contract analysis services support decision-making, but we do not provide legal advice or representation. We recommend working with qualified legal counsel for legal matters.',
  },
]

/* ─── Page ─── */

export default function ServicesContent() {
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
            <p className="text-sm font-medium text-gold uppercase tracking-widest mb-4">Services</p>
            <h1 className="font-heading text-hero-sm md:text-hero text-text-primary mb-6 tracking-tight">
              What we build
            </h1>
            <p className="text-lg md:text-xl text-text-secondary max-w-2xl leading-relaxed">
              Software, systems, and research; each delivered with engineering precision and the speed your timeline demands.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Service sections */}
      {services.map((service, index) => {
        const Icon = service.icon
        const isAlt = index % 2 === 0
        return (
          <section
            key={service.label}
            id={service.id}
            className={`py-20 md:py-28 px-6 md:px-12 scroll-mt-20 ${isAlt ? 'bg-background-alt' : ''}`}
          >
            <div className="max-w-5xl mx-auto">
              {/* Discipline cards cascade by row. Each card is its own
                  section, so staggering becomes a per-row delay using
                  STAGGER_LONG: each arrival gets its own beat. */}
              <Reveal delay={index * STAGGER_LONG}>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-16">
                  {/* Content (3/5) */}
                  <div className="md:col-span-3">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-9 w-9 rounded-lg bg-gold/10 flex items-center justify-center">
                        <Icon className="h-4 w-4 text-gold" strokeWidth={1.5} />
                      </div>
                      <p className="text-sm font-medium text-gold uppercase tracking-widest">
                        {service.label}
                      </p>
                    </div>

                    <h2 className="font-heading text-display-sm text-text-primary mb-5 tracking-tight leading-tight">
                      {service.title}
                    </h2>

                    <p className="text-lg text-text-secondary leading-relaxed mb-6">
                      {service.description}
                    </p>

                    {/* Deliverables */}
                    <div className="flex flex-wrap gap-2">
                      {service.deliverables.map((item) => (
                        <span
                          key={item}
                          className="text-xs px-3 py-1.5 rounded-lg bg-surface-card text-text-secondary border border-text-primary/5"
                        >
                          {item}
                        </span>
                      ))}
                    </div>

                    {service.disclaimer && (
                      <p className="text-sm text-text-tertiary border-l-2 border-gold/30 pl-4 mt-8 max-w-xl">
                        {service.disclaimer}
                      </p>
                    )}
                  </div>

                  {/* Visual (2/5) */}
                  <div className="md:col-span-2 flex items-start justify-center">
                    <Card bordered className="w-full p-6">
                      <p className="text-xs text-text-tertiary uppercase tracking-widest mb-2">{service.label}</p>
                      {service.visual}
                    </Card>
                  </div>
                </div>
              </Reveal>
            </div>
          </section>
        )
      })}

      {/* Brush stroke */}
      <div className="py-8">
        <BrushStrokeDivider variant={1} />
      </div>

      {/* ──────────────────────────────────────────────
          Project Estimator + FAQ
      ────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 px-6 md:px-12 bg-background-alt">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
            {/* Estimator */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <ProjectEstimator />
            </motion.div>

            {/* FAQ */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <p className="text-sm font-medium text-gold uppercase tracking-widest mb-1">FAQ</p>
              <h3 className="font-heading text-xl text-text-primary tracking-tight mb-6">
                Common questions
              </h3>
              <FAQAccordion items={faqItems} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData(faqItems)) }}
      />

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
              Every engagement begins with a conversation.
            </h2>
            <p className="text-text-on-dark/60 mb-10 text-lg">
              Tell us about your project and we'll outline an approach.
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
