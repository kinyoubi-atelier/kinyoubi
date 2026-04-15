'use client'

/**
 * SlowFade
 *
 * Seijaku purpose
 * A crossfade without translate, for surfaces where even a small vertical
 * move would feel theatrical. Legal pages, compliance footnotes, privacy
 * disclosures, long-form prose set as calm plates. Where Reveal carries a
 * breath, SlowFade carries only a reading of the ink.
 *
 * Contract
 *   a) Opacity-only. No y, no x, no scale.
 *   b) Duration defaults to DURATION_CONSIDER; shorter than Reveal because
 *      without translate the move has less distance to cover.
 *   c) Reduced motion resolves to opacity 1 on the first frame. The still
 *      composition is the text at rest; no ghost, no fade holding.
 *   d) once true. A re-enter-in-view fade would draw attention to the frame
 *      boundary, which is exactly what a calm page must not do.
 */

import { type ElementType, type ReactNode } from 'react'
import { motion, useReducedMotion, type Variants } from 'framer-motion'

import {
  DURATION_CONSIDER,
  EASE_SETTLE_ARRAY,
  msToSec,
} from '../tokens/motion'

interface SlowFadeProps {
  children: ReactNode
  /** Delay in milliseconds before the fade begins. Defaults to 0. */
  delay?: number
  /** Duration in milliseconds. Defaults to DURATION_CONSIDER. */
  duration?: number
  /** Polymorphic element type. Defaults to div. */
  as?: ElementType
  /** Optional className forwarded to the rendered element. */
  className?: string
}

export function SlowFade({
  children,
  delay = 0,
  duration = DURATION_CONSIDER,
  as = 'div',
  className,
}: SlowFadeProps) {
  const prefersReducedMotion = useReducedMotion()

  const MotionTag = motion(as as ElementType) as ElementType

  if (prefersReducedMotion) {
    const Tag = as as ElementType
    return <Tag className={className}>{children}</Tag>
  }

  const variants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: msToSec(duration),
        delay: msToSec(delay),
        ease: EASE_SETTLE_ARRAY as unknown as number[],
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
