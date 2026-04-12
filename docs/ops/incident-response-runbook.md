# Incident Response Runbook

## Scope

Two distinct environments: the marketing site (kinyoubi-atelier.github.io / custom domain) and client engagements (may hold personal data under DPDP Act 2023 / GDPR).

### Marketing Site
- **What it is:** Static Next.js 14 export on GitHub Pages. No database, no user accounts, no PII stored.
- **Attack surface:** GitHub Pages abuse (repo takeover, defacement), phishing via contact form, email spoofing from kinyoubi domain.
- **Data loss risk:** Negligible. Incident is reputational / availability.

### Client Engagements
- **What they hold:** Personal data (may be regulated under DPDP Act 2023 / GDPR / CCPA / LGPD per client jurisdiction).
- **Attack surface:** Repository compromise, credentials exposed, client infra compromise, data exfiltration.
- **Data loss risk:** High. Incident is data protection + regulatory notification.

---

## Incident Clock

**72-hour clock starts:** the moment the founder becomes aware of a confirmed compromise OR a plausible compromise of personal data under DPDP/GDPR scope.

**Not** when a vulnerability is discovered. **Yes** when there is evidence of actual or likely unauthorized access/exfiltration.

Regulator notification window per DPDP Act 2023 Sec. 6(8): as soon as practicable, but at minimum within 72 hours of becoming aware.

---

## Severity Classification

### SEV1 (Critical)
- **Triggers:** Confirmed exfiltration of client PII; ransomware; github.com account or custom domain DNS takeover.
- **Action:** Stop all work. Immediate founder + client DPO call. Regulator + CERT-In notification within 6 hours if breach involves specified systems (see contacts). Lock down credentials. Preserve evidence.

### SEV2 (High)
- **Triggers:** Unauthorized access to client repo (confirmed via audit logs); credentials exposed in commit history; suspicious activity on client systems.
- **Action:** Within 2 hours, assess scope (how much data accessed, exfiltrated?). Client notification within 24 hours. Begin incident log. Initiate containment.

### SEV3 (Medium)
- **Triggers:** Failed login attempts; social engineering attempt; misconfigured access control (no exfiltration). Contact form spam (marketing site only).
- **Action:** Document in incident log. Remediate (reset password, revoke token, fix config). No regulator notification required unless escalates to SEV2.

---

## Decision Tree: Marketing Site Incident

1. **Is GitHub Pages/domain DNS offline or defaced?**
   - Yes → Contact GitHub abuse (abuse@github.com) and domain registrar `[TBD — fill when domain purchased]`. Restore from latest commit. No data breach notification needed.
   - No → Go to step 2.

2. **Is there evidence of credential theft (repo write access abuse)?**
   - Yes → SEV1. Rotate GitHub token, GitHub account password, domain registrar API key. Audit commits. Notify github.com abuse. Preserve logs.
   - No → Go to step 3.

3. **Is there evidence of email spoofing or phishing from kinyoubi domain?**
   - Yes → Notify domain registrar. Document in log. Update SPF/DKIM/DMARC records `[PAID — requires DNS records setup during domain migration]`. No PII exposed; no regulator notification.
   - No → SEV3. Log it. Move on.

---

## Decision Tree: Client Engagement Incident

1. **Is there confirmed unauthorized access to client data (repo audit logs, S3 bucket, etc.)?**
   - Yes → SEV1. Go to **SEV1 Protocol** below.
   - No → Go to step 2.

2. **Is there suspicious activity but no confirmed access?**
   - Yes → SEV2. Go to **SEV2 Protocol** below.
   - No → SEV3. Document. Remediate. Done.

---

## SEV1 Protocol

1. **Within 1 hour:**
   - Founder + client DPO call. Confirm scope: which data, how many individuals affected, any evidence of exfiltration?
   - Preserve logs: clone affected repo, take snapshots of audit trails, preserve email evidence.
   - Isolation: revoke access tokens, rotate credentials, enable 2FA on all accounts.

2. **Within 6 hours (if DPDP-regulated or data involves Indian residents OR EU residents under GDPR):**
   - Notify CERT-In if breach involves "critical information infrastructure" as defined in CERT-In Directions (28 April 2022). `[TBD — confirm with CA if engagement is in-scope; err on side of reporting.]`
   - Email: cert-in at cert-in dot org dot in. Subject: "Incident Notification — [Engagement Name]". Include: date/time breach discovered, number of records, brief description, interim actions.

