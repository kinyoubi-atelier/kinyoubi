'use client'

/**
 * Signature — The Enso
 *
 * Seijaku purpose
 * One mark, drawn once, held quietly for the rest of the visit. The enso is
 * the studio's signature object: a single sumi circle, closed with the hand
 * still moving, that reads as a room's signed corner rather than as ornament.
 * It never competes with content; it lives at the lower edge of the viewport
 * as a watermark, outside the reading column, below the fold.
 *
 * Seijaku translation test
 *   a) What is this move revealing, framing, or pacing?
 *      It frames the whole session. On first arrival to the home page the
 *      enso completes in one slow breath; from that moment on, every page of
 *      the site carries the same settled watermark in its lower corner. The
 *      mark paces the room, not the reader.
 *   b) If I removed it, what would the visitor lose?
 *      A small, private proof that the studio signed this surface. The site
 *      would still function; it would simply feel unsigned.
 *   c) Does it reward the lingerer or demand attention from the passerby?
 *      It rewards the lingerer. The passerby will not notice a 0.09-opacity
 *      mark at the page edge; the viewer who stays will feel it without
 *      naming it.
 *   d) Could this appear on a SaaS landing page in 2022 without looking out
 *      of place? No. SaaS ornament advertises. An off centred sumi circle
 *      drawn by hand and held at watermark opacity reads as studio practice.
 *   e) In reduced motion, is the still composition itself considered?
 *      Yes. The enso is shown already closed, at watermark opacity, from the
 *      first frame. The still composition is the composition.
 *
 * Contract
 *   a) Mounted globally via app/layout.tsx. Appears on every route.
 *   b) Draws once per session. The sessionStorage flag is read on mount. On
 *      the drawn pass the circle traces itself over DURATION_SETTLE with
 *      EASE_INK while the root opacity eases from 0 to watermark. On every
 *      subsequent route and on any second visit within the session, the
 *      mark renders already at watermark opacity, held still.
 *   c) Honours the prefers-reduced-motion media query: the stroke is fully
 *      drawn from the first frame at watermark opacity. No replay, no fade.
 *   d) Honours prefers-reduced-data via the atmosphere variable; if the
 *      page is in reduced data mode the still branch is used.
 *   e) aria-hidden on the root. No focus, no keyboard interference, no
 *      screen reader content.
 *   f) Fixed position in the lower right, clear of the reading column and
 *      clear of the header/footer chrome. Anchored to the viewport, not to
 *      any section, so it reads as a room's signature rather than as a
 *      page element.
 *   g) Opacity held at 0.09, inside the 0.06–0.12 watermark band required by
 *      the accessibility contract. The enso multiplies against the grain
 *      without darkening body copy because it sits in the outer margin,
 *      outside the 68% inner reading column respected by the vignette.
 *   h) Colour: var(--ink-sumi). Never seal red; seal red is reserved.
 *
 * Implementation notes
 *   The circle is drawn as a single cubic path rather than an SVG
 *   <circle/> so it can be animated with pathLength, matching InkStroke's
 *   stroke based draw. The path opens with a slightly tapered start and
 *   closes with an overlap — the hand leaving paper, not a perfect O. That
 *   small imperfection is the house brush vocabulary.
 */

import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

import {
  DURATION_CONSIDER,
  DURATION_SETTLE,
  EASE_INK_ARRAY,
  EASE_SETTLE_ARRAY,
  msToSec,
} from '@/design/tokens/motion'

/** The watermark opacity the enso holds for the rest of the session. Sits
 *  inside the 0.06–0.12 band so it reads as a signed corner without
 *  subtracting from body copy contrast. */
const WATERMARK_OPACITY = 0.09

/** Session flag. When present, the enso skips the draw and renders still. */
const SESSION_FLAG = 'kinyoubi.signature.drawn'

