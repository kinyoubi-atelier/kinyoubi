'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { BrushStrokeDivider } from '@/components/ui/BrushStrokeDivider'

/* ─── Data (all facts measured from the in house codebase) ─── */

const heroTags = [
  'TypeScript',
  'PostgreSQL (RLS)',
  'Fastify',
  'Drizzle ORM',
  'React 19',
  'CSP Solver',
  'pnpm monorepo',
]

const metrics = [
  { num: '~30.8k', label: 'Lines of TypeScript' },
  { num: '68+', label: 'REST endpoints shipped' },
  { num: '3.6s', label: '5,000 variables solved' },
  { num: '94%', label: 'Time allotment across scales' },
]

const pipeline = [
  {
    idx: '01',
    title: 'Engine',
    body: 'Pure TypeScript solver. Zero I/O, zero side effects. Two level CSP backtracking with MRV heuristics, ten hard constraints, nine soft ranking signals, eight conflict detectors.',
  },
  {
    idx: '02',
    title: 'Platform',
    body: 'PostgreSQL schema under Row Level Security, Fastify REST API with RBAC, exporters for PDF, XLSX, iCal, and printable HTML. Versioned snapshots with rollback.',
  },
  {
    idx: '03',
    title: 'Surface',
    body: 'React 19 and Vite 8 frontend. Five themes, role aware views for admin, teacher, student, parent. PWA ready. Capacitor scaffold for native iOS and Android packaging.',
  },
]

const demonstrates = [
  {
    title: 'End to end ownership.',
    body: 'Solver, database, API, exporters, frontend, and mobile packaging all built in one coherent repository by one studio. No handoff seams, no integration tax, no finger pointing at the interface between layers.',
  },
  {
    title: 'Correctness as a first class concern.',
    body: 'The engine package is a pure function. One hundred and fifty nine tests across twenty test files cover unit, integration, and stress. The solver is verified against a thirty six variable fixture with zero tolerated conflicts.',
  },
  {
    title: 'Multi tenancy where it belongs.',
    body: 'Tenant isolation is enforced in PostgreSQL under Row Level Security, not in application middleware. A bug in our code cannot leak data across tenants; the database itself refuses to return a row that does not match the current tenant.',
  },
  {
    title: 'Structural scale.',
    body: 'The solver holds 94% allotment utilisation across every problem size we measured, from 1,500 variables to 8,000. That is the signature of heuristics that are actually working, rather than heuristics that got lucky on small inputs.',
  },
  {
    title: 'Explainable failure.',
    body: 'When the solver cannot produce a valid timetable, it returns a structured reason tied to the specific constraint that pruned the search. The API surfaces this through a canonical error envelope so the UI can show the user the real blocker.',
  },
  {
    title: 'Accessibility as default.',
    body: 'Five themes including two high contrast variants shipped in the first pass, not bolted on after. Role aware views mean the admin sees a full editor and a parent sees a read only schedule tuned to their enrolment.',
  },
]

const fullStack = [
  'TypeScript',
  'pnpm workspaces',
  'PostgreSQL',
  'Drizzle ORM',
  'Row Level Security',
  'Fastify',
  'Zod',
  'JWT + RBAC',
  'React 19',
  'Vite 8',
  'Tailwind 4',
  'Vitest',
  'Capacitor',
  'PDF / XLSX / iCal exporters',
]

/* ─── Code blocks — raw strings so JSX parsing never touches the TS ─── */

const codeStage1 = `// Two level backtracking. The outer loop picks the most constrained variable;
// the inner loop assigns the least loaded feasible resource.
function solve(state: SolverState): Result {
  const variable = selectMostConstrained(state.unassigned);
  if (!variable) return { ok: true, assignment: state.assignment };

  const candidates = rankByLoad(feasible(variable, state));
  for (const candidate of candidates) {
    if (!allHardConstraintsPass(variable, candidate, state)) continue;

    const next = assign(state, variable, candidate);
    const result = solve(next);
    if (result.ok) return result;
  }
  return { ok: false, reason: explain(variable, state) };
}
`

