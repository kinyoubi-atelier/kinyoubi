'use client'

/**
 * AtmosphereClock
 *
 * Seijaku purpose
 * The site reads the visitor's timezone and local clock, and adjusts the
 * light wash direction, the light wash warmth, the atmosphere dim factor,
 * the enso tilt, and the vignette opacity accordingly. Subtle enough that
 * a first time visitor will not name it. Present enough that a returning
 * visitor perceives that the room is not the same every time.
 *
 * Privacy note
 * Location inference uses only Intl.DateTimeFormat().resolvedOptions().
 * timeZone. The visitor's IP is not inspected. No third party service is
 * called. No permission prompt is shown. The studio's posture on judgment
 * extends to how it infers the room's hour.
 *
 * Reduced motion and reduced data
 * Both are handled at the CSS layer via --atmosphere-opacity, which the
 * media queries in globals.css set to 0.35 and 0 respectively. The
 * atmosphere uses calc(--atmosphere-opacity * --atmosphere-time-dim), so
 * these clock written variables compose with the accessibility overrides
 * without fighting them.
 */

import { useEffect } from 'react'
import { computeAtmosphereVars } from '@/lib/atmosphere-clock'

export function AtmosphereClock() {
  useEffect(() => {
    const apply = () => {
      try {
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
        if (!tz) return
        const vars = computeAtmosphereVars(tz, new Date())
        const root = document.documentElement.style
        root.setProperty('--light-x', vars.lightX)
        root.setProperty('--light-y', vars.lightY)
        root.setProperty('--light-wash-color', vars.lightWashColor)
        root.setProperty('--atmosphere-time-dim', vars.atmosphereTimeDim)
        root.setProperty('--signature-tilt', vars.signatureTilt)
        root.setProperty('--ink-vignette-opacity', vars.vignetteOpacity)
      } catch {
        // Any failure leaves CSS defaults in place. The static atmosphere
        // still reads as a composed room.
      }
    }

    apply()

    // Re apply when returning from background so the visitor who left the
    // tab in the morning and comes back in the evening sees the room they
    // are actually in.
    const onVisibilityChange = () => {
      if (!document.hidden) apply()
    }
    document.addEventListener('visibilitychange', onVisibilityChange)

    return () => {
      document.removeEventListener('visibilitychange', onVisibilityChange)
    }
  }, [])

  return null
}
