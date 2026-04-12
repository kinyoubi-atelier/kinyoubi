import type { Metadata } from 'next'
import Link from 'next/link'
import DpaContent from './DpaContent'

export const metadata: Metadata = {
  title: 'Data Processing Addendum | Kinyoubi Atelier & Co.',
  description:
    'Data Processing Addendum (DPA) for Kinyoubi Atelier & Co. GDPR-compliant and DPDP Act 2023 aligned.',
}

export default function DpaPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="py-20 md:py-28 px-6 md:px-12 border-b border-text-primary/5">
        <div className="max-w-3xl mx-auto">
          <Link href="/legal/terms" className="text-sm text-gold hover:underline mb-6 inline-block">
            ← All legal pages
          </Link>
          <h1 className="font-heading text-display-sm md:text-display text-text-primary tracking-tight mb-3">
            Data Processing Addendum
          </h1>
          <p className="text-sm text-text-tertiary">Last updated: 12 April 2026</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-20 px-6 md:px-12">
        <div className="max-w-3xl mx-auto space-y-10">
          <DpaContent />

          {/* Navigation to other legal pages */}
          <div className="pt-10 border-t border-text-primary/5 flex flex-wrap gap-6">
            <Link href="/legal/msa" className="text-sm text-gold hover:underline">Master Services Agreement →</Link>
            <Link href="/legal/privacy" className="text-sm text-gold hover:underline">Privacy Policy →</Link>
            <Link href="/security" className="text-sm text-gold hover:underline">Security & Data Protection →</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
