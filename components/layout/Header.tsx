'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { NAV_LINKS } from '@/lib/constants'
import { BrandLockup } from '@/components/ui/BrandLockup'
import { cn } from '@/lib/utils'

/**
 * Header
 *
 * Wave 6 changes
 *   1. Nav link underline. The previous gold hairline that scaled from 0 to
 *      full width on hover has been removed in favour of the global nav-link
 *      underline rule in globals.css. That rule draws a left to right brush
 *      stroke on hover and on focus-visible over DURATION_GLANCE, retracts
 *      right to left on leave, and reads as a single language site wide.
 *   2. Current page indicator. The active route now wears a small SEAL_RED
 *      dot beneath the label. Replaces the implicit underline highlight that
 *      did not previously exist for active state. The dot is aria-hidden;
 *      the link itself carries aria-current="page" so assistive tech still
 *      announces the current location.
 */
export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname() ?? '/'

  /**
   * isActive
   *
   * A route is current when the pathname matches its href exactly, or when
   * it begins with the href followed by a slash. The latter handles nested
   * surfaces such as /work/archive-automation belonging under /work. Root
   * is intentionally excluded from prefix matching so the home logo does
   * not paint every nav item active.
   */
  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname === href || pathname.startsWith(`${href}/`)
  }

  return (
    <>
      <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b border-text-primary/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
          {/* Design mark */}
          <Link href="/" className="flex-shrink-0">
            <BrandLockup variant="light" size="md" hideOnMobile />
            <BrandLockup variant="light" size="sm" hideOnDesktop />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {NAV_LINKS.map((link) => {
              const active = isActive(link.href)
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    // nav-link is the global hook for the underline draw rule
                    // in globals.css. Keep this class even when active so the
                    // underline still acknowledges hover and focus.
                    'nav-link relative inline-block py-2 text-sm font-medium text-text-primary transition-colors hover:text-gold'
                  )}
                >
                  {link.label}
                  {active && (
                    <span
                      className="seal-dot"
                      aria-hidden="true"
                    />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-text-primary hover:bg-background-alt rounded-lg transition-colors"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
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
            className="fixed inset-0 top-[65px] md:hidden bg-surface-dark/95 backdrop-blur-md z-40"
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
                        className="relative inline-flex items-center text-text-on-dark text-3xl font-heading font-light hover:text-gold-bright transition-colors"
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
