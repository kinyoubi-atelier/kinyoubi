import type { Metadata } from 'next'
import TimetableEngineContent from './TimetableEngineContent'

export const metadata: Metadata = {
  title: 'Case study: Building a timetable management engine from the solver up | Kinyoubi Atelier & Co.',
  description:
    'An in house R&D build from Kinyoubi Atelier & Co.: a pnpm monorepo spanning a pure TypeScript CSP solver, a multi tenant Postgres platform under Row Level Security, a Fastify REST API, and a role aware React surface, shipped end to end under one roof.',
}

export default function TimetableEnginePage() {
  return <TimetableEngineContent />
}
