'use client'

import { motion } from 'framer-motion'
import {
  ArrowRight,
  Cpu,
  Layers,
  Zap,
  Shield,
  GitBranch,
  CheckCircle2,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { BrushStrokeDivider } from '@/components/ui/BrushStrokeDivider'
import { BrandLockup } from '@/components/ui/BrandLockup'
import { ScrollCue } from '@/components/ui/ScrollCue'
import { Testimonials } from '@/components/ui/Testimonials'
import { TechStack } from '@/components/ui/TechStack'
import { SITE } from '@/lib/constants'
import { BreathingGroup } from '@/design/primitives/BreathingGroup'
import { InkStroke } from '@/design/primitives/InkStroke'
import { Reveal } from '@/design/primitives/Reveal'
import {
  DURATION_LINGER,
  EASE_SUMI_ARRAY,
  STAGGER_LONG,
  msToSec,
} from '@/design/tokens/motion'

/* ─── Data ─── */

// The three cards below mirror the three engagement shapes we have
// published case studies for. Consulting is a real service line, kept
// on /services, but the home surfaces only the shapes we can prove with
// an artefact the reader can click into.
const services = [
  {
    icon: Layers,
    title: 'Product & Platform Engineering',
    description: 'End to end product builds, shipped as one coherent system from engine core to front end. Evidenced by our in house timetable management engine.',
    href: '/services#product-platform-engineering',
  },
  {
    icon: Cpu,
    title: 'AI Powered Workflow Automation',
    description: 'Idempotent pipelines that replace manual triage. Orchestrators that decompose problems into verifiable stages, each with its own retry logic. Evidenced by a reconciliation that merged 116 fuzzy duplicates and now runs in under a minute.',
    href: '/services#ai-workflows',
  },
  {
    icon: Shield,
    title: 'Regulated Systems & Research',
    description: 'DPDP and RBI aligned builds. Encryption and tenant isolation designed in, controls mapped to frameworks from week one. Research and platform work, integrated.',
    href: '/services#regulatory-research',
  },
]


const processSteps = [
  {
    number: '01',
    title: 'Understand',
    description: 'We listen. Deep-dive into your constraints, goals, and existing systems before writing a line of code.',
  },
  {
    number: '02',
    title: 'Architect',
    description: 'System design, technology selection, and an implementation roadmap. No surprises down the line.',
  },
  {
    number: '03',
    title: 'Build',
    description: 'Parallel workstreams, continuous integration, weekly demos. You see progress every week.',
  },
  {
    number: '04',
    title: 'Ship',
    description: 'Production deployment, monitoring, documentation, and handoff. The system runs without us.',
  },
]

// Static, verifiable numbers. No animation; the earlier in-view counter
// was flashing "0+" on first paint, which reads as broken JS. Every number
// here is traceable: quantitative-analysis tenure, disciplines on file,
// published response SLA, and the case-study metric for the archive
// automation pipeline (see /work/archive-automation).
const stats = [
  { value: '7+', label: 'Years in quantitative analysis' },
  { value: '4', label: 'Disciplines integrated' },
  { value: '48h', label: 'Response SLA, business days' },
  { value: '~14 hrs', label: 'Manual work replaced, most recent build' },
]

const capabilities = [
  {
    icon: Layers,
    title: 'Multi-Agent Orchestration',
    description: 'We build AI systems where orchestrators decompose problems and workers execute in parallel.',
  },
  {
    icon: GitBranch,
    title: 'Systematized Pipelines',
    description: 'Every build follows a structured pipeline: from requirements to deployment, nothing is ad hoc.',
  },
  {
    icon: Shield,
    title: 'Regulatory Research',
    description: 'Tiered research methodology that scales from landscape scans to full compliance mapping.',
  },
  {
    icon: Zap,
    title: 'Accelerated Timelines',
    description: 'Our systematized approach means faster delivery without cutting corners on quality.',
  },
]

/* ─── Inline SVG Components ─── */

function HeroPattern() {
  return (
    <svg
      className="absolute inset-0 w-full h-full opacity-[0.03] pointer-events-none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
          <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>
  )
}

function OrchestratorDiagram() {
  return (
    <div className="w-full overflow-x-auto -mx-4 px-4">
      <svg viewBox="0 0 420 190" className="w-full min-w-[320px] max-w-lg mx-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Orchestrator node */}
        <rect x="140" y="8" width="140" height="46" rx="23" fill="#142850" />
        <text x="210" y="37" textAnchor="middle" fill="#F8F7F4" fontSize="14" fontFamily="system-ui" fontWeight="500">Orchestrator</text>

        {/* Connection lines */}
        <line x1="175" y1="54" x2="70" y2="96" stroke="#a08535" strokeWidth="1.5" strokeDasharray="4 3" />
        <line x1="210" y1="54" x2="210" y2="96" stroke="#a08535" strokeWidth="1.5" strokeDasharray="4 3" />
        <line x1="245" y1="54" x2="350" y2="96" stroke="#a08535" strokeWidth="1.5" strokeDasharray="4 3" />

        {/* Worker nodes */}
        <rect x="10" y="96" width="120" height="42" rx="21" fill="#F0EEEA" stroke="#a08535" strokeWidth="1.5" />
        <text x="70" y="122" textAnchor="middle" fill="#1A1A1A" fontSize="13" fontFamily="system-ui">Worker A</text>

        <rect x="150" y="96" width="120" height="42" rx="21" fill="#F0EEEA" stroke="#a08535" strokeWidth="1.5" />
        <text x="210" y="122" textAnchor="middle" fill="#1A1A1A" fontSize="13" fontFamily="system-ui">Worker B</text>

        <rect x="290" y="96" width="120" height="42" rx="21" fill="#F0EEEA" stroke="#a08535" strokeWidth="1.5" />
        <text x="350" y="122" textAnchor="middle" fill="#1A1A1A" fontSize="13" fontFamily="system-ui">Worker C</text>

        {/* Synthesis lines */}
        <line x1="70" y1="138" x2="170" y2="160" stroke="#a08535" strokeWidth="1.5" strokeDasharray="4 3" />
        <line x1="210" y1="138" x2="210" y2="160" stroke="#a08535" strokeWidth="1.5" strokeDasharray="4 3" />
        <line x1="350" y1="138" x2="250" y2="160" stroke="#a08535" strokeWidth="1.5" strokeDasharray="4 3" />

        {/* Synthesis node */}
        <rect x="150" y="156" width="120" height="32" rx="16" fill="#142850" />
        <text x="210" y="177" textAnchor="middle" fill="#D4AF61" fontSize="13" fontFamily="system-ui" fontWeight="500">Synthesis</text>
      </svg>
    </div>
  )
}

function PipelineDiagram() {
  const steps = ['Requirements', 'Architecture', 'Build', 'Test', 'Deploy']
  return (
    <div className="w-full overflow-x-auto -mx-4 px-4">
      <svg viewBox="0 0 520 80" className="w-full min-w-[340px] max-w-xl mx-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
        {steps.map((step, i) => (
          <g key={step}>
            <rect x={i * 104} y="20" width="92" height="42" rx="21" fill={i === 4 ? '#142850' : '#F0EEEA'} stroke="#a08535" strokeWidth="1.5" />
            <text x={i * 104 + 46} y="46" textAnchor="middle" fill={i === 4 ? '#F8F7F4' : '#1A1A1A'} fontSize="12" fontFamily="system-ui" fontWeight="500">{step}</text>
            {i < steps.length - 1 && (
              <line x1={i * 104 + 94} y1="41" x2={i * 104 + 102} y2="41" stroke="#a08535" strokeWidth="1.5" />
            )}
          </g>
        ))}
      </svg>
    </div>
  )
}

/* ─── Page Component ─── */

export default function HomeContent() {
  return (
    <>
      {/* ──────────────────────────────────────────────
          SECTION 1: Hero
      ────────────────────────────────────────────── */}
      <section className="relative min-h-[92vh] w-full flex flex-col items-center justify-center px-6 md:px-12 overflow-hidden pb-40 md:pb-48">
        <HeroPattern />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: msToSec(DURATION_LINGER), ease: EASE_SUMI_ARRAY as unknown as number[] }}
          >
            {/* Design mark + word mark */}
            <div className="mb-10">
              <BrandLockup variant="hero" size="xl" />
            </div>

            {/* Headline — wrapped in BreathingGroup so the hero respires on a
                DURATION_BREATH cycle. Replaces the previous decorative y bob
                flagged by Wave 0. The div wrapper is unadorned and does not
                displace the h1's semantic position. */}
            <BreathingGroup intensity="faint">
              <h1 className="font-heading text-hero-sm md:text-hero text-text-primary mb-6 text-balance leading-tight">
                We build software that ships.
                <br />
                <span className="text-gold">Complexity, handled.</span>
              </h1>
            </BreathingGroup>

            {/* Hero underline — a single brush stroke drawn once beneath the
                heading, left aligned under it at roughly one third of the
                heading width. Decoration only; aria-hidden via InkStroke's
                default. Under reduced motion it is drawn in full on first
                frame. */}
            <div className="mb-6 flex">
              <InkStroke
                d="M 2 5 C 20 3, 45 7, 98 4"
                color="var(--ink-sumi)"
                strokeWidth={2}
                className="h-2 w-[min(22rem,33%)] mx-auto md:mx-0"
              />
            </div>

            {/* Subtext */}
            <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed">
              A software development studio that moves fast on hard problems, from backend architecture to regulatory compliance.
            </p>

            {/* CTA */}
            <div className="flex items-center justify-center">
              <Button href="/contact" variant="primary" size="lg">
                Start a conversation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Scroll cue — Wave 6 supersedes the earlier "Scroll to explore"
            label and arrow with a single faint vertical stroke that grows,
            holds, and fades over a one-shot ~2 s arc. Session-flagged so
            the gesture fires once per tab; the lingerer sees it draw, the
            hurried visitor scrolls past it before it lands. Decoration
            only, aria-hidden, pointer-events disabled. */}
        <ScrollCue />
      </section>

      {/* ──────────────────────────────────────────────
          SECTION 2: Tech Stack
      ────────────────────────────────────────────── */}
      <TechStack />

      {/* ──────────────────────────────────────────────
          SECTION 3: Services
      ────────────────────────────────────────────── */}
      <section className="py-24 md:py-32 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <Reveal className="mb-14">
            <p className="text-sm font-medium text-gold uppercase tracking-widest mb-3">What we do</p>
            <h2 className="font-heading text-display-sm md:text-display text-text-primary tracking-tight max-w-2xl">
              Three engagement shapes, three published case studies
            </h2>
          </Reveal>

          {/* Cards cascade with STAGGER_LONG between them. Each card fades up
              8 px over DURATION_LINGER with EASE_SUMI, via the Reveal
              primitive. Previous inline 0.5 s fade-up with delay multipliers
              is replaced with tokens. */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <Reveal key={service.title} delay={index * STAGGER_LONG}>
                <a href={service.href} className="block h-full">
                  <Card hoverable className="h-full group cursor-pointer">
                    <div className="h-10 w-10 rounded-lg bg-gold/10 flex items-center justify-center mb-5">
                      <service.icon className="h-5 w-5 text-gold" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-xl font-semibold text-text-primary mb-3">
                      {service.title}
                    </h3>
                    <p className="text-text-secondary leading-relaxed mb-5">
                      {service.description}
                    </p>
                    <span className="text-sm font-medium text-gold group-hover:underline inline-flex items-center gap-1">
                      Learn more <ArrowRight className="h-3 w-3" />
                    </span>
                  </Card>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────
          SECTION 4: Process - "How We Work"
      ────────────────────────────────────────────── */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-surface-dark">
        <div className="max-w-6xl mx-auto">
          {/* Wave 7 reduced motion pass: replaced raw motion.div with Reveal so
              the section heading honours the house still composition (opacity
              one, no translate from frame one) under prefers reduced motion. */}
          <Reveal className="mb-16">
            <p className="text-sm font-medium text-gold uppercase tracking-widest mb-3">Process</p>
            <h2 className="font-heading text-display-sm md:text-display text-text-on-dark tracking-tight max-w-lg">
              How every engagement works
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6">
            {processSteps.map((step, index) => (
              <Reveal
                key={step.number}
                delay={index * STAGGER_LONG}
                className="relative"
              >
                {/* Connector line (desktop only) */}
                {index < processSteps.length - 1 && (
                  <div className="hidden md:block absolute -top-4 left-[calc(100%_-_8px)] w-[calc(100%_-_40px)] h-px bg-gold/20" />
                )}
                <div className="text-4xl font-heading text-gold/30 mb-4">{step.number}</div>
                <h3 className="text-lg font-semibold text-text-on-dark mb-2">{step.title}</h3>
                <p className="text-sm text-text-on-dark/60 leading-relaxed">{step.description}</p>
              </Reveal>
            ))}
          </div>

          {/* Pipeline diagram — Reveal with a longer delay so the structural
              illustration arrives after the four step cards have settled. */}
          <Reveal
            delay={STAGGER_LONG * 4}
            className="mt-16 pt-12 border-t border-text-on-dark/10"
          >
            <PipelineDiagram />
          </Reveal>
        </div>
      </section>

      {/* ──────────────────────────────────────────────
          SECTION 5: Capabilities Visual Grid
      ────────────────────────────────────────────── */}
      <section className="py-24 md:py-32 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <Reveal className="mb-14">
            <p className="text-sm font-medium text-gold uppercase tracking-widest mb-3">Capabilities</p>
            <h2 className="font-heading text-display-sm md:text-display text-text-primary tracking-tight max-w-lg">
              What sets us apart
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
            {capabilities.map((cap, index) => (
              <Reveal key={cap.title} delay={index * STAGGER_LONG}>
                <div className="p-6 md:p-8 rounded-card border border-text-primary/5 hover:border-gold/20 transition-colors h-full">
                  <cap.icon className="h-6 w-6 text-gold mb-4" strokeWidth={1.5} />
                  <h3 className="text-lg font-semibold text-text-primary mb-2">{cap.title}</h3>
                  <p className="text-text-secondary leading-relaxed">{cap.description}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Orchestrator diagram */}
          <Reveal className="bg-background-alt rounded-card p-8 md:p-12">
            <p className="text-sm font-medium text-gold uppercase tracking-widest mb-6 text-center">Multi-Agent Architecture</p>
            <OrchestratorDiagram />
            <p className="text-xs text-text-tertiary text-center mt-6">
              Proprietary framework. © 2026 Kinyoubi Atelier & Co.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ──────────────────────────────────────────────
          SECTION 6: Stats / Numbers
      ────────────────────────────────────────────── */}
      <section className="py-20 md:py-24 px-6 md:px-12 bg-background-alt border-y border-text-primary/5">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl md:text-5xl font-heading text-text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-text-secondary">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────
          SECTION 7: Credibility / Founder Signal
      ────────────────────────────────────────────── */}
      <section className="py-24 md:py-32 px-6 md:px-12">
        <div className="max-w-3xl mx-auto text-center">
          <Reveal className="flex flex-col items-center">
            {/* Founder photo */}
            <div className="relative mb-8">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/founder-ankit.jpg"
                alt={SITE.founder}
                className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover object-center grayscale shadow-soft"
              />
              <div className="absolute -inset-0.5 rounded-full border border-gold/20 pointer-events-none" />
            </div>

            <p className="font-heading italic text-2xl md:text-3xl lg:text-4xl text-text-primary leading-relaxed tracking-tight">
              I used to think complexity was the problem. It isn&rsquo;t. Complexity is the signal that someone, earlier, stopped paying attention.
            </p>
            <p className="text-text-secondary mt-6">
              {SITE.founder}, Founder
            </p>
          </Reveal>
          <BrushStrokeDivider variant={1} className="mt-14" />
        </div>
      </section>

      {/* ──────────────────────────────────────────────
          SECTION 8: What You Get (Checklist)
      ────────────────────────────────────────────── */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-background-alt">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            {/* Wave 7: replaced the horizontal x slide with the house Reveal so
                the heading column lands at its natural position from the first
                frame in reduced motion. The previous x slide was decorative
                only; the composition reads the same without it. */}
            <Reveal>
              <p className="text-sm font-medium text-gold uppercase tracking-widest mb-3">Every engagement</p>
              <h2 className="font-heading text-display-sm md:text-display text-text-primary tracking-tight mb-4">
                What you get
              </h2>
              <p className="text-text-secondary text-lg leading-relaxed">
                We don't just write code and disappear. Every engagement includes the structure, documentation, and thinking that makes your investment last.
              </p>
            </Reveal>

            <Reveal delay={STAGGER_LONG} className="space-y-4">
              {[
                'Production-ready, tested code',
                'Architecture documentation',
                'Deployment & CI/CD setup',
                'Knowledge transfer & handoff',
                'Post-launch support window',
                'Weekly progress demos',
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-gold mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                  <span className="text-text-primary">{item}</span>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────
          SECTION 9: Portfolio / Built with Care
      ────────────────────────────────────────────── */}
      <section id="built-with-care" className="scroll-mt-24 py-24 md:py-32 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <Reveal className="mb-14">
            <p className="text-sm font-medium text-gold uppercase tracking-widest mb-3">Built with care</p>
            <h2 className="font-heading text-display-sm md:text-display text-text-primary tracking-tight">
              The proof is in the work
            </h2>
            <p className="text-text-secondary mt-4 max-w-xl">
              A small, growing portfolio: from live client sites to the one you're reading now.
            </p>
          </Reveal>

          <Reveal className="mb-14">
            <p className="text-text-secondary leading-relaxed">
              Published case studies below were delivered for India-based clients; the methods, compliance posture, and SLA translate directly to North American and European engagements. DPDP-grade data handling and GDPR-aligned contracts are prepared for cross-border delivery from day one.
            </p>
          </Reveal>

          {/*
            ── Featured project: Roobaroo ──
            Temporary minimal card. Previous copy on this block described
            Roobaroo as a "multi-tenant school management system" with
            fabricated portal roles, institutions and AWS Amplify tags.
            That was wrong. Roobaroo is a restaurant website. Until the
            real case study copy is written with the founder, we render a
            restrained stub that only states verifiable facts: it's a
            live client project and here is the link.
          */}
          <Reveal className="mb-6">
            <a
              href="https://roobaroo.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <div className="rounded-card border border-text-primary/5 hover:border-gold/25 bg-background-alt transition-colors duration-300 p-6 md:p-10">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-lg bg-navy flex items-center justify-center flex-shrink-0">
                    <span className="text-gold-bright font-heading text-sm font-semibold">R</span>
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-center sm:justify-between sm:gap-4 gap-3">
                    <div className="min-w-0">
                      <p className="text-xs text-text-tertiary uppercase tracking-widest mb-1">Client project</p>
                      <h3 className="text-xl font-semibold text-text-primary">Roobaroo</h3>
                    </div>
                    <span className="text-sm font-medium text-gold group-hover:underline inline-flex items-center gap-1.5 flex-shrink-0 self-start sm:self-auto">
                      View live site
                      <svg className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </a>
          </Reveal>

          {/*
            ── Featured project: Archive automation ──
            Python pipeline for an LPG distributorship: reconciled ~4,000
            scanned KYC records against an Excel master, normalised 116
            fuzzy-duplicate locality names, and published the result to
            Google Drive with clickable hyperlinks back into the sheet.
            Client name omitted under DPDPA 2023 confidentiality; all
            metrics and stack details come from Ankit's own write-up.
          */}
          <Reveal delay={STAGGER_LONG / 2} className="mb-10">
            <a href="/work/archive-automation" className="group block">
              <div className="rounded-card border border-text-primary/5 hover:border-gold/25 bg-background-alt transition-colors duration-300 p-6 md:p-10">
                <div className="flex items-start gap-4 mb-6">
                  <div className="h-10 w-10 rounded-lg bg-navy flex items-center justify-center flex-shrink-0">
                    <span className="text-gold-bright font-heading text-sm font-semibold">A</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between md:gap-6 mb-3">
                      <div className="min-w-0 flex-1">
                        <p className="text-xs text-text-tertiary uppercase tracking-widest mb-1.5">Client project · Operations automation</p>
                        <h3 className="font-heading text-2xl md:text-3xl text-text-primary tracking-tight font-semibold leading-snug">
                          Rebuilding a 4,000 record consumer archive
                        </h3>
                      </div>
                      <span className="text-sm font-medium text-gold group-hover:underline inline-flex items-center gap-1.5 flex-shrink-0 self-start mt-4 md:mt-1">
                        Read case study
                        <svg className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </span>
                    </div>
                    <p className="text-sm md:text-base text-text-secondary leading-relaxed">
                      A Python pipeline for an LPG distributorship: reconcile a decade of scanned KYC records against a fragmented spreadsheet, normalise fuzzy duplicate locality names, and hand back an archive staff could actually navigate.
                    </p>
                  </div>
                </div>

                {/* Metric strip: all numbers from Ankit's verified write-up */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-text-primary/5">
                  {[
                    { num: '3,905', label: 'Records reconciled' },
                    { num: '796', label: 'Folders generated' },
                    { num: '116', label: 'Fuzzy duplicates merged' },
                    { num: '~14 hrs', label: 'Manual work replaced' },
                  ].map((m) => (
                    <div key={m.label}>
                      <div className="font-heading text-2xl text-gold mb-1 tracking-tight">{m.num}</div>
                      <div className="text-[11px] text-text-tertiary uppercase tracking-widest leading-tight">{m.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </a>
          </Reveal>

          {/*
            BFSI MIS case study: regulated financial institution engagement.
            All specific client identifiers are redacted under confidentiality
            obligations. Content is load-bearing on Ankit's signed founder
            attestation on the case study page itself.
          */}
          <Reveal delay={STAGGER_LONG} className="mb-10">
            <a href="/work/bfsi-mis" className="group block">
              <div className="rounded-card border border-text-primary/5 hover:border-gold/25 bg-background-alt transition-colors duration-300 p-6 md:p-10">
                <div className="flex items-start gap-4 mb-6">
                  <div className="h-10 w-10 rounded-lg bg-navy flex items-center justify-center flex-shrink-0">
                    <span className="text-gold-bright font-heading text-sm font-semibold">M</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between md:gap-6 mb-3">
                      <div className="min-w-0 flex-1">
                        <p className="text-xs text-text-tertiary uppercase tracking-widest mb-1.5">Client project · BFSI · Regulated SaaS</p>
                        <h3 className="font-heading text-2xl md:text-3xl text-text-primary tracking-tight font-semibold leading-snug">
                          Compliance first MIS platform for a regulated financial institution
                        </h3>
                      </div>
                      <span className="text-sm font-medium text-gold group-hover:underline inline-flex items-center gap-1.5 flex-shrink-0 self-start mt-4 md:mt-1">
                        Read case study
                        <svg className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </span>
                    </div>
                    <p className="text-sm md:text-base text-text-secondary leading-relaxed">
                      A multi-site Management Information System engineered from day one for RBI alignment and DPDP Act readiness: secure data foundation, offline first capture, and an AI assisted insight layer, all hosted in region.
                    </p>
                  </div>
                </div>

                {/* Category chips in place of metrics: foundation phase, no KPIs published and no stack enumeration on this surface by design */}
                <div className="flex flex-wrap gap-2 pt-6 border-t border-text-primary/5">
                  {[
                    'Regulated sector',
                    'Offline first capture',
                    'India data residency',
                    'Compliance first',
                    'Tenant scoped isolation',
                  ].map((chip) => (
                    <span
                      key={chip}
                      className="text-[11px] uppercase tracking-widest text-text-secondary bg-background border border-text-primary/10 rounded-full px-3 py-1.5"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          </Reveal>

          {/*
            Timetable engine case study: in house R&D product.
            End to end build across solver, platform, and surface.
            All metrics measured directly from the repository and the
            stress benchmark harness that ships with it.
          */}
          <Reveal delay={STAGGER_LONG * 1.5} className="mb-10">
            <a href="/work/timetable-engine" className="group block">
              <div className="rounded-card border border-text-primary/5 hover:border-gold/25 bg-background-alt transition-colors duration-300 p-6 md:p-10">
                <div className="flex items-start gap-4 mb-6">
                  <div className="h-10 w-10 rounded-lg bg-navy flex items-center justify-center flex-shrink-0">
                    <span className="text-gold-bright font-heading text-sm font-semibold">T</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between md:gap-6 mb-3">
                      <div className="min-w-0 flex-1">
                        <p className="text-xs text-text-tertiary uppercase tracking-widest mb-1.5">In house R&amp;D · End to end product build</p>
                        <h3 className="font-heading text-2xl md:text-3xl text-text-primary tracking-tight font-semibold leading-snug">
                          Building a timetable management engine from the solver up
                        </h3>
                      </div>
                      <span className="text-sm font-medium text-gold group-hover:underline inline-flex items-center gap-1.5 flex-shrink-0 self-start mt-4 md:mt-1">
                        Read case study
                        <svg className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </span>
                    </div>
                    <p className="text-sm md:text-base text-text-secondary leading-relaxed">
                      An in house R&amp;D build: a constraint engine, a multi tenant data platform, an API, and a role aware surface. Engine, platform, API, exporters, front end, and mobile packaging, all shipped end to end under one roof.
                    </p>
                  </div>
                </div>

                {/* Metric strip: all numbers measured from the codebase and stress harness */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-text-primary/5">
                  {[
                    { num: '~30.8k', label: 'Lines of code' },
                    { num: '68+', label: 'REST endpoints shipped' },
                    { num: '3.6s', label: 'Solve time at 5k variables' },
                    { num: '94%', label: 'Allotment across scales' },
                  ].map((m) => (
                    <div key={m.label}>
                      <div className="font-heading text-2xl text-gold mb-1 tracking-tight">{m.num}</div>
                      <div className="text-[11px] text-text-tertiary uppercase tracking-widest leading-tight">{m.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </a>
          </Reveal>

          {/* ── This site's measured Core Web Vitals ──
              We only publish numbers we've measured. The PageSpeed Insights
              run screenshot lives at /public/perf/psi-mobile.png; see
              /public/perf/README.md for the exact capture procedure and
              drop-in slot. Until the file exists, this card surfaces a
              link to /security#performance where the screenshot is hosted
              alongside the measurement date. */}
          <Reveal>
            <Card bordered className="p-8 md:p-10">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div>
                  <p className="text-xs font-medium text-gold uppercase tracking-widest mb-2">This site: measured</p>
                  <h3 className="font-heading text-2xl md:text-3xl text-text-primary tracking-tight mb-2">
                    Core Web Vitals, published with the screenshot
                  </h3>
                  <p className="text-text-secondary max-w-xl leading-relaxed">
                    We don&apos;t print targets on our own homepage. The latest PageSpeed Insights run &mdash; date, URL, and the unedited screenshot &mdash; is hosted on our security page alongside the measurement methodology.
                  </p>
                </div>
                <a
                  href="/security#performance"
                  className="inline-flex items-center gap-2 text-sm font-medium text-gold hover:text-gold-bright transition-colors flex-shrink-0"
                >
                  View the measurement
                  <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
                </a>
              </div>
            </Card>
          </Reveal>
        </div>
      </section>

      {/* ──────────────────────────────────────────────
          SECTION 10: Testimonials (hidden until populated)
      ────────────────────────────────────────────── */}
      <Testimonials />

      {/* ──────────────────────────────────────────────
          SECTION 11: Final CTA
      ────────────────────────────────────────────── */}
      <section className="py-28 md:py-36 px-6 md:px-12 bg-surface-dark relative overflow-hidden">
        {/* Decorative gradient orb */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gold/5 blur-3xl pointer-events-none" />

        <div className="max-w-2xl mx-auto text-center relative z-10">
          <Reveal>
            <h2 className="font-heading text-display-sm md:text-display text-text-on-dark mb-4 tracking-tight">
              Ready to build something?
            </h2>
            <p className="text-text-on-dark/60 mb-10 text-lg max-w-md mx-auto">
              Tell us about your project. We'll respond within 48 hours with how we'd approach it.
            </p>
            <Button href="/contact" variant="primary" size="lg">
              Start a conversation
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Reveal>
        </div>
      </section>
    </>
  )
}
