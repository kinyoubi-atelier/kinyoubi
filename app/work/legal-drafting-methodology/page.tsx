import type { Metadata } from 'next'
import LegalDraftingMethodologyContent from './LegalDraftingMethodologyContent'

export const metadata: Metadata = {
  title:
    'Case study: AI-assisted legal drafting for Indian advocates · A methodology | Kinyoubi Atelier & Co.',
  description:
    'A methodology and verification architecture for AI-assisted legal drafting across Indian jurisdictions. Knowledge bootstrap before code, deterministic floor with LLM ceiling, and a citation benchmark with zero adversarial hallucinations.',
}

export default function LegalDraftingMethodologyPage() {
  return <LegalDraftingMethodologyContent />
}
