import type { Metadata } from 'next'
import TimetableEngineContent from './TimetableEngineContent'

const description =
  'An in-house OR-Tools CP-SAT solver, a multi-tenant platform with database-layer isolation, an API, and a role-aware front end, shipped end to end. Solves 5,000-variable timetables in 3.6 seconds at 94% allotment.'

export const metadata: Metadata = {
  title: 'OR-Tools constraint solver for school timetabling: case study',
  description,
  alternates: { canonical: '/work/timetable-engine' },
  openGraph: {
    title: 'OR-Tools constraint solver for school timetabling: case study',
    description,
    url: '/work/timetable-engine',
    type: 'article',
  },
  twitter: {
    title: 'OR-Tools constraint solver for school timetabling: case study',
    description,
  },
}

export default function TimetableEnginePage() {
  return <TimetableEngineContent />
}
