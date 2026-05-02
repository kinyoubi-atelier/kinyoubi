'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { AikaTrigger } from '@/components/aika/AikaTrigger'
import { BrushStrokeDivider } from '@/components/ui/BrushStrokeDivider'
import { IPNotice } from '@/components/ui/IPNotice'
import { InkStroke } from '@/design/primitives/InkStroke'

/* ─── SVG Diagrams ─── */

function OrchestratorDiagram() {
  return (
    <div className="w-full overflow-x-auto -mx-4 px-4">
      <svg viewBox="0 0 460 240" className="w-full min-w-[320px] max-w-xl mx-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Planning phase */}
        <rect x="160" y="6" width="140" height="46" rx="23" style={{ fill: 'rgb(var(--ink))' }} />
        <text x="230" y="34" textAnchor="middle" style={{ fill: 'rgb(var(--bg))' }} fontSize="14" fontFamily="system-ui" fontWeight="500">Orchestrator</text>
        <text x="230" y="64" textAnchor="middle" style={{ fill: 'rgb(var(--ink-3))' }} fontSize="12" fontFamily="system-ui">Planning &amp; Decomposition</text>

        {/* Arrows down */}
        <path d="M175 72 L80 100" style={{ stroke: 'rgb(var(--gold))' }} strokeWidth="1.5" strokeDasharray="4 3" markerEnd="url(#arrowGold)" />
        <path d="M230 72 L230 100" style={{ stroke: 'rgb(var(--gold))' }} strokeWidth="1.5" strokeDasharray="4 3" />
        <path d="M285 72 L380 100" style={{ stroke: 'rgb(var(--gold))' }} strokeWidth="1.5" strokeDasharray="4 3" />

        {/* Workers */}
        <rect x="10" y="100" width="140" height="50" rx="12" style={{ fill: 'rgb(var(--surface))', stroke: 'rgb(var(--hairline))' }} strokeWidth="1.5" />
        <text x="80" y="122" textAnchor="middle" style={{ fill: 'rgb(var(--ink))' }} fontSize="13" fontFamily="system-ui" fontWeight="500">Worker A</text>
        <text x="80" y="139" textAnchor="middle" style={{ fill: 'rgb(var(--ink-3))' }} fontSize="11" fontFamily="system-ui">Isolated context</text>

        <rect x="160" y="100" width="140" height="50" rx="12" style={{ fill: 'rgb(var(--surface))', stroke: 'rgb(var(--hairline))' }} strokeWidth="1.5" />
        <text x="230" y="122" textAnchor="middle" style={{ fill: 'rgb(var(--ink))' }} fontSize="13" fontFamily="system-ui" fontWeight="500">Worker B</text>
        <text x="230" y="139" textAnchor="middle" style={{ fill: 'rgb(var(--ink-3))' }} fontSize="11" fontFamily="system-ui">Parallel execution</text>

        <rect x="310" y="100" width="140" height="50" rx="12" style={{ fill: 'rgb(var(--surface))', stroke: 'rgb(var(--hairline))' }} strokeWidth="1.5" />
        <text x="380" y="122" textAnchor="middle" style={{ fill: 'rgb(var(--ink))' }} fontSize="13" fontFamily="system-ui" fontWeight="500">Worker C</text>
        <text x="380" y="139" textAnchor="middle" style={{ fill: 'rgb(var(--ink-3))' }} fontSize="11" fontFamily="system-ui">Verification loops</text>

        {/* Arrows to synthesis */}
        <path d="M80 150 L180 184" style={{ stroke: 'rgb(var(--gold))' }} strokeWidth="1.5" strokeDasharray="4 3" />
        <path d="M230 150 L230 184" style={{ stroke: 'rgb(var(--gold))' }} strokeWidth="1.5" strokeDasharray="4 3" />
        <path d="M380 150 L280 184" style={{ stroke: 'rgb(var(--gold))' }} strokeWidth="1.5" strokeDasharray="4 3" />

        {/* Synthesis */}
        <rect x="140" y="184" width="180" height="46" rx="23" style={{ fill: 'rgb(var(--ink))' }} />
        <text x="230" y="212" textAnchor="middle" style={{ fill: 'rgb(var(--gold))' }} fontSize="13" fontFamily="system-ui" fontWeight="500">Synthesis &amp; Delivery</text>

        <defs>
          <marker id="arrowGold" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0 0 L6 3 L0 6" fill="none" style={{ stroke: 'rgb(var(--gold))' }} strokeWidth="1" />
          </marker>
        </defs>
      </svg>
    </div>
  )
}

