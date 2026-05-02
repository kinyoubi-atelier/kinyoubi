'use client'

import { Button } from '@/components/ui/Button'
import { useAika } from './AikaProvider'
import type { ReactNode } from 'react'

interface AikaTriggerProps {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

/**
 * Drop-in replacement for `<Button href="/contact">Start a conversation</Button>`
 * when the goal is to summon Aika instead of routing straight to the
 * contact form. Visual is identical (same Button component, same
 * variant + size). The click opens the Aika chat panel via
 * AikaProvider's context.
 */
export function AikaTrigger({
  children,
  variant = 'primary',
  size = 'lg',
  className,
}: AikaTriggerProps) {
  const { openChat } = useAika()
  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      onClick={openChat}
    >
      {children}
    </Button>
  )
}
