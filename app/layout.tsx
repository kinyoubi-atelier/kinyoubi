import type { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { AtmosphereLayer } from '@/components/atmosphere/AtmosphereLayer'
import { Signature } from '@/components/signature/Signature'
import { StructuredData } from './structured-data'
import { UmamiAnalytics, CrispChat } from '@/components/scripts/Analytics'
import { CookieConsent } from '@/components/ui/CookieConsent'
import { SITE } from '@/lib/constants'
import { cn } from '@/lib/utils'
import './globals.css'

// Title and OG title use Next.js metadata templates so child pages
// only set a short page title; the suffix and the og:title/twitter:title
// versions are derived once here.
const TITLE_SUFFIX = ` | ${SITE.name}`

export const metadata: Metadata = {
  title: {
    default: SITE.name,
    template: `%s${TITLE_SUFFIX}`,
  },
  description: SITE.description,
  authors: [{ name: SITE.founder }],
  creator: SITE.founder,
  metadataBase: new URL(SITE.url),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE.url,
    siteName: SITE.name,
    title: {
      default: SITE.name,
      template: `%s${TITLE_SUFFIX}`,
    },
    description: SITE.description,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Kinyoubi Atelier & Co. Software that ships. Complexity, handled.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: {
      default: SITE.name,
      template: `%s${TITLE_SUFFIX}`,
    },
    description: SITE.description,
    images: ['/og-image.png'],
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
  },
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <StructuredData />
      </head>
      <body className="flex flex-col min-h-screen">
        <AtmosphereLayer />
        <Signature />
        <a
          href="#main-content"
          className={cn(
            'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4',
            'focus:z-50 focus:px-4 focus:py-2 focus:bg-gold focus:text-ink',
            'focus:rounded-lg focus:text-sm'
          )}
        >
          Skip to main content
        </a>

        <Header />

        <main id="main-content" className="flex-1" role="main">
          {children}
        </main>

        <Footer />

        {/* Third-party scripts — loaded after interactive */}
        <UmamiAnalytics />
        <CrispChat />
        <CookieConsent />
      </body>
    </html>
  )
}
