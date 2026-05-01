'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, ExternalLink } from 'lucide-react'

/**
 * Scheduling Embed
 *
 * Renders a card linking out to whichever scheduling backend the studio is
 * using. The component is provider-agnostic; configure ONE of:
 *
 *   NEXT_PUBLIC_SCHEDULER_URL   (preferred; any full URL)
 *     e.g. https://calendar.app.google/abc123  (Google Appointment Schedule)
 *     e.g. https://cal.com/username/30min      (Cal.com)
 *     e.g. https://savvycal.com/u/event        (SavvyCal)
 *
 *   NEXT_PUBLIC_CAL_USERNAME    (legacy; Cal.com-specific)
 *     The component builds https://cal.com/{username}/{eventType}
 *
 * Recommended: Google Calendar Appointment Schedule. Workspace native,
 * auto-generates Google Meet links, writes events back to the linked
 * Google Calendar, no third-party SaaS dependency.
 *
 * Both env vars are inlined at build time; set them as repo secrets in
 * the deploy workflow (.github/workflows/deploy.yml).
 */

const SCHEDULER_URL = process.env.NEXT_PUBLIC_SCHEDULER_URL
const CAL_USERNAME = process.env.NEXT_PUBLIC_CAL_USERNAME

interface CalEmbedProps {
  /** Cal.com event type slug (used only with the legacy CAL_USERNAME env var) */
  eventType?: string
  /** Display variant. Inline iframe embedding is Cal.com-specific; the
   *  card variant works for every scheduler URL. */
  variant?: 'inline' | 'card'
  className?: string
}

export function CalEmbed({ eventType = '30min', variant = 'card', className = '' }: CalEmbedProps) {
  const [loaded, setLoaded] = useState(false)

  // Resolve the booking URL: prefer SCHEDULER_URL, fall back to legacy
  // CAL_USERNAME, otherwise return null and render the placeholder.
  const calUrl = SCHEDULER_URL
    ? SCHEDULER_URL
    : CAL_USERNAME
      ? `https://cal.com/${CAL_USERNAME}/${eventType}`
      : null

  // The inline iframe variant only works with Cal.com. If a generic
  // SCHEDULER_URL is configured, force the card variant; iframe embed
  // is unreliable across providers.
  const effectiveVariant = SCHEDULER_URL ? 'card' : variant

  // If no Cal.com username configured, show a placeholder
  if (!calUrl) {
    return (
      <div className={`bg-background-alt rounded-card p-6 md:p-8 border border-text-primary/5 ${className}`}>
        <div className="flex items-center gap-3 mb-4">
          <div className="h-10 w-10 rounded-lg bg-gold/10 flex items-center justify-center">
            <Calendar className="h-5 w-5 text-gold" />
          </div>
          <div>
            <p className="text-sm font-semibold text-text-primary">Schedule a call</p>
            <p className="text-xs text-text-tertiary">Book a time that works for you</p>
          </div>
        </div>
        <p className="text-sm text-text-secondary leading-relaxed mb-4">
          We&rsquo;ll discuss your project requirements, timeline, and how we can help. No commitment, no pressure; just a conversation.
        </p>
        <p className="text-xs text-text-tertiary italic">
          Scheduling widget will appear here once configured.
        </p>
      </div>
    )
  }

  if (effectiveVariant === 'inline') {
    return (
      <div className={`relative ${className}`}>
        {!loaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-background-alt rounded-card">
            <div className="flex items-center gap-2 text-sm text-text-tertiary">
              <Calendar className="h-4 w-4 animate-pulse" />
              Loading scheduler...
            </div>
          </div>
        )}
        <iframe
          src={`${calUrl}?embed=true&theme=light`}
          className="w-full min-h-[600px] border-0 rounded-card"
          onLoad={() => setLoaded(true)}
          title="Schedule a call with Kinyoubi Atelier"
        />
      </div>
    )
  }

  // Card variant — shows a styled card with a link to Cal.com
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
      className={`bg-background-alt rounded-card p-6 md:p-8 border border-text-primary/5 hover:border-gold/20 transition-colors ${className}`}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="h-10 w-10 rounded-lg bg-gold/10 flex items-center justify-center">
          <Calendar className="h-5 w-5 text-gold" />
        </div>
        <div>
          <p className="text-sm font-semibold text-text-primary">Prefer to talk live?</p>
          <p className="text-xs text-text-tertiary">Book a 30-minute discovery call</p>
        </div>
      </div>
      <p className="text-sm text-text-secondary leading-relaxed mb-5">
        We&rsquo;ll discuss your project, timeline, and approach. No commitment; just a conversation to see if there&rsquo;s a fit.
      </p>
      <a
        href={calUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-sm font-medium text-gold hover:underline"
      >
        Pick a time <ExternalLink className="h-3 w-3" />
      </a>
    </motion.div>
  )
}
