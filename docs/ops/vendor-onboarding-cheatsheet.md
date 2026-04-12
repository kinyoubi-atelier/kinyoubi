# Vendor Onboarding Cheatsheet

**Use this to fill out vendor questionnaires, insurance forms, MSA appendices, and prospect due diligence.**

---

## Company Info

| Field | Answer |
|-------|--------|
| **Legal Entity Name** | Kinyoubi Atelier & Co. |
| **DBA / Trading Name** | Same as above (or "Kinyoubi" informally) |
| **Entity Type** | Sole proprietorship `[TBD — if scaling, upgrade to private limited (Pvt) Ltd]` |
| **Jurisdiction of Incorporation** | Odisha, India (not formally "incorporated"; registered under DSOP Act if applicable) |
| **Registered Address** | [Full address, Jeypore, Koraput District, Odisha PIN TBD] |
| **Mailing Address** | Same as above |
| **PAN (Permanent Account Number)** | [TBD — 10-digit Indian tax ID] |
| **GSTIN** | [TBD — if registered for GST; otherwise "Not applicable / below threshold"] |
| **IEC (Importer Exporter Code)** | [TBD — 10-digit DGFT code; required for service exports] |
| **Website** | https://kinyoubi-atelier.github.io / [custom domain TBD] |
| **Year Founded** | 2024 |
| **Annual Revenue (USD)** | `[TBD — fill as of latest FY; redact if confidential]` |
| **Employees** | 1 (founder) |
| **Headquarters Location** | Jeypore, Odisha, India |

---

## Ownership & Governance

| Field | Answer |
|-------|--------|
| **Owner Name** | Ankit Sahu |
| **Owner Title** | Founder & Principal Consultant |
| **Board of Directors** | N/A (sole proprietor; no board) |
| **Audit Committee** | N/A |
| **Compliance Officer** | Founder (no DPO until DPDP/GDPR threshold crossed; see below) |
| **Insurance (Cyber / E&O)** | `[PAID — not yet procured; candidate carriers TBD]` |

---

## Security & Compliance — Standard Answers

### Certifications

| Certification | Status | Answer |
|---|---|---|
| **SOC 2 Type II** | Not certified | "Not certified. Security controls documented at `/security` in our GitHub repository. DPA available on request." |
| **ISO 27001** | Not certified | Same as above. |
| **ISO 9001** | Not certified | "Not applicable; boutique consulting firm. Quality assurance built into delivery processes per contract SOW." |
| **CMMC (US DoD)** | Not certified | "Not applicable; do not work with US Department of Defense. Controls available for commercial engagements." |

**Rationale:** No invented certs. If a vendor form asks, the honest answer builds credibility with serious prospects.

---

### Data Security

| Question | Answer |
|---|---|
| **Encryption at rest** | "All data at rest (databases, file storage) encrypted with AES-256 or equivalent. Client-specific encryption keys managed per DPA." |
| **Encryption in transit** | "All data in transit uses TLS 1.3 (minimum TLS 1.2). No unencrypted HTTP. Client systems audited for compliance at engagement start." |
| **Data classification** | "Data classified at engagement kickoff per DPDP/GDPR requirements. Stored on encrypted client systems or founder's encrypted workstation. No third-party SaaS for client PII without DPA." |
| **Vendor/subcontractor management** | "All subcontractors (if any) bound by signed DPA. No ad-hoc outsourcing. List of subcontractors provided at contract signature." |

---

### Access Control & Least Privilege

| Question | Answer |
|---|---|
| **Access control policy** | "Role-based access control (RBAC). Only project team members granted repo/system access. Revoked immediately on project end." |
| **Approval process for access** | "Founder reviews and approves all access requests. Documented in project kickoff notes." |
| **Least privilege** | "Each team member (founder + authorized contractors) has minimum necessary access. Client systems accessed only during contracted hours. Automated logging of all access." |
| **MFA / 2FA** | "Yes. All GitHub, cloud platforms, and client systems require multi-factor authentication. Enforcement at account creation." |

---

### Backup & Disaster Recovery

| Question | Answer |
|---|---|
| **Backup frequency** | "Client data backed up [per contract SLA; typically daily for hosted systems, continuous for git-based projects]." |
| **Backup encryption** | "All backups encrypted at rest. Keys stored separately from backup media." |
| **RTO / RPO** | "Recovery Time Objective (RTO): [TBD per SLA; typically 4–8 hours]. Recovery Point Objective (RPO): [TBD per SLA; typically 1 day]." |
| **Testing & documentation** | "Backup restore procedure tested quarterly. Documented in internal runbooks. Evidence available on audit request." |

