'use client'

import { ReactNode } from 'react'
import { MotionConfig, motion, useReducedMotion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { DURATION_GLANCE, EASE_SUMI_ARRAY, msToSec } from '@/design/tokens/motion'

/**
 * Template
 *
 * Next.js App Router renders this wrapper around every route's children and
 * remounts it on navigation. That remount is what gives us a clean handle
 * for a page transition without touching the persistent layout chrome
 * (Header, Footer, AtmosphereLayer, Signature, CookieConsent — all live
 * in app/layout.tsx and stay still during route changes).
 *
 * Wave 6 transition
 *   The new content fades in over DURATION_GLANCE (300 ms) with EASE_SUMI,
 *   and a horizontal ink wipe sweeps from left to right behind it over the
 *   first ~400 ms of the same window. The wipe is a thin gradient bar at
 *   the top of the main region; it is not a full-screen black flash, and
 *   it does not gate render. Content is visible from frame one; the wipe
 *   sits above it and clears.
 *
 * Reduced motion
 *   No wipe. The content crossfades over half of DURATION_GLANCE (150 ms).
 *   The still composition is the page itself — there is nothing to freeze.
 *
 * Wave 7 reduced motion safety net
 *   MotionConfig wraps every route with reducedMotion="user". Framer motion
 *   reads the user's prefers-reduced-motion media query and, when reduce is
 *   set, immediately resolves all transform animations to their target values
 *   while letting opacity and colour cross fades play. Two consequences:
 *
 *     a) Every consumer of motion.div across the codebase that uses the
 *        common pattern initial opacity 0 y 20 whileInView opacity 1 y 0 now
 *        renders at y 0 from the first frame and only the opacity crossfades.
 *        The still composition is the layout the designer intended.
 *
 *     b) Primitives that already branch explicitly on useReducedMotion
 *        (Reveal, SlowFade, InkStroke, BreathingGroup, Signature, ScrollCue,
 *        the case study motifs) are unaffected — their early return in the
 *        reduced branch fires before any framer animation is configured.
 *
 *   This is the systemic backstop the charter rule 5 asks for: every animated
 *   element in the codebase has a considered still composition, whether or
 *   not its author remembered to wire useReducedMotion.
 *
 * Performance note
 *   pointer-events-none on the wipe layer; absolute, not fixed, so it does
 *   not stack over Header. CSS-driven opacity transition; no observers.
 */
interface TemplateProps {
  children: ReactNode
}

export default function Template({ children }: TemplateProps) {
  const pathname = usePathname()
  const reducedMotion = useReducedMotion()

  const fadeDuration = reducedMotion
    ? msToSec(DURATION_GLANCE) / 2
    : msToSec(DURATION_GLANCE)

  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: fadeDuration,
          ease: EASE_SUMI_ARRAY as unknown as number[],
        }}
        className="relative"
      >
        {!reducedMotion && (
          <motion.span
            aria-hidden="true"
            initial={{ opacity: 0.18, scaleX: 0 }}
            animate={{ opacity: [0.18, 0.18, 0], scaleX: [0, 1, 1] }}
            transition={{
              duration: 0.4,
              times: [0, 0.6, 1],
              ease: EASE_SUMI_ARRAY as unknown as number[],
            }}
            style={{ transformOrigin: 'left center' }}
            className="pointer-events-none absolute left-0 right-0 top-0 z-10 block h-px bg-[var(--ink-sumi)]"
          />
        )}
        {children}
      </motion.div>
    </MotionConfig>
  )
}
