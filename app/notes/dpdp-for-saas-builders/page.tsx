import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { BrushStrokeDivider } from '@/components/ui/BrushStrokeDivider'

const title = 'DPDP for SaaS builders: where the Act meets the schema'
const description =
  'An engineering reading of DPDP Act 2023 compliance for SaaS architects. How notice, consent, retention, data principal rights, and breach notification live in a schema, a request flow, and a deletion job.'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/notes/dpdp-for-saas-builders' },
  openGraph: {
    title,
    description,
    url: '/notes/dpdp-for-saas-builders',
    type: 'article',
    publishedTime: '2026-05-01T00:00:00.000Z',
    authors: ['Ankit Sahu'],
  },
  twitter: { title, description },
}

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

export default function DpdpForSaasBuildersPage() {
  return (
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
            {description}
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
              The Digital Personal Data Protection Act, 2023 has been read in plain
              English a hundred times by now. The compliance content on the open web
              reads the same way each time: notice, consent, purpose limitation,
              retention, rights, breach notification, accountability. A buyer who
              has read three of those posts has read all of them.
            </p>
            <p>
              This is the other reading. The one the architect needs at the schema
              design step, the request handler step, the deletion job step. Not
              legal advice (the disclaimer at the foot of this page covers that),
              but the engineering view of how each obligation actually lives in a
              codebase that has to ship and pass an audit.
            </p>
            <p>
              The vantage point is direct: a regulated financial institution&rsquo;s
              MIS platform built to the Act from week one. Threat model before
              schema. Row-level security before any API endpoint. Client-side
              field-level encryption on every sensitive free-text field before a
              row hit the database. The Act was not bolted on; the schema was drawn
              knowing what the Act would ask of it. That posture is what this piece
              is about.
            </p>
          </div>

          <Section heading="Notice and consent">
            <p>
              The Act asks for a clear notice at the moment of collection, and
              consent that is free, specific, informed, unambiguous, and capable of
              being withdrawn. The temptation in product code is to model consent
              as a boolean column on the user record. That collapses on the first
              audit question.
            </p>
            <p>
              The pattern that holds up is a consent ledger, separate from the user
              table:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-text-primary">
              <li>
                Each consent row points to a specific notice version: the actual
                text the data principal saw, frozen at consent time.
              </li>
              <li>
                Each row records the purpose, the moment, the channel, and the
                principal who gave it.
              </li>
              <li>
                Withdrawal is a row, not an update. The original consent stands
                historically; a withdrawal row terminates it forward in time.
              </li>
              <li>
                Tables that depend on consent join through this ledger at query
                time, not just at write time.
              </li>
            </ul>
            <p>
              The acid test: the regulator says, &ldquo;show me the exact consent
              under which row X is being processed today.&rdquo; With a ledger you
              are one join away. With a boolean column you are paging through{' '}
              <code className="font-mono text-sm">git log</code>.
            </p>
            <p>
              Two anti-patterns that will earn a finding fast: consent baked into
              the terms of service (&ldquo;by signing up, you agree to&hellip;&rdquo;), and
              cookie banners that record the click without writing anywhere
              queryable. Neither survives a structured request from the data
              principal asking what consent they gave, when, for what.
            </p>
          </Section>

          <Section heading="Storage and retention">
            <p>
              The Act asks that personal data be retained only as long as the
              declared purpose persists, except where another law requires it to
              be kept. The instinct is to deal with this by hand at audit time.
              The pattern that works is to make retention a property of the row
              itself.
            </p>
            <p>
              Each table that holds personal data carries a retention envelope. At
              minimum: the purpose, the policy that drives retention (a months
              value, or a &ldquo;while account is active&rdquo; rule, or a statutory
              reference), and the trigger that starts the clock. A nightly job
              walks the tables, finds rows whose envelope has expired, and either
              erases or anonymises them with a deletion log entry.
            </p>
            <p>
              The deletion log is the audit answer. Each entry records what was
              deleted, when, under which policy, and a hash of the deleted row&rsquo;s
              identifying fields so a future re-creation can be detected. The log
              itself is append-only and signed in batches.
            </p>
            <p>
              Soft delete without a TTL is the most common breaking pattern. A
              flag set to true is not a deletion; it is forever retention with a
              flag on it. Either commit to hard deletion, or model the soft delete
              as a step in the retention pipeline that has a hard-delete tail.
            </p>
          </Section>

          <Section heading="Data principal rights">
            <p>
              The Act gives the data principal a stack of rights: access,
              correction, erasure, grievance, and nomination. The temptation is to
              point them at a portal. The pattern that holds is to model each
              right as a workflow with a first-response SLA, not a self-service
              endpoint.
            </p>
            <p>
              <strong className="text-text-primary">Access.</strong> The principal
              asks what you hold about them. The answer needs to be returned in a
              format they can read, not in a CSV emailed in thirty days. A few
              engineering shortcuts: a single endpoint that joins across every
              personal-data table tagged with that principal&rsquo;s identifier, a
              fixture test that asserts the join is exhaustive, and a redaction
              layer for fields you cannot return raw (encrypted blobs, third-party
              identifiers, audit-log entries that contain other principals).
            </p>
            <p>
              <strong className="text-text-primary">Correction.</strong> The
              principal asks for their data to be corrected. The current value
              updates, and an audit trail of corrections accompanies it. The
              audit trail is what proves to a regulator that you do not silently
              overwrite history.
            </p>
            <p>
              <strong className="text-text-primary">Erasure.</strong> The
              principal asks for their data to be deleted. The hard part is not
              the row; it is the propagation. Backups, replicas, derived tables,
              search indexes, training sets, exports already shared with
              sub-processors. Erasure means a deletion task that fans out across
              every surface, with a per-surface receipt. The data principal gets
              one summary; the audit log gets the full set.
            </p>
            <p>
              <strong className="text-text-primary">Grievance.</strong> The
              principal complains. They get a first response inside the SLA you
              publish, from a real person whose role is named. The grievance
              officer is a function of the system, not a separate org chart.
              Ticketing pattern, not a mailbox.
            </p>
            <p>
              <strong className="text-text-primary">Nomination.</strong> The
              principal can name a person to act on their behalf. Most teams
              forget this exists. The data model needs a nominee field, the
              rights endpoints need to accept the nominee&rsquo;s authorisation,
              and the audit log needs to show that the act was performed under
              the nominee&rsquo;s authority.
            </p>
          </Section>

          <Section heading="Breach notification">
            <p>
              The Act requires notification to the Board and to affected
              principals within stated timelines, and the timelines are short. A
              team that finds out about a breach on day three has already lost
              the window.
            </p>
            <p>
              The pattern is upstream. Every change to sensitive data writes to
              an immutable log: who, what, when, from where, under which
              authorisation. Anomaly detection runs against the log, not against
              the application surface. The first signal is &ldquo;row touched
              without an authenticated session in the request chain,&rdquo; not
              &ldquo;customer complained.&rdquo;
            </p>
            <p>
              The notification itself is templated and pre-approved.
              Incident-specific fields go in last; legal review on the template
              happens once; the notification leaves the door inside thirty
              minutes of confirmation. The runbook is rehearsed before there is a
              breach to test it on.
            </p>
            <p>
              The audit answer is &ldquo;we had a runbook before this
              happened.&rdquo; The audit failure is &ldquo;we drafted the notice
              on the day.&rdquo;
            </p>
          </Section>

          <Section heading="What this looks like, end to end">
            <p>
              DPDP compliance in a codebase is not a corner. It is the schema
              (consent ledger, retention envelope, audit log), the request flow
              (consent join at query time, rights workflows with SLAs), the
              deletion job (TTL plus deletion log plus propagation), the runbook
              (pre-templated notification, anomaly detection on the immutable
              log), and the boring day-to-day of column-level discipline.
            </p>
            <p>
              What is in your interest as the builder, separate from the Act, is
              that almost every one of these patterns also makes the rest of the
              system better. Audit logs help you debug. Consent ledgers help you
              reason about feature flags. Deletion propagation forces you to
              know your data flow. The Act is not a tax on the system; it is,
              for systems that take it seriously from week one, a forcing
              function on the architecture.
            </p>
            <p>
              This is the engineering view. For the legal view, qualified
              counsel still does the work that qualified counsel does. Where I
              can help is in mapping the architecture so that review can land,
              and in pointing at a published case study where this posture met
              an actual regulator&rsquo;s expectation. The case study below
              opens the engagement that this piece&rsquo;s patterns came from,
              at the architectural depth this piece skipped.
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
                A multi-tenant Management Information System with row-level
                security, client-side field-level encryption, offline-first
                field capture, and India data residency. Threat model in week
                one, RBI controls mapped by week five.
              </p>
              <span className="text-sm font-medium text-gold group-hover:underline inline-flex items-center gap-1.5">
                Read the case study
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          </div>

          <BrushStrokeDivider variant={1} className="my-12 opacity-60" />

          {/* Disclaimer */}
          <div className="text-sm text-text-tertiary leading-relaxed border-l border-gold/30 pl-4 italic">
            This piece is the engineering view of DPDP Act 2023 compliance for
            SaaS architects. It is not legal advice and is not a substitute for
            qualified counsel. Statute references are deliberately at the level
            of obligation, not section number; for a binding reading of any
            specific provision, consult an advocate qualified in Indian data
            protection law.
          </div>

          {/* CTA */}
          <div className="mt-16 pt-10 border-t border-text-primary/5">
            <p className="text-sm font-medium text-gold uppercase tracking-widest mb-3">
              Considering a DPDP-aligned build?
            </p>
            <h3 className="font-heading text-2xl md:text-3xl text-text-primary tracking-tight mb-4">
              Start a conversation.
            </h3>
            <p className="text-text-secondary leading-relaxed mb-6 max-w-xl">
              We respond within 48 business-day hours with a sketch of how we
              would approach the architecture and what the regulatory posture
              would cost in engineering time.
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
  )
}