---

### Incident Response

| Question | Answer |
|---|---|
| **Incident response plan** | "Yes. Documented at `docs/ops/incident-response-runbook.md`. 72-hour notification to regulator if breach involves personal data under DPDP/GDPR." |
| **Breach notification timeline** | "Internal client notification within 24 hours; regulator notification within 72 hours (per DPDP Act 2023 Sec. 6(8) and GDPR Art. 33). Evidence log retained indefinitely." |
| **Incident log retention** | "Incident logs stored in `docs/incidents/` (git-tracked). Retained indefinitely for audit & regulatory compliance." |

---

### Compliance & Regulatory

| Question | Answer |
|---|---|
| **GDPR compliance (EU clients)** | "Yes. Data processing compliant with GDPR. Standard DPA provided at contract signature (see `legal-templates/DPA.md`). Personal data processed only per SOW scope. Subprocessors listed in DPA schedule." |
| **DPDP Act 2023 (India-resident clients)** | "Yes. Data fiduciary obligations met per Sec. 6 (Data Protection Impact Assessment), Sec. 8 (security measures), Sec. 10 (grievance redressal). DPA standard terms." |
| **CCPA / CPRA (California)** | "Yes, if applicable. Personal data treated as non-sensitive if client is controller. Founder is data processor. DPA governs handling." |
| **LGPD (Brazil)** | "Yes, if applicable. Same DPA framework applies." |
| **HIPAA (US healthcare)** | "Not covered. Do not process protected health information (PHI). If engagement involves healthcare data, special BAA required (discuss with prospect)." |
| **Audit rights** | "Client has right to audit or request audit confirmation. Annual attestation available if required." |

---

### DPA & Subprocessing

| Question | Answer |
|---|---|
| **Standard DPA available** | "Yes. Template at `/legal/dpa`. Customizable per client's data protection law (DPDP, GDPR, CCPA, LGPD, etc.)." |
| **Subprocessor approval** | "Founder is the only processor. If any subcontractor engaged (rare), written client approval required before engagement; subcontractor bound by DPA." |
| **Data residency** | "By default, data stored in client-designated region (e.g., EU for GDPR, India for DPDP). Confirm location in DPA schedule." |
| **Data deletion on termination** | "Yes. All client data deleted within 30 days of project termination unless otherwise agreed in contract. Confirmation provided to client." |

---

## Financial & Tax

| Field | Answer |
|-------|--------|
| **Payment Terms (default)** | Net 30 (Net 15 for small engagements, Net 45 for large; see international-invoicing.md) |
| **Invoicing Currency** | USD, EUR, GBP (set at contract; quoted for 60 days; fixed at invoice date) |
| **Bank Account on File** | [TBD — SWIFT details] |
| **W-9 (US IRS)** | Not applicable (non-US taxpayer). Provide W-8BEN-E instead (see international-invoicing.md). |
| **W-8BEN-E (Tax Treaty Relief)** | Yes. Provided at contract start (US clients only). Reduces US withholding from 30% to 15% under US–India DTAA. |
| **Tax Residency Certificate (TRC)** | Yes. Available for clients in DTAA jurisdictions (US, UK, Canada, etc.). Obtained annually from Indian tax authority (see export-compliance-india.md). |
| **VAT / GST Number** | GSTIN: `[TBD if registered]`. EU B2B digital services: reverse charge applies; no IGST charged (zero-rated export under LUT). |
| **FATCA / CRS** | Provided if required. Founder is Indian tax resident; no US FATCA reporting unless US person (not the case). |

---

## Insurance & Liability

| Area | Status | Answer |
|---|---|---|
| **Cyber Liability Insurance** | `[PAID — not yet procured]` | "Not yet in place. Planned for 2026. Candidate carriers under evaluation." |
| **Errors & Omissions (E&O) / Professional Liability** | `[PAID — not yet procured]` | Same as above. |
| **General Liability** | `[PAID — not yet procured]` | Same as above. |
| **Liability Cap in Contract** | N/A for now | "Suggest capping aggregate liability at fees paid for the engagement (or 12 months of fees for retainers). Insurance not yet in place; negotiate accordingly." |