function BuildPipelineDiagram() {
  const steps = [
    { label: 'Requirements', sub: 'Constraints & goals' },
    { label: 'Architecture', sub: 'System design' },
    { label: 'Implementation', sub: 'Parallel streams' },
    { label: 'Testing', sub: 'Auto + manual' },
    { label: 'Deployment', sub: 'Staged rollout' },
  ]
  return (
    <div className="w-full overflow-x-auto -mx-4 px-4 pb-2">
      <svg viewBox="0 0 700 110" className="w-full min-w-[480px] max-w-3xl mx-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
        {steps.map((step, i) => {
          const x = i * 140
          const isLast = i === steps.length - 1
          return (
            <g key={step.label}>
              <rect x={x} y="14" width="126" height="60" rx="12"
                style={isLast ? { fill: 'rgb(var(--ink))', stroke: 'rgb(var(--ink))' } : { fill: 'rgb(var(--surface))', stroke: 'rgb(var(--hairline))' }}
                strokeWidth="1.5"
              />
              <text x={x + 63} y="40" textAnchor="middle"
                style={isLast ? { fill: 'rgb(var(--bg))' } : { fill: 'rgb(var(--ink))' }}
                fontSize="13" fontFamily="system-ui" fontWeight="600"
              >{step.label}</text>
              <text x={x + 63} y="58" textAnchor="middle"
                style={isLast ? { fill: 'rgb(var(--gold))' } : { fill: 'rgb(var(--ink-3))' }}
                fontSize="11" fontFamily="system-ui"
              >{step.sub}</text>
              {!isLast && (
                <path d={`M${x + 129} 44 L${x + 137} 44`} style={{ stroke: 'rgb(var(--gold))' }} strokeWidth="1.5" markerEnd="url(#arrowPipe)" />
              )}
            </g>
          )
        })}
        {/* Progress line underneath */}
        <rect x="0" y="90" width="700" height="4" rx="2" style={{ fill: 'rgb(var(--surface))' }} />
        <rect x="0" y="90" width="700" height="4" rx="2" fill="url(#progressGrad)" />
        <defs>
          <linearGradient id="progressGrad" x1="0" y1="0" x2="700" y2="0">
            <stop offset="0%" style={{ stopColor: 'rgb(var(--gold))' }} stopOpacity="0.1" />
            <stop offset="100%" style={{ stopColor: 'rgb(var(--gold))' }} stopOpacity="0.6" />
          </linearGradient>
          <marker id="arrowPipe" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0 0 L6 3 L0 6" fill="none" style={{ stroke: 'rgb(var(--gold))' }} strokeWidth="1" />
          </marker>
        </defs>
      </svg>
    </div>
  )
}

function ResearchDiagram() {
  const tiers = [
    { label: 'Tier 1', title: 'Landscape Scan', desc: 'What exists, what applies', color: 'rgb(var(--surface))' },
    { label: 'Tier 2', title: 'Deep Research', desc: 'Statute & contract analysis', color: 'rgb(var(--surface))' },
    { label: 'Tier 3', title: 'Compliance Map', desc: 'Requirements & gaps', color: 'rgb(var(--surface))' },
    { label: 'Tier 4', title: 'Research Brief', desc: 'Structured deliverable', color: 'rgb(var(--ink))' },
  ]
  return (
    <div className="w-full overflow-x-auto -mx-4 px-4 pb-2">
      <svg viewBox="0 0 780 165" className="w-full min-w-[580px] max-w-3xl mx-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
        {tiers.map((tier, i) => {
          const x = i * 196
          const cx = x + 90
          const isLast = i === tiers.length - 1
          return (
            <g key={tier.label}>
              {/* Tier badge */}
              <rect x={cx - 30} y="4" width="60" height="24" rx="12" style={isLast ? { fill: 'rgb(var(--ink))' } : { fill: 'rgb(var(--gold))' }} opacity={isLast ? 1 : 0.15} />
              <text x={cx} y="20" textAnchor="middle" style={isLast ? { fill: 'rgb(var(--gold))' } : { fill: 'rgb(var(--gold))' }} fontSize="11" fontFamily="system-ui" fontWeight="600">{tier.label}</text>

              {/* Main card */}
              <rect x={x} y="38" width="180" height="78" rx="14"
                style={isLast ? { fill: 'rgb(var(--ink))', stroke: 'rgb(var(--ink))' } : { fill: 'rgb(var(--surface))', stroke: 'rgb(var(--hairline))' }}
                strokeWidth="1.5"
              />
              <text x={cx} y="68" textAnchor="middle"
                style={isLast ? { fill: 'rgb(var(--bg))' } : { fill: 'rgb(var(--ink))' }}
                fontSize="15" fontFamily="system-ui" fontWeight="600"
              >{tier.title}</text>
              <text x={cx} y="90" textAnchor="middle"
                style={isLast ? { fill: 'rgb(var(--gold))' } : { fill: 'rgb(var(--ink-3))' }}
                fontSize="12" fontFamily="system-ui"
              >{tier.desc}</text>

              {/* Arrow */}
              {i < tiers.length - 1 && (
                <path d={`M${x + 184} 77 L${x + 192} 77`} style={{ stroke: 'rgb(var(--gold))' }} strokeWidth="1.5" markerEnd="url(#arrowGold2)" />
              )}
            </g>
          )
        })}
        {/* Bottom annotation */}
        <text x="390" y="148" textAnchor="middle" style={{ fill: 'rgb(var(--ink-3))' }} fontSize="12" fontFamily="system-ui">
          Each tier is documented, cited, and calibrated to complexity
        </text>

        <defs>
          <marker id="arrowGold2" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0 0 L6 3 L0 6" fill="none" style={{ stroke: 'rgb(var(--gold))' }} strokeWidth="1" />
          </marker>
        </defs>
      </svg>
    </div>
  )
}

