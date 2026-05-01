import type { Metadata } from 'next'
import TimetableEngineContent from './TimetableEngineContent'
import { JsonLd } from '@/components/seo/JsonLd'
import { buildArticleSchema, buildBreadcrumbSchema } from '@/lib/schema'

const title = 'OR-Tools constraint solver for school timetabling: case study'
const description =
  'An in-house OR-Tools CP-SAT solver, a multi-tenant platform with database-layer isolation, an API, and a role-aware front end, shipped end to end. Solves 5,000-variable timetables in 3.6 seconds at 94% allotment.'

const articleSchema = buildArticleSchema({
  url: '/work/timetable-engine',
  headline: title,
  description,
  datePublished: '2026-04-09T00:00:00.000Z',
  dateModified: '2026-05-01T00:00:00.000Z',
})

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: 'Home', url: '/' },
  { name: 'Work', url: '/work' },
  { name: 'OR-Tools timetabling engine', url: '/work/timetable-engine' },
])

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/work/timetable-engine' },
  openGraph: {
    title,
    description,
    url: '/work/timetable-engine',
    type: 'article',
  },
  twitter: {
    title,
    description,
  },
}

export default function TimetableEnginePage() {
  return (
    <>
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema} />
      <TimetableEngineContent />
    </>
  )
}
