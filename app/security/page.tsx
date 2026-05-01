import type { Metadata } from 'next'
import SecurityContent from './SecurityContent'

const description =
  'GDPR and DPDP Act alignment, hosting, data at rest and in transit, incident response, sub-processors, DPA availability, and published Core Web Vitals for Kinyoubi Atelier & Co.'

export const metadata: Metadata = {
  title: 'Security & data protection',
  description,
  alternates: { canonical: '/security' },
  openGraph: {
    description,
    url: '/security',
    type: 'website',
  },
  twitter: { description },
}

export default function SecurityPage() {
  return <SecurityContent />
}
