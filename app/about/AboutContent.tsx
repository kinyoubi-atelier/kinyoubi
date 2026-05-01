'use client'

import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { BrushStrokeDivider } from '@/components/ui/BrushStrokeDivider'
import { PaperTexture } from '@/components/ui/PaperTexture'
import { SITE } from '@/lib/constants'
import { InkStroke } from '@/design/primitives/InkStroke'
import {
  DURATION_SETTLE,
  EASE_SETTLE,
} from '@/design/tokens/motion'

/* ─── Founder portrait ─── */
/**
 * Wave 5 surface rhythm
 *
 * The founder portrait sits desaturated by default, which reads as quiet.
 * On hover or keyboard focus it crossfades to colour over DURATION_SETTLE
 * on EASE_SETTLE, so the move looks placed rather than thrown. The portrait
 * is wrapped as a native button so keyboard users can trigger the reveal
 * with Tab and carry the focus state visibly. Reduced motion locks the
 * portrait in its quiet desaturated state and the toggle switches state
 * instantaneously without a crossfade.
 */
function FounderPortrait({ alt }: { alt: string }) {
  const prefersReducedMotion = useReducedMotion()
  const [isActive, setIsActive] = useState(false)

  const cssDuration = prefersReducedMotion
    ? '0ms'
    : `${DURATION_SETTLE}ms`
  const cssEase = EASE_SETTLE

  return (
    <button
      type="button"
      aria-pressed={isActive}
      aria-label={`${alt}. Toggle colour.`}
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
      onFocus={() => setIsActive(true)}
      onBlur={() => setIsActive(false)}
      onClick={() => setIsActive((v) => !v)}
      className="relative rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-4 focus-visible:ring-offset-surface-dark"
      style={{ background: 'transparent', padding: 0, border: 0, cursor: 'pointer' }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/founder-ankit.jpg"
        alt={alt}
        className="w-48 h-48 md:w-56 md:h-56 rounded-2xl object-cover object-center"
        style={{
          filter: isActive ? 'grayscale(0) brightness(1)' : 'grayscale(1) brightness(0.98)',
          transition: `filter ${cssDuration} ${cssEase}`,
        }}
      />
      <span className="absolute -inset-1 rounded-2xl border border-gold/20 pointer-events-none" />
    </button>
  )
}

/* ─── SVG: Discipline Intersection Diagram ─── */

function IntersectionDiagram() {
  return (
    <div className="w-full overflow-x-auto -mx-4 px-4">
      <svg viewBox="0 0 360 320" className="w-full min-w-[280px] max-w-sm mx-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Outer circles */}
        <circle cx="140" cy="120" r="85" style={{ fill: 'rgb(var(--ink))' }} opacity="0.06" />
        <circle cx="220" cy="120" r="85" style={{ fill: 'rgb(var(--gold))' }} opacity="0.06" />
        <circle cx="140" cy="195" r="85" style={{ fill: 'rgb(var(--ink))' }} opacity="0.04" />
        <circle cx="220" cy="195" r="85" style={{ fill: 'rgb(var(--gold))' }} opacity="0.04" />

        {/* Labels */}
        <text x="95" y="78" textAnchor="middle" style={{ fill: 'rgb(var(--ink))' }} fontSize="13" fontFamily="system-ui" fontWeight="600">Engineering</text>
        <text x="265" y="78" textAnchor="middle" style={{ fill: 'rgb(var(--gold))' }} fontSize="13" fontFamily="system-ui" fontWeight="600">Finance</text>
        <text x="95" y="258" textAnchor="middle" style={{ fill: 'rgb(var(--ink))' }} fontSize="13" fontFamily="system-ui" fontWeight="600">Regulatory</text>
        <text x="265" y="258" textAnchor="middle" style={{ fill: 'rgb(var(--gold))' }} fontSize="13" fontFamily="system-ui" fontWeight="600">Design</text>

        {/* Center node */}
        <circle cx="180" cy="157" r="38" style={{ fill: 'rgb(var(--ink))' }} />
        <text x="180" y="153" textAnchor="middle" style={{ fill: 'rgb(var(--gold))' }} fontSize="12" fontFamily="system-ui" fontWeight="600">Kinyoubi</text>
        <text x="180" y="168" textAnchor="middle" style={{ fill: 'rgb(var(--bg))' }} fontSize="11" fontFamily="system-ui">Atelier</text>

        {/* Subtitle */}
        <text x="180" y="304" textAnchor="middle" style={{ fill: 'rgb(var(--ink-3))' }} fontSize="12" fontFamily="system-ui">
          The intersection is rare. That&apos;s the point.
        </text>
      </svg>
    </div>
  )
}

/* ─── Data ─── */

const disciplines = [
  {
    name: 'Engineering',
    years: '10+ years',
    description: 'Systems thinking, software architecture, constraint based optimization, aerospace engineering fundamentals. We build things that work under load and ship them end to end, from solver core to front end.',
  },
  {
    name: 'Quantitative Analysis',
    years: '7 years',
    description: 'Derivatives markets, risk frameworks, structured analysis. Every decision is backed by numbers, not intuition.',
  },
  {
    name: 'Regulatory Research',
    years: 'Ongoing',
    description: 'Compliance landscapes, contract analysis, structured escalation. We research the terrain so you can move fast.',
  },
  {
    name: 'Design Systems',
    years: 'Ongoing',
    description: 'Brand architecture, document systems, visual hierarchy. Complexity made simple through systematic design.',
  },
]

const principles = [
  {
    title: 'Sequencing over parallelism',
    description: 'When the instinct is to run five lanes at once, we identify the one lane that informs all others and build there first.',
  },
  {
    title: 'Systems, not one-offs',
    description: 'Every deliverable is designed to be repeatable, auditable, and maintainable, not a bespoke artifact that dies with the project.',
  },
  {
    title: 'Clarity as craft',
    description: 'If a document can\'t explain itself, it\'s failed. If a codebase can\'t be audited, it\'s a liability. Clarity is the hardest thing to build.',
  },
]

/* ─── Page ─── */

export default function AboutContent() {
  return (
    <>
      {/* Ambient paper grain backdrop. Fixed to viewport, behind all content,
          aria-hidden, no pointer events. Gives the long prose sections a
          subtle texture without competing for attention. */}
      <PaperTexture />

      {/* Hero */}
      <section className="py-24 md:py-36 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm font-medium text-gold uppercase tracking-widest mb-4">About</p>
            <h1 className="font-heading text-hero-sm md:text-hero text-text-primary mb-6 tracking-tight">
              How we think about building
            </h1>
            <p className="text-lg md:text-xl text-text-secondary max-w-2xl leading-relaxed">
              We believe the best systems are built with restraint. Every element earns its place.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Principles */}
      <section className="py-20 md:py-28 px-6 md:px-12 bg-background-alt">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-14"
          >
            <p className="text-sm font-medium text-gold uppercase tracking-widest mb-3">Philosophy</p>
            <h2 className="font-heading text-display-sm md:text-display text-text-primary tracking-tight">
              Three principles we follow
            </h2>
            {/* Section underline drawn once on viewport entry. */}
            <div className="mt-5 flex" aria-hidden="true">
              <InkStroke
                d="M 0 1 L 100 1"
                viewBox="0 0 100 2"
                strokeWidth={1}
                color="var(--ink-sumi)"
                className="h-[2px] w-[min(18rem,40%)] opacity-60"
              />
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {principles.map((principle, index) => (
              <motion.div
                key={principle.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <Card className="h-full">
                  <div className="text-2xl font-heading text-gold/30 mb-4">0{index + 1}</div>
                  <h3 className="text-lg font-semibold text-text-primary mb-3">{principle.title}</h3>
                  <p className="text-text-secondary leading-relaxed">{principle.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>

          <BrushStrokeDivider variant={0} className="mt-16" />
        </div>
      </section>

      {/* Multidisciplinary Edge + Diagram */}
      <section className="py-20 md:py-28 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* Left: content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <p className="text-sm font-medium text-gold uppercase tracking-widest mb-3">The edge</p>
              <h2 className="font-heading text-display-sm md:text-display text-text-primary tracking-tight mb-6">
                Where disciplines converge
              </h2>
              <p className="text-lg text-text-secondary leading-relaxed mb-8">
                Most firms specialize in one domain. We integrate four. This isn't dilettantism. It's the ability to see a software problem through the lens of risk, a compliance question through the lens of systems design, and a business decision through the lens of architecture.
              </p>
            </motion.div>

            {/* Right: diagram */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <IntersectionDiagram />
            </motion.div>
          </div>

          {/* Discipline detail cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
            {disciplines.map((discipline, index) => (
              <motion.div
                key={discipline.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="p-6 rounded-card border border-text-primary/5 hover:border-gold/20 transition-colors">
                  <div className="flex items-baseline justify-between mb-2">
                    <h3 className="text-lg font-semibold text-text-primary">{discipline.name}</h3>
                    <span className="text-xs text-gold font-medium">{discipline.years}</span>
                  </div>
                  <p className="text-text-secondary leading-relaxed">{discipline.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="py-20 md:py-28 px-6 md:px-12 bg-surface-dark">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-14 items-center">
            {/* Photo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="md:col-span-2 flex justify-center"
            >
              <FounderPortrait alt={SITE.founder} />
            </motion.div>

            {/* Bio */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="md:col-span-3"
            >
              <p className="text-sm font-medium text-gold uppercase tracking-widest mb-4">Founder</p>
              <h2 className="font-heading text-display-sm md:text-display text-text-on-dark mb-8 tracking-tight">
                {SITE.founder}
              </h2>

              <div className="space-y-6 mb-8">
                <p className="text-text-on-dark/80 text-lg leading-relaxed">
                  I came to software sideways, through aerospace, through seven years reading derivatives markets, through the slow work of reading contracts that sit underneath both.
                </p>
                <p className="text-text-on-dark/80 text-lg leading-relaxed">
                  What I learned across those years was one lesson, told in different vocabulary: every system that breaks was left unfinished somewhere earlier, by someone who thought they could come back to it. The studio is where I try not to do that again.
                </p>
              </div>
            </motion.div>
          </div>
          <BrushStrokeDivider variant={2} className="mt-16 opacity-40" />
        </div>
      </section>

      {/* How the code gets written — workflow tooling note. Sits between
          the founder bio and the CTA so the reader has just absorbed
          who is doing the work; this paragraph is honest about how. */}
      <section className="py-20 md:py-28 px-6 md:px-12">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <p className="text-sm font-medium text-gold uppercase tracking-widest mb-4">
              Working method
            </p>
            <h2 className="font-heading text-display-sm md:text-display text-text-primary tracking-tight mb-8 leading-tight">
              How the code gets written.
            </h2>
            <div className="space-y-6 text-text-primary text-lg leading-relaxed">
              <p>
                AI coding agents (
                <a
                  href="https://claude.com/claude-code"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold hover:underline"
                >
                  Claude Code
                </a>
                ,{' '}
                <a
                  href="https://cursor.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold hover:underline"
                >
                  Cursor
                </a>
                ) are the daily writing tool, with{' '}
                <a
                  href="https://paddo.dev/blog/beads-memory-for-coding-agents/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold hover:underline"
                >
                  Beads
                </a>{' '}
                layered on top to maintain cross-session memory across long
                refactors. Without that memory layer the agent silently
                rewrites a pattern it forgot the next morning, and the
                architectural consistency that took two weeks to establish
                is gone in a single session.
              </p>
              <p>
                The agent is the typist, not the architect. Trade-offs,
                structural calls, naming, and the decisions that compound for
                years remain mine. The output is not, on average, faster than
                what I would write alone. It is more thorough, because the
                agent does not get tired of writing the test that catches the
                edge case I would have skipped.
              </p>
              <p className="text-text-secondary text-base">
                Listed here, not on the &ldquo;What we build with&rdquo; grid
                on the home page, because these tools sit on the studio side
                of the keyboard. Nothing on that grid touches the
                client&rsquo;s system through the agent; the deployed
                architecture is its own inventory.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 px-6 md:px-12">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-display-sm md:text-display text-text-primary mb-4 tracking-tight">
              Interested in working together?
            </h2>
            <p className="text-text-secondary mb-8 text-lg">
              We'd love to hear about your project.
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
