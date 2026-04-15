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

/**
 * Variant styles
 *
 * Wave 6 cleanup: the previous primary variant carried `shadow-sm hover:shadow-md`,
 * a decorative drop shadow flagged by charter rule 6. It has been removed. Hover
 * state is now carried by the colour shift alone, which is the seijaku move:
 * the button changes character without announcing itself with a lifted plate.
 *
 * Focus rings are no longer authored per-variant. The global focus-visible rule
 * in app/globals.css ("Interaction Polish" block) draws a single brush-stroke
 * focus border in --ink-sumi over DURATION_GLANCE. One focus language site-wide.
 */
const variantStyles: Record<ButtonVariant, string> = {
  primary: 'btn-press bg-gold text-white hover:bg-gold-bright',
  secondary: 'btn-press bg-surface-dark text-text-on-dark hover:bg-navy',
  ghost: 'btn-press bg-transparent text-text-primary border border-text-primary/20 hover:border-gold hover:text-gold',
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
