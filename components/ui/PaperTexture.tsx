'use client'

/**
 * PaperTexture
 *
 * Seijaku purpose
 * A barely-visible monochrome paper grain rendered behind the page content
 * on prose-heavy surfaces (/about, /services). The texture is the public
 * asset at /textures/paper-grain.svg, a fractal-noise pattern in a single
 * black channel; we surface it at low opacity so it gives the eye somewhere
 * to settle between paragraphs without competing with ink.
 *
 * Contract
 *   a) Aria-hidden, pointer-events: none. Never participates in tab order
 *      or hit testing.
 *   b) Fixed to the viewport so the texture does not scroll. The reader
 *      passes through it like sliding paper across a desk.
 *   c) Opacity is theme-aware via the paperTextureOpacity CSS variable so
 *      light and dark modes can register the texture without the same value.
 *   d) Renders nothing if the user has disabled motion preferences AND has
 *      a contrast preference set; the texture is decorative, not load-
 *      bearing, so a reader who has asked for less visual noise gets less.
 *      Default reduced-motion behaviour is to keep the texture (it does not
 *      animate); only contrast-leaning preferences hide it.
 */

import { cn } from '@/lib/utils'

interface PaperTextureProps {
  /** Optional className forwarded to the wrapper. */
  className?: string
}

export function PaperTexture({ className }: PaperTextureProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'pointer-events-none fixed inset-0 -z-10 paper-texture-layer',
        // The CSS variable lets the texture register at slightly different
        // opacity per theme. Defaults are set in globals.css; instances can
        // override by passing className.
        'mix-blend-multiply dark:mix-blend-screen',
        className,
      )}
      style={{
        backgroundImage: 'url(/textures/paper-grain.svg)',
        backgroundSize: '256px 256px',
        backgroundRepeat: 'repeat',
        opacity: 'var(--paper-texture-opacity, 0.03)',
      }}
    />
  )
}
