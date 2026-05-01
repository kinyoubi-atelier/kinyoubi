/**
 * Static stat display.
 *
 * This used to be a Framer Motion in-view counter that counted up from 0
 * when scrolled into view. That was the source of the "0+" flash on the
 * homepage hero — first paint rendered `0 + suffix` until the in-view
 * observer fired (and if the viewport already included the section on
 * load, the observer race could leave it at 0 indefinitely on some
 * browsers).
 *
 * It was reattempted in the 2026-05-02 visual-engagement round (see
 * /Users/ankitsahu/.claude/plans/we-need-to-do-harmonic-lollipop.md
 * § A1) using a polled visibility check plus framer-motion's animate(),
 * but the animation refused to settle under React 19 + Next 16
 * StrictMode in dev: each mount's animation was cancelled before any
 * tick fired. The other four interventions in that round shipped fine;
 * this one is left as a passthrough until the StrictMode interaction
 * is understood. Keep the static render; the wrong fix is worse than
 * no animation here.
 *
 * Current behaviour: dumb passthrough. No hooks, no animation, no
 * in-view gate. The component is kept as a named export so any
 * lingering imports do not break the build.
 */

interface AnimatedCounterProps {
  value: string
  label: string
  /** @deprecated retained for API compatibility, ignored. */
  duration?: number
}

export function AnimatedCounter({ value, label }: AnimatedCounterProps) {
  return (
    <div className="text-center">
      <div className="text-4xl md:text-5xl font-heading text-text-primary mb-2">
        {value}
      </div>
      <div className="text-sm text-text-secondary">{label}</div>
    </div>
  )
}
