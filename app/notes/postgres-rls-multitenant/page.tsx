import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { BrushStrokeDivider } from '@/components/ui/BrushStrokeDivider'
import { JsonLd } from '@/components/seo/JsonLd'
import { buildArticleSchema, buildBreadcrumbSchema } from '@/lib/schema'

const title = 'Multi-tenant Postgres with Row-Level Security: a working pattern'

// Meta description: utilitarian, keyword-aware, written for the SERP.
const description =
  'Postgres RLS for multi-tenant SaaS, read from production: tenant isolation at the database, the pool problem, BYPASSRLS, indexes, tests, and the audit trail.'

// Sub-deck: written for the human reader, sits under the h1, calibrated
// to the body voice. Deliberately not the same string as the meta
// description: the SERP and the page header have different jobs.
const subdeck =
  'RLS is one SQL clause and three operational disciplines. Skip a discipline and the clause stops protecting you.'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/notes/postgres-rls-multitenant' },
  openGraph: {
    title,
    description,
    url: '/notes/postgres-rls-multitenant',
    type: 'article',
    publishedTime: '2026-05-01T00:00:00.000Z',
    authors: ['Ankit Sahu'],
  },
  twitter: { title, description },
}

const articleSchema = buildArticleSchema({
  url: '/notes/postgres-rls-multitenant',
  headline: title,
  description,
  datePublished: '2026-05-01T00:00:00.000Z',
})

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: 'Home', url: '/' },
  { name: 'Notes', url: '/notes' },
  { name: 'Multi-tenant Postgres with RLS', url: '/notes/postgres-rls-multitenant' },
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

