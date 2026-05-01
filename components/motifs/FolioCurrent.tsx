'use client'

/**
 * FolioCurrent
 *
 * Companion to FolioMotif. Same studio idea, different surface.
 * FolioMotif is the page-level signature for the Legal Drafting
 * Methodology case study and lives fixed to the viewport edge.
 * FolioCurrent is the card-local watermark used inside the Work
 * index card for the same study, so each case study card on the
 * Work surface reads with its own silhouette.
 *
 * The two components are deliberately separate. FolioMotif owns
 * viewport anchoring; FolioCurrent owns a small absolutely-positioned
 * still composition that reads as the binding edge of a folio with
 * two review-mark ticks, on the right margin of a card. Single
 * responsibility per component; no shared variant prop that would
 * tempt either side to grow.
 *
 * Seijaku notes
 *   a) The card already carries the case study title, summary, and
 *      tags. The watermark is a faint silhouette behind that content,
 *      not a second statement.
 *   b) A vertical hairline at the right inner margin with two short
 *      horizontal ticks at fixed positions. Read as binding-edge
 *      review marks. Static; the card itself is the surface that
 *      pages on hover, so a moving line here would compete.
 *   c) Drawn at the same 0.08 watermark opacity as the Lattice, Vault
 *      and River card motifs when consumed as card backgrounds, so
 *      the four cards stay visually consistent at first glance.
 *
 * Contract
 *   a) aria-hidden. No pointer events. No focusable content.
 *   b) Position is absolute and fills its nearest positioned parent.
 *      The consumer is responsible for the wrapping element being
 *      position: relative (or absolute) and for clipping overflow.
 *   c) Stroke colour is a gold-shifted ink. Consumer may override.
 */

interface FolioCurrentProps {
  /** Stroke colour. Defaults to a gold-shifted ink. */
  color?: string
}

export function FolioCurrent({ color = '#A38842' }: FolioCurrentProps) {
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
        {/* Binding line on the right margin of the card. x=392 leaves
            enough room for the card's rounded corners to clip cleanly
            without the line bleeding past the bezier. */}
        <line
          x1="392"
          y1="20"
          x2="392"
          y2="200"
          stroke={color}
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
        {/* Top-third review tick reaching into the card. */}
        <line
          x1="392"
          y1="80"
          x2="372"
          y2="80"
          stroke={color}
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
        {/* Bottom-third review tick reaching into the card. */}
        <line
          x1="392"
          y1="140"
          x2="372"
          y2="140"
          stroke={color}
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  )
}
