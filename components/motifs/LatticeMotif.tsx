'use client'

/**
 * LatticeMotif
 *
 * Seijaku purpose for the Timetable Engine case study.
 * A very fine grid, drawn once as an SVG pattern, that reads as the
 * constraint space inside which a solver breathes. Lines sit at 1 px.
 * The whole grid floats between opacity 0.10 and 0.14 across a cycle
 * longer than DURATION_BREATH so the surface never feels like it is
 * pulsing. This is the surface signature for the solver study, and
 * only the solver study.
 *
 * Seijaku translation test
 *   a) It frames the hero region of the Timetable Engine page as the
 *      inside of a constraint matrix, so the heading reads as a
 *      statement made against a structure.
 *   b) Removing it would leave the hero visually identical to the
 *      other two case studies; the lattice is what gives this page
 *      its silhouette at 50 metres.
 *   c) It rewards the lingerer. The breath is long enough that a
 *      scanning viewer never notices it move. A viewer who stays
 *      sees the grid settle and release.
 *   d) A 2022 SaaS grid would animate in on scroll and carry a
 *      colourful keyline. This lattice is monochrome, slow, and
 *      respects ma between cells.
 *   e) Reduced motion locks the grid at opacity 0.12 with no breath.
 *      The still composition is a calm constraint field.
 *
 * Contract
 *   a) aria-hidden. No pointer events. No focusable content.
 *   b) Stroke colour is passed in by the consumer so the component
 *      stays palette-agnostic. Default is the cool-shifted accent.
 *   c) Under prefers-reduced-motion the component returns the still
 *      composition on the first frame; no opacity animation is
 *      scheduled.
 */

import { useId } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

import {
  DURATION_BREATH,
  EASE_BREATH_ARRAY,
  msToSec,
} from '@/design/tokens/motion'

interface LatticeMotifProps {
  /** Stroke colour for the lattice. Defaults to the cool-shifted
   *  Timetable Engine accent. Pass a var() to pick up the override. */
  color?: string
  /** Grid spacing in pixels. Defaults to 28. Use 24 for a tighter
   *  weave, 32 for a more spacious one. */
  spacing?: number
  /** Optional className forwarded to the wrapping element. The
   *  wrapping element is absolutely positioned by default. */
  className?: string
}

export function LatticeMotif({
  color = '#7D8E6A',
  spacing = 28,
  className,
}: LatticeMotifProps) {
  const prefersReducedMotion = useReducedMotion()
  const patternId = useId()

  // Breath period is double DURATION_BREATH so the lattice never
  // reads as pulsing; a viewer who scans the page should never
  // catch it mid-cycle. Opacity swings 0.10 to 0.14.
  const animateProps = prefersReducedMotion
    ? undefined
    : { opacity: [0.1, 0.14, 0.1] }

  const initialOpacity = prefersReducedMotion ? 0.12 : 0.1

  return (
    <motion.div
      aria-hidden="true"
      className={className}
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        opacity: initialOpacity,
      }}
      animate={animateProps}
      transition={
        prefersReducedMotion
          ? undefined
          : {
              duration: msToSec(DURATION_BREATH * 2),
              ease: EASE_BREATH_ARRAY as unknown as number[],
              repeat: Infinity,
              repeatType: 'loop',
            }
      }
    >
      <svg
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        style={{ display: 'block' }}
      >
        <defs>
          <pattern
            id={patternId}
            width={spacing}
            height={spacing}
            patternUnits="userSpaceOnUse"
          >
            <path
              d={`M ${spacing} 0 L 0 0 0 ${spacing}`}
              fill="none"
              stroke={color}
              strokeWidth={1}
              vectorEffect="non-scaling-stroke"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </svg>
    </motion.div>
  )
}