export default function PostgresRlsMultitenantPage() {
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
              Multi-tenant SaaS has one rule that buyers care about more than
              any other: tenant A&rsquo;s data must not, under any
              circumstances, be returned to tenant B. The conventional way to
              keep that promise is to add{' '}
              <code className="font-mono text-sm">WHERE tenant_id = ?</code> to
              every query in the application, and to trust every developer who
              ever touches the codebase to remember.
            </p>
            <p>
              That is not a control. That is a hope. Hopes do not pass an
              audit, and they do not survive the first ORM helper that
              composes a query without going through the helper that adds the
              tenant clause. The control belongs one layer below, in the
              database itself, where the tenant filter is enforced by the
              engine and a forgotten clause cannot leak a row.
            </p>
            <p>
              Postgres has had Row-Level Security (RLS) since version 9.5. The
              feature is small. The discipline around it is not. This piece is
              a reading of the pattern that survived an audit on the
              engagement, a regulated financial institution where the data was
              under DPDP and RBI alignment and a cross-tenant leak would have
              been a notifiable event. The sections that follow are the
              clause, the three things that quietly break it, and the test
              fixture that proves it still holds.
            </p>
          </div>

          <Section heading="The pattern, in SQL">
            <p>
              Every table that holds tenant-scoped data carries a{' '}
              <code className="font-mono text-sm">tenant_id uuid not null</code>{' '}
              column. The column is a foreign key to a{' '}
              <code className="font-mono text-sm">tenants</code> table whose
              rows are the source of truth for which tenants exist. RLS is
              enabled on each of those tables, and a single policy filters
              every read and write on the value of a session-level setting.
            </p>
            <p>The minimal shape:</p>
            <pre className="font-mono text-xs md:text-sm bg-background-alt border border-text-primary/10 rounded-card p-4 overflow-x-auto leading-relaxed">
{`alter table loan_applications
  enable row level security;

alter table loan_applications
  force row level security;

create policy tenant_isolation
  on loan_applications
  using (tenant_id = current_setting('app.current_tenant', true)::uuid)
  with check (tenant_id = current_setting('app.current_tenant', true)::uuid);`}
            </pre>
            <p>
              Three things are doing real work here. The{' '}
              <code className="font-mono text-sm">USING</code> clause filters
              what rows the session can read. The{' '}
              <code className="font-mono text-sm">WITH CHECK</code> clause
              filters what rows the session can write, which stops a tenant
              from inserting a row claiming to belong to a different tenant.
              The <code className="font-mono text-sm">FORCE ROW LEVEL SECURITY</code>{' '}
              line is the one most teams skip; without it, the table owner
              bypasses the policy, and the migration role that owns the
              schema can read every tenant&rsquo;s data from a psql shell.
            </p>
            <p>
              The session variable{' '}
              <code className="font-mono text-sm">app.current_tenant</code> is
              set once per request, immediately after authentication, before
              any query runs. The trusted boundary is the request handler:
              the JWT comes in, the tenant claim is extracted, the session
              variable is set, and from that point every query in the request
              is filtered by the engine. The application code does not
              compose tenant filters. It cannot forget to.
            </p>
          </Section>

          <Section heading="The connection-pool problem">
            <p>
              The clause above looks airtight, and on a single dedicated
              connection it is. Production does not run on dedicated
              connections. It runs on a pool, and the pool is where the
              clause quietly breaks.
            </p>
            <p>
              The failure mode: request 1 belongs to tenant A. The handler
              checks out a connection from the pool, runs{' '}
              <code className="font-mono text-sm">SET app.current_tenant = &lsquo;A&rsquo;</code>,
              executes its queries, and returns the connection to the pool.
              Request 2 belongs to tenant B. The handler checks out the same
              connection. The session variable from request 1 is still set.
              If the handler does not overwrite it, request 2&rsquo;s queries
              run with tenant A&rsquo;s scope. Worse, if the handler sets the
              variable but a code path bypasses the middleware, the queries
              run with whatever the previous request left behind.
            </p>
            <p>
              There are three patterns that close this. None is optional;
              each closes a different gap.
            </p>
            <p>
              First, use{' '}
              <code className="font-mono text-sm">SET LOCAL</code> inside an
              explicit transaction.{' '}
              <code className="font-mono text-sm">SET LOCAL</code> scopes the
              variable to the current transaction; on commit or rollback the
              variable disappears, regardless of whether the connection
              returns to the pool. The handler now reads as: begin
              transaction, set local, run queries, commit. This is the
              safest default.
            </p>
            <p>
              Second, on connection checkin, the pool runs{' '}
              <code className="font-mono text-sm">RESET app.current_tenant</code>{' '}
              (or <code className="font-mono text-sm">DISCARD ALL</code>) so
              the connection cannot inherit state. PgBouncer in transaction
              pooling mode handles this implicitly because each transaction
              is its own session; in session pooling mode it does not, and
              the reset has to be explicit.
            </p>
            <p>
              Third, on connection checkout, the handler asserts that the
              variable is unset. If it is set, that is a bug, and the
              handler refuses to run rather than serving a request under the
              wrong tenant. A loud failure beats a silent leak.
            </p>
          </Section>

          <Section heading="Superuser bypass and BYPASSRLS">
            <p>
              RLS does not apply to Postgres superusers. It also does not
              apply to roles that have the{' '}
              <code className="font-mono text-sm">BYPASSRLS</code> attribute,
              and (without{' '}
              <code className="font-mono text-sm">FORCE ROW LEVEL SECURITY</code>)
              it does not apply to the table owner. Each of those is a
              perfectly normal escape hatch for an administrator. Each is a
              total failure if the application&rsquo;s runtime role has it.
            </p>
            <p>
              The role separation that holds:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-text-primary">
              <li>
                A migration role owns the schema and runs DDL. It is allowed
                to bypass RLS because migrations sometimes need to touch
                rows across tenants. It is not used at runtime.
              </li>
              <li>
                A runtime role is the role the application connects as. It
                is not a superuser, does not have{' '}
                <code className="font-mono text-sm">BYPASSRLS</code>, does
                not own any tables, and has only the privileges (SELECT,
                INSERT, UPDATE, DELETE) that the application actually needs.
              </li>
              <li>
                A read-only analytics role is separate again, and where it
                is allowed to read across tenants (for aggregate
                reporting), the policy explicitly accommodates that role
                rather than disabling RLS.
              </li>
            </ul>
            <p>
              The audit question, when it comes, is: &ldquo;show me that the
              application cannot bypass RLS even if its code asks to.&rdquo;
              The answer is the runtime role&rsquo;s attributes from{' '}
              <code className="font-mono text-sm">pg_roles</code>, alongside
              the <code className="font-mono text-sm">FORCE ROW LEVEL SECURITY</code>{' '}
              flag on every tenant-scoped table from{' '}
              <code className="font-mono text-sm">pg_tables</code>. Both come
              out of one query.
            </p>
          </Section>

          <Section heading="Performance and indexes">
            <p>
              An RLS policy is a predicate the planner adds to every query
              against the table. If the predicate cannot be served by an
              index, every read becomes a sequential scan filtered by the
              policy, and the database that worked at one tenant falls over
              at fifty.
            </p>
            <p>
              The discipline is to put{' '}
              <code className="font-mono text-sm">tenant_id</code> in the
              leading column of every index that supports a tenant-scoped
              query. A composite index on{' '}
              <code className="font-mono text-sm">(tenant_id, created_at desc)</code>{' '}
              serves &ldquo;recent rows for this tenant&rdquo; in one btree
              walk. A composite index on{' '}
              <code className="font-mono text-sm">(tenant_id, status, created_at desc)</code>{' '}
              serves the dashboard query without the planner having to fall
              back to a bitmap.
            </p>
            <p>
              The verification is{' '}
              <code className="font-mono text-sm">EXPLAIN (ANALYZE, BUFFERS)</code>{' '}
              against the production query shape, with the session variable
              set, asserting that the plan is an index scan and not a seq
              scan with a filter. The check goes into the test suite for the
              hot queries; a plan regression is a failing test, not a
              surprise at peak load.
            </p>
            <p>
              Past a threshold (varies by workload, but somewhere in the
              tens of millions of rows or hundreds of tenants), partitioning
              by tenant becomes the next step. Declarative partitioning on{' '}
              <code className="font-mono text-sm">tenant_id</code> means each
              tenant&rsquo;s rows live in their own physical partition, and
              the planner prunes irrelevant partitions before the policy
              even runs. RLS still applies inside each partition;
              partitioning is a performance step, not a security step.
            </p>
          </Section>

          <Section heading="What to test for">
            <p>
              An RLS policy that no one tests is a policy you cannot prove.
              The fixture that holds is small and reused across every
              test that touches a tenant-scoped table.
            </p>
            <p>The minimum is three tests:</p>
            <ul className="list-disc pl-6 space-y-2 text-text-primary">
              <li>
                Two tenants exist. As tenant A, insert a row. Switch
                session to tenant B. Query the table. Assert zero rows
                returned.
              </li>
              <li>
                As tenant A, insert a row claiming{' '}
                <code className="font-mono text-sm">tenant_id</code> equal
                to tenant B&rsquo;s id. Assert that the insert fails on
                the <code className="font-mono text-sm">WITH CHECK</code>{' '}
                clause, not at the application layer.
              </li>
              <li>
                Run a query as the runtime role with the session variable
                unset. Assert that the query returns zero rows (the
                policy treats a missing setting as no-match), and that
                the application&rsquo;s connection-checkout assertion has
                fired.
              </li>
            </ul>
            <p>
              The other test that earns its keep is a migration test. Every
              new tenant-scoped table goes through a single migration
              helper that enables RLS, forces it, and applies the standard
              policy. The migration test introspects{' '}
              <code className="font-mono text-sm">pg_policies</code> and{' '}
              <code className="font-mono text-sm">pg_tables</code> after
              every migration and asserts that no table in the
              tenant-scoped schema is missing a policy or has RLS disabled.
              When a developer adds a table by hand and forgets, the test
              fails before the migration merges.
            </p>
          </Section>

          <Section heading="The audit trail">
            <p>
              The regulator&rsquo;s question is rarely &ldquo;is RLS
              enabled.&rdquo; The regulator&rsquo;s question is &ldquo;for
              this row, on this date, under whose tenant context was it
              touched.&rdquo; That answer comes from an immutable audit log
              that records, per query, the tenant id from the session
              variable, the principal from the JWT, the statement hash, and
              the timestamp. The log is append-only, signed in batches, and
              kept on a retention schedule that outlives the data it
              describes.
            </p>
            <p>
              What RLS contributes to the audit answer is that the log
              entry and the row are filtered by the same value. There is
              no scenario where a query reads tenant A&rsquo;s row but the
              log records tenant B&rsquo;s context, because the engine
              would have refused the read. The audit reduces to one query
              against the log, not a code review of every call site.
            </p>
            <p>
              The same posture is in the timetabling engine on{' '}
              <Link href="/work/timetable-engine" className="text-gold hover:underline">
                /work/timetable-engine
              </Link>
              , where tenant isolation lives at the database layer for
              exactly the same reason: the platform may host many schools,
              and a query that crosses schools is a defect the database
              will refuse to serve.
            </p>
          </Section>

          <Section heading="Closing">
            <p>
              RLS is one of those decisions that has to land in week one.
              The clause itself is small, but every part of the schema
              that goes in without it has to be revisited later, and by
              the time the schema is full of joins that assume
              cross-tenant access, retrofitting the policy is no longer a
              migration; it is an audit of every query the application
              has ever run.
            </p>
            <p>
              The home page on this site has a line about complexity
              being a signal that someone, earlier, stopped paying
              attention. Multi-tenant isolation is the canonical example.
              Pay attention in week one, and the discipline is one SQL
              clause and three operational habits. Skip it, and the
              complexity that compounds is not a refactor; it is the
              week the regulator calls.
            </p>
          </Section>

          {/* Cross-link to BFSI MIS */}
          <div className="mt-16 mb-10">
            <Link
              href="/work/bfsi-mis"
              className="group block card-hover-lift rounded-card border border-text-primary/5 hover:border-gold/25 bg-background-alt shadow-card p-6 md:p-8"
            >
              <p className="text-xs text-text-tertiary uppercase tracking-widest mb-2">
                Companion case study · Regulated financial institution
              </p>
              <h3 className="font-heading text-xl md:text-2xl text-text-primary tracking-tight mb-2">
                RBI-aligned and DPDP-ready MIS platform
              </h3>
              <p className="text-text-secondary leading-relaxed mb-4">
                The engagement where this exact RLS pattern shipped under
                audit. Tenant isolation enforced at the database layer,
                role separation between migration and runtime, and an
                immutable audit log answering the regulator&rsquo;s
                tenant-context question in one query.
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
            This piece is the engineering view of multi-tenant Postgres
            isolation. Specific Postgres behaviour (default privileges,
            planner choices, partition pruning) varies by version; the
            patterns above are written against Postgres 14 and later.
            For a binding reading of any specific regulatory obligation
            referenced in passing, consult counsel qualified in the
            relevant jurisdiction.
          </div>

          {/* CTA */}
          <div className="mt-16 pt-10 border-t border-text-primary/5">
            <p className="text-sm font-medium text-gold uppercase tracking-widest mb-3">
              Designing a multi-tenant platform?
            </p>
            <h3 className="font-heading text-2xl md:text-3xl text-text-primary tracking-tight mb-4">
              Start a conversation.
            </h3>
            <p className="text-text-secondary leading-relaxed mb-6 max-w-xl">
              We respond within 48 business-day hours with a sketch of
              how the isolation boundary should sit in your schema and
              what the audit posture would cost in engineering time.
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
