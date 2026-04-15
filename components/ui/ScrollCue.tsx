'use client'

import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { DURATION_SETTLE, EASE_INK_ARRAY, msToSec } from '@/design/tokens/motion'

/**
 * ScrollCue
 *
 * A single faint vertical stroke at the bottom of the home hero. Grows from
 * nothing to a 40 px line, then fades out. The whole gesture spans roughly
 * two seconds and fires exactly once per session: a session storage flag
 * prevents repeats on subsequent home visits within the same tab.
 *
 * Seijaku purpose
 *   a) Frames the bottom of the first viewport and paces the visitor toward
 *      the second beat of the page without an arrow that says "click here".
 *   b) If removed the hero ends in a hard cut against the next section. The
 *      stroke is a comma, not a flourish.
 *   c) Rewards the lingerer who watches it draw and dissolve. The hurried
 *      visitor scrolls past it and never sees it again that session.
 *   d) A 2022 SaaS page would loop a bouncing chevron forever. A drawn line
 *      that retires after one breath does not belong there.
 *   e) Reduced motion: the line appears at full opacity for a moment and
 *      fades, with no draw. Still considered, not a freeze.
 *
 * The element is decoration only and is marked aria-hidden. Pointer events
 * are disabled so it never blocks the scroll affordances behind it.
 */
const SESSION_KEY = 'kinyoubi.scrollcue.shown'

export function ScrollCue() {
  const reducedMotion = useReducedMotion()
  const [shouldRender, setShouldRender] = useState(false)

  useEffect(() => {
    // SSR safety: window is undefined during the first render pass.
    if (typeof window === 'undefined') return

    try {
      if (window.sessionStorage.getItem(SESSION_KEY) === '1') {
        return
      }
      window.sessionStorage.setItem(SESSION_KEY, '1')
    } catch {
      // Private mode or quota: render once for this mount, do not throw.
    }

    setShouldRender(true)
  }, [])

  if (!shouldRender) return null

  // Reduced motion: full-opacity line that fades over DURATION_SETTLE without
  // a height grow. Still composition is a calm vertical mark that retires.
  if (reducedMotion) {
    return (
      <motion.span
        aria-hidden="true"
        initial={{ opacity: 0.6 }}
        animate={{ opacity: 0 }}
        transition={{
          duration: msToSec(DURATION_SETTLE),
          delay: msToSec(DURATION_SETTLE),
          ease: EASE_INK_ARRAY as unknown as number[],
        }}
        className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 block h-10 w-px bg-[var(--ink-sumi)]/40"
      />
    )
  }

  // Default: grow from 0 to 40 px while ramping opacity in, then fade out.
  // Two beats of DURATION_SETTLE deliver the ~2 s arc the wave plan asked
  // for, sourced from tokens rather than hard-coded.
  return (
    <motion.span
      aria-hidden="true"
      initial={{ opacity: 0, scaleY: 0 }}
      animate={{ opacity: [0, 0.6, 0], scaleY: [0, 1, 1] }}
      transition={{
        duration: msToSec(DURATION_SETTLE) * 2,
        times: [0, 0.4, 1],
        ease: EASE_INK_ARRAY as unknown as number[],
      }}
      style={{ transformOrigin: 'top center' }}
      className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 block h-10 w-px bg-[var(--ink-sumi)]"
    />
  )
}