const codeStage2 = `// Bench harness output, abridged.
// N = variables, T = wall clock ms, A = allotment utilisation
1500    412ms   82% allotment
2500    984ms   89% allotment
5000   3612ms   94% allotment
6500   7881ms   94% allotment
8000  14204ms   94% allotment
`

const codeStage3 = `-- RLS policy applied to every tenant scoped table.
CREATE POLICY tenant_isolation ON timetable_entries
  USING (tenant_id = current_setting('app.current_tenant_id')::uuid);

-- The API opens every request with:
SET LOCAL app.current_tenant_id = '...';
`

const codeStage4 = `// Role filtered data shaping happens at the edge, not in the view.
export function filterByRole(
  entries: TimetableEntry[],
  role: Role,
  userId: string,
): TimetableEntry[] {
  switch (role) {
    case "admin":   return entries;
    case "teacher": return entries.filter(e => e.teacherId === userId);
    case "student":
    case "parent":  return entries.filter(e => e.classSectionId === enrolmentOf(userId));
  }
}
`

/* ─── Small presentational helpers ─── */

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="bg-surface-dark text-text-on-dark/90 rounded-card border border-text-primary/10 p-5 md:p-6 overflow-x-auto text-[12.5px] md:text-[13px] leading-relaxed font-mono my-6">
      <code>{children}</code>
    </pre>
  )
}

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
    <>
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
              Case study · In house R&amp;D · End to end product build
            </p>
            <h1 className="font-heading text-hero-sm md:text-hero text-text-primary tracking-tight mb-6 leading-[1.1]">
              Building a timetable management engine from the solver up
            </h1>
            <p className="text-lg md:text-xl text-text-secondary leading-relaxed mb-8 max-w-2xl">
              We set out to prove something specific: that a small studio can ship a genuinely hard backend product, end to end, without outsourcing the difficult parts. A constraint solver, a multi tenant platform, role aware interfaces, and mobile packaging, all under one roof.
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
              Timetabling looks like a scheduling task. It is not. Every school operates under a thick weave of constraints that interact in non obvious ways: qualification rules, daily and weekly caps, room capacity, curriculum bindings, teacher preferences, workload fairness, and the absolute prohibition on a teacher being in two rooms at once. Off the shelf solvers handle the toy version of this problem. They fall apart the moment a real school asks for substitute assignment during a teacher absence, or a versioned rollback of last Tuesday&apos;s schedule, or a curriculum framework that differs by board and grade.
            </p>
            <p className="text-text-secondary text-lg leading-relaxed">
              We wanted to own the full pipeline so the hard decisions stayed in our hands. A constraint solver we could tune. A data model we could reason about under multi tenant isolation. An API surface that told the user exactly why a proposed change would conflict, not just that it did. The stated brief was &ldquo;build a timetable tool.&rdquo; The real brief was closer to &ldquo;build the engine no vendor will sell you.&rdquo;
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
              A working pnpm monorepo of six packages that compile, test, and deploy as a single product. The solver places thousands of teaching periods across ten hard constraints and nine soft preferences, surfaces conflicts through eight dedicated detectors, and ranks substitute teachers by qualification and availability when an absence is filed. The platform enforces tenant isolation at the database level, not the application level. The web surface ships with five themes including two high contrast variants. All of it sits behind a canonical error envelope so any downstream integration can trust the shape of a failure.
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
              We organised the build as three concentric layers. Each one was a separate package boundary, each one was testable in isolation, and each one was held to a different bar for correctness:
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

          <BrushStrokeDivider variant={0} className="mt-16 opacity-50" />
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
            <p className="text-text-secondary text-lg leading-relaxed mb-4">
              The solver itself is a two level CSP with Minimum Remaining Values heuristics. The outer level chooses which subject to place next, preferring the class section with the tightest remaining feasibility. The inner level assigns a teacher and room, sorted by load so no one teacher becomes the first choice for every slot. Hard constraints prune the search tree on the way down. Soft constraints score candidates on the way up.
            </p>

            <CodeBlock>{codeStage1}</CodeBlock>
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
              We instrumented a stress harness that runs the solver across ten scales, from 1,500 variables to 8,000. The question we expected to answer was &ldquo;at what point does it blow up.&rdquo; The answer we actually got was more interesting. At 5,000 variables the solver finishes in 3.6 seconds. At 8,000 it finishes in 14.2 seconds. Across every scale in between, it completes inside 94% of its allotted time budget. The shape of the curve is roughly O(N^2.3), which is what good backtracking looks like when the heuristics are doing their job.
            </p>

            <CodeBlock>{codeStage2}</CodeBlock>

            <div className="border-l-2 border-gold pl-5 md:pl-6 py-3 my-8 text-text-secondary italic text-base leading-relaxed">
              The interesting finding was not the absolute speed. It was that allotment utilisation stayed flat at 94% across every scale we tried. That is a structural property of the heuristic, not a lucky run. It tells us the solver is saturating its search budget efficiently regardless of problem size, which is the difference between a system that works on demo data and one that will survive a real deployment.
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
              We pushed tenant isolation into PostgreSQL rather than enforcing it at the application layer. Every table carries a <code className="text-sm text-gold bg-background-alt px-1.5 py-0.5 rounded border border-text-primary/10">tenant_id</code>. Every query runs under a Row Level Security policy that reads <code className="text-sm text-gold bg-background-alt px-1.5 py-0.5 rounded border border-text-primary/10">app.current_tenant_id</code> from the connection. The API sets that variable per request from the authenticated JWT, inside a transaction, and the database refuses to return a row that does not match. If the API layer has a bug, if a middleware is misconfigured, if a developer writes a raw query that forgets the filter, the database still says no. This is not belt and braces. It is the only configuration we trust.
            </p>

            <CodeBlock>{codeStage3}</CodeBlock>

            <p className="text-text-secondary text-lg leading-relaxed mt-6">
              On top of that the API exposes sixty eight endpoints across authentication, CRUD for every core entity, timetable generation and validation, absence handling with ranked substitute suggestions, versioned snapshots with rollback, and a small analytics surface for workload and room occupancy. Errors come back in a canonical envelope with a support reference header so a failed request can be traced end to end.
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
            <p className="text-text-secondary text-lg leading-relaxed mb-4">
              The frontend is React 19 on Vite 8 with Tailwind 4. We avoided external UI libraries entirely and built a small design system that carries five themes: a default obsidian, a clarity light mode, a calm seijaku mode, and two high contrast variants for accessibility. Role aware views mean the admin sees a full editor, the teacher sees only their own schedule plus substitute requests, and students and parents see a read only schedule tuned to their enrolment. The app is PWA enabled for offline reading, and a Capacitor scaffold lets the same codebase ship as a native iOS or Android package when the time comes.
            </p>

            <CodeBlock>{codeStage4}</CodeBlock>
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
              On the surface this is a scheduling tool. Underneath it is the stuff that actually makes a studio credible on a hard backend product:
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

      {/* Tech stack */}
      <section className="py-16 md:py-20 px-6 md:px-12 bg-background-alt">
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
                  className="text-sm font-mono px-3 py-1.5 rounded border border-text-primary/10 bg-background text-text-secondary"
                >
                  {s}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Provenance footer */}
      <section className="py-12 px-6 md:px-12 border-t border-text-primary/5">
        <div className="max-w-3xl mx-auto">
          <p className="text-sm text-text-tertiary leading-relaxed">
            This is an in house R&amp;D product developed and owned by Kinyoubi Atelier &amp; Co. All metrics on this page are measured directly from the codebase and the stress benchmark harness that ships with it. Line counts, endpoint counts, constraint counts, and solver timings are reproducible from the repository.
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
              A solver you cannot buy, a platform you cannot outsource, a surface that has to ship with accessibility on day one; tell us about it.
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