function BarbellDiagram() {
  return (
    <div className="w-full overflow-x-auto -mx-4 px-4">
      <svg viewBox="0 0 460 170" className="w-full min-w-[320px] max-w-lg mx-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Conservative core: layered rings */}
        <circle cx="110" cy="68" r="56" fill="url(#navyRadial)" />
        <circle cx="110" cy="68" r="56" fill="none" style={{ stroke: 'rgb(var(--ink))' }} strokeWidth="1" opacity="0.15" />
        <circle cx="110" cy="68" r="42" style={{ fill: 'rgb(var(--ink))' }} opacity="0.08" />
        <circle cx="110" cy="68" r="42" fill="none" style={{ stroke: 'rgb(var(--ink))' }} strokeWidth="1.5" opacity="0.25" />
        <text x="110" y="62" textAnchor="middle" style={{ fill: 'rgb(var(--ink))' }} fontSize="13" fontFamily="system-ui" fontWeight="700" letterSpacing="0.3">Conservative</text>
        <text x="110" y="80" textAnchor="middle" style={{ fill: 'rgb(var(--ink))' }} fontSize="13" fontFamily="system-ui" fontWeight="700" letterSpacing="0.3">Core</text>
        <text x="110" y="140" textAnchor="middle" style={{ fill: 'rgb(var(--ink-3))' }} fontSize="11" fontFamily="system-ui">Predictable outcomes</text>

        {/* Connection: dashed line with label */}
        <line x1="168" y1="68" x2="292" y2="68" style={{ stroke: 'rgb(var(--ink-3))' }} strokeWidth="1.5" strokeDasharray="6 4" />
        <circle cx="230" cy="68" r="3" style={{ fill: 'rgb(var(--ink-3))' }} />
        <rect x="195" y="42" width="70" height="20" rx="10" style={{ fill: 'rgb(var(--surface))' }} />
        <text x="230" y="56" textAnchor="middle" style={{ fill: 'rgb(var(--ink-3))' }} fontSize="10" fontFamily="system-ui" fontWeight="500">Boundary</text>

        {/* Active position: layered rings */}
        <circle cx="350" cy="68" r="56" fill="url(#goldRadial)" />
        <circle cx="350" cy="68" r="56" fill="none" style={{ stroke: 'rgb(var(--gold))' }} strokeWidth="1" opacity="0.15" />
        <circle cx="350" cy="68" r="42" style={{ fill: 'rgb(var(--gold))' }} opacity="0.06" />
        <circle cx="350" cy="68" r="42" fill="none" style={{ stroke: 'rgb(var(--gold))' }} strokeWidth="1.5" opacity="0.25" />
        <text x="350" y="62" textAnchor="middle" style={{ fill: 'rgb(var(--gold))' }} fontSize="13" fontFamily="system-ui" fontWeight="700" letterSpacing="0.3">Active</text>
        <text x="350" y="80" textAnchor="middle" style={{ fill: 'rgb(var(--gold))' }} fontSize="13" fontFamily="system-ui" fontWeight="700" letterSpacing="0.3">Position</text>
        <text x="350" y="140" textAnchor="middle" style={{ fill: 'rgb(var(--ink-3))' }} fontSize="11" fontFamily="system-ui">Calculated variance</text>

        <text x="230" y="162" textAnchor="middle" style={{ fill: 'rgb(var(--ink))' }} fontSize="12" fontFamily="system-ui" fontWeight="500" opacity="0.5">The two never mix.</text>

        <defs>
          <radialGradient id="navyRadial" cx="50%" cy="50%" r="50%">
            <stop offset="0%" style={{ stopColor: 'rgb(var(--ink))' }} stopOpacity="0.12" />
            <stop offset="100%" style={{ stopColor: 'rgb(var(--ink))' }} stopOpacity="0.03" />
          </radialGradient>
          <radialGradient id="goldRadial" cx="50%" cy="50%" r="50%">
            <stop offset="0%" style={{ stopColor: 'rgb(var(--gold))' }} stopOpacity="0.10" />
            <stop offset="100%" style={{ stopColor: 'rgb(var(--gold))' }} stopOpacity="0.02" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  )
}

