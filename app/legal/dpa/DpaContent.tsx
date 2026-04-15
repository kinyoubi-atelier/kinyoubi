'use client'

import Link from 'next/link'
import { AlertTriangle, FileText, Shield, CheckCircle2 } from 'lucide-react'
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

export default function DpaContent() {
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
              This Data Processing Addendum is a template and has not been reviewed by a licensed attorney. It must be reviewed by legal counsel in both India and the relevant counterparty jurisdiction before execution. Do not use without independent legal review.
            </p>
          </div>
        </div>
      </div>

      <LegalSection title="What This Is">
        <p className="text-text-secondary leading-relaxed">
          A <HighlightLabel>Data Processing Addendum (DPA)</HighlightLabel> is a legal contract that governs how Kinyoubi Atelier & Co. processes personal data on your behalf. It specifies security controls, confidentiality obligations, sub-processor management, and data subject rights. It's required by:
        </p>
        <ul className="text-text-secondary leading-relaxed space-y-2 ml-5 list-disc">
          <li><HighlightLabel>GDPR (EU)</HighlightLabel>: requires a processor agreement before any personal data is shared</li>
          <li><HighlightLabel>UK GDPR</HighlightLabel>: equivalent requirements for UK data subjects</li>
          <li><HighlightLabel>DPDP Act 2023 (India)</HighlightLabel>: aligns processor obligations with Indian data protection law</li>
        </ul>
      </LegalSection>

      <LegalSection title="Why You Need It">
        <p className="text-text-secondary leading-relaxed">
          Before sharing any personal data (customer names, email addresses, employee records, transaction logs, etc.) with Kinyoubi, your legal or compliance team will likely ask for a DPA. This addendum:
        </p>
        <ul className="text-text-secondary leading-relaxed space-y-2 ml-5 list-disc">
          <li>Clarifies that Kinyoubi acts as a processor on your instructions, not a controller</li>
          <li>Documents our security measures (encryption, access controls, audit logging)</li>
          <li>Specifies our breach notification timeline (72 hours)</li>
          <li>Covers international data transfer safeguards (Standard Contractual Clauses for GDPR compliance)</li>
          <li>Establishes audit and inspection rights for your compliance teams</li>
        </ul>
      </LegalSection>

      <LegalSection title="What We Commit To">
        <div className="space-y-4">
          <div className="rounded-card border border-text-primary/5 bg-background-alt p-4">
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" strokeWidth={1.5} />
              <div>
                <p className="font-semibold text-text-primary text-sm mb-1">Security by default</p>
                <p className="text-sm text-text-secondary leading-relaxed">
                  All personal data is encrypted in transit (TLS 1.2+) and at rest (AES-256). Access is restricted to authorized personnel only. Audit logs track all access.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-card border border-text-primary/5 bg-background-alt p-4">
            <div className="flex items-start gap-3">
              <FileText className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" strokeWidth={1.5} />
              <div>
                <p className="font-semibold text-text-primary text-sm mb-1">Breach notification in 72 hours</p>
                <p className="text-sm text-text-secondary leading-relaxed">
                  If a confirmed security incident affects your data, we'll notify you in writing within 72 hours of discovery. This aligns with GDPR Article 33 and DPDP Act 2023 requirements.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-card border border-text-primary/5 bg-background-alt p-4">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" strokeWidth={1.5} />
              <div>
                <p className="font-semibold text-text-primary text-sm mb-1">Data subject rights assistance</p>
                <p className="text-sm text-text-secondary leading-relaxed">
                  We'll help you respond to data subject access requests, deletion requests, and other rights under GDPR and DPDP Act 2023. We'll provide copies or delete data as instructed.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-card border border-text-primary/5 bg-background-alt p-4">
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" strokeWidth={1.5} />
              <div>
                <p className="font-semibold text-text-primary text-sm mb-1">Sub-processor oversight</p>
                <p className="text-sm text-text-secondary leading-relaxed">
                  Any sub-processors we engage (e.g., AWS, cloud providers) are listed in the DPA and subject to data protection agreements equivalent to ours. We notify you of changes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </LegalSection>

      <LegalSection title="Key Sections Covered">
        <p className="text-text-secondary leading-relaxed mb-4">
          The full DPA template includes:
        </p>
        <ul className="text-text-secondary leading-relaxed space-y-2 ml-5 list-disc">
          <li><HighlightLabel>Definitions.</HighlightLabel> Controller, processor, personal data, data subject, sub-processor</li>
          <li><HighlightLabel>Processing scope.</HighlightLabel> What data is processed, why, for how long, and for what purpose</li>
          <li><HighlightLabel>Processor obligations.</HighlightLabel> Our commitment to process only on your written instructions, maintain confidentiality, and implement security</li>
          <li><HighlightLabel>Sub-processor management.</HighlightLabel> How we notify you of changes and allow objections</li>
          <li><HighlightLabel>International transfers.</HighlightLabel> Standard Contractual Clauses (SCCs) for moving EU personal data outside the EEA</li>
          <li><HighlightLabel>Data subject rights.</HighlightLabel> Our role in assisting with access, deletion, portability, and objection requests</li>
          <li><HighlightLabel>Breach notification.</HighlightLabel> 72-hour notification of confirmed security incidents</li>
          <li><HighlightLabel>Auditing.</HighlightLabel> Your right to audit our security measures and compliance</li>
          <li><HighlightLabel>Data deletion/return.</HighlightLabel> Our obligation to return or securely delete data upon engagement end</li>
        </ul>
      </LegalSection>

      <LegalSection title="Get the Full Template">
        <p className="text-text-secondary leading-relaxed mb-4">
          The complete DPA template is available in our <Link href="/legal/dpa" className="text-gold hover:underline">legal-templates directory</Link>. To request a copy customized for your engagement:
        </p>
        <a
          href={`mailto:${SITE.email}?subject=DPA%20Request`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-gold hover:text-gold-bright transition-colors"
        >
          Email us for a copy
          <span aria-hidden="true">→</span>
        </a>
        <p className="text-xs text-text-tertiary mt-3">
          We'll send you the current version, which you can customize with your jurisdiction and specific requirements.
        </p>
      </LegalSection>

      <LegalSection title="Related Documents">
        <p className="text-text-secondary leading-relaxed mb-4">
          The DPA is part of a suite of agreements:
        </p>
        <ul className="text-text-secondary leading-relaxed space-y-3 ml-5">
          <li>
            <HighlightLabel>Master Services Agreement (MSA).</HighlightLabel> The main contract governing all services, fees, IP ownership, liability, and dispute resolution. The DPA is incorporated into the MSA.
          </li>
          <li>
            <HighlightLabel>Statement of Work (SOW).</HighlightLabel> Project-specific details: scope, deliverables, timeline, and milestones.
          </li>
          <li>
            <HighlightLabel>Standard Contractual Clauses (SCCs).</HighlightLabel> Legal mechanism for transferring EU personal data outside the EEA. Referenced and incorporated in the DPA.
          </li>
          <li>
            <HighlightLabel><Link href="/security" className="text-gold hover:underline">Security & Data Protection page</Link></HighlightLabel>. Public summary of our security posture and compliance frameworks.
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
              <HighlightLabel>We're happy to negotiate.</HighlightLabel> If you have a preferred DPA template, send it over and we'll review it against our security and operational practices.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-4 w-4 text-gold flex-shrink-0 mt-1" strokeWidth={2} />
            <p className="text-sm text-text-secondary leading-relaxed">
              <HighlightLabel>Data protection is non-negotiable.</HighlightLabel> Some terms (security measures, breach notification, sub-processor oversight) are fixed commitments. We're flexible on liability caps and jurisdiction.
            </p>
          </div>
        </div>
      </LegalSection>

      <LegalSection title="Questions?">
        <p className="text-text-secondary leading-relaxed">
          For questions about the DPA, data protection, or compliance, email{' '}
          <a href={`mailto:${SITE.email}?subject=DPA%20Question`} className="text-gold hover:underline">
            {SITE.email}
          </a>
          . We respond within 48 business hours.
        </p>
      </LegalSection>
    </>
  )
}
