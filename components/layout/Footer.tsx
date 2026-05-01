import Link from 'next/link'
import { SITE, NAV_LINKS, LEGAL_LINKS } from '@/lib/constants'
import { Wordmark } from '@/components/ui/Wordmark'

/*
  Footer — Kinyoubi-House.

  Same surface as the page (no inverted dark background). The
  visual differentiation that the old dark footer provided is
  replaced by a gold hairline at the top edge and generous
  vertical breathing room. The wordmark stays left-aligned to
  match the masthead. Copyright sits in a quieter strip beneath
  a hairline rule, in tertiary ink.
*/
export function Footer() {
  return (
    <footer className="bg-background text-text-primary border-t border-gold/40">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="flex flex-col gap-4">
            <Wordmark size="lg" variant="inline" className="items-start" />
            <p className="text-sm text-text-secondary max-w-xs leading-relaxed">
              {SITE.tagline}
            </p>
          </div>

          <nav aria-label="Footer navigation">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-text-tertiary mb-4">
              Navigate
            </h2>
            <ul className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-secondary hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col gap-6">
            <nav aria-label="Legal links">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-text-tertiary mb-4">
                Legal
              </h2>
              <ul className="flex flex-col gap-3">
                {LEGAL_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-text-secondary hover:text-gold transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <a
              href={`mailto:${SITE.email}`}
              className="text-sm text-text-secondary hover:text-gold transition-colors"
            >
              {SITE.email}
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-hairline px-6 md:px-12 py-6">
        <p className="text-center text-xs text-text-tertiary">
          {SITE.copyright}
        </p>
      </div>
    </footer>
  )
}
