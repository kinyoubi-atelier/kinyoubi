import { cn } from '@/lib/utils'

/*
  Section divider.

  In the old Japanese-aesthetic identity this rendered an inked
  brushstroke SVG between sections. The new Kinyoubi-House identity
  uses a thin gold hairline at the same position. The component
  keeps its old name and props for source-compatibility; existing
  call sites continue to render a separator without modification.

  The `variant`, `opacity`, and `width` props are accepted but only
  `width` is honoured (mapped to the rule's max-width). The other
  two are kept as no-ops so legacy call sites do not need to be
  rewritten in the same pass.
*/

interface BrushStrokeDividerProps {
  className?: string
  variant?: 0 | 1 | 2
  opacity?: number
  width?: string
}

export function BrushStrokeDivider({
  className,
  width = 'w-3/5 md:w-2/5',
  variant: _variant,
  opacity: _opacity,
}: BrushStrokeDividerProps) {
  void _variant
  void _opacity

  return (
    <div
      className={cn('flex justify-center py-8', className)}
      role="separator"
      aria-hidden="true"
    >
      <hr className={cn('h-px border-0 bg-gold/60', width)} />
    </div>
  )
}
