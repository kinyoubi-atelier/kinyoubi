import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { BrushStrokeDivider } from '@/components/ui/BrushStrokeDivider'
import { JsonLd } from '@/components/seo/JsonLd'
import { buildArticleSchema, buildBreadcrumbSchema } from '@/lib/schema'

const title = 'OR-Tools vs FET vs commercial timetabling: an honest comparison'

// Meta description: utilitarian, keyword-aware, written for the SERP.
const description =
  'OR-Tools (CP-SAT), FET, and commercial timetabling solvers compared honestly: when to pick each, what they cost, where they break, and why the choice compounds for years.'

// Sub-deck: written for the human reader, sits under the h1, calibrated
// to the body voice. Deliberately not the same string as the meta
// description.
const subdeck =
  'Three legitimate tools for the same problem. Picking the wrong one is the kind of unfinished decision that compounds for years.'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/notes/or-tools-vs-fet-comparison' },
  openGraph: {
    title,
    description,
    url: '/notes/or-tools-vs-fet-comparison',
    type: 'article',
    publishedTime: '2026-05-01T00:00:00.000Z',
    authors: ['Ankit Sahu'],
  },
  twitter: { title, description },
}

const articleSchema = buildArticleSchema({
  url: '/notes/or-tools-vs-fet-comparison',
  headline: title,
  description,
  datePublished: '2026-05-01T00:00:00.000Z',
})

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: 'Home', url: '/' },
  { name: 'Notes', url: '/notes' },
  { name: 'OR-Tools vs FET vs commercial timetabling', url: '/notes/or-tools-vs-fet-comparison' },
])

function Section({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <section className="mb-14">
      <h2 className="font-heading text-2xl md:text-3xl text-text-primary tracking-tight mb-6 leading-snug">
        {heading}
      </h2>
      <div className="space-y-5 text-text-primary leading-relaxed">{children}</div>
    </section>
  )
}

