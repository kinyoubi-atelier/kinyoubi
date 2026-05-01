import type { Metadata } from 'next'
import BfsiMisContent from './BfsiMisContent'
import { JsonLd } from '@/components/seo/JsonLd'
import { buildArticleSchema, buildBreadcrumbSchema } from '@/lib/schema'

const title = 'RBI-aligned and DPDP-ready MIS platform for a regulated Indian financial institution: case study'
const description =
  'A multi-tenant Management Information System with row-level security, client-side field-level encryption, offline-first field capture, and India data residency. Threat model in week one, RBI controls mapped by week five.'

const articleSchema = buildArticleSchema({
  url: '/work/bfsi-mis',
  headline: title,
  description,
  datePublished: '2026-04-09T00:00:00.000Z',
  dateModified: '2026-05-01T00:00:00.000Z',
})

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: 'Home', url: '/' },
  { name: 'Work', url: '/work' },
  { name: 'RBI-aligned MIS platform', url: '/work/bfsi-mis' },
])

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/work/bfsi-mis' },
  openGraph: {
    title,
    description,
    url: '/work/bfsi-mis',
    type: 'article',
  },
  twitter: {
    title,
    description,
  },
}

export default function BfsiMisPage() {
  return (
    <>
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema} />
      <BfsiMisContent />
    </>
  )
}
