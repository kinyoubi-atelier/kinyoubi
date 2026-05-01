import type { Metadata } from 'next'
import Link from 'next/link'
import MsaContent from './MsaContent'

const description =
  'Master Services Agreement (MSA) for Kinyoubi Atelier & Co. Governs all software development, consulting, and regulatory research services.'

export const metadata: Metadata = {
  title: 'Master Services Agreement',
  description,
  alternates: { canonical: '/legal/msa' },
  openGraph: { description, url: '/legal/msa', type: 'article' },
  twitter: { description },
}

export default function MsaPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="py-20 md:py-28 px-6 md:px-12 border-b border-text-primary/5">
        <div className="max-w-3xl mx-auto">
          <Link href="/legal/terms" className="text-sm text-gold hover:underline mb-6 inline-block">
            ← All legal pages
          </Link>
          <h1 className="font-heading text-display-sm md:text-display text-text-primary tracking-tight mb-3">
            Master Services Agreement
          </h1>
          <p className="text-sm text-text-tertiary">Last updated: 12 April 2026</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-20 px-6 md:px-12">
        <div className="max-w-3xl mx-auto space-y-10">
          <MsaContent />

          {/* Navigation to other legal pages */}
          <div className="pt-10 border-t border-text-primary/5 flex flex-wrap gap-6">
            <Link href="/legal/dpa" className="text-sm text-gold hover:underline">Data Processing Addendum →</Link>
            <Link href="/legal/privacy" className="text-sm text-gold hover:underline">Privacy Policy →</Link>
            <Link href="/contact" className="text-sm text-gold hover:underline">Contact us →</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
