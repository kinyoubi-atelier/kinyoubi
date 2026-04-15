/**
 * Texture tokens for Kinyoubi Atelier & Co.
 *
 * Seijaku purpose
 * Paper and ink are the material. A page should feel like washi under a low
 * window, not like a lightbox. These tokens describe that material in numbers
 * so the pipeline never drifts into SaaS gradients, neon glows, or drop
 * shadows that belong on a dashboard.
 *
 * Contract
 *   a) Use these values as the source of truth. Hard-coded hex or opacity in
 *      a component is a rejection.
 *   b) Seal red is a one per surface token. If a surface already carries a
 *      crimson accent, the next move does not add another.
 *   c) Texture punctuates; it does not decorate. If a grain layer is doing
 *      work for its own sake, remove it.
 *   d) These tokens are palette-agnostic on purpose. The existing site runs
 *      a single light atmosphere; the Atmosphere Agent in a later wave may
 *      introduce variants. When that happens, these values will be overridden
 *      per atmosphere at :root, not re-authored here.
 */

/* Paper
 *
 * The grain opacity is the upper bound for any overlay built from a noise or
 * fibre SVG. Keep it low. Paper does not advertise itself; it is felt rather
 * than seen. Warmth is an HSL triplet that sits between pure off-white and
 * the existing background. It is not a replacement for --background; it is a
 * companion tone for vignettes, card interiors, and the ambient light wash.
 */
export const PAPER_GRAIN_OPACITY = 0.06 as const
export const PAPER_WARMTH = 'hsl(40, 22%, 96%)' as const

/* Ink
 *
 * Sumi is the deep near-black the studio uses for type on light and for
 * concentrated strokes. It carries a faint warm bias so it reads as ink on
 * paper rather than as display black on display white. The vignette opacity
 * is the ceiling for any off-frame light falloff; respect it.
 */
export const INK_SUMI = 'hsl(220, 12%, 9%)' as const
export const INK_VIGNETTE_OPACITY = 0.08 as const

/* Seal
 *
 * The single permitted crimson. Reserved for moments that want the viewer to
 * pause: an initial capital, a seal mark beside a case study title, a signing
 * flourish. One per surface. If you find yourself using this twice on a page
 * you are already wrong.
 */
export const SEAL_RED = 'hsl(4, 68%, 42%)' as const

/* Light direction
 *
 * An angle in degrees for the ambient off-frame window that the whole site
 * shares. Every vignette, every faint shadow, every stroke shadow should read
 * as lit from this direction. Consistency here is what keeps the site from
 * feeling like a collage of different rooms.
 */
export const LIGHT_DIRECTION = 112 as const

/* CSS custom property names
 *
 * The canonical names, exported so consumers refer to them through a constant
 * instead of duplicating a string literal. The Atmosphere Agent injects these
 * into :root using the helper below; components read them via var().
 */
export const CSS_VAR_NAMES = Object.freeze({
  paperGrainOpacity: '--paper-grain-opacity',
  paperWarmth: '--paper-warmth',
  inkSumi: '--ink-sumi',
  inkVignetteOpacity: '--ink-vignette-opacity',
  sealRed: '--seal-red',
  lightDirection: '--light-direction',
})

/**
 * Emit the full texture palette as a single CSS declaration string.
 *
 * The Atmosphere Agent calls this once and injects the result into :root so
 * that every component can read the tokens with var(). Keeping the emission
 * in one place avoids the common failure mode of two stylesheets defining
 * the same custom property with drifting values.
 *
 * The returned string is a body of declarations without the surrounding
 * selector, so the caller can write
 *   `:root { ${textureCssVars()} }`
 * or attach it to a theme class for future atmosphere variants.
 */
export function textureCssVars(): string {
  return [
    `${CSS_VAR_NAMES.paperGrainOpacity}: ${PAPER_GRAIN_OPACITY};`,
    `${CSS_VAR_NAMES.paperWarmth}: ${PAPER_WARMTH};`,
    `${CSS_VAR_NAMES.inkSumi}: ${INK_SUMI};`,
    `${CSS_VAR_NAMES.inkVignetteOpacity}: ${INK_VIGNETTE_OPACITY};`,
    `${CSS_VAR_NAMES.sealRed}: ${SEAL_RED};`,
    `${CSS_VAR_NAMES.lightDirection}: ${LIGHT_DIRECTION}deg;`,
  ].join(' ')
}

/* A frozen registry of every public token, for self-audit and CHARTER.md
 * reference. If a consumer imports something not listed here, that import is
 * a mistake. */
export const TEXTURE_TOKENS = Object.freeze({
  PAPER_GRAIN_OPACITY,
  PAPER_WARMTH,
  INK_SUMI,
  INK_VIGNETTE_OPACITY,
  SEAL_RED,
  LIGHT_DIRECTION,
})

export type TextureTokenName = keyof typeof TEXTURE_TOKENS
