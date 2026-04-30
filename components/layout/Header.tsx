'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { NAV_LINKS } from '@/lib/constants'
import { Wordmark } from '@/components/ui/Wordmark'
import { cn } from '@/lib/utils'

/*
  Header — Kinyoubi-House masthead.

  Layout: wordmark on the left, nav on the right, separated by a
  hairline beneath the strip. The wordmark is the canonical firm
  identity and links to the home page; no separate icon mark sits
  beside it. The mobile drawer mirrors the masthead's ink discipline
  rather than inverting to a dark surface, so the page stays one
  visual surface from top to bottom.

  Active-page indicator: a small classification-red dot beneath
  the active nav label (`.seal-dot`). The dot is decorative; the
  link itself carries `aria-current="page"` for assistive tech.
*/
export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname() ?? '/'

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname === href || pathname.startsWith(`${href}/`)
  }

  return (
    <>
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-hairline/70">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between gap-6">
          {/* Wordmark, left-aligned. Single component, no kanji. */}
          <Link
            href="/"
            className="flex-shrink-0 group"
            aria-label="Kinyoubi Atelier & Co., home"
          >
            <Wordmark size="md" variant="inline" className="hidden md:inline-flex" />
            <Wordmark size="sm" variant="inline" className="md:hidden inline-flex" />
          </Link>

          {/* Desktop navigation, right-aligned. */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {NAV_LINKS.map((link) => {
              const active = isActive(link.href)
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? 'page' : undefined}
                  className="nav-link relative inline-block py-2 text-sm font-medium text-text-primary transition-colors hover:text-gold"
                >
                  {link.label}
                  {active && (
                    <span className="seal-dot" aria-hidden="true" />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Mobile menu button. */}
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-text-primary hover:bg-surface rounded-md transition-colors"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile menu. Same surface as the page (no inverted dark
          background) so the visual register stays consistent. */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="mobile-menu"
            role="navigation"
            aria-label="Mobile navigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-[65px] md:hidden bg-background/98 backdrop-blur-md z-40"
          >
            <motion.nav
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="h-full flex flex-col items-stretch"
            >
              <div className="flex flex-col py-12 px-8 gap-8">
                {NAV_LINKS.map((link, i) => {
                  const active = isActive(link.href)
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 + 0.1 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsMenuOpen(false)}
                        aria-current={active ? 'page' : undefined}
                        className={cn(
                          'relative inline-flex items-center text-3xl font-heading transition-colors',
                          active ? 'text-gold' : 'text-text-primary hover:text-gold',
                        )}
                      >
                        {link.label}
                        {active && (
                          <span
                            className="seal-dot seal-dot--mobile"
                            aria-hidden="true"
                          />
                        )}
                      </Link>
                    </motion.div>
                  )
                })}
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
