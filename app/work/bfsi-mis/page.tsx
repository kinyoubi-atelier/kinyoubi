import type { Metadata } from 'next'
import BfsiMisContent from './BfsiMisContent'

const title = 'RBI-aligned and DPDP-ready MIS platform for a regulated Indian financial institution: case study'
const description =
  'A multi-tenant Management Information System with row-level security, client-side field-level encryption, offline-first field capture, and India data residency. Threat model in week one, RBI controls mapped by week five.'

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
  return <BfsiMisContent />
}
