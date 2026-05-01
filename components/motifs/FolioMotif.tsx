'use client'

/**
 * FolioMotif
 *
 * Seijaku purpose for the Legal Drafting Methodology case study.
 * A vertical hairline at the outer right viewport margin with two short
 * horizontal review-mark ticks at fixed positions, roughly the top and
 * bottom thirds of the line. The visual reference is the binding edge of
 * a court folio with margin marks indicating that the document has been
 * reviewed; this is the right silhouette for a case study about a system
 * that reviews drafts. This is the surface signature for the legal-
 * drafting methodology study, and only that study.
 *
 * Seijaku translation test
 *   a) It frames the page as a reviewed folio, pacing the reader's entry
 *      into a long, dense methodology piece by giving the right margin
 *      the quiet authority of a copy editor's marks.
 *   b) Removing it would leave the legal-drafting page visually identical
 *      to the other three case studies; the folio with ticks is what
 *      gives this page its silhouette at 50 metres.
 *   c) It rewards the lingerer. The ticks sit at fixed positions. A reader
 *      who scrolls slowly notices them appear and disappear in their
 *      peripheral vision as the page passes; a quick read does not
 *      register them.
 *   d) A 2022 SaaS page would use a coloured highlight bar pinned to the
 *      side. This is the opposite move: a static hairline outside the
 *      reading column, and two short ticks that read as stamp marks
 *      rather than progress indicators.
 *   e) Reduced motion is identical to the default state, since the motif
 *      does not animate. The composition is already still; that is the
 *      point of a folio binding edge.
 *
 * Contract
 *   a) aria-hidden. No pointer events. No focusable content.
 *   b) Position is fixed to the viewport edge, outside the reading column.
 *      Defaults to the right edge so it complements RiverMotif's left edge.
 *   c) Static. No scroll coupling, no breath, no draw-in. Stillness as
 *      review.
 *   d) Stroke colour defaults to a gold-shifted ink (#5C4F2E). Consumer
 *      may override.
 */

interface FolioMotifProps {
  /** Which viewport margin the binding edge sits at. Defaults to 'right'. */
  side?: 'left' | 'right'
  /** Stroke colour. Defaults to a gold-shifted ink. */
  color?: string
  /** Height of the vertical line, as a CSS length. Defaults to 22vh. */
  length?: string
  /** Distance from the viewport edge, in pixels. Defaults to 18. */
  inset?: number
  /** Length of each horizontal tick, in pixels. Defaults to 14. */
  tickLength?: number
}

export function FolioMotif({
  side = 'right',
  // Warmer paper accent. Slightly brighter than the original #5C4F2E so
  // the binding edge actually registers on dark-mode surfaces; still quiet
  // enough to read as a margin mark rather than a structural divider.
  color = '#A38842',
  length = '22vh',
  inset = 18,
  tickLength = 14,
}: FolioMotifProps) {
  // SVG viewBox is in the same pixel space as the parent's CSS dimensions.
  // The parent is a fixed-position rectangle that contains the binding line
  // and both ticks. Width = max(tickLength, 1) so the ticks have somewhere
  // to render without bleeding out of the parent. The line draws at the
  // viewport-facing edge; the ticks reach into the reading column.
  const svgWidth = tickLength + 2
  const lineX = side === 'right' ? svgWidth - 1 : 1
  const tickX1 = side === 'right' ? svgWidth - 1 : 1
  const tickX2 = side === 'right' ? 1 : svgWidth - 1

  // Wrapper is positioned so the binding-line column sits exactly at the
  // chosen inset from the viewport edge. Because the SVG is wider than the
  // line, the ticks render into the reading column without offsetting the
  // line position.
  const wrapperPosition: React.CSSProperties =
    side === 'right'
      ? { right: inset - (svgWidth - 1) }
      : { left: inset - (svgWidth - 1) }

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: '50%',
        transform: 'translateY(-50%)',
        ...wrapperPosition,
        width: svgWidth,
        height: length,
        pointerEvents: 'none',
        zIndex: 1,
        opacity: 0.45,
      }}
    >
      <svg
        width={svgWidth}
        height="100%"
        viewBox={`0 0 ${svgWidth} 100`}
        preserveAspectRatio="none"
        fill="none"
        stroke={color}
        strokeWidth={1}
        style={{ display: 'block' }}
      >
        {/* Binding line */}
        <line
          x1={lineX}
          y1="0"
          x2={lineX}
          y2="100"
          vectorEffect="non-scaling-stroke"
        />
        {/* Top-third review tick */}
        <line
          x1={tickX1}
          y1="33"
          x2={tickX2}
          y2="33"
          vectorEffect="non-scaling-stroke"
          opacity="0.85"
        />
        {/* Bottom-third review tick */}
        <line
          x1={tickX1}
          y1="67"
          x2={tickX2}
          y2="67"
          vectorEffect="non-scaling-stroke"
          opacity="0.85"
        />
      </svg>
    </div>
  )
}
