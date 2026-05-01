import type { Metadata } from 'next'
import ArchiveAutomationContent from './ArchiveAutomationContent'

const description =
  'A Python idempotent pipeline using rapidfuzz for record linkage and fuzzy duplicate merging across a 4,000-record LPG distributorship archive. Replaced 14 hours of manual triage with a sub-minute re-run.'

export const metadata: Metadata = {
  title: 'Python fuzzy matching and record linkage for an LPG distributorship: case study',
  description,
  alternates: { canonical: '/work/archive-automation' },
  openGraph: {
    title: 'Python fuzzy matching and record linkage for an LPG distributorship: case study',
    description,
    url: '/work/archive-automation',
    type: 'article',
  },
  twitter: {
    title: 'Python fuzzy matching and record linkage for an LPG distributorship: case study',
    description,
  },
}

export default function ArchiveAutomationPage() {
  return <ArchiveAutomationContent />
}
