import type { Metadata } from 'next'
import ContactContent from './ContactContent'

const description = 'Get in touch with Kinyoubi Atelier & Co. We respond within 48 hours, business days.'

export const metadata: Metadata = {
  title: 'Contact',
  description,
  alternates: { canonical: '/contact' },
  openGraph: {
    description,
    url: '/contact',
    type: 'website',
  },
  twitter: { description },
}

export default function ContactPage() {
  return <ContactContent />
}
