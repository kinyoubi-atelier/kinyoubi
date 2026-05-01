import { BreathingGroup } from '@/design/primitives/BreathingGroup'
import { cn } from '@/lib/utils'

/*
  Wordmark.

  The firm's identity per the Kinyoubi-House trade dress: the firm
  name in full, set in the serif primary, with a small gold
  superscript bullet. There is no separate logo mark. The firm name
  is always rendered in full, never shortened, and the ampersand is
  always encoded as `&` in JSX (which renders as `&` literal,
  not `&amp;`, so this is encoding-safe by default).

  Sizes mirror the print spec:
    cover    32pt -> "xl" on the web (~32px on mobile, ~40px desktop)
    annex    22pt -> "lg" (~22px)
    masthead       -> "md" (~18-20px), the default
    footer         -> "sm" (~14-15px)

  Variants are layout hints, not colour overrides:
    block    centred, hairline rule beneath. For hero / cover use.
    inline   no rule, optimised for header strips.

  Trade-dress contract:
    - Always renders in `font-heading` (serif primary).
    - Always says "Kinyoubi Atelier & Co." in full.
    - The trailing bullet is `gold` and is rendered as a superscript.
    - Hairline rule, when present, is `gold` and 80mm wide on print.
      On the web we cap it to 60% of the wordmark's container width.
    - Theme-aware: ink colour comes from `text-text-primary`, which
      flips with `prefers-color-scheme`. The bullet stays `gold`,
      which also flips to its dark-mode variant.
*/

type WordmarkSize = 'sm' | 'md' | 'lg' | 'xl'
type WordmarkVariant = 'inline' | 'block'

interface WordmarkProps {
  size?: WordmarkSize
  variant?: WordmarkVariant
  className?: string
  /** Suppress the gold hairline rule even in 'block' variant. */
  rule?: boolean
}

const sizeClass: Record<WordmarkSize, string> = {
  sm: 'text-[15px] md:text-[16px]',
  md: 'text-[18px] md:text-[20px]',
  lg: 'text-[22px] md:text-[24px]',
  xl: 'text-[28px] md:text-[34px]',
}

export function Wordmark({
  size = 'md',
  variant = 'inline',
  className = '',
  rule,
}: WordmarkProps) {
  const showRule = rule ?? variant === 'block'

  return (
    <div
      className={cn(
        'select-none',
        variant === 'block' ? 'flex flex-col items-center' : 'inline-flex items-baseline',
        className,
      )}
    >
      <span
        className={cn(
          'font-heading font-semibold tracking-tight text-text-primary leading-none',
          'whitespace-nowrap',
          sizeClass[size],
        )}
      >
        Kinyoubi Atelier &amp; Co.
        {/* The gold superscript bullet breathes on a DURATION_BREATH cycle so
            the masthead has a barely-perceptible heartbeat on every page.
            Reduced motion locks the bullet at the centre of the cycle and
            no animation runs. */}
        <BreathingGroup
          intensity="faint"
          className="inline-block ml-[0.1em] align-super text-gold"
        >
          <sup
            aria-hidden="true"
            className="text-gold"
            style={{ fontSize: '0.55em', lineHeight: 0 }}
          >
            •
          </sup>
        </BreathingGroup>
      </span>
      {showRule && (
        <hr aria-hidden="true" className="wordmark-rule mt-3" />
      )}
    </div>
  )
}

/*
  Backwards-compatible re-export. Existing imports of `BrandLockup`
  from `@/components/ui/BrandLockup` continue to work; they now
  render the new Wordmark using a size hint that mirrors the old
  size scale. The old kanji image, the brand gradient, and the
  variant=dark special case are all retired here. Once every
  reference is migrated to `Wordmark` directly this shim should
  be removed.
*/
type LegacyVariant = 'light' | 'dark' | 'hero'
type LegacySize = 'sm' | 'md' | 'lg' | 'xl'

interface LegacyProps {
  variant?: LegacyVariant
  size?: LegacySize
  className?: string
  hideOnMobile?: boolean
  hideOnDesktop?: boolean
}

const legacySizeMap: Record<LegacySize, WordmarkSize> = {
  sm: 'sm',
  md: 'md',
  lg: 'lg',
  xl: 'xl',
}

export function BrandLockup({
  size = 'md',
  className = '',
  hideOnMobile = false,
  hideOnDesktop = false,
  variant: _variant,
}: LegacyProps) {
  void _variant // variant is no longer meaningful in the new identity

  return (
    <Wordmark
      size={legacySizeMap[size]}
      variant="inline"
      className={cn(
        hideOnMobile && 'hidden md:inline-flex',
        hideOnDesktop && 'md:hidden inline-flex',
        className,
      )}
    />
  )
}
