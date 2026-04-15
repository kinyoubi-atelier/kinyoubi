'use client'

/**
 * BreathingGroup
 *
 * Seijaku purpose
 * A respiration loop for a single target child. Opacity floats between 0.94
 * and 1.0, or a variable font weight shifts by a few units, across a long
 * BREATH cycle on EASE_BREATH. The effect is barely perceptible and that is
 * the point. The Home Hero Agent in Wave 4 wraps the hero heading with this
 * so the page reads as alive without reading as animated.
 *
 * Contract
 *   a) Only one breathing group per surface. Two would cancel each other out
 *      and make the page feel wobbly.
 *   b) Breath never carries information. If removing it changes what the
 *      viewer knows, the wrong element is wrapped.
 *   c) Reduced motion locks to the centre of the cycle. For opacity targets,
 *      that means opacity 1. For font-weight targets, the midpoint of the
 *      configured weight range. The composition at rest must read as
 *      deliberate, not as a frozen waypoint.
 *   d) Intensity is faint or gentle. Anything louder is a pulse, and a pulse
 *      is not a breath.
 */

import { type ReactNode, useMemo } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

import {
  DURATION_BREATH,
  EASE_BREATH_ARRAY,
  msToSec,
} from '../tokens/motion'

type BreathIntensity = 'faint' | 'gentle'
type BreathTarget = 'opacity' | 'weight'

interface BreathingGroupProps {
  children: ReactNode
  /** faint: ~3 percent swing. gentle: ~6 percent swing. Defaults to faint. */
  intensity?: BreathIntensity
  /** opacity: modulate alpha. weight: modulate font-variation-settings "wght".
   *  Defaults to opacity. Use weight only on a variable font. */
  target?: BreathTarget
  /** Centre weight for variable font breathing. Defaults to 500. Ignored
   *  when target is opacity. The swing is ±5 units at faint, ±10 at gentle. */
  centerWeight?: number
  /** Optional className forwarded to the rendered element. */
  className?: string
}

export function BreathingGroup({
  children,
  intensity = 'faint',
  target = 'opacity',
  centerWeight = 500,
  className,
}: BreathingGroupProps) {
  const prefersReducedMotion = useReducedMotion()

  // Compute the animation range once. For opacity, a faint breath moves from
  // 0.97 to 1.0; a gentle one from 0.94 to 1.0. For weight, a faint breath
  // shifts by ±5 around the centre; gentle by ±10. The variants object is
  // shaped to match framer-motion's keyframe array input.
  const animateProps = useMemo(() => {
    if (target === 'opacity') {
      const low = intensity === 'faint' ? 0.97 : 0.94
      return { opacity: [1, low, 1] }
    }
    const delta = intensity === 'faint' ? 5 : 10
    const low = centerWeight - delta
    const high = centerWeight + delta
    return {
      fontVariationSettings: [
        `"wght" ${centerWeight}`,
        `"wght" ${low}`,
        `"wght" ${centerWeight}`,
        `"wght" ${high}`,
        `"wght" ${centerWeight}`,
      ],
    }
  }, [intensity, target, centerWeight])

  if (prefersReducedMotion) {
    // Still composition. For opacity, full presence. For weight, the centre
    // weight so the text reads as the designer intended, not as a waypoint.
    const style =
      target === 'weight'
        ? { fontVariationSettings: `"wght" ${centerWeight}` }
        : undefined
    return (
      <div className={className} style={style}>
        {children}
      </div>
    )
  }

  return (
    <motion.div
      className={className}
      animate={animateProps}
      transition={{
        duration: msToSec(DURATION_BREATH),
        ease: EASE_BREATH_ARRAY as unknown as number[],
        repeat: Infinity,
        repeatType: 'loop',
      }}
    >
      {children}
    </motion.div>
  )
}
