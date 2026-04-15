'use client'

/**
 * Reveal
 *
 * Seijaku purpose
 * The default enter-in-view primitive. Reveals what was already in the layout
 * rather than throwing something new at the viewer. An 8 px rise paired with
 * a slow crossfade, over DURATION_LINGER, on EASE_SUMI. Quiet by default.
 *
 * Contract
 *   a) Animates once. If a viewer scrolls back past, the move does not replay;
 *      a memory of stillness is preferable to a loop of motion.
 *   b) Honours prefers-reduced-motion by rendering the still composition from
 *      the first frame. The still composition is considered, not a freeze:
 *      opacity 1, no translate, no lingering opacity-0 ghost.
 *   c) Uses framer-motion because the site already depends on it; falling
 *      back to IntersectionObserver would duplicate a behaviour framer-motion
 *      already provides correctly.
 *   d) Accepts a polymorphic `as` prop so consumers can reveal semantic tags
 *      without wrapping in an extra div. Ma first; do not add DOM for the
 *      sake of the primitive.
 */

import { type ElementType, type ReactNode } from 'react'
import { motion, useReducedMotion, type Variants } from 'framer-motion'

import {
  DURATION_LINGER,
  EASE_SUMI_ARRAY,
  msToSec,
} from '../tokens/motion'

interface RevealProps {
  children: ReactNode
  /** Delay in milliseconds before the reveal begins. Defaults to 0. */
  delay?: number
  /** Duration in milliseconds. Defaults to DURATION_LINGER. Do not go below
   *  DURATION_CONSIDER without a written reason; short reveals read as snaps. */
  duration?: number
  /** Vertical travel in pixels. Defaults to 8. Clamped implicitly by the
   *  charter: anything above 16 feels like a throw, not a reveal. */
  distance?: number
  /** Polymorphic element type. Defaults to div so the primitive does not
   *  assert semantics. Pass section, article, ul, etc., as appropriate. */
  as?: ElementType
  /** Optional className forwarded to the rendered element. */
  className?: string
}

export function Reveal({
  children,
  delay = 0,
  duration = DURATION_LINGER,
  distance = 8,
  as = 'div',
  className,
}: RevealProps) {
  // useReducedMotion reads the media query and updates if the user toggles
  // the system preference. Returning the still composition early keeps the
  // render tree identical in motion and no-motion modes, which avoids hydration
  // flicker on the first paint.
  const prefersReducedMotion = useReducedMotion()

  const MotionTag = motion(as as ElementType) as ElementType

  if (prefersReducedMotion) {
    // Considered still composition: the element is fully present, in place,
    // from the first frame. No holding at opacity 0 waiting for an observer
    // that will never fire; that would read as a dead element.
    const Tag = as as ElementType
    return <Tag className={className}>{children}</Tag>
  }

  const variants: Variants = {
    hidden: { opacity: 0, y: distance },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: msToSec(duration),
        delay: msToSec(delay),
        ease: EASE_SUMI_ARRAY as unknown as number[],
      },
    },
  }

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={variants}
    >
      {children}
    </MotionTag>
  )
}