3. **Within 24 hours:**
   - Send client internal notification: use template below.
   - If GDPR or other jurisdiction law requires regulator notification, draft regulator letter (see template below).
   - Begin incident log (see retention section below).

4. **Within 72 hours:**
   - Regulator notification complete if required.
   - Post-incident summary to client (template below).
   - Internal root cause analysis begun.

---

## SEV2 Protocol

1. **Within 2 hours:**
   - Assess scope: how much data could have been accessed? Any evidence of exfiltration (unusual data egress, suspicious commits)?
   - Containment: revoke suspicious access, rotate credentials.

2. **Within 24 hours:**
   - Client notification (template below; subject "Potential Unauthorized Access — Investigation Ongoing").
   - Decide: does this escalate to SEV1 (confirmed exfiltration)? If yes, follow SEV1 Protocol.
   - If no exfiltration found: inform client, log incident, continue with root cause analysis.

---

## Contacts

| Entity | Contact | Purpose |
|--------|---------|---------|
| GitHub Abuse | abuse@github.com | Repo compromise, defacement |
| Domain Registrar | `[TBD — fill when domain purchased]` | DNS takeover, domain abuse |
| CERT-In | cert-in@cert-in.org.in | Mandatory breach reporting (DPDP-regulated data, critical infra) |
| Client DPO | `[TBD — collected at engagement kickoff; stored in kickoff notes]` | Client-side notification, regulatory co-ordination |
| [CA Name] | `[TBD — contact details]` | DTAA, tax residency, regulator guidance |

---

## Communication Templates

### Client Internal Notification (SEV1/2)

```
Subject: [URGENT] Potential Security Incident — [Engagement Name]

Dear [Client Contact Name],

At [date/time], we discovered evidence of [unauthorized access / suspected compromise / failed attack attempt] affecting [Engagement Name].

Scope: [which systems/data; how many records potentially affected]

Immediate Actions Taken:
- Revoked all access credentials
- Enabled 2FA on all accounts
- Isolated affected systems
- Preserved evidence for investigation

Next Steps:
- We will notify your Data Protection Officer separately
- Investigation and root cause analysis underway; update within 24 hours
- Regulatory notification timeline: we are within the 72-hour window per data protection law

Your DPO contact will receive a separate detailed brief.

Please direct questions to [founder email].

Best regards,
Kinyoubi Atelier & Co.
```

### Regulator Notification Skeleton (GDPR / DPDP)

```
Dear [Authority Name],

Pursuant to [GDPR Art. 33 / DPDP Act 2023 Sec. 6(8)], we notify you of a personal data breach affecting [engagement name]:

Breach Date: [date]
Discovery Date: [date]
Individuals Affected: [count]
Categories of Data: [types]
Scope: [describe]

Remedial Measures:
- [list immediate actions]
- Ongoing investigation: [timeline]

Contact for further inquiry: [founder name, email, phone]

[Signature]
```

### Post-Incident Summary (24–72 hours post-discovery)

```
Subject: Incident Report — [Engagement Name]

Root Cause: [initial finding; full analysis may be ongoing]

Impact: [confirmed scope; # individuals; # records; any evidence of exfiltration]

Remediation: [actions taken; preventive steps; timeline for further hardening]

Next Review: [date]
```

---

## Incident Log

**Format (Markdown table in `docs/incidents/YYYY-MM-DD-[name].md`):**

| Field | Value |
|-------|-------|
| Date Discovered | [ISO date/time] |
| Severity | SEV1/2/3 |
| Scope | Marketing site / [Engagement Name] |
| Data Affected | [Types of data; count of records if known] |
| Root Cause | [preliminary / TBD] |
| Individuals Notified | [founder, client DPO, regulators, etc.] |
| Notification Dates | [dates and times] |
| Remediation | [actions, timeline] |
| Status | Open / Closed |

**Where stored:** `/docs/incidents/` (git-tracked; do not delete).

**Retention:** Indefinite. Supports regulatory audit trail.

---

## Escalation & Approval

The founder is responsible for all SEV1/2 decisions and regulator notifications. No external approval gate; time is critical.

**If uncertain** (e.g., "is this DPDP-regulated?"), err on the side of notification and contact CA for guidance during containment.
