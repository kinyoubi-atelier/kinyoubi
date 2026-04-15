'use client'

import Link from 'next/link'
import { AlertTriangle, Scale, DollarSign, Shield, Copyright, Lock, MapPin } from 'lucide-react'
import { SITE } from '@/lib/constants'

/**
 * Wave 5 surface rhythm
 *
 * A 1 px sumi hairline sits flush to the left of every section heading
 * on legal and compliance surfaces, giving these pages a quiet thread
 * back to the house vocabulary without changing their copy.
 */
const LEGAL_HEADING_STYLE: React.CSSProperties = {
  borderLeft: '1px solid color-mix(in srgb, var(--ink-sumi) 30%, transparent)',
  paddingLeft: '12px',
}

function LegalSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-4">
      <h2
        className="text-xl font-semibold text-text-primary"
        style={LEGAL_HEADING_STYLE}
      >
        {title}
      </h2>
      {children}
    </div>
  )
}

function HighlightLabel({ children }: { children: React.ReactNode }) {
  return <span className="font-semibold text-gold">{children}</span>
}

export default function MsaContent() {
  return (
    <>
      {/* Draft Disclaimer */}
      <div className="rounded-card border-2 border-gold/30 bg-gold/[0.08] p-6">
        <div className="flex items-start gap-4">
          <AlertTriangle className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" strokeWidth={2} />
          <div>
            <p className="text-sm font-semibold text-text-primary mb-2">
              Template v1 · DRAFT. Not counsel-reviewed.
            </p>
            <p className="text-sm text-text-secondary leading-relaxed">
              This Master Services Agreement is a template and has not been reviewed by a licensed attorney. It must be reviewed by legal counsel in both India and the relevant counterparty jurisdiction before execution. Do not use without independent legal review.
            </p>
          </div>
        </div>
      </div>

      <LegalSection title="What This Is">
        <p className="text-text-secondary leading-relaxed">
          A <HighlightLabel>Master Services Agreement (MSA)</HighlightLabel> is the main contract between you and Kinyoubi Atelier & Co. It governs:
        </p>
        <ul className="text-text-secondary leading-relaxed space-y-2 ml-5 list-disc">
          <li>The services we provide (software development, technical consulting, regulatory research)</li>
          <li>How we charge and when payment is due</li>
          <li>Who owns the code and intellectual property we create</li>
          <li>Warranties and limitations of liability</li>
          <li>Confidentiality and data protection</li>
          <li>How disputes are resolved (Indian courts or Singapore arbitration)</li>
        </ul>
        <p className="text-text-secondary leading-relaxed mt-4">
          Your legal team will likely request a copy before an engagement begins.
        </p>
      </LegalSection>

      <LegalSection title="Key Terms You Should Know">
        <div className="space-y-4">
          <div className="rounded-card border border-text-primary/5 bg-background-alt p-4">
            <div className="flex items-start gap-3">
              <DollarSign className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" strokeWidth={1.5} />
              <div>
                <p className="font-semibold text-text-primary text-sm mb-1">Payment Terms</p>
                <p className="text-sm text-text-secondary leading-relaxed">
                  Default is <HighlightLabel>Net 30</HighlightLabel> (payment due within 30 days of invoice). Each Statement of Work (SOW) may specify different terms (e.g., milestone payments, deposit + balance). Late payments accrue interest at 1.5% per month.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-card border border-text-primary/5 bg-background-alt p-4">
            <div className="flex items-start gap-3">
              <Copyright className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" strokeWidth={1.5} />
              <div>
                <p className="font-semibold text-text-primary text-sm mb-1">IP Ownership</p>
                <p className="text-sm text-text-secondary leading-relaxed">
                  Upon <HighlightLabel>full payment</HighlightLabel>, all intellectual property in the work we create for you (code, designs, documentation) is assigned exclusively to you. We retain rights to our pre-existing tools, frameworks, and open-source code.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-card border border-text-primary/5 bg-background-alt p-4">
            <div className="flex items-start gap-3">
              <Lock className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" strokeWidth={1.5} />
              <div>
                <p className="font-semibold text-text-primary text-sm mb-1">Confidentiality</p>
                <p className="text-sm text-text-secondary leading-relaxed">
                  Both you and Kinyoubi keep each other's confidential information private for <HighlightLabel>3 years</HighlightLabel> after the engagement ends. We don't disclose your business plans, source code, or customer data.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-card border border-text-primary/5 bg-background-alt p-4">
            <div className="flex items-start gap-3">
              <Scale className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" strokeWidth={1.5} />
              <div>
                <p className="font-semibold text-text-primary text-sm mb-1">Liability Cap</p>
                <p className="text-sm text-text-secondary leading-relaxed">
                  Our liability is capped at the <HighlightLabel>total fees you've paid in the prior 12 months</HighlightLabel>. This doesn't apply to: confidentiality breaches, IP indemnity, data protection breaches, or gross negligence.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-card border border-text-primary/5 bg-background-alt p-4">
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" strokeWidth={1.5} />
              <div>
                <p className="font-semibold text-text-primary text-sm mb-1">Jurisdiction</p>
                <p className="text-sm text-text-secondary leading-relaxed">
                  This MSA is governed by <HighlightLabel>Indian law</HighlightLabel>. Disputes are subject to courts in Koraput District, Odisha, or (if agreed) <HighlightLabel>Singapore International Arbitration Centre (SIAC)</HighlightLabel> for enterprise clients.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-card border border-text-primary/5 bg-background-alt p-4">
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" strokeWidth={1.5} />
              <div>
                <p className="font-semibold text-text-primary text-sm mb-1">Data Protection (DPA)</p>
                <p className="text-sm text-text-secondary leading-relaxed">
                  If your engagement involves personal data, the <HighlightLabel>Data Processing Addendum (DPA)</HighlightLabel> is incorporated into this MSA. It specifies our security measures, breach notification (72 hours), and data subject rights assistance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </LegalSection>

      <LegalSection title="Warranties and Disclaimers">
        <p className="text-text-secondary leading-relaxed mb-4">
          Kinyoubi warrants that we will:
        </p>
        <ul className="text-text-secondary leading-relaxed space-y-2 ml-5 list-disc mb-4">
          <li>Perform services in a professional, workmanlike manner</li>
          <li>Have the right to enter into the agreement</li>
          <li>Follow all applicable laws and regulations</li>
          <li>Deliver work product substantially free of material defects</li>
        </ul>

        <p className="text-text-secondary leading-relaxed mb-4">
          <HighlightLabel>We do NOT warrant that:</HighlightLabel>
        </p>
        <ul className="text-text-secondary leading-relaxed space-y-2 ml-5 list-disc">
          <li>Our work will meet every specific requirement (unless documented in the SOW)</li>
          <li>The work will be "production-ready" (unless explicitly stated)</li>
          <li>Performance or uptime targets will be met (unless covered by an SLA)</li>
          <li>The work will integrate seamlessly with third-party systems</li>
        </ul>
      </LegalSection>

      <LegalSection title="Insurance">
        <p className="text-text-secondary leading-relaxed mb-3">
          <HighlightLabel>[TBD]</HighlightLabel> Professional indemnity insurance coverage to be procured.
        </p>
        <p className="text-text-secondary leading-relaxed text-sm leading-relaxed">
          Kinyoubi commits to maintaining professional liability insurance in the amount to be confirmed. This is a minimum safeguard; claims may exceed insurance limits, and Kinyoubi remains liable per the MSA terms. A certificate of insurance is available upon request.
        </p>
      </LegalSection>

      <LegalSection title="Termination">
        <p className="text-text-secondary leading-relaxed mb-4">
          Either party can end the engagement by:
        </p>
        <ul className="text-text-secondary leading-relaxed space-y-2 ml-5 list-disc mb-4">
          <li><HighlightLabel>For convenience:</HighlightLabel> 30 days' written notice. You pay for work completed to date.</li>
          <li><HighlightLabel>For cause:</HighlightLabel> Immediately, if the other party materially breaches and doesn't fix it within 15 business days.</li>
        </ul>
        <p className="text-text-secondary leading-relaxed">
          Upon termination, we'll deliver all work product and return your data within 30 days, or securely delete it per the DPA.
        </p>
      </LegalSection>

      <LegalSection title="Statement of Work (SOW)">
        <p className="text-text-secondary leading-relaxed mb-4">
          The MSA is the umbrella agreement. Each specific project is governed by a <HighlightLabel>Statement of Work (SOW)</HighlightLabel>, which specifies:
        </p>
        <ul className="text-text-secondary leading-relaxed space-y-2 ml-5 list-disc">
          <li>What we'll build and deliver</li>
          <li>Timeline and milestones</li>
          <li>Fees (fixed-fee, time & materials, or hybrid)</li>
          <li>Acceptance criteria for deliverables</li>
          <li>Project-specific assumptions and risks</li>
        </ul>
        <p className="text-text-secondary leading-relaxed mt-4">
          The SOW takes precedence over the MSA for SOW-specific terms.
        </p>
      </LegalSection>

      <LegalSection title="Indemnification">
        <p className="text-text-secondary leading-relaxed mb-4">
          <HighlightLabel>Kinyoubi indemnifies you</HighlightLabel> (pays for claims and legal defense) if:
        </p>
        <ul className="text-text-secondary leading-relaxed space-y-2 ml-5 list-disc mb-4">
          <li>The work we create infringes a third party's intellectual property rights</li>
          <li>Our breach of this MSA causes you damage</li>
        </ul>

        <p className="text-text-secondary leading-relaxed mb-4">
          <HighlightLabel>You indemnify Kinyoubi</HighlightLabel> if:
        </p>
        <ul className="text-text-secondary leading-relaxed space-y-2 ml-5 list-disc">
          <li>Your materials or instructions to us infringe a third party's rights</li>
          <li>Your instructions to us violated applicable law</li>
        </ul>
      </LegalSection>

      <LegalSection title="Get the Full Template">
        <p className="text-text-secondary leading-relaxed mb-4">
          The complete MSA template is available in our legal-templates directory. To request a copy customized for your jurisdiction:
        </p>
        <a
          href={`mailto:${SITE.email}?subject=MSA%20Request`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-gold hover:text-gold-bright transition-colors"
        >
          Email us for a copy
          <span aria-hidden="true">→</span>
        </a>
        <p className="text-xs text-text-tertiary mt-3">
          We'll send you the current version for your legal team to review and negotiate.
        </p>
      </LegalSection>

      <LegalSection title="Related Documents">
        <p className="text-text-secondary leading-relaxed mb-4">
          The MSA is part of a suite of agreements:
        </p>
        <ul className="text-text-secondary leading-relaxed space-y-3 ml-5">
          <li>
            <HighlightLabel><Link href="/legal/dpa" className="text-gold hover:underline">Data Processing Addendum (DPA)</Link></HighlightLabel>. Covers data protection, security, breach notification, and sub-processor management. Incorporated into the MSA if your engagement involves personal data.
          </li>
          <li>
            <HighlightLabel>Statement of Work (SOW).</HighlightLabel> Project-specific details: scope, deliverables, timeline, and fees. Issued under and governed by the MSA.
          </li>
          <li>
            <HighlightLabel>Standard Contractual Clauses (SCCs).</HighlightLabel> Legal mechanism for GDPR-compliant data transfers. Referenced in the DPA.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="Important Notes">
        <div className="rounded-card border border-text-primary/5 bg-background-alt p-4 space-y-3">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-4 w-4 text-gold flex-shrink-0 mt-1" strokeWidth={2} />
            <p className="text-sm text-text-secondary leading-relaxed">
              <HighlightLabel>This is a template, not final.</HighlightLabel> Before execution, have it reviewed by licensed counsel in your jurisdiction and in India.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-4 w-4 text-gold flex-shrink-0 mt-1" strokeWidth={2} />
            <p className="text-sm text-text-secondary leading-relaxed">
              <HighlightLabel>We're flexible on commercial terms.</HighlightLabel> Liability caps, payment terms, and insurance requirements can be negotiated. Some terms (IP assignment on payment, DPA incorporation, 72-hour breach notification) are fixed commitments.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-4 w-4 text-gold flex-shrink-0 mt-1" strokeWidth={2} />
            <p className="text-sm text-text-secondary leading-relaxed">
              <HighlightLabel>Indian law governs, with options.</HighlightLabel> This MSA is governed by Indian law. Disputes default to Koraput District courts but can be moved to Singapore arbitration (SIAC) by mutual agreement for enterprise clients.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-4 w-4 text-gold flex-shrink-0 mt-1" strokeWidth={2} />
            <p className="text-sm text-text-secondary leading-relaxed">
              <HighlightLabel>Each SOW is separate.</HighlightLabel> This MSA covers all SOWs you execute with us. If you want different terms for a specific project, we can document that in the SOW, but it requires explicit written acknowledgment from both parties.
            </p>
          </div>
        </div>
      </LegalSection>

      <LegalSection title="Questions?">
        <p className="text-text-secondary leading-relaxed">
          For questions about the MSA, contract terms, or commercial negotiations, email{' '}
          <a href={`mailto:${SITE.email}?subject=MSA%20Question`} className="text-gold hover:underline">
            {SITE.email}
          </a>
          . We respond within 48 business hours.
        </p>
      </LegalSection>
    </>
  )
}
