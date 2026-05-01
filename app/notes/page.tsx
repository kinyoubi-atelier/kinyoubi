import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { notes } from '@/lib/notes'

const description =
  'Engineering notes from Kinyoubi Atelier & Co. on DPDP Act compliance, multi-tenant architecture, constraint solvers, fuzzy record linkage, and the long tail of regulated SaaS work.'

export const metadata: Metadata = {
  title: 'Notes',
  description,
  alternates: { canonical: '/notes' },
  openGraph: {
    description,
    url: '/notes',
    type: 'website',
  },
  twitter: { description },
}

export default function NotesIndexPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="py-20 md:py-28 px-6 md:px-12 border-b border-text-primary/5">
        <div className="max-w-4xl mx-auto">
          <p className="text-sm font-medium text-gold uppercase tracking-widest mb-4">Notes</p>
          <h1 className="font-heading text-hero-sm md:text-hero text-text-primary tracking-tight mb-6 leading-tight">
            Engineering notes from the studio.
          </h1>
          <p className="text-lg md:text-xl text-text-secondary leading-relaxed max-w-2xl">
            Working notes on the architecture, regulation, and craft of the
            systems we build. Written for the architect at the schema design
            step, not the buyer at the brochure step.
          </p>
        </div>
      </section>

      {/* List */}
      <section className="py-16 md:py-24 px-6 md:px-12">
        <div className="max-w-4xl mx-auto space-y-6 md:space-y-8">
          {notes.map((note) => (
            <Link
              key={note.slug}
              href={`/notes/${note.slug}`}
              className="group block card-hover-lift rounded-card border border-text-primary/5 hover:border-gold/25 bg-background-alt shadow-card p-6 md:p-10"
            >
              <p className="text-xs text-text-tertiary uppercase tracking-widest mb-3">
                {note.topic} · {note.date}
              </p>
              <h2 className="font-heading text-2xl md:text-3xl text-text-primary tracking-tight mb-3 leading-snug">
                {note.title}
              </h2>
              <p className="text-text-secondary leading-relaxed mb-5 max-w-2xl">
                {note.blurb}
              </p>
              <span className="text-sm font-medium text-gold group-hover:underline inline-flex items-center gap-1.5">
                Read the note
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
