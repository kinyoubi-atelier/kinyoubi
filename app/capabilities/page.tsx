import type { Metadata } from 'next'
import CapabilitiesContent from './CapabilitiesContent'

const description =
  'Frameworks the studio uses: software architecture, multi-agent orchestration, multi-tenant platform isolation, regulatory research, and risk management. Each engagement adapts these to its own terrain.'

export const metadata: Metadata = {
  title: 'Capabilities',
  description,
  alternates: { canonical: '/capabilities' },
  openGraph: {
    description,
    url: '/capabilities',
    type: 'website',
  },
  twitter: { description },
}

export default function CapabilitiesPage() {
  return <CapabilitiesContent />
}
