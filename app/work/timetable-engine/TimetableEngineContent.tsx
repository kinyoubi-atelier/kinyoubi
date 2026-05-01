'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { BrushStrokeDivider } from '@/components/ui/BrushStrokeDivider'
import { LatticeMotif } from '@/components/motifs/LatticeMotif'

/* ─── Wave 3 motif: lattice, cool-shifted accent ───
   Accent hue: #a08535 (gold) is shifted a quarter step toward cool
   at #7D8E6A (a muted sage-gold) for this study only. The override
   is scoped by a local CSS variable set on the page wrapper; it
   does not leak into the global theme. */
const TIMETABLE_ACCENT_COOL = '#7D8E6A'

/* ─── Data (category level only; implementation specifics held back by design) ─── */

const heroTags = [
  'In house R&D',
  'Constraint engine',
  'Multi tenant platform',
  'Role aware surfaces',
  'End to end ownership',
]

const metrics = [
  { num: '~30.8k', label: 'Lines of code' },
  { num: '68+', label: 'REST endpoints shipped' },
  { num: '3.6s', label: 'Solve time at 5k variables' },
  { num: '94%', label: 'Allotment achieved, flat across scales' },
]

const pipeline = [
  {
    idx: '01',
    title: 'Engine',
    body: 'A pure constraint engine with no I/O and no side effects. Hard constraints prune the search; soft signals rank candidates. Failure is structured and explainable, never silent.',
  },
  {
    idx: '02',
    title: 'Platform',
    body: 'A multi tenant data platform with isolation enforced at the database layer. An API with role aware access, versioned snapshots, and rollback. Exporters for the formats operators actually ask for.',
  },
  {
    idx: '03',
    title: 'Surface',
    body: 'A role aware front end with accessibility built in from day one. Five themes shipped in the first pass. PWA capable, with a scaffold for native mobile packaging.',
  },
]

const demonstrates = [
  {
    title: 'End to end ownership.',
    body: 'Engine, data platform, API, exporters, and front end built by one studio inside one coherent repository. No handoff seams, no integration tax, no finger pointing at the interface between layers.',
  },
  {
    title: 'Correctness as a first class concern.',
    body: 'The engine package is a pure function. A wide test surface covers unit, integration, and stress. The solver is verified against a deterministic fixture with zero tolerated conflicts.',
  },
  {
    title: 'Multi tenancy where it belongs.',
    body: 'Tenant isolation is enforced at the database layer, not in application middleware. A bug in application code cannot leak data across tenants; the database itself refuses to return rows that do not belong to the current tenant.',
  },
  {
    title: 'Structural scale.',
    body: 'Allotment utilisation stays flat in the mid nineties across every problem size we measured. That flatness is the signature of heuristics that are actually working, rather than heuristics that got lucky on small inputs.',
  },
  {
    title: 'Explainable failure.',
    body: 'When the engine cannot produce a valid solution, it returns a structured reason tied to the specific constraint that pruned the search. The API surfaces this through a canonical error envelope so the interface can show the real blocker.',
  },
  {
    title: 'Accessibility as default.',
    body: 'Five themes including two high contrast variants shipped in the first pass, not bolted on after. Role aware views mean each viewer sees the surface scoped to their relationship with the data.',
  },
]

const stackFrameworks = [
  'Systems programming',
  'Relational data with database enforced isolation',
  'Role based access control',
  'Versioned snapshots and rollback',
  'Canonical error contracts',
  'Accessibility first design system',
  'Mobile scaffold for native packaging',
]

/* ─── Small presentational helpers ─── */

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-xs font-medium px-3 py-1.5 rounded-full border border-text-primary/10 bg-background-alt text-text-secondary">
      {children}
    </span>
  )
}

/* ─── Page ─── */

