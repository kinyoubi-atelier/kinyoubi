import type { Metadata } from 'next'
import { SITE } from '@/lib/constants'
import HomeContent from './HomeContent'

// Home page uses the layout's default title (just SITE.name) so the
// template suffix is not duplicated.
export const metadata: Metadata = {
  description: SITE.description,
  alternates: { canonical: '/' },
  openGraph: {
    description: SITE.description,
    url: '/',
    type: 'website',
  },
}

export default function HomePage() {
  return <HomeContent />
}
