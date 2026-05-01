import type { Metadata } from 'next'
import WorkContent from './WorkContent'

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
  return <WorkContent />
}
