'use client'

import { ReactNode } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps {
  variant?: ButtonVariant
  size?: ButtonSize
  href?: string
  children: ReactNode
  className?: string
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  [key: string]: any
}

/*
  Variant styles, Kinyoubi-House translation.

  primary   ink letterform on gold accent. The contrast pairing is
            fixed (ink is static, never flipped) so the button reads
            the same in both light and dark themes.
  secondary inverts the page surface. Ink fill, paper letterform.
            Reads as a 'firm' button, contrasting with primary's
            accent treatment without introducing a third colour.
  ghost     paper button with a hairline border that thickens to
            gold on hover. The quietest of the three.

  Focus rings are not authored per-variant; the global focus-visible
  rule in globals.css draws a single brush-stroke focus border in
  --ink-sumi over DURATION_GLANCE. One focus language site-wide.
*/
const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'btn-press bg-gold text-ink hover:bg-gold/90',
  secondary:
    'btn-press bg-text-primary text-background hover:bg-text-primary/90',
  ghost:
    'btn-press bg-transparent text-text-primary border border-hairline hover:border-gold hover:text-gold',
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm rounded-lg',
  md: 'px-6 py-3 text-sm rounded-lg',
  lg: 'px-8 py-4 text-base rounded-xl',
}

/**
 * Button
 *
 * The press dip itself is a CSS rule on the .btn-press selector (see
 * app/globals.css "Interaction Polish"). Implementation is a 1 px translateY
 * on :active over DURATION_PRESS (60 ms), recovering over DURATION_CONSIDER
 * (600 ms) with EASE_SUMI on release. CSS-only; no JS state needed. Reduced
 * motion suppresses the dip; hover colour change still registers the press.
 */
export function Button({
  variant = 'primary',
  size = 'md',
  href,
  children,
  className,
  disabled,
  type = 'button',
  ...props
}: ButtonProps) {
  const baseStyles = cn(
    'inline-flex items-center justify-center font-medium',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    variantStyles[variant],
    sizeStyles[size],
    className
  )

  if (href) {
    if (href.startsWith('/') || href.startsWith('#')) {
      return (
        <Link href={href} className={baseStyles} {...props}>
          {children}
        </Link>
      )
    }
    return (
      <a href={href} className={baseStyles} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    )
  }

  return (
    <button type={type} className={baseStyles} disabled={disabled} {...props}>
      {children}
    </button>
  )
}
