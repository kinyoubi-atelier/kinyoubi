# Standard Contractual Clauses – Module Two (Controller to Processor)

**Template v1 — DRAFT. Not counsel-reviewed. Do not execute without licensed legal review in both EU and India.**

Based on EU Commission Decision 2021/914 (EU Standard Contractual Clauses for international data transfers)

---

## Introduction

This document incorporates the **Standard Contractual Clauses (SCCs) Module Two** — the transfer mechanism for transfers of personal data from controllers in the European Union, European Economic Area, or United Kingdom to data processors in third countries (including India) that lack an adequacy decision under GDPR Article 45.

**Important:** The full, unamended text of the EU Commission's SCC Module Two decision is legally binding on both parties. This document provides a structured overlay for parties to fill in the required annexes and supplementary measures.

The SCCs are incorporated **by reference into the Data Processing Addendum (DPA)** and may also be executed as a standalone instrument. Where conflict arises, the SCCs take precedence for the purposes of lawful transfer.

---

## Part I: Parties and Processing Details

### Clause I.A: Parties

| Element | Details |
|---------|---------|
| **Party A (Controller)** | [TBD — Full legal name, address, contact] |
| **Party B (Processor)** | Kinyoubi Atelier & Co., Jeypore, Koraput District, Odisha, India. Contact: kinyoubi.atelier@outlook.com |
| **Authority of Parties** | Party A is a controller of personal data. Party B is a processor acting on Party A's instructions. |
| **EU Contact (if applicable)** | [TBD — Representative in the EU, if required by GDPR Article 27] |
| **UK Contact (if applicable)** | [TBD — Representative in the UK, if required by UK GDPR Article 27] |

### Clause I.B: Processing Details (Description of Transfer)

| Element | Details |
|---------|---------|
| **Personal Data Categories** | [TBD — e.g., "names, email addresses, identifiers, access logs"] |
| **Data Subject Categories** | [TBD — e.g., "client employees, end-users, contractors"] |
| **Data Subject Volume (approx)** | [TBD — e.g., "up to 10,000 individuals"] |
| **Duration of Transfer** | [TBD — e.g., "12 months from Effective Date, renewable"] |
| **Subject Matter of Processing** | Software development, infrastructure provisioning, technical consulting, data migration, security testing, and regulatory compliance support as specified in the Statement of Work |
| **Nature of Processing** | Collection, recording, storage, retrieval, analysis, modification, deletion, and secure transmission |
| **Purpose of Processing** | Delivery of services listed in the Statement of Work; system operation, maintenance, and support; incident response and breach notification; audit and compliance demonstration |
| **Sub-processors Engaged** | [TBD — list in Annex I.C below] |

### Clause I.C: Competent Supervisory Authority

