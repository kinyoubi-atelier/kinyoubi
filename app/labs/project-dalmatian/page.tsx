import type { Metadata } from 'next'
import ProjectDalmatianContent from './ProjectDalmatianContent'

export const metadata: Metadata = {
  title: 'Project Dalmatian — labs · Kinyoubi Atelier & Co.',
  description:
    'In-progress build log of an Indian legal-drafting workspace anchored to the gazette. Pre-launch artefact. Direct-link only.',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
}

export default function ProjectDalmatianPage() {
  return <ProjectDalmatianContent />
}
