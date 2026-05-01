import type { Metadata } from 'next'
import ServicesContent from './ServicesContent'

const description =
  'Custom software for institutions: ERPs, accounting modules, data platforms, and DBMS work for private corporates, government departments, and educational institutions. Plus product engineering, AI-powered workflow automation, and technical consulting.'

export const metadata: Metadata = {
  title: 'Services',
  description,
  alternates: { canonical: '/services' },
  openGraph: {
    description,
    url: '/services',
    type: 'website',
  },
  twitter: { description },
}

export default function ServicesPage() {
  return <ServicesContent />
}
