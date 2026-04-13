import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Email Compliance & Notices | Kinyoubi Atelier & Co.',
  description:
    'Email compliance policies for Kinyoubi Atelier & Co. — confidentiality, intellectual property, data protection, and communication integrity.',
}

function LegalSection({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-text-primary">{title}</h2>
      {children}
    </div>
  )
}

function HighlightLabel({ children }: { children: React.ReactNode }) {
  return <span className="font-semibold text-gold">{children}</span>
}

export default function CompliancePage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="py-20 md:py-28 px-6 md:px-12 border-b border-text-primary/5">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/legal/terms"
            className="text-sm text-gold hover:underline mb-6 inline-block"
          >
            ← All legal pages
          </Link>
          <h1 className="font-heading text-display-sm md:text-display text-text-primary tracking-tight mb-3">
            Email Compliance &amp; Notices
          </h1>
          <p className="text-sm text-text-tertiary">Last updated: 13 April 2026</p>
        </div>
      </section>

      {/* Preamble */}
      <section className="py-16 md:py-20 px-6 md:px-12">
        <div className="max-w-3xl mx-auto space-y-10">
          {/* Entity information */}
          <div className="border border-text-primary/5 rounded-lg p-6 space-y-1">
            <p className="text-text-primary font-semibold">{SITE.name}</p>
            <p className="text-text-secondary text-sm">
              Software Development · Technical Consulting
            </p>
            <p className="text-text-tertiary text-sm">
              Jeypore, Odisha 764001, India
            </p>
            <p className="text-text-tertiary text-sm">
              <a
                href={`mailto:${SITE.email}`}
                className="text-gold hover:underline"
              >
                {SITE.email}
              </a>
              &nbsp;&nbsp;·&nbsp;&nbsp;
              <a
                href={SITE.url}
                className="text-gold hover:underline"
              >
                kinyoubiatelier.com
              </a>
            </p>
          </div>

          {/* Sections */}
          <LegalSection title="Confidentiality">
            <p className="text-text-secondary leading-relaxed">
              Emails from {SITE.name} and any attachments are intended solely for
              the named recipient(s) and may contain information that is
              confidential, legally privileged, or otherwise protected under
              applicable law, including the Information Technology Act, 2000
              (India), the General Data Protection Regulation (EU 2016/679), and
              the UK Data Protection Act 2018.
            </p>
            <p className="text-text-secondary leading-relaxed">
              If you are not the intended recipient, please notify the sender
              immediately and permanently delete all copies. Unauthorised access,
              use, disclosure, or distribution is strictly prohibited and may give
              rise to civil or criminal liability.
            </p>
          </LegalSection>

          <LegalSection title="Intellectual Property">
            <p className="text-text-secondary leading-relaxed">
              All ideas, concepts, designs, source code, documentation, and other
              materials shared in email communications remain the exclusive
              intellectual property of {SITE.name} unless expressly assigned or
              licensed in writing under a separate executed agreement. Receipt of
              an email does not grant the recipient any licence, right, title, or
              interest — whether by implication, estoppel, or otherwise — in any
              such materials.
            </p>
          </LegalSection>

          <LegalSection title="No Contract Formation">
            <p className="text-text-secondary leading-relaxed">
              Nothing in an email from {SITE.name} constitutes a binding offer,
              acceptance, or contractual commitment unless confirmed by a duly
              executed written agreement. Any terms, pricing, or timelines
              referenced therein are indicative only and subject to formal
              engagement.
            </p>
          </LegalSection>

          <LegalSection title="Data Protection &amp; Privacy">
            <p className="text-text-secondary leading-relaxed">
              We process personal data in accordance with the{' '}
              <HighlightLabel>
                Digital Personal Data Protection Act, 2023
              </HighlightLabel>{' '}
              (India), the DPDP Rules 2025, the{' '}
              <HighlightLabel>GDPR (EU 2016/679)</HighlightLabel>, and the UK
              GDPR.
            </p>
            <p className="text-text-secondary leading-relaxed">
              For data inquiries — including access, correction, erasure, or
              withdrawal of consent — contact{' '}
              <a
                href={`mailto:${SITE.email}`}
                className="text-gold hover:underline"
              >
                {SITE.email}
              </a>
              . Our full Privacy Policy is available at{' '}
              <Link href="/legal/privacy" className="text-gold hover:underline">
                kinyoubiatelier.com/legal/privacy
              </Link>
              .
            </p>
          </LegalSection>

          <LegalSection title="Communication Tools">
            <p className="text-text-secondary leading-relaxed">
              {SITE.name} employs a range of professional tools, including
              AI-assisted drafting and review capabilities, to ensure accuracy and
              efficiency. All outbound correspondence is reviewed and approved by
              our team before sending.
            </p>
          </LegalSection>

          <LegalSection title="Email Integrity">
            <p className="text-text-secondary leading-relaxed">
              Emails from {SITE.name} are authenticated using{' '}
              <HighlightLabel>SPF</HighlightLabel>,{' '}
              <HighlightLabel>DKIM</HighlightLabel>, and{' '}
              <HighlightLabel>DMARC</HighlightLabel>. If you suspect tampering,
              contact us directly at{' '}
              <a
                href={`mailto:${SITE.email}`}
                className="text-gold hover:underline"
              >
                {SITE.email}
              </a>
              .
            </p>
          </LegalSection>

          <LegalSection title="Disclaimer">
            <p className="text-text-secondary leading-relaxed">
              {SITE.name} makes no warranty as to the accuracy or completeness of
              any email. We accept no liability for any loss arising from reliance
              on its contents, or from any virus or defect transmitted with it.
            </p>
          </LegalSection>

          <LegalSection title="Unsubscribe">
            <p className="text-text-secondary leading-relaxed">
              If an email was promotional and you wish to opt out, reply with
              &ldquo;Unsubscribe&rdquo; or contact{' '}
              <a
                href={`mailto:${SITE.email}`}
                className="text-gold hover:underline"
              >
                {SITE.email}
              </a>
              . Requests are processed within 10 business days.
            </p>
          </LegalSection>

          {/* Navigation */}
          <div className="pt-10 border-t border-text-primary/5 flex flex-wrap gap-6">
            <Link
              href="/legal/privacy"
              className="text-sm text-gold hover:underline"
            >
              Privacy Policy →
            </Link>
            <Link
              href="/legal/terms"
              className="text-sm text-gold hover:underline"
            >
              Terms of Use →
            </Link>
            <Link
              href="/legal/dpa"
              className="text-sm text-gold hover:underline"
            >
              Data Processing Agreement →
            </Link>
            <Link
              href="/legal/copyright"
              className="text-sm text-gold hover:underline"
            >
              Copyright Notice →
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
