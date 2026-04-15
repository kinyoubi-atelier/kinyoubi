import type { Metadata } from 'next'
import TimetableEngineContent from './TimetableEngineContent'

export const metadata: Metadata = {
  title: 'Case study: Building a timetable management engine from the solver up | Kinyoubi Atelier & Co.',
  description:
    'An in house R&D build from Kinyoubi Atelier & Co.: a constraint engine, a multi tenant platform with isolation enforced at the database layer, an API, and a role aware surface, shipped end to end under one roof.',
}

export default function TimetableEnginePage() {
  return <TimetableEngineContent />
}