function CompareCard({
  name,
  oneLine,
  facts,
}: {
  name: string
  oneLine: string
  facts: { label: string; value: string }[]
}) {
  return (
    <div className="rounded-card border border-text-primary/10 bg-background-alt p-6">
      <h3 className="font-heading text-xl text-text-primary tracking-tight mb-2">{name}</h3>
      <p className="text-sm text-text-secondary mb-5 leading-relaxed">{oneLine}</p>
      <dl className="space-y-2">
        {facts.map((f) => (
          <div key={f.label} className="flex items-baseline gap-3 text-sm">
            <dt className="text-text-tertiary uppercase tracking-widest text-[11px] font-medium w-24 flex-shrink-0">
              {f.label}
            </dt>
            <dd className="text-text-primary leading-snug">{f.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

export default function OrToolsVsFetComparisonPage() {
  return (
    <>
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema} />
      <article className="min-h-screen">
      {/* Header */}
      <header className="py-20 md:py-28 px-6 md:px-12 border-b border-text-primary/5">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/notes"
            className="text-sm text-gold hover:underline mb-6 inline-block"
          >
            ← Notes
          </Link>
          <p className="text-sm font-medium text-gold uppercase tracking-widest mb-4">
            Notes · Engineering view
          </p>
          <h1 className="font-heading text-hero-sm md:text-hero text-text-primary tracking-tight mb-6 leading-tight">
            {title}
          </h1>
          <p className="text-lg md:text-xl text-text-secondary leading-relaxed max-w-2xl">
            {subdeck}
          </p>
          <p className="text-sm text-text-tertiary mt-6">
            Published 1 May 2026 · Ankit Sahu
          </p>
        </div>
      </header>

      {/* Body */}
      <div className="py-16 md:py-24 px-6 md:px-12">
        <div className="max-w-3xl mx-auto">
          {/* Lead */}
          <div className="space-y-5 text-lg text-text-primary leading-relaxed mb-14">
            <p>
              Every team that has to ship a timetable runs into the same
              forking moment. There is a free desktop app called FET that a
              single school can use on the principal&rsquo;s laptop. There is
              a category of commercial timetabling software, the most familiar
              being aSc Timetables and Untis, that the IT director can buy
              with one purchase order. And there is OR-Tools, Google&rsquo;s
              constraint solver, which is not a timetabling product at all
              and which you have to build a product around.
            </p>
            <p>
              All three are legitimate. None of them is interchangeable. The
              cost of picking the wrong one is not paid in week one; it is
              paid eighteen months in, when the constraint shape that the
              tool refuses to model is exactly the constraint your district
              has decided is mandatory. By then the data, the integrations,
              and the user habits live inside the wrong tool, and the
              re-platform begins.
            </p>
            <p>
              I built our timetable engine on OR-Tools. The reasoning below
              is the reasoning I went through, written so that someone facing
              the same forking moment can borrow the framework. It is not a
              ranking. It is a fit analysis.
            </p>
          </div>

          <Section heading="FET, the free desktop app">
            <p>
              FET (Free Educational Timetabling) is a single-binary GPL
              desktop application authored by Liviu Lalescu. It runs on the
              user&rsquo;s machine, accepts an XML configuration of teachers,
              rooms, classes, and constraints, and writes a finished
              timetable to disk. The constraint vocabulary is school-native:
              days off, room preferences, double periods, max consecutive,
              maximum gaps. There is a UI for entering constraints, and the
              solver is fast enough on small problems that you wait less time
              than you spend authoring the input.
            </p>
            <p>
              The fit it is built for: one institution, one author, one
              annual cycle. A principal at a single school, mid-sized, with
              a stable set of teachers and rooms, will get a working
              timetable out of FET in a long afternoon. There is no licence
              cost, no service to deploy, and the output is a self-contained
              file the school can print.
            </p>
            <p>
              Where it stops working: the moment timetabling stops being a
              one-shot annual task and starts being a system. FET is not a
              service. It does not have an API. It does not run as a
              backend. You cannot give one hundred schools their own
              tenanted instance of FET in the cloud and have a normal SaaS
              product. The XML format is human-friendly but not designed for
              programmatic generation at scale, and the constraint set
              cannot be extended without forking the project. For the school
              that owns its own deployment and its own data, FET is the
              right tool. For anyone trying to build a platform that other
              schools rent, it is the wrong floor to start from.
            </p>
          </Section>

          <Section heading="Commercial timetabling: aSc, Untis, and the rest">
            <p>
              The commercial category is what most institutions actually use,
              because it is the easiest line item on a procurement document.
              aSc Timetables, Untis, Lantiv, ASC scheduler variants. They
              are mature. They have polished GUIs. They handle the long
              tail of school-domain features that any team building from
              scratch will discover one painful detail at a time: bell
              schedules with break drift, lab pairing, electives that span
              two grades, year-end exam schedules, and the rest.
            </p>
            <p>
              Pricing is per institution, annual, and tiered by school size.
              For a single school it is affordable. For a network of schools
              under a single trust, the line item compounds. For a state
              education department or a national chain, the conversation
              with the vendor becomes a conversation about enterprise
              licensing, and the per-tenant cost rarely goes down with scale
              the way buyers expect it to.
            </p>
            <p>
              Where they bend, and where they do not. The commercial
              vendors will configure inside their constraint vocabulary.
              They will not extend it. The Indian schools we have looked at
              run into this around three constraint shapes: split shifts
              (morning batch and afternoon batch sharing the same teachers),
              hostel period blocks that do not align with the academic
              schedule, and language-medium duplication where the same
              subject is taught in two mediums by different teachers, in
              different rooms, with attendance that has to balance across
              both. None of these are exotic. All of them are normal in
              India. None of the off-the-shelf vendors we evaluated handles
              them without external accommodation.
            </p>
            <p>
              The other thing the commercial vendors will not do is hand you
              the data. The timetable lives in their database, in their
              format. If you are operating a regulated tenant where the data
              has to be local, encrypted, and exportable to a regulator on
              demand, the commercial path frequently fails the data-residency
              and audit requirements before the constraint conversation even
              starts.
            </p>
          </Section>

          <Section heading="OR-Tools and CP-SAT, the constraint solver">
            <p>
              OR-Tools is Google&rsquo;s open-source operations research
              toolkit, licensed Apache 2.0. CP-SAT is the constraint
              programming solver inside it. It is the same family of solver
              that production logistics teams at large companies use to
              schedule fleets and assignments. It runs in C++, with bindings
              for Python, Java, and .NET.
            </p>
            <p>
              CP-SAT does not know what a timetable is. It knows variables,
              domains, and constraints. The school-domain vocabulary, the
              constraint shapes, the explanations, the persistence, the API,
              the exporters, the role-aware front end: all of that is what
              you build. The solver is one component in a system you have
              to architect.
            </p>
            <p>
              The cost of OR-Tools is not the licence. It is the
              engineering. You build the constraint encoder, the model
              generator, the explanation layer that tells a principal
              <em> why</em> their timetable was infeasible, the
              versioned-snapshot store, the role-aware surfaces, and the
              packaging for whatever clients will consume it. None of that
              is small. The first three months of an OR-Tools build look
              like nothing because the engine is the only thing you have,
              and an engine without a surface is invisible.
            </p>
            <p>
              The pay-off, when it comes, is structural. Constraint shapes
              that the off-the-shelf vendors refuse to model are, on
              CP-SAT, just more declarations in the model. Multi-tenancy is
              a property of the platform you wrap around it, not a feature
              you have to negotiate with a vendor. The data lives in your
              database under your encryption posture. When a regulator
              changes the constraint vocabulary, you change the model file;
              you do not file a feature request.
            </p>
            <p>
              On the published case study we wrote on this site, the engine
              solves at five thousand variables in 3.6 seconds and lands at
              94% allotment achievement, flat across problem sizes. Those
              numbers are the engine itself; everything around the engine,
              from the API to the front end to the mobile packaging, is the
              other thirty thousand lines of code that turn the solver into
              something a principal can use.
            </p>
          </Section>

          <Section heading="The decision matrix">
            <p>
              The build-versus-buy question for timetabling resolves in
              three dimensions: number of tenants, exoticness of constraint
              shapes, and durability of the engagement.
            </p>
            <ul className="list-disc pl-6 space-y-3 text-text-primary">
              <li>
                <strong className="text-text-primary">One tenant, standard constraints, short horizon.</strong>{' '}
                FET. The engineering cost of anything else is not justified
                by a single school&rsquo;s annual rebuild.
              </li>
              <li>
                <strong className="text-text-primary">One to ten tenants, standard-or-near-standard constraints.</strong>{' '}
                Commercial. The licence is cheaper than your engineering
                team for the next two years, and the trade-offs you cannot
                customise are usually trade-offs you can live with at this
                scale.
              </li>
              <li>
                <strong className="text-text-primary">Many tenants, regulated environment, custom constraint shapes that drift.</strong>{' '}
                OR-Tools. The licence math reverses past a threshold of
                tenants and the constraint refusals start being
                deal-breakers; from that point, the engineering cost of
                building on the solver is the cheaper path.
              </li>
              <li>
                <strong className="text-text-primary">Single tenant, but the constraint shape is exotic.</strong>{' '}
                Commercial first, with a planned migration to OR-Tools when
                the exotic constraint becomes a binding requirement. Buying
                a known-good tool to ship the first year is cheaper than
                building one to ship the first year.
              </li>
            </ul>
          </Section>

          <Section heading="Why we picked OR-Tools, with the numbers">
            <p>
              The engagement we built for needed three things the
              off-the-shelf vendors could not give us at the same time:
              multi-tenant deployment with database-layer isolation,
              constraint shapes that included split shifts and language-medium
              duplication, and a published reproducible benchmark that the
              buyer could verify before committing.
            </p>
            <p>
              The engine ships under one studio with no handoff seams. The
              engine package is a pure function: input model, output
              schedule, no I/O, no side effects. A wide test surface (unit,
              integration, stress) keeps the solver verified against a
              deterministic fixture. The platform around it is a multi-tenant
              data platform with isolation enforced at the database layer,
              an API with role-aware access, versioned snapshots and
              rollback, and exporters for the formats operators actually
              ask for.
            </p>
            <p>
              The numbers are reproducible: 3.6 seconds to solve at five
              thousand variables, 94% allotment achievement flat across
              problem sizes, 68 plus REST endpoints in the API surface,
              roughly 30.8 thousand lines of code across the engine, the
              platform, and the role-aware front end. The case study below
              walks the architectural depth this piece deliberately
              skipped.
            </p>
          </Section>

          {/* Side-by-side comparison cards */}
          <div className="my-14">
            <p className="text-sm font-medium text-gold uppercase tracking-widest mb-5 text-center">
              The three tools at a glance
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <CompareCard
                name="FET"
                oneLine="Single-school desktop app, GPL, fast on small problems."
                facts={[
                  { label: 'License', value: 'GPL, free' },
                  { label: 'Deployment', value: 'Desktop binary' },
                  { label: 'API', value: 'None' },
                  { label: 'Multi-tenant', value: 'No' },
                  { label: 'Best fit', value: 'One school, annual cycle' },
                ]}
              />
              <CompareCard
                name="Commercial"
                oneLine="aSc / Untis / Lantiv. Mature GUIs, school-domain native."
                facts={[
                  { label: 'License', value: 'Annual, per institution' },
                  { label: 'Deployment', value: 'Vendor-hosted or installed' },
                  { label: 'API', value: 'Limited / read-only' },
                  { label: 'Multi-tenant', value: 'Vendor-managed' },
                  { label: 'Best fit', value: 'One to ten standard schools' },
                ]}
              />
              <CompareCard
                name="OR-Tools / CP-SAT"
                oneLine="Industrial constraint solver. Not a product; the foundation of one."
                facts={[
                  { label: 'License', value: 'Apache 2.0, free' },
                  { label: 'Deployment', value: 'Whatever you build' },
                  { label: 'API', value: 'Whatever you ship' },
                  { label: 'Multi-tenant', value: 'Yours to architect' },
                  { label: 'Best fit', value: 'Regulated, custom, durable' },
                ]}
              />
            </div>
          </div>

          {/* Cross-link to timetable-engine */}
          <div className="mt-16 mb-10">
            <Link
              href="/work/timetable-engine"
              className="group block card-hover-lift rounded-card border border-text-primary/5 hover:border-gold/25 bg-background-alt shadow-card p-6 md:p-8"
            >
              <p className="text-xs text-text-tertiary uppercase tracking-widest mb-2">
                Companion case study · In-house R&amp;D
              </p>
              <h3 className="font-heading text-xl md:text-2xl text-text-primary tracking-tight mb-2">
                OR-Tools constraint solver for school timetabling
              </h3>
              <p className="text-text-secondary leading-relaxed mb-4">
                Engine, platform, API, exporters, role-aware front end, and
                mobile scaffold, shipped end to end. Solves five thousand
                variables in 3.6 seconds at 94% allotment, with a reproducible
                fixture published.
              </p>
              <span className="text-sm font-medium text-gold group-hover:underline inline-flex items-center gap-1.5">
                Read the case study
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          </div>

          <BrushStrokeDivider variant={1} className="my-12 opacity-60" />

          {/* Closing note */}
          <div className="text-sm text-text-tertiary leading-relaxed border-l border-gold/30 pl-4 italic">
            Tool category notes are deliberately at the level of fit, not
            feature-by-feature comparison. Vendor pricing, version-specific
            capabilities, and constraint vocabulary change quickly; this
            piece is meant to outlive the next minor release. For a current
            evaluation against your own constraint shape, write to the
            studio.
          </div>

          {/* CTA */}
          <div className="mt-16 pt-10 border-t border-text-primary/5">
            <p className="text-sm font-medium text-gold uppercase tracking-widest mb-3">
              Evaluating build vs. buy for timetabling?
            </p>
            <h3 className="font-heading text-2xl md:text-3xl text-text-primary tracking-tight mb-4">
              Start a conversation.
            </h3>
            <p className="text-text-secondary leading-relaxed mb-6 max-w-xl">
              We respond within 48 business-day hours with a sketch of where
              your constraint shape sits on the matrix above and what each
              path would cost in engineering time.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-sm font-medium text-gold hover:underline"
            >
              Tell us about your project
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </article>
    </>
  )
}
