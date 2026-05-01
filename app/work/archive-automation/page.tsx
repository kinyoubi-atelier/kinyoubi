import type { Metadata } from 'next'
import ArchiveAutomationContent from './ArchiveAutomationContent'
import { JsonLd } from '@/components/seo/JsonLd'
import { buildArticleSchema, buildBreadcrumbSchema } from '@/lib/schema'

const title = 'Python fuzzy matching and record linkage for an LPG distributorship: case study'
const description =
  'A Python idempotent pipeline using rapidfuzz for record linkage and fuzzy duplicate merging across a 4,000-record LPG distributorship archive. Replaced 14 hours of manual triage with a sub-minute re-run.'

const articleSchema = buildArticleSchema({
  url: '/work/archive-automation',
  headline: title,
  description,
  datePublished: '2026-04-09T00:00:00.000Z',
  dateModified: '2026-05-01T00:00:00.000Z',
})

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: 'Home', url: '/' },
  { name: 'Work', url: '/work' },
  { name: 'Consumer archive automation', url: '/work/archive-automation' },
])

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/work/archive-automation' },
  openGraph: {
    title,
    description,
    url: '/work/archive-automation',
    type: 'article',
  },
  twitter: {
    title,
    description,
  },
}

export default function ArchiveAutomationPage() {
  return (
    <>
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema} />
      <ArchiveAutomationContent />
    </>
  )
}
