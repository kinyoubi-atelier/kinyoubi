'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Cpu, Layers, Shield } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { BrushStrokeDivider } from '@/components/ui/BrushStrokeDivider'
import { AnimatedCounter } from '@/components/ui/AnimatedCounter'
import { BrandLockup } from '@/components/ui/BrandLockup'
import { ScrollCue } from '@/components/ui/ScrollCue'
import { Testimonials } from '@/components/ui/Testimonials'
import { TechStack } from '@/components/ui/TechStack'
import { SITE } from '@/lib/constants'
import { notes } from '@/lib/notes'
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
    title: 'Enterprise & Institutional Systems',
    description: 'Custom ERPs, accounting modules, and data platforms for private institutions and government. Built with the encryption, isolation, and compliance posture each sector needs: DPDP, RBI, or the bare disciplines any production-grade system should have anyway.',
    href: '/services#enterprise-systems',
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

/*
  Project glyphs. Each is a 44x44 stroke-only inline SVG with a single gold
  accent. Inherits colour from the parent text colour via currentColor, so
  wrapping each glyph in text-gold flips the stroke with prefers-color-scheme.
*/

function ProjectGlyph({ kind }: { kind: 'plate' | 'records' | 'pillars' | 'grid' | 'scroll' }) {
  const common = 'h-10 w-10 md:h-11 md:w-11 flex-shrink-0 text-gold'
  if (kind === 'scroll') {
    return (
      <svg viewBox="0 0 44 44" className={common} fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        {/* Document body. */}
        <rect x="11" y="9" width="22" height="28" rx="1.5" />
        {/* Section rule (a thin gold line near the top of the doc). */}
        <line x1="14" y1="14" x2="26" y2="14" />
        {/* Body text lines. */}
        <line x1="14" y1="20" x2="30" y2="20" />
        <line x1="14" y1="25" x2="30" y2="25" />
        <line x1="14" y1="30" x2="24" y2="30" />
        {/* Seal in the bottom-right corner. */}
        <circle cx="30" cy="32" r="2.5" fill="currentColor" stroke="none" opacity="0.85" />
      </svg>
    )
  }
  if (kind === 'plate') {
    return (
      <svg viewBox="0 0 44 44" className={common} fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <circle cx="22" cy="25" r="13" />
        <circle cx="22" cy="25" r="7.5" />
        <circle cx="16.5" cy="9" r="1.25" fill="currentColor" stroke="none" />
        <circle cx="27.5" cy="9" r="1.25" fill="currentColor" stroke="none" />
      </svg>
    )
  }
  if (kind === 'records') {
    return (
      <svg viewBox="0 0 44 44" className={common} fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <line x1="8" y1="13" x2="26" y2="13" strokeDasharray="2 2.5" />
        <line x1="8" y1="22" x2="28" y2="22" />
        <line x1="8" y1="31" x2="30" y2="31" />
        <line x1="30" y1="22" x2="37" y2="22" />
        <polyline points="33,19 37,22 33,25" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }
  if (kind === 'pillars') {
    return (
      <svg viewBox="0 0 44 44" className={common} fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <line x1="12" y1="11" x2="12" y2="28" />
        <line x1="22" y1="11" x2="22" y2="28" />
        <line x1="32" y1="11" x2="32" y2="28" />
        <line x1="8" y1="28" x2="36" y2="28" />
        <line x1="8" y1="34" x2="36" y2="34" strokeDasharray="2 2.5" />
      </svg>
    )
  }
  // grid
  return (
    <svg viewBox="0 0 44 44" className={common} fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <rect x="8" y="10" width="28" height="24" rx="1.5" />
      <line x1="17" y1="10" x2="17" y2="34" />
      <line x1="27" y1="10" x2="27" y2="34" />
      <line x1="8" y1="18" x2="36" y2="18" />
      <line x1="8" y1="26" x2="36" y2="26" />
      <rect x="17" y="18" width="10" height="8" fill="currentColor" opacity="0.2" stroke="none" />
      <rect x="27" y="10" width="9" height="8" fill="currentColor" opacity="0.2" stroke="none" />
    </svg>
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
              Three engagement shapes we are free to publish
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
          SECTION 4: Stats / Numbers
      ────────────────────────────────────────────── */}
      <section className="py-20 md:py-24 px-6 md:px-12 bg-background-alt border-y border-text-primary/5">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat) => (
              <AnimatedCounter
                key={stat.label}
                value={stat.value}
                label={stat.label}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────
          SECTION 5: Credibility / Founder Signal
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
          SECTION 6: Portfolio / Built with Care
      ────────────────────────────────────────────── */}
      <section id="built-with-care" className="scroll-mt-24 py-24 md:py-32 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <Reveal className="mb-14">
            <p className="text-sm font-medium text-gold uppercase tracking-widest mb-3">Built with care</p>
            <h2 className="font-heading text-display-sm md:text-display text-text-primary tracking-tight">
              The proof is in the work
            </h2>
            {/* Section underline. One ink stroke per section, drawn once
                on viewport entry. Different surface from the hero stroke
                at the top of the page: this one signs off the portfolio
                header. */}
            <div className="mt-5 mb-4 flex" aria-hidden="true">
              <InkStroke
                d="M 0 1 L 100 1"
                viewBox="0 0 100 2"
                strokeWidth={1}
                color="var(--ink-sumi)"
                className="h-[2px] w-[min(18rem,40%)] opacity-60"
              />
            </div>
            <p className="text-text-secondary mt-4 max-w-xl">
              A small, growing portfolio: from live client sites to the one you're reading now.
            </p>
          </Reveal>

          <Reveal className="mb-14">
            <p className="text-text-secondary leading-relaxed">
              Published case studies below were delivered for India-based clients; the methods, compliance posture, and SLA translate directly to North American and European engagements. DPDP-grade data handling and GDPR-aligned contracts are prepared for cross-border delivery from day one.
            </p>
          </Reveal>

          <Reveal className="mb-6">
            <a
              href="https://roobaroo.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <div className="card-hover-lift rounded-card border border-text-primary/5 hover:border-gold/25 bg-background-alt shadow-card p-6 md:p-10">
                <div className="flex items-start gap-4">
                  <ProjectGlyph kind="plate" />
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

          <Reveal delay={STAGGER_LONG / 2} className="mb-6">
            <a href="/work/archive-automation" className="group block">
              <div className="card-hover-lift rounded-card border border-text-primary/5 hover:border-gold/25 bg-background-alt shadow-card p-6 md:p-10">
                <div className="flex items-start gap-4 mb-6">
                  <ProjectGlyph kind="records" />
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

          <Reveal delay={STAGGER_LONG} className="mb-12">
            <a href="/work/bfsi-mis" className="group block">
              <div className="card-hover-lift rounded-card border border-text-primary/5 hover:border-gold/25 bg-background-alt shadow-card p-6 md:p-10">
                <div className="flex items-start gap-4 mb-6">
                  <ProjectGlyph kind="pillars" />
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
                      className="text-[11px] uppercase tracking-widest text-text-secondary bg-background border border-hairline rounded-full px-3 py-1.5"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          </Reveal>

          {/* In-house R&D case study. The named lab projects (Barn
              Owl, Dalmatian) are not publicly promoted on this
              surface yet, pending trademark filings on the product
              names. The timetable engine remains as a published
              engineering case study because the work itself is
              ours and the page does not name the surrounding
              product. */}
          <Reveal delay={STAGGER_LONG * 1.5} className="mb-10">
            <a href="/work/timetable-engine" className="group block">
              <div className="card-hover-lift rounded-card border border-text-primary/5 hover:border-gold/25 bg-background-alt shadow-card p-6 md:p-10">
                <div className="flex items-start gap-4 mb-6">
                  <ProjectGlyph kind="grid" />
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
                    We don&apos;t print targets on our own homepage. The latest PageSpeed Insights run (date, URL, and the unedited screenshot) is hosted on our security page alongside the measurement methodology.
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
          SECTION 7: From the studio (Notes preview)
      ────────────────────────────────────────────── */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-background-alt border-y border-text-primary/5">
        <div className="max-w-6xl mx-auto">
          <Reveal className="mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <p className="text-sm font-medium text-gold uppercase tracking-widest mb-3">From the studio</p>
              <h2 className="font-heading text-display-sm md:text-display text-text-primary tracking-tight max-w-2xl">
                Engineering notes
              </h2>
              <p className="text-text-secondary mt-4 max-w-xl leading-relaxed">
                Working notes on the architecture, regulation, and craft of the systems we build. Written for the architect at the schema design step, not the buyer at the brochure step.
              </p>
            </div>
            <a
              href="/notes"
              className="text-sm font-medium text-gold hover:underline inline-flex items-center gap-1.5 flex-shrink-0 self-start md:self-end"
            >
              All notes
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            {notes.slice(0, 3).map((note, index) => (
              <Reveal key={note.slug} delay={index * STAGGER_LONG}>
                <a
                  href={`/notes/${note.slug}`}
                  className="group block h-full card-hover-lift rounded-card border border-text-primary/5 hover:border-gold/25 bg-background shadow-card p-6 md:p-7"
                >
                  <p className="text-[11px] text-text-tertiary uppercase tracking-widest mb-3 leading-snug">
                    {note.topic}
                  </p>
                  <h3 className="font-heading text-lg md:text-xl text-text-primary tracking-tight leading-snug mb-3">
                    {note.title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed mb-5">
                    {note.blurb}
                  </p>
                  <span className="text-sm font-medium text-gold group-hover:underline inline-flex items-center gap-1.5">
                    Read the note
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────
          SECTION 8: Testimonials (hidden until populated)
      ────────────────────────────────────────────── */}
      <Testimonials />

      {/* ──────────────────────────────────────────────
          SECTION 9: Final CTA
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
