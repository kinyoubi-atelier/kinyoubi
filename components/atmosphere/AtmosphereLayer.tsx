/**
 * AtmosphereLayer
 *
 * A single global ambient layer that holds the page like a room holds a
 * drawing. Three materials, nothing more: a faint paper grain, a directional
 * light wash along the house LIGHT_DIRECTION, and an ink vignette at the
 * edges. The visitor should not perceive any of the three as a discrete
 * effect; they read only as atmosphere.
 *
 * This is a server component. No props, no state, no client directive, no
 * JavaScript at runtime. All behaviour lives in globals.css under the
 * Atmosphere Layer section; this file only ships the markup scaffolding.
 *
 * Every layer is aria-hidden, role="presentation", pointer-events-none, and
 * fixed to the viewport. The three divs nest in paint order so the light
 * wash lands on top of the grain and the vignette frames both. A single
 * container wrapper gives us one DOM node to query in future testing waves.
 */
export function AtmosphereLayer() {
  return (
    <div className="atmosphere" aria-hidden="true" role="presentation">
      <div className="atmosphere-grain" aria-hidden="true" role="presentation" />
      <div className="atmosphere-light" aria-hidden="true" role="presentation" />
      <div className="atmosphere-vignette" aria-hidden="true" role="presentation" />
    </div>
  )
}

export default AtmosphereLayer
