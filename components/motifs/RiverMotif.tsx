'use client'

/**
 * RiverMotif
 *
 * Seijaku purpose for the Archive Automation case study.
 * A single horizontal hairline at the outer margin of the viewport
 * that follows the reader down the page at 0.2 times scroll speed.
 * It never catches them. It sits outside the reading column by
 * design; there is no parallax on body copy, by charter. This is
 * the surface signature for the Archive Automation study, and only
 * the Archive Automation study.
 *
 * Seijaku translation test
 *   a) It paces the reader. A study about a flow of records gets a
 *      silent horizontal current that moves with the reader, which
 *      is what the page is about.
 *   b) Removing it would leave the Archive Automation page visually
 *      identical to the other two case studies; the river is what
 *      gives this page its silhouette at 50 metres.
 *   c) It rewards the lingerer. At 0.2x scroll speed the line drifts
 *      so slowly that a quick read never registers it; a reader who
 *      scrolls slowly watches it trail.
 *   d) A 2022 SaaS page would use a coloured progress bar pinned to
 *      the top of the viewport. This is the opposite move: an outer
 *      margin hairline that is easy to miss.
 *   e) Reduced motion locks the line at its middle position, static,
 *      no scroll coupling. The still composition is a calm vertical
 *      margin stroke.
 *
 * Contract
 *   a) aria-hidden. No pointer events. No focusable content.
 *   b) Position is fixed to the viewport edge, outside the reading
 *      column. Defaults to the left edge so the signature enso at
 *      lower right is left unchallenged.
 *   c) Scroll coupling uses framer-motion useScroll + useTransform.
 *      The transform is clamped so the line always remains visible
 *      at its intended margin position.
 *   d) Stroke colour is the warmer paper accent. Consumer may
 *      override.
 */

import { useReducedMotion, useScroll, useTransform, motion } from 'framer-motion'

interface RiverMotifProps {
  /** Which viewport margin the line sits at. Defaults to 'left'. */
  side?: 'left' | 'right'
  /** Stroke colour. Defaults to the warmer paper accent. */
  color?: string
  /** Height of the line, as a CSS length. Defaults to 22vh. */
  length?: string
  /** Distance from the viewport edge, in pixels. Defaults to 18. */
  inset?: number
}

export function RiverMotif({
  side = 'left',
  color = '#B59557',
  length = '22vh',
  inset = 18,
}: RiverMotifProps) {
  const prefersReducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll()

  // Move the line down the viewport at 0.2x scroll speed. Clamped
  // so the line always stays visible at its margin position. Input
  // range 0 to 1 maps to a short translate window in vh units; the
  // clamping is implicit because useTransform already bounds to the
  // input range by default.
  const translateY = useTransform(
    scrollYProgress,
    [0, 1],
    ['0vh', '30vh'],
    { clamp: true },
  )

  if (prefersReducedMotion) {
    // Still composition: a static hairline at the middle of its
    // travel. A considered still, not a freeze.
    return (
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: '50%',
          [side]: inset,
          transform: 'translateY(-50%)',
          width: 1,
          height: length,
          backgroundColor: color,
          opacity: 0.35,
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />
    )
  }

  return (
    <motion.div
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: '30vh',
        [side]: inset,
        width: 1,
        height: length,
        backgroundColor: color,
        opacity: 0.35,
        pointerEvents: 'none',
        zIndex: 1,
        y: translateY,
      }}
    />
  )
}