/* ─── Page ─── */

interface CapabilitySection {
  label: string
  title: string
  description: string
  diagram: React.ReactNode
}

const sections: CapabilitySection[] = [
  {
    label: 'AI Workflow Architecture',
    title: 'Orchestrator-Worker Pattern',
    description:
      'We build multi-agent systems where a lead orchestrator handles planning, task decomposition, and synthesis. Worker agents execute in parallel with isolated contexts, specific tool access, and built-in verification loops. On failure, the system degrades gracefully.',
    diagram: <OrchestratorDiagram />,
  },
  {
    label: 'Development Process',
    title: 'Systematized Build Pipeline',
    description:
      'Every engagement follows a structured process: from requirements to deployment. Parallel workstreams, automated testing, staged rollout. The pipeline produces consistent, high-quality output regardless of project complexity.',
    diagram: <BuildPipelineDiagram />,
  },
  {
    label: 'Research Methodology',
    title: 'Tiered Research Framework',
    description:
      'Not every question requires the same depth. Our research methodology scales from landscape scans to full compliance mapping, with each tier documented and cited. The final deliverable is always a structured briefing ready for legal counsel.',
    diagram: <ResearchDiagram />,
  },
  {
    label: 'Risk Thinking',
    title: 'The Barbell Principle',
    description:
      'Separate what must be preserved from what can absorb variance. A conservative core generates predictable outcomes. A defined-risk active position accepts calculated variance with hard boundaries. This principle applies to project architecture, resource allocation, and technology selection.',
    diagram: <BarbellDiagram />,
  },
]