| Authority | Role |
|-----------|------|
| **Primary (for EU data subjects)** | [TBD — e.g., "Data Protection Authority of Austria" or "the Member State where the Controller is established"] |
| **Primary (for UK data subjects)** | Information Commissioner's Office (ICO), UK |
| **India (Processor's Jurisdiction)** | [TBD — Data Protection Authority of India (once established under DPDP Act 2023); currently DPA Act disputes routed to civil courts] |

---

## Part II: Obligations of the Processor (Party B)

### Clause II.A: Instructions

The Processor will:
- Process personal data only on documented written instructions from the Controller
- Not process personal data for purposes other than those specified by the Controller
- Inform the Controller without undue delay if an instruction violates GDPR, UK GDPR, DPDP Act 2023, or applicable law
- Suspend or cease processing if instructed by the Controller or a supervisory authority, unless prohibited by law

### Clause II.B: Confidentiality

The Processor will:
- Ensure that all personnel with access to personal data are bound by confidentiality or an equivalent legal obligation
- Provide evidence (upon request) of confidentiality or equivalent obligations signed by staff
- Maintain a list of authorized personnel and their roles

### Clause II.C: Security Measures (Technical and Organizational Measures — TOMs)

The Processor will implement and maintain security measures described in **Annex II** to protect personal data against:
- Unauthorized or unlawful processing
- Accidental loss, destruction, or damage
- Unauthorized disclosure or access
- Alteration or corruption

**Minimum safeguards include:**
- Encryption in transit (TLS 1.2+ or current best practice)
- Encryption at rest (AES-256 or equivalent)
- Access controls and role-based authorization
- Audit logging of all access
- Network segmentation and firewalls
- Vulnerability and patch management
- Secure development lifecycle (code review, dependency scanning)
- Personnel training and awareness
- Incident response procedures
- Business continuity and disaster recovery

### Clause II.D: Sub-processors

#### II.D.1 Prior Authorization

The Processor will not engage sub-processors without prior written authorization from the Controller. 

**Approved sub-processors are listed in Annex I.C.**

#### II.D.2 Changes to Sub-processor List

The Processor will notify the Controller of any intended change (addition or replacement of a sub-processor) at least **30 days in advance.**

Notification must include:
- Name, address, and location of the proposed sub-processor
- Description of the processing activities
- Confirmation that equivalent data protection obligations will be imposed

#### II.D.3 Controller's Right to Object

The Controller may object to the engagement of a new sub-processor within **14 days of notification** on reasonable grounds relating to data protection.

If the parties cannot resolve the objection:
- Either party may terminate the affected engagement without penalty (except payment for services rendered to date)
- Termination takes effect 30 days after written notice

#### II.D.4 Sub-processor Obligations

The Processor will impose written data protection obligations on all sub-processors that provide the same level of protection as this SCC:
- Sub-processors must comply with GDPR/UK GDPR obligations equivalent to the Processor's
- The Processor remains liable to the Controller for sub-processor performance

### Clause II.E: Data Subject Rights

The Processor will assist the Controller in fulfilling data subject rights requests, including:

| Right | Processor Support |
|------|---|
| **Right of Access (GDPR 15 / UK GDPR 15)** | Provide copies of personal data; assist with subject access request responses |
| **Right to Rectification (GDPR 16 / UK GDPR 16)** | Correct inaccurate data within 10 business days of request |
| **Right to Erasure (GDPR 17 / UK GDPR 17)** | Delete personal data (except where legal obligations require retention) |
| **Right to Restrict Processing (GDPR 18 / UK GDPR 18)** | Limit processing to storage only while the request is evaluated |
| **Right to Data Portability (GDPR 20 / UK GDPR 20)** | Provide personal data in portable, machine-readable format |
| **Right to Object (GDPR 21 / UK GDPR 21)** | Cease processing where legitimate interests are invoked |
| **Rights related to Automated Decision-Making (GDPR 22 / UK GDPR 22)** | Provide information about any profiling or algorithmic decisions |

**Timeline:** The Processor will respond within **10 business days** of the Controller's request and provide technical cooperation (data exports, identity verification) as needed.

### Clause II.F: Notification of Breach (GDPR 33 / UK GDPR 33)

#### II.F.1 Timing

The Processor will notify the Controller within **72 hours of confirming a personal data breach** — or as soon as practicable if earlier confirmation is not feasible, provided notification occurs within 72 hours of awareness.

#### II.F.2 Content

The notification must include:
- The nature and likely consequences of the breach
- The categories and approximate number of data subjects affected
- The categories and approximate volume of personal data breached
- The likely impact on the data subjects
- The measures taken or proposed to address the breach and mitigate harm
- The name and contact of the Processor's incident response contact

#### II.F.3 Cooperation

The Processor will:
- Provide all necessary information to enable the Controller to notify supervisory authorities and data subjects as required by GDPR Articles 33–34
- Not publicly disclose the breach without prior written consent from the Controller (except where legally required)
- Preserve all evidence and cooperate with investigations by the Controller, supervisory authorities, or law enforcement

### Clause II.G: Deletion or Return of Data (GDPR 28(3)(g) / UK GDPR 28(3)(g))

#### II.G.1 Timing

Upon expiration or termination of the engagement or this SCC (whichever is earlier), the Processor will, within **30 days** and at the Controller's written instruction:

**Option A: Return all personal data**
- Export data in a standard, machine-readable format
- Deliver securely via encrypted transmission or physical media
- Provide a written certificate of delivery

**Option B: Securely delete all personal data**
- Use cryptographic erasure, multi-pass overwriting, or physical destruction methods
- Provide a written certificate of deletion signed by an authorized officer
- Confirm deletion through: cryptographic key destruction, secure erasure tool logs, or third-party destruction certification

#### II.G.2 Exceptions

The Processor may retain data if required by law (e.g., tax, litigation hold), provided:
- Retention is limited to the minimum required by law
- Data remains subject to these SCC protections
- The Processor notifies the Controller of the legal requirement and retention period

### Clause II.H: Audit and Inspection

#### II.H.1 Audit Rights

The Controller (or its auditor/representative) may:
- Conduct audits of the Processor's compliance with this SCC
- Request evidence of technical and organizational measures
- Interview relevant personnel
- Review documentation, logs, and records

#### II.H.2 Notice

The Controller will provide at least **10 business days' advance notice** unless:
- Legal obligation requires shorter notice
- The audit is a response to suspected breach or non-compliance

#### II.H.3 Frequency and Cost

- **Annual audit:** The Controller is entitled to one comprehensive audit per year at no cost
- **Additional audits:** The Processor may impose reasonable per-audit fees
- **Shared audits:** The Processor may satisfy multiple clients through shared third-party audits, provided confidentiality is maintained

---

## Part III: Transfers of Personal Data to Third Countries

### Clause III.A: Transfer Mechanism

Transfers of personal data from the EEA/UK to India are **only lawful if:**

1. **The Processor's jurisdiction (India) is subject to an adequacy decision** (e.g., EU adequacy finding under GDPR Article 45(3)) — *[Currently: No adequacy decision exists for India]*
2. **OR the transfer is safeguarded by appropriate safeguards** (e.g., Standard Contractual Clauses, Binding Corporate Rules), **PLUS**
3. **Supplementary measures that ensure effective protection** equivalent to the EEA/UK level

This SCC provides the contractual framework. Supplementary measures are detailed in Clause III.B below.

### Clause III.B: Supplementary Measures

Because India currently lacks an GDPR adequacy decision, the Processor commits to the following supplementary technical and organizational measures to address transfer risks:

#### III.B.1 Data Localization (Option A — Recommended)

**The Processor will:**
- Store all personal data originating from the EEA/UK within the AWS EU region (e.g., eu-west-1 Ireland, eu-central-1 Frankfurt) **OR** in a third-country region with contractual guarantees equivalent to this SCC (e.g., AWS ap-south-1 Mumbai, with encrypted backup only)
- NOT allow any copy of the data to reside in India or any other jurisdiction without prior written authorization from the Controller
- If compute processing occurs in India (e.g., for data analysis, ML training), the data must be:
  - De-identified or pseudonymized before transfer, OR
  - Transferred under a separate processing agreement with equivalent safeguards, OR
  - Not transferred at all; processing executed in the EU region

**Rationale:** Limiting data residency to regulated jurisdictions reduces the risk profile and demonstrates active supplementary measures.

#### III.B.2 Encryption and Key Management (Mandatory)

**The Processor will:**
- Encrypt all personal data at rest using AES-256 or equivalent strong encryption
- Encrypt all personal data in transit using TLS 1.3+ (or current best practice)
- Manage encryption keys using a hardware security module (HSM) or equivalent KMS (e.g., AWS KMS) located in the EU or equivalent jurisdiction
- **NOT store encryption keys in India** — keys remain in the EU or under third-party escrow
- Rotate encryption keys at least annually and upon any suspected key compromise
- Maintain key recovery procedures and test them at least annually

**Effect:** Even if data is accessed or exfiltrated in India, it remains unreadable without the EU-based encryption keys.

#### III.B.3 Access Restrictions (Mandatory)

**The Processor will:**
- Implement role-based access controls (RBAC) limiting access to personal data to individuals with a documented business need
- Require multi-factor authentication (MFA) for any human access to personal data
- Use identity federation (e.g., Cognito, Okta) to bind access to the EU region's identity provider
- Log and audit all access; audit logs will not be accessible to Processor personnel without explicit Controller approval
- Segregate Processor development and testing from any production systems containing personal data
- **Restrict access by Processor staff in India** to de-identified or pseudonymized data only; if access to identified data is necessary, it must be approved in writing by the Controller and logged in real time

#### III.B.4 Data Processing and Transfer Limitations

**The Processor will NOT:**
- Process personal data (including read access) for any purpose other than those explicitly authorized by the Controller
- Transfer personal data to sub-processors in India without prior written approval and equivalent safeguards
- Use personal data to train proprietary machine learning models without explicit, documented Controller consent (consent limited to the specific model and use case)
- Perform profiling, scoring, or automated decision-making on personal data without explicit notification and technical documentation provided to the Controller

#### III.B.5 Contractual Guarantees from Sub-processors

**For any sub-processor in India or a jurisdiction without adequacy:**
- The Processor will impose the same supplementary measures (data localization, encryption, key management, access restrictions) through written sub-processor agreements
- Sub-processor agreements will be made available to the Controller upon request

#### III.B.6 Audit and Certification

**The Processor will:**
- Conduct an annual Transfer Impact Assessment (TIA) to evaluate the adequacy of supplementary measures
- Engage a third-party auditor to verify compliance with these supplementary measures at least every 18 months
- Provide a summary audit report to the Controller within 30 days of completion
- If the TIA or audit identifies risks, develop a remediation plan within 14 days and update the Controller monthly

#### III.B.7 Recourse and Termination

**If supplementary measures are found inadequate:**
- The Processor will immediately cease any transfers that do not comply
- The Processor and Controller will work together to implement enhanced measures
- If no adequate measures can be agreed, the Controller may terminate the affected engagement without penalty

### Clause III.C: Onward Transfers

The Processor will **NOT transfer personal data to any country other than India without:**
- Prior written authorization from the Controller
- Confirmation that the recipient country has equivalent safeguards (adequacy decision, SCC, or equivalent mechanism)
- Supplementary measures equivalent to this SCC

---

## Part IV: Data Subject Rights and Legal Obligations

### Clause IV.A: Rights of Data Subjects in the EEA/UK

The Controller and Processor recognize that data subjects in the EEA/UK have enforceable rights under GDPR and UK GDPR, including:
- Right to be informed (privacy notices)
- Right of access (subject access requests)
- Right to rectification, erasure, and restriction
- Right to data portability
- Right to object and to automated decision-making rights
- Right to lodge a complaint with a supervisory authority

The Processor will assist the Controller in fulfilling these rights as detailed in Clause II.E.

### Clause IV.B: Laws and Regulations in the Processor's Jurisdiction (India)

The Processor acknowledges that:
- India has enacted the **DPDP Act 2023**, which creates data fiduciary and data processor obligations
- The Processor qualifies as a "data processor" under DPDP and will comply with equivalent obligations
- The Processor will comply with **DPDP Act 2023** requirements for:
  - Processing personal data only on the instructions of the data fiduciary (Controller)
  - Implementing reasonable security measures
  - Cooperating with consent records and withdrawal requests
  - Notifying the data fiduciary of breaches
  - Assisting with data subject rights
- The Processor will not invoke DPDP Act defenses to avoid obligations under this SCC

### Clause IV.C: Law Enforcement and Government Requests

**The Processor will:**
- Inform the Controller without undue delay if it receives a legally binding demand from courts, law enforcement, or government authorities for access to personal data
- Provide the Controller with an opportunity to seek judicial review or challenge the demand **before disclosure**, unless prohibited by law
- Disclose only the minimum data required by the legal demand
- Maintain records of all such requests and disclosures
- Use all lawful means to resist overly broad or unlawful demands

**Exception:** The Processor may not disclose demands from Indian tax authorities without first notifying the Controller, except where legally prohibited.

---

## Part V: Liability and Remedies

### Clause V.A: Liability

The Processor's liability for breaches of this SCC is governed by the **Master Services Agreement (MSA)**, Section [TBD — Limitation of Liability]:
- Liability is capped at the fees paid in the prior 12 months
- **Exception:** The cap does not apply to:
  - Data Protection Indemnity (Clause V.B)
  - Confidentiality breaches
  - Willful misconduct or gross negligence
  - Breach of Clause III.B (Supplementary Measures)

### Clause V.B: Data Protection Indemnity

The Processor indemnifies and holds harmless the Controller from:
- Fines, penalties, or sanctions imposed by supervisory authorities arising from the Processor's breach of this SCC or applicable data protection law
- Third-party claims for damages arising from the Processor's breach
- All costs and expenses related to breach investigation, notification, credit monitoring, and remediation

### Clause V.C: Supervisory Authority Assistance

**If a supervisory authority investigates the Processor:**
- The Processor will cooperate fully and provide requested documentation within the timeframe specified
- The Processor will not charge the Controller for such cooperation
- The Controller may participate in any supervisory authority proceedings

---

## Part VI: Termination and Wind-down

### Clause VI.A: Termination for Breach

If the Processor materially breaches this SCC and does not cure the breach within **30 days** of written notice:
- The Controller may immediately terminate the affected engagement
- Termination is without penalty to the Controller
- The Processor must return or delete personal data within 30 days of termination

### Clause VI.B: Termination for Convenience

Either party may terminate this SCC upon **60 days' written notice**, provided:
- The Processor returns or deletes all personal data within 30 days of termination
- The Processor complies with any outstanding data subject rights requests

---

## Annex I: Details of Processing and Sub-processors

### Annex I.A: Parties (as per Clause I.A)

[Completed in Part I above]

### Annex I.B: Data Transfer Details (as per Clause I.B)

[Completed in Part I above; expand below as needed]

**Additional Processing Details:**

| Aspect | Detail |
|--------|--------|
| **Specific Data Elements** | [TBD — e.g., "customer email addresses, login timestamps, session IP logs"] |
| **Data Subject Identifiers** | [TBD — e.g., "customer ID (hashed), email (plain text)"] |
| **Frequency of Transfer** | [TBD — e.g., "continuous streaming; daily batch exports"] |
| **Transfer Method** | [TBD — e.g., "HTTPS API, encrypted SFTP, AWS S3 with KMS"] |

### Annex I.C: Sub-processors and Competent Authorities

#### Sub-processor List

| Name | Location | Processing Activity | Legal Basis for Transfer | Status |
|------|----------|---|---|---|
| [TBD — e.g., AWS (EC2, RDS, S3)] | [TBD — e.g., eu-west-1 (Ireland), ap-south-1 (Mumbai)] | [TBD — e.g., data storage, compute, backup] | [TBD — AWS Data Processing Addendum + SCCs] | Active |
| [TBD] | [TBD] | [TBD] | [TBD] | [TBD] |

**Sub-processor Additions:** Any changes to sub-processors require 30 days' advance notice and Controller approval as per Clause II.D.

#### Competent Supervisory Authorities

| Data Subject Location | Supervisory Authority | Contact |
|---|---|---|
| Austria | Österreichische Datenschutzbehörde (AT) | [web address] |
| Belgium | Commission de la protection de la vie privée (BE) | [web address] |
| [TBD — other EEA/UK states] | [Authority Name] | [Contact] |
| UK | Information Commissioner's Office (ICO) | ico.org.uk |

---

## Annex II: Technical and Organizational Measures (TOMs)

[Reference the **DPA.md, Annex II** for a complete enumeration of TOMs. Key items summary below:]

### II.1 Minimum Safeguards

| Category | Measure |
|----------|---------|
| **Transport Encryption** | TLS 1.2+ (or current best practice) for all data in transit |
| **Data Encryption** | AES-256 or equivalent for data at rest |
| **Key Management** | HSM or KMS (AWS KMS, HashiCorp Vault) in EU region; annual rotation |
| **Access Control** | RBAC, MFA, identity federation; logging of all access |
| **Network Security** | Firewalls, VPC segmentation, DDoS protection, WAF (if applicable) |
| **Vulnerability Management** | Code review, dependency scanning, annual penetration testing, patch management (critical: 48 hours) |
| **Incident Response** | 24/7 monitoring; breach notification within 72 hours; incident response plan |
| **Business Continuity** | Daily backups; RTO [TBD]; RPO [TBD]; quarterly DR testing |
| **Personnel Training** | Annual GDPR/DPDP training for all staff with data access |
| **Audit** | Annual third-party audit; quarterly access review; continuous monitoring |

---

## Signature Block

**By executing this SCC, the parties agree to be bound by all clauses and annexes.**

### Party A (Controller)

Signature: _____________________________ Date: ______________

Name (print): _________________________

Title: ________________________________

Organization: _________________________

Address: ______________________________

### Party B (Processor)

Signature: _____________________________ Date: ______________

Name (print): _________________________

Title: ________________________________

Organization: Kinyoubi Atelier & Co.

Address: Jeypore, Koraput District, Odisha, India

---

## Final Notes

1. **This document incorporates the EU Standard Contractual Clauses Module Two by reference.** In case of any conflict between the detailed clauses in this document and the official EU Commission Decision 2021/914 text, the official SCC text prevails.

2. **Supplementary Measures (Clause III.B) are legally required** because India lacks an adequacy decision. Parties may not waive these measures.

3. **This SCC must be executed as a separate document** alongside the Data Processing Addendum (DPA) or as a standalone addendum to the Master Services Agreement.

4. **IMPORTANT:** This is a template. Before execution:
   - Have it reviewed by EU data protection counsel (for the Controller)
   - Have it reviewed by Indian legal counsel
   - Customize all [TBD] fields
   - Ensure all parties' authorized signatories execute

5. **No liability assumption:** Kinyoubi Atelier & Co. provides this template for informational purposes and assumes no liability for use without independent legal review.

---

**Document Version:** 1.0  
**Last Updated:** 12 April 2026

