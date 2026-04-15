'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { BrushStrokeDivider } from '@/components/ui/BrushStrokeDivider'
import { SITE } from '@/lib/constants'

/* ─── SVG: Discipline Intersection Diagram ─── */

function IntersectionDiagram() {
  return (
    <div className="w-full overflow-x-auto -mx-4 px-4">
      <svg viewBox="0 0 360 320" className="w-full min-w-[280px] max-w-sm mx-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Outer circles */}
        <circle cx="140" cy="120" r="85" fill="#142850" opacity="0.06" />
        <circle cx="220" cy="120" r="85" fill="#a08535" opacity="0.06" />
        <circle cx="140" cy="195" r="85" fill="#142850" opacity="0.04" />
        <circle cx="220" cy="195" r="85" fill="#a08535" opacity="0.04" />

        {/* Labels */}
        <text x="95" y="78" textAnchor="middle" fill="#142850" fontSize="13" fontFamily="system-ui" fontWeight="600">Engineering</text>
        <text x="265" y="78" textAnchor="middle" fill="#a08535" fontSize="13" fontFamily="system-ui" fontWeight="600">Finance</text>
        <text x="95" y="258" textAnchor="middle" fill="#142850" fontSize="13" fontFamily="system-ui" fontWeight="600">Regulatory</text>
        <text x="265" y="258" textAnchor="middle" fill="#a08535" fontSize="13" fontFamily="system-ui" fontWeight="600">Design</text>

        {/* Center node */}
        <circle cx="180" cy="157" r="38" fill="#142850" />
        <text x="180" y="153" textAnchor="middle" fill="#D4AF61" fontSize="12" fontFamily="system-ui" fontWeight="600">Kinyoubi</text>
        <text x="180" y="168" textAnchor="middle" fill="#F8F7F4" fontSize="11" fontFamily="system-ui">Atelier</text>

        {/* Subtitle */}
        <text x="180" y="304" textAnchor="middle" fill="#9CA3AF" fontSize="12" fontFamily="system-ui">
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
              <div className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/founder-ankit.jpg"
                  alt={SITE.founder}
                  className="w-48 h-48 md:w-56 md:h-56 rounded-2xl object-cover object-center grayscale hover:grayscale-0 transition-all duration-700 shadow-lg"
                />
                <div className="absolute -inset-1 rounded-2xl border border-gold/20 pointer-events-none" />
              </div>
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
                  Our founder brings a rare convergence of experience: aerospace engineering, seven years reading derivatives markets, software systems architecture, and deep regulatory research methodology. The result is a practice that treats every project as a system with clear constraints, defined risk boundaries, and measurable outcomes.
                </p>
                <p className="text-text-on-dark/80 text-lg leading-relaxed">
                  This multidisciplinary background isn't decorative. It's the reason we can architect a backend, analyze a contract, and design the compliance workflow in the same engagement.
                </p>
              </div>

              <p className="text-sm text-gold/80">{SITE.location}</p>
            </motion.div>
          </div>
          <BrushStrokeDivider variant={2} className="mt-16 opacity-40" />
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
