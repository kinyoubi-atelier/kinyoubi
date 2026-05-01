import type { Metadata } from 'next'
import WorkContent from './WorkContent'
import { JsonLd } from '@/components/seo/JsonLd'
import { buildBreadcrumbSchema } from '@/lib/schema'

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: 'Home', url: '/' },
  { name: 'Work', url: '/work' },
])

const description =
  'Published case studies: an OR-Tools constraint solver and timetabling platform, a Python fuzzy-matching record linkage pipeline, and an RBI-aligned and DPDP-ready MIS platform for a regulated financial institution.'

export const metadata: Metadata = {
  title: 'Work',
  description,
  alternates: { canonical: '/work' },
  openGraph: {
    description,
    url: '/work',
    type: 'website',
  },
  twitter: { description },
}

export default function WorkPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <WorkContent />
    </>
  )
}