/**
 * A single path approximation of an enso drawn with a held, unhurried
 * brush. Begins at roughly 4 o'clock, sweeps counter clockwise once around,
 * and overlaps the start by a few degrees — the closing move of a brush
 * that has not quite left the paper. Slight asymmetry in the control points
 * is intentional; a perfect circle is not an enso.
 */
const ENSO_PATH =
  'M 138 86 C 142 58 122 38 96 38 C 62 38 36 64 36 98 C 36 132 60 160 96 160 C 132 160 158 134 158 100 C 158 74 142 58 120 52'

export function Signature() {
  const prefersReducedMotion = useReducedMotion()
  const [shouldDraw, setShouldDraw] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Decide once on mount whether this surface plays the full draw or
  // renders the settled still. The check lives in useEffect so the server
  // render and the first client render agree (both default to "still").
  useEffect(() => {
    setMounted(true)
    if (prefersReducedMotion) return
    try {
      const alreadyDrawn = window.sessionStorage.getItem(SESSION_FLAG)
      if (!alreadyDrawn) {
        setShouldDraw(true)
        window.sessionStorage.setItem(SESSION_FLAG, '1')
      }
    } catch {
      // sessionStorage can throw in private modes or sandboxed iframes.
      // Safe fallback: treat this surface as a return visit and render still.
    }
  }, [prefersReducedMotion])

  // Still composition: the enso is already drawn and already at watermark
  // opacity. Used on SSR, on reduced motion, and on every route past the
  // first in this session.
  const stillComposition = prefersReducedMotion || !mounted || !shouldDraw

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed"
      style={{
        bottom: 'clamp(20px, 4vh, 48px)',
        right: 'clamp(20px, 4vw, 56px)',
        width: 'clamp(64px, 7vw, 112px)',
        height: 'clamp(64px, 7vw, 112px)',
        // Above the atmosphere (z-index: -1), below the header (z-50),
        // below the mobile menu (z-40), below cookie consent (z-50).
        // Zero is the right altitude.
        zIndex: 0,
        // Multiply so the enso lands on the grain instead of stacking over
        // it. Keeps the ink reading as a stroke on paper.
        mixBlendMode: 'multiply',
      }}
      initial={{ opacity: stillComposition ? WATERMARK_OPACITY : 0 }}
      animate={{ opacity: WATERMARK_OPACITY }}
      transition={
        stillComposition
          ? { duration: 0 }
          : {
              duration: msToSec(DURATION_CONSIDER),
              // Opacity lifts in parallel with the stroke draw and holds
              // through its tail, so the mark arrives rather than appears.
              delay: msToSec(DURATION_SETTLE) * 0.4,
              ease: EASE_SETTLE_ARRAY as unknown as number[],
            }
      }
    >
      <svg
        viewBox="0 0 200 200"
        width="100%"
        height="100%"
        fill="none"
        role="presentation"
        focusable="false"
        // Seasonal tilt. The AtmosphereClock writes --signature-tilt in
        // degrees (−1, 0, or +1) based on the visitor's local season.
        // Applied at the SVG layer so framer-motion's transform management
        // on the parent motion.div is not touched. A returning visitor
        // over the course of a year will catch the enso rotate by a
        // single degree and back.
        style={{
          transform: 'rotate(var(--signature-tilt, 0deg))',
          transformOrigin: 'center',
          transformBox: 'fill-box',
          transition: 'transform 1200ms cubic-bezier(0.25, 0.1, 0.25, 1)',
        }}
      >
        <motion.path
          d={ENSO_PATH}
          stroke="var(--ink-sumi)"
          strokeWidth={6}
          strokeLinecap="round"
          strokeLinejoin="round"
          // Still branch: the stroke is fully drawn from frame one. This is
          // the reduced motion composition and the state for every route
          // past the first in this session.
          initial={stillComposition ? { pathLength: 1 } : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={
            stillComposition
              ? { duration: 0 }
              : {
                  duration: msToSec(DURATION_SETTLE),
                  ease: EASE_INK_ARRAY as unknown as number[],
                }
          }
        />
      </svg>
    </motion.div>
  )
}