export default function CapabilitiesContent() {
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
            <p className="text-sm font-medium text-gold uppercase tracking-widest mb-4">Capabilities</p>
            <h1 className="font-heading text-hero-sm md:text-hero text-text-primary mb-6 tracking-tight">
              How we think
            </h1>
            <p className="text-lg md:text-xl text-text-secondary max-w-2xl leading-relaxed">
              Frameworks, not formulas. Each engagement adapts these approaches to your specific terrain.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Where we work — positioning section.
          Sits between the hero and the capability deep-dives. The hero says
          how we think; this section says where we sit on the AI stack,
          because that distinction is doing real work for buyers in 2026 who
          have heard "we use Cursor" too many times. */}
      <section className="py-20 md:py-28 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: '-80px' }}
          >
            <p className="text-sm font-medium text-gold uppercase tracking-widest mb-4">Where we work</p>
            <h2 className="font-heading text-display-sm md:text-display text-text-primary mb-8 tracking-tight">
              Closer to the protocol than the plugin
            </h2>
            <div className="space-y-5 text-lg text-text-secondary leading-relaxed max-w-3xl">
              <p>
                Most studios working with AI in 2026 sit one layer above where the leverage actually is. They live in plugin UIs: Cursor in the IDE, Copilot in the editor, the chat window in a browser tab. Those tools are useful, and we use them too when they fit.
              </p>
              <p>
                The leverage is the layer underneath. Model Context Protocol servers expose tools directly to the model. Skills compose those tools into reusable craft. Agentic workflows orchestrate them across long running tasks. Working there means fewer abstractions between intent and execution, and no waiting for a vendor to package the integration we need.
              </p>
              <p>
                When a client asks for AI inside their build, that is the layer we work from.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Capability Sections */}
      {sections.map((section, index) => (
        <section
          key={section.title}
          className={`py-20 md:py-28 px-6 md:px-12 ${index % 2 === 0 ? 'bg-background-alt' : ''}`}
        >
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: '-80px' }}
            >
              {/* Wave 5 surface rhythm: a faint hairline that draws itself
                  as the capability section enters view. DURATION_SETTLE on
                  EASE_INK so the line finishes like a brush leaving paper. */}
              <div className="mb-5 w-16 h-[2px]" aria-hidden="true">
                <InkStroke
                  d="M 0 1 L 100 1"
                  viewBox="0 0 100 2"
                  strokeWidth={1}
                  color="var(--ink-sumi)"
                  className="w-full h-full opacity-40"
                />
              </div>
              <p className="text-sm font-medium text-gold uppercase tracking-widest mb-4">
                {section.label}
              </p>
              <h2 className="font-heading text-display-sm md:text-display text-text-primary mb-6 tracking-tight">
                {section.title}
              </h2>
              <p className="text-lg text-text-secondary leading-relaxed mb-10 max-w-3xl">
                {section.description}
              </p>

              {/* Diagram */}
              <div className="bg-surface-card rounded-card border border-text-primary/5 p-6 md:p-10 shadow-card overflow-x-auto">
                {section.diagram}
              </div>

              <IPNotice className="mt-4" />
            </motion.div>
          </div>
        </section>
      ))}

      {/* ──────────────────────────────────────────────
          What we build with these frameworks
          Each product shape below is in at least one
          published case study. This section translates
          methodology into concrete output.
      ────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 px-6 md:px-12 bg-background-alt">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-14"
          >
            <p className="text-sm font-medium text-gold uppercase tracking-widest mb-3">
              What we build with these frameworks
            </p>
            <h2 className="font-heading text-display-sm md:text-display text-text-primary tracking-tight max-w-2xl">
              Product shapes, each one in a published case study
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: 'Constraint based engines',
                description:
                  'Engines that search over a structured state space with explainable failure when no valid solution exists.',
                href: '/work/timetable-engine',
                hrefLabel: 'Timetable engine',
              },
              {
                title: 'Multi tenant platforms',
                description:
                  'Tenant scoped isolation enforced at the database layer. Two independent builds under this pattern.',
                href: '/work/timetable-engine',
                hrefLabel: 'Timetable engine',
              },
              {
                title: 'Offline first field capture',
                description:
                  'Mobile apps that work without a signal, with deferred sync and conflict handling designed in from the first wireframe.',
                href: '/work/bfsi-mis',
                hrefLabel: 'BFSI MIS',
              },
              {
                title: 'Idempotent pipelines',
                description:
                  'Batch reconciliation that runs in under a minute and is safe to re execute without drift. A spreadsheet problem converted into a system.',
                href: '/work/archive-automation',
                hrefLabel: 'Archive automation',
              },
              {
                title: 'Compliance first data captures',
                description:
                  'Client side field level encryption before the database, row level security for tenant isolation, DPDP and RBI controls mapped in week one.',
                href: '/work/bfsi-mis',
                hrefLabel: 'BFSI MIS',
              },
            ].map((shape, index) => (
              <motion.a
                key={shape.title}
                href={shape.href}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.06, duration: 0.5 }}
                viewport={{ once: true }}
                className="block group"
              >
                <div className="p-6 md:p-7 rounded-card border border-text-primary/10 hover:border-gold/40 transition-colors h-full bg-surface-card">
                  <h3 className="font-heading text-xl text-text-primary tracking-tight mb-3">
                    {shape.title}
                  </h3>
                  <p className="text-text-secondary leading-relaxed mb-4">
                    {shape.description}
                  </p>
                  <span className="text-xs font-medium text-gold uppercase tracking-widest inline-flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                    Proof: {shape.hrefLabel}
                    <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Brush stroke */}
      <div className="py-8">
        <BrushStrokeDivider variant={0} />
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
              Apply these frameworks to your challenge.
            </h2>
            <p className="text-text-on-dark/60 mb-10 text-lg">
              We'd love to hear what you're building.
            </p>
            <AikaTrigger variant="primary" size="lg">
              Start a conversation
              <ArrowRight className="ml-2 h-4 w-4" />
            </AikaTrigger>
          </motion.div>
        </div>
      </section>
    </>
  )
}