**Insurance Gap Statement (if asked directly):**

> "Cyber insurance and E&O insurance are not yet procured. To mitigate, we suggest:
> 1. Liability cap in MSA at [fees paid or 12 months of fees].
> 2. Clear scope of services in SOW (limits liability to contracted deliverables).
> 3. Client's own insurance covers client-specific risks (data loss, infrastructure failure, etc.).
> 4. Insurance planned for procurement in [month/quarter TBD]; can discuss addendum post-procurement."

---

## SIG Lite / CAIQ Questions (Simplified)

**If client asks for CAIQ (Consensus Assessments Initiative Questionnaire) or "SIG Lite"** (15–20 core security questions):

| CAIQ Domain | Question | Answer |
|---|---|---|
| **IAM** | "Do you implement multi-factor authentication?" | "Yes. Mandatory for all accounts." |
| **IAM** | "Do you enforce strong password policies?" | "Yes. Minimum 12 chars, complexity. Reviewed at account creation." |
| **Data Protection** | "Is data encrypted in transit?" | "Yes. TLS 1.3 minimum." |
| **Data Protection** | "Is data encrypted at rest?" | "Yes. AES-256 or equivalent." |
| **Operations** | "Do you have an incident response plan?" | "Yes. 72-hour breach notification per DPDP/GDPR. Plan at `/docs/ops/incident-response-runbook.md`." |
| **Operations** | "Do you test incident response?" | "Yes. Tested annually. Evidence available on audit." |
| **Risk Management** | "Do you perform risk assessments?" | "Yes. Data Protection Impact Assessment (DPIA) performed at engagement start per contract scope." |
| **Vendor Management** | "Do you vet and monitor subcontractors?" | "All subcontractors bound by DPA. No ad-hoc outsourcing." |
| **Compliance** | "Do you comply with relevant data laws?" | "Yes. DPDP (India), GDPR (EU), CCPA (US), LGPD (Brazil) as applicable. Standard DPA provided." |

---

## Common Prospect Questions — Answers

| Question | Answer |
|---|---|
| "Do you have SOC 2 compliance?" | "Not certified. We're a 1-person shop; SOC 2 is more relevant for SaaS platforms. Our security controls are documented and available for review. We provide a standard DPA for regulated engagements." |
| "Are you insured for cyber risk?" | "Cyber & E&O insurance procurement underway; not yet active. We propose capping liability in the MSA at [fees paid] to reflect current posture. Insurance can be added via amendment post-procurement." |
| "What's your data retention policy?" | "Data retained only for the duration of the engagement and contract termination clause (typically 30 days). Deleted thereafter unless legally required (tax, audit). Confirmation provided." |
| "Can you sign our MSA?" | "Yes. We use a standard MSA template (see legal-templates/) and are happy to negotiate terms. Key points: limitation of liability, data protection (DPA schedule), confidentiality, term & termination." |
| "Do you require an NDA?" | "Mutual NDA often incorporated into MSA. Standard template available. Happy to discuss." |

---

## Checklist Before Responding to Questionnaire

- [ ] Fill all company info fields with TBD placeholders clearly marked.
- [ ] For any "not certified" answer, explain why (boutique firm, low volume, controls documented).
- [ ] For insurance gaps, acknowledge + propose liability cap as mitigation.
- [ ] For GDPR/DPDP questions, always mention standard DPA available at contract start.
- [ ] For "breach notification" questions, cite 72-hour clock + incident runbook.
- [ ] For "subcontractors," clearly state "none except as explicitly approved in writing."
- [ ] Sign (or initial) with date. Include title: "Founder & Principal Consultant."

---

## Status Trackers

| Item | Status | TBD? |
|---|---|---|
| W-8BEN-E (US clients) | Form obtained; ready to customize | No — fill with PAN + details from international-invoicing.md |
| TRC (Tax Residency Certificate) | Applied annually with ITR | Yes — apply with CA after first ITR filing |
| Cyber Insurance | Under research | Yes — shortlist carriers; procure before scaling |
| E&O Insurance | Under research | Yes — shortlist carriers; procure before scaling |
| Company Address (full PIN) | Registered in Jeypore, Odisha | Yes — fill before sending any form |
| PAN / GSTIN / IEC | Applied / obtained as needed | Yes — fill as each is obtained |
