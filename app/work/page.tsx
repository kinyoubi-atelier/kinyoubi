import type { Metadata } from 'next'
import WorkContent from './WorkContent'

export const metadata: Metadata = {
  title: 'Work | Kinyoubi Atelier & Co.',
  description:
    'Published case studies from Kinyoubi Atelier & Co.: a consumer archive reconciliation pipeline, a compliance first MIS platform for a regulated Indian financial institution, and an in house timetable management engine built end to end.',
}

export default function WorkPage() {
  return <WorkContent />
}
