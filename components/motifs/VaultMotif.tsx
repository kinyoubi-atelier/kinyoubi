'use client'

/**
 * VaultMotif + VaultSealMark
 *
 * Seijaku purpose for the BFSI MIS case study.
 * Concentric hairline circles form an aperture; a quiet respiration
 * on the outermost ring suggests the vault is alive without making
 * it theatrical. The seal mark is the single crimson permitted on
 * the surface, stamped once near the compliance footer area. This
 * pair is the surface signature for the BFSI study, and only the
 * BFSI study.
 *
 * Seijaku translation test
 *   a) It frames the hero region as an aperture opening onto a
 *      regulated interior, pacing the reader's entry into a dense,
 *      compliance-heavy case study.
 *   b) Removing it would leave the BFSI page visually identical to
 *      the other two case studies; the aperture is what gives this
 *      page its silhouette at 50 metres.
 *   c) It rewards the lingerer. The respiration is slow enough that
 *      a scanning viewer does not notice it; a viewer who stays long
 *      enough to read the architecture diagram sees the outermost
 *      ring settle.
 *   d) A 2022 SaaS vault motif would use a gradient iris and a
 *      glossy lock icon. This motif is monochrome hairlines on paper.
 *   e) Reduced motion renders the hairlines fully present, no
 *      respiration; the seal is fully stamped on the first frame.
 *
 * Contract
 *   a) Both components are aria-hidden. No pointer events.
 *   b) VaultMotif: 5 to 7 concentric hairlines. Stroke colour is
 *      passed in by the consumer; default is deeper sumi-shifted gold.
 *   c) VaultSealMark: uses var(--seal-red) so it belongs to the
 *      texture-token palette, not to a local hex.
 *   d) One seal per surface. The consumer is responsible for not
 *      mounting two.
 */

import { useReducedMotion, motion } from 'framer-motion'

import {
  DURATION_BREATH,
  EASE_BREATH_ARRAY,
  msToSec,
} from '@/design/tokens/motion'

interface VaultMotifProps {
  /** Stroke colour for the hairlines. Defaults to deeper sumi-shifted
   *  BFSI accent. */
  color?: string
  /** Number of concentric rings. 5 to 7. Defaults to 6. */
  rings?: 5 | 6 | 7
  /** Optional className for the wrapping element. */
  className?: string
}

export function VaultMotif({
  color = '#6B5A28',
  rings = 6,
  className,
}: VaultMotifProps) {
  const prefersReducedMotion = useReducedMotion()

  // Six evenly spaced radii inside a 300-unit viewBox centred on
  // (150, 150). The outermost ring breathes; inner rings are static.
  const radii: number[] = []
  const baseRadius = 140
  const step = baseRadius / rings
  for (let i = 1; i <= rings; i++) {
    radii.push(step * i)
  }
  const outerIndex = radii.length - 1

  return (
    <div
      aria-hidden="true"
      className={className}
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <svg
        viewBox="0 0 300 300"
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid meet"
        style={{
          display: 'block',
          maxWidth: '720px',
          maxHeight: '100%',
          opacity: 0.22,
        }}
      >
        {radii.map((r, i) => {
          if (i === outerIndex && !prefersReducedMotion) {
            return (
              <motion.circle
                key={i}
                cx={150}
                cy={150}
                r={r}
                fill="none"
                stroke={color}
                strokeWidth={1}
                vectorEffect="non-scaling-stroke"
                animate={{ opacity: [1, 0.65, 1] }}
                transition={{
                  duration: msToSec(DURATION_BREATH * 2),
                  ease: EASE_BREATH_ARRAY as unknown as number[],
                  repeat: Infinity,
                  repeatType: 'loop',
                }}
              />
            )
          }
          return (
            <circle
              key={i}
              cx={150}
              cy={150}
              r={r}
              fill="none"
              stroke={color}
              strokeWidth={1}
              vectorEffect="non-scaling-stroke"
            />
          )
        })}
      </svg>
    </div>
  )
}

/**
 * VaultSealMark
 *
 * A single seal stamp in SEAL_RED. Rendered inline so the consumer
 * can place it in the compliance footer area (above or beside the
 * IPNotice, never inside it). It is an opaque circular mark with
 * an inner character-like form, large enough to read as a seal, not
 * a bullet. One per page.
 *
 * Reduced motion: the seal renders fully stamped on the first frame.
 * With motion allowed, it still enters fully stamped; the seal does
 * not animate in, because a seal is an act, not a transition.
 */
interface VaultSealMarkProps {
  /** Size of the seal in pixels. Defaults to 56. */
  size?: number
  /** Optional className forwarded to the wrapping element. */
  className?: string
}

export function VaultSealMark({
  size = 56,
  className,
}: VaultSealMarkProps) {
  return (
    <div
      aria-hidden="true"
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: size,
        height: size,
      }}
    >
      <svg
        viewBox="0 0 64 64"
        width={size}
        height={size}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer seal ring */}
        <circle
          cx={32}
          cy={32}
          r={28}
          fill="var(--seal-red)"
          opacity={0.92}
        />
        {/* Inner rim, negative space, reads as a hanko border */}
        <circle
          cx={32}
          cy={32}
          r={24}
          fill="none"
          stroke="var(--paper-warmth)"
          strokeWidth={1.25}
          opacity={0.65}
        />
        {/* Inner character-like cross, the impressed mark */}
        <path
          d="M 22 22 L 42 42 M 42 22 L 22 42"
          stroke="var(--paper-warmth)"
          strokeWidth={2.2}
          strokeLinecap="round"
          opacity={0.85}
        />
      </svg>
    </div>
  )
}
