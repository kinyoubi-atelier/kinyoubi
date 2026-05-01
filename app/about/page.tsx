import type { Metadata } from 'next'
import AboutContent from './AboutContent'

const description =
  'How the studio thinks about building software, and the formation behind it: aerospace, derivatives markets, software, and contract law.'

export const metadata: Metadata = {
  title: 'About',
  description,
  alternates: { canonical: '/about' },
  openGraph: {
    description,
    url: '/about',
    type: 'profile',
  },
  twitter: { description },
}

export default function AboutPage() {
  return <AboutContent />
}
