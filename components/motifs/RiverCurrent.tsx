'use client'

/**
 * RiverCurrent
 *
 * Companion to RiverMotif. Same studio idea, different surface.
 * RiverMotif is the page level signature for the Archive Automation
 * case study and lives fixed to the viewport edge. RiverCurrent is
 * the card local watermark used inside the Work index card for the
 * same study, so the three case study cards on the Work surface read
 * with their own silhouettes.
 *
 * The two components are deliberately separate. RiverMotif owns
 * scroll coupling and viewport anchoring; RiverCurrent owns a small
 * absolutely positioned still composition that reads as a flow of
 * records on the lower margin of a card. Single responsibility per
 * component; no shared variant prop that would tempt either side to
 * grow.
 *
 * Seijaku notes
 *   a) The card already carries the case study title, summary, and
 *      tags. The watermark is a faint silhouette behind that content,
 *      not a second statement.
 *   b) Two horizontal hairlines, gently offset, sit on the lower band
 *      of the card. They suggest current without animating; the card
 *      itself is the surface that pages on hover, so a moving line
 *      here would compete.
 *   c) Drawn at the same 0.08 watermark opacity as the Lattice and
 *      Vault motifs when consumed as card backgrounds, so the three
 *      cards stay visually consistent at first glance.
 *
 * Contract
 *   a) aria-hidden. No pointer events. No focusable content.
 *   b) Position is absolute and fills its nearest positioned parent.
 *      The consumer is responsible for the wrapping element being
 *      position: relative (or absolute) and for clipping overflow.
 *   c) Stroke colour is the warmer paper accent. Consumer may
 *      override.
 */

interface RiverCurrentProps {
  /** Stroke colour. Defaults to the warmer paper accent. */
  color?: string
}

export function RiverCurrent({ color = '#B59557' }: RiverCurrentProps) {
  return (
    <div
      aria-hidden="true"
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 400 220"
        preserveAspectRatio="none"
        style={{ display: 'block' }}
      >
        <path
          d="M 0 150 C 80 140, 160 160, 240 150 S 400 140, 400 150"
          fill="none"
          stroke={color}
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d="M 0 170 C 90 160, 170 180, 250 170 S 400 160, 400 170"
          fill="none"
          stroke={color}
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  )
}
