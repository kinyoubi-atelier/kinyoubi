/**
 * Motion tokens for Kinyoubi Atelier & Co.
 *
 * Seijaku purpose
 * Stillness is the signature. Every move in this system is long, curved, and
 * quiet. These tokens exist so that no component writes a magic duration or
 * improvises an ease curve. If a value does not live in this file, it does not
 * belong on the site.
 *
 * Contract
 *   a) Every duration is named by what the viewer is meant to feel, not by
 *      millisecond arithmetic.
 *   b) Every ease is named for the gesture it is imitating in sumi-e practice,
 *      not for its cubic-bezier coefficients.
 *   c) Nothing snaps. The shortest ambient duration is 300 ms, reserved for
 *      glances. A 60 ms press dip is allowed for direct touch feedback only.
 *   d) Reduced motion overrides these tokens at the primitive layer, not here.
 *      Consumers import the tokens directly and the primitive decides whether
 *      to honour them or lock to a still composition.
 */

/* Eases
 *
 * EASE_SUMI is the house default. It holds briefly at the start, moves with
 * intent through the middle, and settles with a long tail. Use it unless you
 * have a reason to reach for one of the others.
 *
 * EASE_INK is for stroke draws and ink bleeds. It commits early and trails
 * off, so a line finishes like a brush leaving paper.
 *
 * EASE_SETTLE is for objects arriving to rest. Starts and ends symmetrically.
 * Use it for anything that needs to look placed rather than thrown.
 *
 * EASE_BREATH is for respiration loops. A near-sinusoidal curve so opacity or
 * weight never looks like it is pulsing; it looks like it is breathing.
 */
export const EASE_SUMI = 'cubic-bezier(0.2, 0.6, 0.1, 1)' as const
export const EASE_INK = 'cubic-bezier(0.16, 0.84, 0.3, 1)' as const
export const EASE_SETTLE = 'cubic-bezier(0.25, 0.1, 0.25, 1)' as const
export const EASE_BREATH = 'cubic-bezier(0.45, 0.05, 0.55, 0.95)' as const

/* Framer Motion accepts an array of four numbers for custom cubic beziers.
 * These mirrors let motion components consume the same curves without having
 * to parse a CSS string. Keep these in lock-step with the strings above. */
export const EASE_SUMI_ARRAY = [0.2, 0.6, 0.1, 1] as const
export const EASE_INK_ARRAY = [0.16, 0.84, 0.3, 1] as const
export const EASE_SETTLE_ARRAY = [0.25, 0.1, 0.25, 1] as const
export const EASE_BREATH_ARRAY = [0.45, 0.05, 0.55, 0.95] as const

/* Durations, in milliseconds.
 *
 * The names describe the viewer's experience, not a clock. Ask which word
 * matches the feeling you are after, then use the corresponding number.
 *
 * GLANCE      a read in passing, for micro-state like a hover underline.
 * CONSIDER    a deliberate read, for reveals in content flow.
 * LINGER      a considered read, the default for hero-adjacent reveals.
 * SETTLE      an arrival with weight, for large objects coming to rest.
 * BREATH      the period of a respiration cycle, not a transition duration.
 *
 * PRESS is a direct-touch tactile dip reserved for button-press feedback in
 * Wave 6. It is documented here so no future contributor invents their own
 * tap duration. Nothing else in the system should be shorter than 300 ms.
 */
export const DURATION_GLANCE = 300 as const
export const DURATION_CONSIDER = 600 as const
export const DURATION_LINGER = 900 as const
export const DURATION_SETTLE = 1200 as const
export const DURATION_BREATH = 4200 as const
export const DURATION_PRESS = 60 as const

/* Stagger, in milliseconds.
 *
 * SHORT is for lists of near-equivalent items where the viewer reads them as
 * a single block. LONG is for lists where each item deserves its own beat,
 * such as case study cards or service pillars.
 */
export const STAGGER_SHORT = 90 as const
export const STAGGER_LONG = 180 as const

/* Helper: convert ms to the seconds that framer-motion expects. Keeping the
 * named tokens in milliseconds is easier to reason about; the conversion is
 * mechanical and belongs in one place. */
export const msToSec = (ms: number): number => ms / 1000

/* Framer Motion variants keyed by semantic name.
 *
 * Every primitive that wants a named motion consumes one of these. A component
 * never writes an inline transition object; it picks the variant that matches
 * the intent. If no variant fits, propose a new one to the orchestrator rather
 * than inline a custom transition.
 *
 * Each variants object follows the framer-motion shape of
 *   { hidden, visible } or { rest, loop }
 * so that consumers can pass them to motion.div without re-shaping.
 */

/**
 * revealUp — a gentle rise of 8 px paired with a crossfade. The default move
 * for content entering a viewport. Reveals what was already in the layout,
 * rather than throwing something new at the viewer.
 */
export const revealUp = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: msToSec(DURATION_LINGER),
      ease: EASE_SUMI_ARRAY,
    },
  },
} as const

/**
 * slowFade — opacity-only. Use on legal surfaces or any place where a
 * translate would feel theatrical. Pairs with SlowFade primitive.
 */
export const slowFade = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: msToSec(DURATION_CONSIDER),
      ease: EASE_SETTLE_ARRAY,
    },
  },
} as const

/**
 * strokeDraw — the variants a path uses to draw itself. Consumers pass this
 * to a motion.path with pathLength animation, and let EASE_INK carry the
 * brush off the page. The duration is SETTLE because a line finishing is an
 * arrival, not a flourish.
 */
export const strokeDraw = {
  hidden: { pathLength: 0, opacity: 0.9 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      duration: msToSec(DURATION_SETTLE),
      ease: EASE_INK_ARRAY,
    },
  },
} as const

/**
 * breath — the respiration loop. Opacity floats from 0.94 to 1.0 across a
 * full BREATH cycle. Consumers wrap this around a target that is already
 * visible and legible; breath never carries information.
 */
export const breath = {
  rest: { opacity: 1 },
  loop: {
    opacity: [1, 0.94, 1],
    transition: {
      duration: msToSec(DURATION_BREATH),
      ease: EASE_BREATH_ARRAY,
      repeat: Infinity,
      repeatType: 'loop' as const,
    },
  },
} as const

/**
 * staggerShort / staggerLong — container variants used by Reveal to cascade
 * children. Put the variants object on the container and let each child
 * consume revealUp.
 */
export const staggerShort = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: msToSec(STAGGER_SHORT),
      delayChildren: msToSec(DURATION_GLANCE),
    },
  },
} as const

export const staggerLong = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: msToSec(STAGGER_LONG),
      delayChildren: msToSec(DURATION_GLANCE),
    },
  },
} as const

/* A frozen registry of every public token, for self-audit at runtime or in
 * tests. If a consumer imports something not listed here, that import is a
 * mistake. */
export const MOTION_TOKENS = Object.freeze({
  EASE_SUMI,
  EASE_INK,
  EASE_SETTLE,
  EASE_BREATH,
  DURATION_GLANCE,
  DURATION_CONSIDER,
  DURATION_LINGER,
  DURATION_SETTLE,
  DURATION_BREATH,
  DURATION_PRESS,
  STAGGER_SHORT,
  STAGGER_LONG,
})

export type MotionTokenName = keyof typeof MOTION_TOKENS
