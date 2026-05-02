'use client'

import { createContext, useContext, useState, type ReactNode } from 'react'
import { AikaWidget } from '@aika/widget'
import '@aika/widget/styles.css'

interface AikaContextValue {
  open: boolean
  openChat: () => void
  closeChat: () => void
}

const AikaContext = createContext<AikaContextValue | null>(null)

export function useAika(): AikaContextValue {
  const ctx = useContext(AikaContext)
  if (!ctx) {
    throw new Error('useAika must be used within an AikaProvider')
  }
  return ctx
}

/**
 * Mounts the Aika chat widget once for the whole site and provides a
 * context with imperative open/close handles. CTAs around the site call
 * `useAika().openChat()` to summon Aika.
 *
 * The widget is in controlled mode: open state lives here, not inside
 * the widget. The floating launcher is left visible so visitors can
 * also open Aika from any page without going via a CTA.
 *
 * `schedulerUrl` is sourced from NEXT_PUBLIC_SCHEDULER_URL (the same
 * env var the rest of the site already uses for the contact page
 * scheduler card). When the visitor clicks SEND_MESSAGE the widget
 * navigates to /contact?aika_summary=<encoded transcript>; the
 * contact form picks that up and pre-fills the message field.
 */
export function AikaProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)

  const value: AikaContextValue = {
    open,
    openChat: () => setOpen(true),
    closeChat: () => setOpen(false),
  }

  const schedulerUrl = process.env.NEXT_PUBLIC_SCHEDULER_URL

  return (
    <AikaContext.Provider value={value}>
      {children}
      <AikaWidget
        open={open}
        onOpenChange={setOpen}
        schedulerUrl={schedulerUrl}
        contactPath="/contact"
      />
    </AikaContext.Provider>
  )
}
