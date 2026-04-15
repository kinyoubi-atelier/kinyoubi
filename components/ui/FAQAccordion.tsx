'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

import {
  DURATION_CONSIDER,
  EASE_INK_ARRAY,
  msToSec,
} from '@/design/tokens/motion'

/**
 * FAQ Accordion
 *
 * Progressive enhancement: uses semantic HTML via a native button and
 * aria-expanded, enhanced with Framer Motion for the ink bleed open.
 * Each question is an SEO entry point via FAQ structured data.
 *
 * Wave 5 surface rhythm
 * The panel opens as an ink bleed rather than a height snap. Both height
 * and opacity ease over DURATION_CONSIDER on EASE_INK; the revealed copy
 * settles through a soft top mask so the text looks like it is arriving
 * on paper rather than unfurling from a drawer. Reduced motion returns
 * the final composition from the first frame.
 */

export interface FAQItem {
  question: string
  answer: string
}

interface FAQAccordionProps {
  items: FAQItem[]
  className?: string
}

function FAQRow({ item, isOpen, toggle }: { item: FAQItem; isOpen: boolean; toggle: () => void }) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <div className="border-b border-text-primary/5 last:border-b-0">
      <button
        type="button"
        onClick={toggle}
        className="w-full flex items-center justify-between py-5 text-left group"
        aria-expanded={isOpen}
      >
        <span className="text-base font-medium text-text-primary pr-4 group-hover:text-gold transition-colors">
          {item.question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : { duration: msToSec(DURATION_CONSIDER), ease: EASE_INK_ARRAY as unknown as number[] }
          }
          className="flex-shrink-0"
        >
          <ChevronDown className="h-4 w-4 text-text-tertiary" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={prefersReducedMotion ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={prefersReducedMotion ? { height: 0, opacity: 0 } : { height: 0, opacity: 0 }}
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : {
                    duration: msToSec(DURATION_CONSIDER),
                    ease: EASE_INK_ARRAY as unknown as number[],
                  }
            }
            className="overflow-hidden"
          >
            {/* Ink bleed mask: the revealed copy rises into focus through
                a short fade from the top edge so the text reads as settling
                onto paper rather than sliding down from a drawer. */}
            <motion.p
              initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -4 }}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : {
                      duration: msToSec(DURATION_CONSIDER),
                      ease: EASE_INK_ARRAY as unknown as number[],
                    }
              }
              className="pb-5 text-sm text-text-secondary leading-relaxed pr-8"
              style={
                prefersReducedMotion
                  ? undefined
                  : {
                      WebkitMaskImage:
                        'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 28%, rgba(0,0,0,1) 100%)',
                      maskImage:
                        'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 28%, rgba(0,0,0,1) 100%)',
                    }
              }
            >
              {item.answer}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function FAQAccordion({ items, className = '' }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className={className}>
      {items.map((item, index) => (
        <FAQRow
          key={index}
          item={item}
          isOpen={openIndex === index}
          toggle={() => setOpenIndex(openIndex === index ? null : index)}
        />
      ))}
    </div>
  )
}

/**
 * Generate FAQ structured data for SEO.
 * Drop this into the page's metadata or as a <script> tag.
 */
export function faqStructuredData(items: FAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
}
