'use client'

/**
 * InkStroke
 *
 * Seijaku purpose
 * A brush stroke that draws itself from one end to the other, using
 * stroke-dasharray and stroke-dashoffset on a single SVG path. This is the
 * atomic gesture the studio vocabulary is built from: underlines beneath
 * hero headings, seal marks, the signature object candidates for case study
 * hero surfaces in Wave 2. One stroke per surface is the rule; this
 * primitive does not enforce it, the consumer does.
 *
 * Contract
 *   a) Exactly one path. If the intended mark is a compound shape, it is not
 *      a stroke; use SVG elsewhere.
 *   b) Duration defaults to DURATION_SETTLE because a finishing line is an
 *      arrival.
 *   c) Reduced motion renders the stroke fully drawn from the first frame.
 *      The still composition is the completed stroke itself, not an empty
 *      canvas.
 *   d) Draws once on enter-in-view. Does not replay on re-enter.
 *   e) The stroke colour defaults to currentColor so surrounding text colour
 *      controls the ink. Consumers who need a specific ink pass an explicit
 *      value, typically var(--ink-sumi) or var(--seal-red).
 */

import { useEffect, useRef, useState } from 'react'
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
  const ref = useRef<SVGPathElement | null>(null)
  const [inView, setInView] = useState(false)

  // A local IntersectionObserver is used instead of framer-motion's
  // whileInView because the stroke animates via the path element's own
  // pathLength, which benefits from being triggered once with exact timing.
  useEffect(() => {
    if (prefersReducedMotion) return
    const node = ref.current
    if (!node) return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true)
            observer.disconnect()
            break
          }
        }
      },
      { threshold: 0.2 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [prefersReducedMotion])

  const ariaProps = ariaLabel
    ? { role: 'img', 'aria-label': ariaLabel }
    : { 'aria-hidden': true as const }

  return (
    <svg
      className={className}
      viewBox={viewBox}
      preserveAspectRatio="none"
      fill="none"
      {...ariaProps}
    >
      <motion.path
        ref={ref}
        d={d}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={prefersReducedMotion ? { pathLength: 1 } : { pathLength: 0 }}
        animate={prefersReducedMotion || inView ? { pathLength: 1 } : undefined}
        transition={{
          duration: msToSec(durationMs),
          delay: msToSec(delay),
          ease: EASE_INK_ARRAY as unknown as number[],
        }}
      />
    </svg>
  )
}
