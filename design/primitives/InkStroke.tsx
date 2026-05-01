'use client'

/**
 * InkStroke
 *
 * Seijaku purpose
 * A brush stroke that draws itself from one end to the other, using
 * framer-motion's pathLength animation on a single SVG path. This is the
 * atomic gesture the studio vocabulary is built from: underlines beneath
 * hero headings, seal marks, and the signature object candidates for case
 * study hero surfaces in Wave 2. One stroke per surface is the rule; this
 * primitive does not enforce it, the consumer does.
 *
 * Implementation note (2026-05-02)
 * The previous version drove the animation from a local useState +
 * IntersectionObserver pair. Under React 19 + Next 16 that combination
 * raced with framer-motion's animation lifecycle: animations stalled
 * partway through (the home-hero stroke was stuck at ~22% in production)
 * and below-the-fold strokes never started at all. This rewrite uses
 * framer-motion's own whileInView + viewport API instead, which is
 * StrictMode-safe by design and removes the race entirely.
 *
 * Contract
 *   a) Exactly one path. If the intended mark is a compound shape, it is
 *      not a stroke; use SVG elsewhere.
 *   b) Duration defaults to DURATION_SETTLE because a finishing line is
 *      an arrival.
 *   c) Reduced motion renders the stroke fully drawn from the first
 *      frame. The still composition is the completed stroke itself, not
 *      an empty canvas.
 *   d) Draws once on enter-in-view (viewport.once: true). Does not
 *      replay on re-enter.
 *   e) The stroke colour defaults to currentColor so surrounding text
 *      colour controls the ink. Consumers who need a specific ink pass
 *      an explicit value, typically var(--ink-sumi) or var(--seal-red).
 */

import { motion, useReducedMotion } from 'framer-motion'

import {
  DURATION_SETTLE,
  EASE_INK_ARRAY,
  msToSec,
} from '../tokens/motion'

interface InkStrokeProps {
  /** SVG path data. A single contiguous path. */
  d: string
  /** Total draw duration in milliseconds. Defaults to DURATION_SETTLE. */
  durationMs?: number
  /** Delay before the draw begins, in milliseconds. */
  delay?: number
  /** Stroke width in SVG user units. */
  strokeWidth?: number
  /** Stroke colour. Defaults to currentColor so the stroke inherits from
   *  surrounding type. Pass var(--ink-sumi) or var(--seal-red) explicitly
   *  when the mark should read independently of text colour. */
  color?: string
  /** Viewport width for the embedded SVG. Consumers size the container; the
   *  SVG is set to preserveAspectRatio none so it stretches to fit. */
  viewBox?: string
  /** Optional className for the wrapping svg element. */
  className?: string
  /** Optional accessible label. If omitted, the SVG is marked decorative. */
  ariaLabel?: string
}

export function InkStroke({
  d,
  durationMs = DURATION_SETTLE,
  delay = 0,
  strokeWidth = 2,
  color = 'currentColor',
  viewBox = '0 0 100 10',
  className,
  ariaLabel,
}: InkStrokeProps) {
  const prefersReducedMotion = useReducedMotion()

  const ariaProps = ariaLabel
    ? { role: 'img', 'aria-label': ariaLabel }
    : { 'aria-hidden': true as const }

  // Reduced motion: render the stroke fully drawn from the first frame
  // by setting initial directly to pathLength: 1 and skipping whileInView
  // entirely. The composition at rest is the completed stroke, not an
  // empty canvas.
  const initial = prefersReducedMotion
    ? { pathLength: 1 as const }
    : { pathLength: 0 as const }
  const whileInView = prefersReducedMotion
    ? undefined
    : { pathLength: 1 as const }

  return (
    <svg
      className={className}
      viewBox={viewBox}
      preserveAspectRatio="none"
      fill="none"
      {...ariaProps}
    >
      <motion.path
        d={d}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={initial}
        whileInView={whileInView}
        viewport={{ once: true, amount: 0.2 }}
        transition={{
          duration: msToSec(durationMs),
          delay: msToSec(delay),
          ease: EASE_INK_ARRAY as unknown as number[],
        }}
      />
    </svg>
  )
}
