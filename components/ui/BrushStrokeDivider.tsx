'use client'

import Image from 'next/image'
import { cn } from '@/lib/utils'

const variants = [
  '/brushstrokes/brush-stroke-1.svg',
  '/brushstrokes/brush-stroke-2.svg',
  '/brushstrokes/brush-stroke-3.svg',
]

interface BrushStrokeDividerProps {
  className?: string
  variant?: 0 | 1 | 2
  opacity?: number
  width?: string  // Tailwind width class like 'w-3/5'
}

export function BrushStrokeDivider({
  className,
  variant = 0,
  opacity = 0.85,
  width = 'w-3/5 md:w-2/5',
}: BrushStrokeDividerProps) {
  return (
    <div className={cn('flex justify-center py-8', className)} role="separator" aria-hidden="true">
      <Image
        src={variants[variant]}
        alt=""
        width={400}
        height={24}
        unoptimized
        className={cn('h-auto', width)}
        style={{ opacity }}
        loading="lazy"
      />
    </div>
  )
}