export default function TimetableEngineContent() {
  return (
    <div
      style={{
        // Local scoped accent override. The lattice motif colour is
        // exposed so divider wrappers and accent chips can pick it
        // up without redrawing the SVG assets themselves.
        ['--study-accent' as string]: TIMETABLE_ACCENT_COOL,
      }}
    >
      {/* Hero */}
      <section className="relative pt-24 md:pt-36 pb-16 md:pb-20 px-6 md:px-12 overflow-hidden">
        {/* Wave 3 · lattice motif, mounted once inside the hero as a
            landmark element. Absolutely positioned behind the heading
            so it frames rather than crowds. */}
        <LatticeMotif color={TIMETABLE_ACCENT_COOL} spacing={28} />
        <div className="relative max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              href="/work"
              className="inline-flex items-center gap-2 text-sm text-text-tertiary hover:text-gold transition-colors mb-10"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to work
            </Link>

            <p className="text-sm font-medium text-gold uppercase tracking-widest mb-5">
              Case study · In house R&amp;D · End to end product build
            </p>
            <h1 className="font-heading text-hero-sm md:text-hero text-text-primary tracking-tight mb-6 leading-[1.1]">
              Building a timetable management engine from the solver up
            </h1>
            <p className="text-lg md:text-xl text-text-secondary leading-relaxed mb-8 max-w-2xl">
              We set out to prove something specific: that a small studio can ship a genuinely hard backend product, end to end, without outsourcing the difficult parts. A constraint engine, a multi tenant platform, role aware interfaces, and mobile packaging, all under one roof.
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
              Timetabling looks like a scheduling task. It is not. Every school operates under a thick weave of constraints that interact in non obvious ways: qualification rules, daily and weekly caps, room capacity, curriculum bindings, teacher preferences, workload fairness, and the absolute prohibition on a teacher being in two rooms at once. Off the shelf solvers handle the toy version of this problem. They fall apart the moment a real school asks for substitute assignment during a teacher absence, a versioned rollback of last Tuesday&apos;s schedule, or a curriculum framework that differs by board and grade.
            </p>
            <p className="text-text-secondary text-lg leading-relaxed">
              We wanted to own the full pipeline so the hard decisions stayed in our hands. An engine we could tune. A data model we could reason about under multi tenant isolation. An API surface that told the user exactly why a proposed change would conflict, not just that it did. The stated brief was &ldquo;build a timetable tool.&rdquo; The real brief was closer to &ldquo;build the engine no vendor will sell you.&rdquo;
            </p>
          </motion.div>
        </div>
      </section>

      {/* The outcome */}
      <section className="py-12 md:py-16 px-6 md:px-12 bg-background-alt">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-display-sm md:text-display text-text-primary tracking-tight mb-6">
              The outcome
            </h2>
            <p className="text-text-secondary text-lg leading-relaxed">
              A working product that compiles, tests, and deploys as a single system. The engine places thousands of teaching periods under a deep set of hard constraints and a layered set of soft preferences, surfaces conflicts through dedicated detectors, and ranks substitute teachers by qualification and availability when an absence is filed. The platform enforces tenant isolation at the database level, not the application level. The surface ships with five themes including two high contrast variants. All of it sits behind a canonical error envelope so any downstream integration can trust the shape of a failure.
            </p>
          </motion.div>
        </div>
      </section>

      {/* The pipeline */}
      <section className="py-16 md:py-20 px-6 md:px-12">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-display-sm md:text-display text-text-primary tracking-tight mb-4">
              The pipeline
            </h2>
            <p className="text-text-secondary text-lg leading-relaxed mb-10">
              We organised the build as three concentric layers. Each one is a separate package boundary, each one is testable in isolation, and each one is held to a different bar for correctness.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {pipeline.map((step, i) => (
              <motion.div
                key={step.idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="relative rounded-card border border-text-primary/5 bg-background-alt p-6"
              >
                <div className="absolute top-5 right-5 text-[11px] font-semibold text-text-tertiary tracking-widest">
                  {step.idx}
                </div>
                <h3 className="text-base font-semibold text-gold mb-2">{step.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{step.body}</p>
              </motion.div>
            ))}
          </div>

          {/* Divider treatment for the lattice motif: the existing
              brush stroke is wrapped with a cool-shifted tint so the
              accent palette stays coherent without redrawing the
              asset. */}
          <div
            style={{
              filter:
                'sepia(0.25) hue-rotate(55deg) saturate(0.75) brightness(0.95)',
            }}
          >
            <BrushStrokeDivider variant={0} className="mt-16 opacity-50" />
          </div>
        </div>
      </section>

      {/* Stage 1 — Engine */}
      <section className="py-12 md:py-16 px-6 md:px-12">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <p className="text-sm font-medium text-gold uppercase tracking-widest mb-3">Stage 1 · Engine</p>
            <h2 className="font-heading text-display-sm md:text-display text-text-primary tracking-tight mb-6">
              A solver that refuses to lie
            </h2>
            <p className="text-text-secondary text-lg leading-relaxed mb-4">
              The centre of the product is a pure function. Given a curriculum, a set of teachers, a room inventory, and a period template, it returns either a valid timetable or a structured explanation of why one cannot be produced. The decision we made early was to keep this package free of every dependency that touched a network, a file system, or the clock. If a test fails in the engine, the failure belongs to the engine. Nothing else can be blamed.
            </p>
            <p className="text-text-secondary text-lg leading-relaxed">
              The engine&rsquo;s internals are where our craft lives, so they stay inside the studio. What is published is the contract and the behaviour: a deterministic result, an explainable failure mode, and scale characteristics that hold up under measurement. That is the surface a client needs to evaluate the work; the rest is for the engagement.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stage 2 — Scale */}
      <section className="py-12 md:py-16 px-6 md:px-12 bg-background-alt">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <p className="text-sm font-medium text-gold uppercase tracking-widest mb-3">Stage 2 · Scale</p>
            <h2 className="font-heading text-display-sm md:text-display text-text-primary tracking-tight mb-6">
              The part that surprised us
            </h2>
            <p className="text-text-secondary text-lg leading-relaxed mb-5">
              We instrumented a stress harness that runs the engine across a wide range of problem sizes. The question we expected to answer was &ldquo;at what point does it blow up.&rdquo; The answer we actually got was more interesting. At around five thousand variables the solver finishes in 3.6 seconds. Across every scale we measured, it completes inside roughly 94% of its allotted time budget.
            </p>

            <div className="border-l-2 border-gold pl-5 md:pl-6 py-3 my-8 text-text-secondary italic text-base leading-relaxed">
              The interesting finding was not the absolute speed. It was that allotment utilisation stayed flat across every scale we tried. That is a structural property of the heuristic, not a lucky run. It tells us the engine is saturating its search budget efficiently regardless of problem size, which is the difference between a system that works on demo data and one that will survive a real deployment.
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stage 3 — Platform */}
      <section className="py-12 md:py-16 px-6 md:px-12">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <p className="text-sm font-medium text-gold uppercase tracking-widest mb-3">Stage 3 · Platform</p>
            <h2 className="font-heading text-display-sm md:text-display text-text-primary tracking-tight mb-6">
              Multi tenancy where it actually matters
            </h2>
            <p className="text-text-secondary text-lg leading-relaxed mb-4">
              We pushed tenant isolation into the database rather than enforcing it in application code. Every record carries a tenant identifier. Every query runs under a policy that reads the current tenant from the session and refuses to return anything outside it. If the API layer has a bug, if a middleware is misconfigured, if a developer writes a raw query that forgets the filter, the database still says no. This is not belt and braces. It is the only configuration we trust.
            </p>
            <p className="text-text-secondary text-lg leading-relaxed">
              On top of that, the API exposes the full operator surface: authentication, the CRUD shapes for every core entity, generation and validation, absence handling with ranked substitute suggestions, versioned snapshots with rollback, and a small analytics surface for workload and room occupancy. Errors come back in a canonical envelope with a support reference so a failed request can be traced end to end.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stage 4 — Surface */}
      <section className="py-12 md:py-16 px-6 md:px-12 bg-background-alt">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <p className="text-sm font-medium text-gold uppercase tracking-widest mb-3">Stage 4 · Surface</p>
            <h2 className="font-heading text-display-sm md:text-display text-text-primary tracking-tight mb-6">
              Five themes and a role for every viewer
            </h2>
            <p className="text-text-secondary text-lg leading-relaxed">
              The front end is a small, purpose built design system with no external component library. Five themes, including two high contrast variants, shipped in the first pass. Role aware views mean the admin sees a full editor, a teacher sees only their own schedule plus substitute requests, and students and parents see a read only schedule tuned to their enrolment. The app is PWA capable for offline reading, and a mobile scaffold lets the same codebase ship as a native package when the engagement calls for it.
            </p>
          </motion.div>
        </div>
      </section>

      {/* What this demonstrates */}
      <section className="py-16 md:py-24 px-6 md:px-12">
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
              On the surface this is a scheduling tool. Underneath it is the stuff that actually makes a studio credible on a hard backend product.
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
                className="rounded-card border border-text-primary/5 bg-background-alt p-6"
              >
                <h3 className="text-base font-semibold text-text-primary mb-2">{item.title}</h3>
                <p className="text-text-secondary leading-relaxed">{item.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Frameworks we used (category level) */}
      <section className="py-16 md:py-20 px-6 md:px-12 bg-background-alt">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-display-sm md:text-display text-text-primary tracking-tight mb-3">
              Frameworks we drew on
            </h2>
            <p className="text-text-secondary leading-relaxed mb-6 max-w-2xl">
              Described at the category level. Specific libraries, schemas, and internal design choices remain with the studio.
            </p>
            <div className="flex flex-wrap gap-2.5">
              {stackFrameworks.map((s) => (
                <span
                  key={s}
                  className="text-sm px-3 py-1.5 rounded border border-text-primary/10 bg-background text-text-secondary"
                >
                  {s}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Further reading — companion note from the studio that pulls
          its build-versus-buy reasoning from this engagement. */}
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
            <Link
              href="/notes/or-tools-vs-fet-comparison"
              className="group block card-hover-lift rounded-card border border-text-primary/5 hover:border-gold/25 bg-background-alt shadow-card p-6 md:p-8"
            >
              <p className="text-xs text-text-tertiary uppercase tracking-widest mb-2">
                Note · Constraint solvers · Build vs buy
              </p>
              <h3 className="font-heading text-xl md:text-2xl text-text-primary tracking-tight mb-2">
                OR-Tools vs FET vs commercial timetabling: an honest comparison
              </h3>
              <p className="text-text-secondary leading-relaxed mb-4">
                The build-versus-buy reasoning behind this engagement. Three legitimate tools, three different fits, and the matrix that decides which one belongs in your build.
              </p>
              <span className="text-sm font-medium text-gold group-hover:underline inline-flex items-center gap-1.5">
                Read the note
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Provenance + IP footer */}
      <section className="py-12 px-6 md:px-12 border-t border-text-primary/5">
        <div className="max-w-3xl mx-auto space-y-4">
          <p className="text-sm text-text-tertiary leading-relaxed">
            This is an in house R&amp;D product developed and owned by Kinyoubi Atelier &amp; Co. Metrics on this page are measured directly from the codebase and the benchmark harness that ships with it; they are reproducible inside the studio on request, under a mutual non disclosure agreement.
          </p>
          <p className="text-sm text-text-tertiary leading-relaxed">
            Implementation specifics, including algorithm selection, data schemas, API contracts, and source level internals, are held as studio intellectual property and are not published on this surface by design. Qualified engagements receive the architectural depth they need under NDA.
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
              An engine you cannot buy, a platform you cannot outsource, a surface that has to ship with accessibility on day one; tell us about it.
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
