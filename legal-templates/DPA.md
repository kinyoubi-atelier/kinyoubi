# Data Processing Addendum

**Template v1 — DRAFT. Not counsel-reviewed. Do not execute without licensed legal review in both India and the relevant counterparty jurisdiction.**

## 1. Definitions and Scope

**Data Controller ("Controller"):** The entity (you, the client) who determines the purposes and means of processing personal data.

**Data Processor ("Processor"):** Kinyoubi Atelier & Co., acting on written instructions from the Controller.

**Personal Data:** Any information relating to an identified or identifiable natural person, as defined under:
- GDPR (EU Regulation 2016/679)
- DPDP Act 2023 (India)
- UK GDPR (as applicable)

**Processing:** Any operation performed on personal data, including collection, recording, organisation, structuring, storage, adaptation, retrieval, use, disclosure, erasure, or destruction.

**Data Subject:** The natural person to whom personal data relates.

**Sub-processor:** Any legal entity engaged by the Processor to process personal data on the Processor's behalf.

---

## 2. Subject Matter and Duration of Processing

**Subject Matter:**  
The Processor will process personal data as necessary to deliver the services described in the Statement of Work (SOW) or engagement letter, including:
- Software development, technical consulting, and regulatory research services
- Support, maintenance, and optimization of systems delivered
- Data analysis, reporting, and compliance attestation (where applicable per the SOW)

**Duration:**  
Processing will commence on the Effective Date of the Master Services Agreement and continue for the duration of the engagement, plus any post-termination wind-down period required by law (e.g., secure deletion or data return).

**Processor Obligations on Termination:**  
Upon termination or expiration of the engagement, the Processor will, at the Controller's written instruction:
- Return all personal data to the Controller, or
- Securely delete all personal data within 30 days of termination

Deletion will be carried out using cryptographic erasure or physical destruction methods appropriate to the storage medium.

---

## 3. Nature and Purpose of Processing

The Processor processes personal data for the following purposes:

1. **Service Delivery:** To provide the services described in the SOW (software development, architecture design, code review, security testing, infrastructure setup, etc.)
2. **System Operation:** To operate, maintain, debug, and optimize systems delivered to or on behalf of the Controller
3. **Compliance & Auditing:** To document, audit, and demonstrate compliance with the terms of this DPA and applicable data protection law
4. **Security & Incident Response:** To detect, investigate, and respond to security incidents, data breaches, or unauthorized access
5. **Technical Support:** To provide bug fixes, performance optimization, and technical support related to delivered systems

**Limits on Purpose:**  
The Processor will not process personal data for any purpose other than those listed above without prior written consent from the Controller. In particular, the Processor will not:
- Use personal data for marketing, profiling, or behavioral analysis
- Train machine learning models on personal data without explicit written authorization
- Share personal data with third parties except as authorized in Section 6 (Sub-processors) below
- Combine personal data with data from other sources unless instructed in writing by the Controller

---

## 4. Types of Personal Data and Categories of Data Subjects

**Types of Personal Data:**  
The Controller will inform the Processor of the specific categories of personal data to be processed. Typically, these may include:
- Names, email addresses, telephone numbers
- Employee IDs, role information, organizational affiliation
- IP addresses, device identifiers, usage logs
- Biometric data (if applicable and disclosed by the Controller)
- Financial or payment information (if applicable)
- Any other data categories specified in the SOW or engagement letter

**Categories of Data Subjects:**  
Personal data may relate to:
- End users or customers of the Controller
- Employees or contractors of the Controller
- Vendors, partners, or third parties interacting with the Controller
- Any other category disclosed in writing by the Controller

**Data Subject Notification:**  
The Controller is responsible for obtaining and maintaining valid legal bases (consent, contractual necessity, legal obligation, vital interest, public task, or legitimate interest) for processing before sharing data with the Processor. The Processor is not responsible for determining lawfulness of the initial collection.

---

## 5. Processor Obligations

### 5.1 Processing on Instructions Only

The Processor will process personal data only on documented written instructions from the Controller. Instructions must specify:
- The scope, duration, nature, and purpose of processing
- The types of personal data and categories of data subjects
- Any special safeguards required (e.g., field-level encryption)

The Processor will notify the Controller if an instruction appears to violate applicable data protection law.

### 5.2 Confidentiality and Access Control

The Processor will:
- Ensure that persons authorized to process personal data have committed to confidentiality or are under an equivalent legal obligation
- Implement role-based access controls limiting access to personal data to those with a documented business need
- Maintain audit logs of all access to personal data, including read, write, and deletion operations
- Prohibit access to production data by developers during normal development activities (development environments use pseudonymized or synthetic test data only)

### 5.3 Security Measures

The Processor will implement and maintain the technical and organizational measures (TOMs) described in **Annex II** to protect personal data against:
- Unauthorized or unlawful processing
- Accidental loss, destruction, or damage
- Unauthorized disclosure or access
- Alteration or corruption

**Minimum controls include:**
- **Encryption in Transit:** All personal data transmitted over public networks or the Internet will be encrypted using TLS 1.2 or higher (or equivalent at time of deployment)
- **Encryption at Rest:** Personal data stored on disk, databases, or backups will be encrypted using AES-256 or equivalent
- **Access Controls:** Role-based access control (RBAC) with principle of least privilege; multi-factor authentication (MFA) for human access to systems containing personal data
- **Network Security:** Firewall rules, network segmentation, and intrusion detection/prevention systems as appropriate to the engagement scope
- **Secure Development:** Code reviewed for injection vulnerabilities, output encoding, cryptographic key management, and secure SDLC practices
- **Logging & Monitoring:** Audit logs of all access, configuration changes, and security events retained for [TBD — minimum 12 months]
- **Incident Detection:** Automated alerting for suspicious access patterns, failed authentication attempts, and data exfiltration indicators

### 5.4 Sub-processor Management

The Processor will not engage sub-processors without prior written authorization from the Controller.

**Current and approved sub-processors are listed in Annex III.**

**For new sub-processors:**
- The Processor will provide the Controller at least 30 days' advance written notice of any intended change (addition or replacement of a sub-processor)
- The notice will include the name, location, and description of processing activities of the proposed sub-processor
- The Controller may object to the engagement of a new sub-processor within 14 days of notice on reasonable grounds relating to data protection
- If the Controller objects and the Processor and Controller cannot resolve the objection, either party may terminate the affected engagement without penalty (except payment for services rendered to date)

**Sub-processor Obligations:**
- The Processor will impose data protection obligations on sub-processors equivalent to those in this DPA through a written contract or equivalent legal instrument
- The Processor remains liable to the Controller for the performance of sub-processors' data protection obligations

### 5.5 International Transfers

Personal data originating in the EEA or UK and transferred to India (or to any other jurisdiction outside the EEA/UK) will be subject to:
- **Standard Contractual Clauses (SCCs):** Module Two (Controller to Processor), as per EU Commission Decision 2021/914, incorporated by reference in **Annex A** of this DPA
- **Supplementary Measures:** The Processor will implement supplementary technical and organizational measures to address risks identified in a Transfer Impact Assessment (TIA), as required by GDPR Article 46(3) and UK GDPR Article 46(3)

Any other international transfer will comply with the data protection law of the originating jurisdiction.

### 5.6 Data Subject Rights Assistance

The Processor will, in a timely manner and within the timeframes required by applicable law, assist the Controller in fulfilling data subject rights requests, including:
- **Right of Access:** Providing copies of personal data held about a data subject
- **Right to Rectification:** Correcting inaccurate or incomplete personal data
- **Right to Erasure:** Deleting personal data (subject to legal retention obligations)
- **Right to Restrict Processing:** Limiting processing to storage only, upon request
- **Right to Data Portability:** Providing personal data in a portable, machine-readable format
- **Right to Object:** Ceasing processing where applicable
- **Rights related to Automated Decision-Making:** Providing information about profiling or algorithmic decisions

The Processor will respond to requests from the Controller within 10 business days of receipt and provide technical assistance (e.g., data exports, identity verification) as needed.

### 5.7 Breach Notification

**Definition of a Breach:**  
A confirmed security incident resulting in unauthorized access to, disclosure of, loss of, or destruction of personal data.

**Notification Timeline:**  
The Processor will notify the Controller in writing within **72 hours of confirming a breach** (or as soon as practicable, and within 72 hours of awareness, whichever is sooner).

**Notification Content:**  
The Processor will provide:
- The nature of the breach and confirmed or suspected cause
- The categories and approximate volume of data subjects and personal data affected
- The likely consequences of the breach
- The measures taken or proposed to mitigate the breach and prevent recurrence
- The name and contact information of the Processor's nominated incident contact

**Cooperation:**  
The Processor will:
- Preserve all evidence related to the breach
- Cooperate fully with any investigation by the Controller, supervisory authorities, or law enforcement
- Not publicly disclose the breach without prior written consent from the Controller (except where required by law)

---

## 6. Audit and Inspection

### 6.1 Audit Rights

The Controller or its auditor/consultant may:
- Conduct audits of the Processor's compliance with this DPA
- Request evidence of technical and organizational measures (TOMs)
- Interview relevant Processor personnel
- Review relevant documentation, logs, and records

### 6.2 Audit Notice

The Controller will provide reasonable advance written notice (at least 10 business days) of any planned audit, except:
- When legally required to provide shorter notice or no notice (e.g., emergency incidents or regulatory investigations)
- When the audit is a response to a suspected breach or compliance violation

### 6.3 Frequency and Cost

- **Annual Audit:** The Controller is entitled to conduct one comprehensive audit per calendar year at no cost to the Processor
- **Additional Audits:** The Processor may impose reasonable per-audit fees for audits beyond one per year (amount to be agreed in writing)
- **Shared Audits:** The Processor may satisfy audit requests from multiple clients through a shared third-party audit, provided confidentiality of each client's data is maintained

### 6.4 Auditor Obligations

Any auditor or consultant engaged by the Controller to conduct an audit must:
- Sign a confidentiality agreement limiting use of information to audit purposes
- Not disclose results to third parties without the Processor's written consent (except as required by law)

### 6.5 Remediation

If an audit identifies non-compliance, the Processor will, in consultation with the Controller:
- Develop a remediation plan with specific actions and timelines
- Provide regular progress updates
- Demonstrate closure of identified gaps within agreed timeframes

---

## 7. Data Deletion and Return

### 7.1 End-of-Engagement Obligations

Upon expiration or termination of the engagement or this DPA (whichever is earlier), the Processor will, within **30 days** and at the Controller's written instruction, either:

**Option A: Return**  
- Export all personal data in a commonly-used machine-readable format
- Deliver it to the Controller via secure, encrypted transmission or physical media (as directed)
- Provide a written certificate of delivery and integrity

**Option B: Deletion**  
- Permanently delete all personal data using cryptographic erasure, overwriting, or physical destruction
- Provide a written certificate of deletion signed by an authorized officer

### 7.2 Deletion Verification

The Processor will confirm deletion through one or more of:
- Cryptographic key destruction (if using key-based encryption)
- Evidence of secure erasure tool execution (e.g., log files from DOD 5220.22-M or NIST SP 800-88 compliant erasure)
- Certification from a third-party destruction vendor (for physical media)

### 7.3 Exception: Legal Holds

Notwithstanding the above, the Processor may retain personal data if required by law (e.g., tax regulations, litigation holds) provided:
- Retention is limited to the minimum required by law
- Data remains subject to this DPA's security obligations for the duration of retention
- The Processor notifies the Controller of the legal requirement and expected retention period

---

## 8. Liability and Indemnification

### 8.1 Processor Liability

The Processor's liability for breaches of this DPA is capped and subject to the same limitations as stated in the Master Services Agreement (MSA), Section [TBD — Limitation of Liability]:
- Liability is capped at the fees paid by the Controller to the Processor in the 12 months preceding the claim
- The cap does not apply to: (a) indemnification obligations, (b) confidentiality breaches, (c) gross negligence, or (d) willful misconduct

### 8.2 Data Protection Indemnity

The Processor indemnifies the Controller against third-party claims arising from:
- The Processor's breach of this DPA or applicable data protection law
- The Processor's unauthorized processing of personal data
- The Processor's failure to implement agreed security measures

The Processor will defend, hold harmless, and indemnify the Controller from all losses, liabilities, costs, and expenses (including reasonable attorney fees) arising from such claims.

### 8.3 Controller's Role in Indemnity

The Processor is not liable for breaches arising from:
- The Controller's own failure to comply with data protection law in obtaining or furnishing the data
- The Controller's failure to provide clear, lawful processing instructions
- The Controller's unauthorized processing instructions that the Processor carried out in good faith

---

## 9. Governing Law and Dispute Resolution

### 9.1 Governing Law

This DPA is governed by the laws of India, including:
- **DPDP Act 2023** (India's primary data protection law)
- **Information Technology Act 2000** (particularly Section 43A — liability for failure to protect data)
- **Arbitration and Conciliation Act 1996** (for dispute resolution)
- **GDPR** and **UK GDPR** (to the extent they apply to cross-border transfers and claim as processor of EU data subjects)

### 9.2 Dispute Resolution

Any dispute arising out of or relating to this DPA will be resolved as follows:

**Step 1: Negotiation (30 days)**  
- The parties will attempt good-faith negotiation through nominated representatives
- Escalation to executive level if initial resolution fails

**Step 2: Arbitration**  
- If negotiation fails, either party may submit the dispute to binding arbitration
- **Default:** Under the Arbitration and Conciliation Act 1996, in the competent courts of Koraput District, Odisha, India
- **Alternative (Enterprise Clients):** By mutual written agreement, arbitration under Singapore International Arbitration Centre (SIAC) Rules, with the seat of arbitration in Singapore and the governing law remaining India

### 9.3 Escalation and Liaison

- **Day-to-Day:** Data Protection Officer or designated contact (Processor) and Controller's legal/compliance representative
- **Escalation:** To executive management if issues remain unresolved after 14 business days

---

## Annex I: Description of Processing

### I.1 Parties

| Role | Name | Address | Contact |
|------|------|---------|---------|
| **Data Controller** | [TBD — Name of Client] | [TBD — Address] | [TBD — Email] |
| **Data Processor** | Kinyoubi Atelier & Co. | Jeypore, Koraput District, Odisha, India | ankit@kinyoubiatelier.com |

### I.2 Subject Matter of Processing

Processing is limited to the scope described in the Statement of Work (SOW) and this DPA. The SOW is incorporated by reference and attached as **Exhibit A.**

[TBD — Processor will populate based on specific SOW engagement]

**Example scope categories:**
- Software development (cloud infrastructure, APIs, web/mobile applications)
- Data migration and ETL pipeline design
- Security testing and vulnerability assessment
- Regulatory research and compliance documentation
- Infrastructure provisioning and maintenance

### I.3 Duration of Processing

- **Start Date:** [TBD — Effective date of the Master Services Agreement or SOW]
- **End Date:** [TBD — Termination or expiration of engagement]
- **Post-Termination Wind-down:** Up to 30 days for data return or deletion

### I.4 Nature and Purpose

| Purpose | Categories of Personal Data | Categories of Data Subjects | Legal Basis |
|---------|-------|---|---|
| [TBD — e.g., "Delivery of software engineering services"] | [TBD — e.g., "Names, email, identifiers, access logs"] | [TBD — e.g., "Client employees, end-users"] | [TBD — e.g., "Contract, legitimate interest"] |

### I.5 Special Categories

**Does processing include special category data (Article 9 GDPR / sensitive data under DPDP)?**
- [ ] Yes — List categories below
- [x] No

**If yes:**
- **Categories:** [TBD]
- **Additional safeguards:** [TBD]
- **Legal basis for processing special categories:** [TBD]

---

## Annex II: Technical and Organizational Measures (TOMs)

### II.1 Security Program Structure

The Processor maintains a documented security program covering:
- Information security policies and procedures
- Risk assessment and management
- Security awareness training for personnel
- Incident response and breach notification
- Business continuity and disaster recovery

### II.2 Physical Security

| Measure | Implementation |
|---------|---|
| **Data Center Access** | [TBD — e.g., "AWS data centers with role-based facility access and 24/7 monitoring"] |
| **Equipment Disposal** | [TBD — e.g., "Cryptographic erasure; physical destruction per NIST guidelines"] |
| **Environmental Controls** | [TBD — e.g., "Fire detection, climate control at managed providers"] |

### II.3 Access Control

| Measure | Implementation |
|---------|---|
| **Authentication** | TLS 1.2+, HTTPS for all data in transit; MFA for human access to production systems |
| **Authorization** | Role-based access control (RBAC); principle of least privilege; separation of duties |
| **Audit Logging** | All access to personal data logged with timestamp, user ID, action, and outcome; logs retained for [TBD — 12 months minimum] |
| **Personnel Agreements** | All staff with access to personal data sign confidentiality and data protection agreements |

### II.4 Encryption and Cryptography

| Measure | Standard | Notes |
|---------|----------|-------|
| **Data in Transit** | TLS 1.2+ (or current best practice) | All network transmission of personal data encrypted |
| **Data at Rest** | AES-256 or equivalent | [TBD — e.g., "AWS KMS, encryption per data classification"] |
| **Key Management** | [TBD] | [TBD — e.g., "Encryption keys managed by third-party KMS; rotation policy: annually"] |

### II.5 Pseudonymization and Anonymization

| Scenario | Approach | Notes |
|----------|----------|-------|
| **Development & Testing** | Pseudonymized or synthetic data | Production personal data never used in development environments without explicit approval |
| **Analytics** | Aggregated and anonymized | Individual-level data stripped unless legally required |

### II.6 Availability and Resilience

| Measure | Implementation |
|---------|---|
| **Backups** | [TBD — e.g., "Daily incremental, weekly full; 3-month retention; stored in separate region"] |
| **Disaster Recovery** | [TBD — e.g., "RTO [TBD] hours; RPO [TBD] hours; tested quarterly"] |
| **Business Continuity** | [TBD — e.g., "Failover to standby infrastructure; SLA uptime: 99.9%"] |

### II.7 Vulnerability Management

| Measure | Implementation |
|---------|---|
| **Code Review** | All code reviewed for OWASP Top 10 and CWE issues; automated SAST tools applied |
| **Dependency Scanning** | [TBD — e.g., "Dependabot, Snyk, or equivalent; patch management policy"] |
| **Penetration Testing** | [TBD — e.g., "Annual third-party pentest; results reviewed and remediated"]] |
| **Security Updates** | [TBD — e.g., "Critical patches applied within 48 hours; non-critical within 30 days"] |

### II.8 Incident Response

| Phase | Procedure |
|-------|-----------|
| **Detection** | Automated alerting; anomaly detection; user reporting |
| **Investigation** | Log collection; root cause analysis; impact assessment within 24 hours |
| **Notification** | Client notified within 72 hours of confirmation (per Section 5.7) |
| **Remediation** | Incident response plan executed; preventive measures implemented |
| **Post-Mortem** | Documented within 14 days; shared with client and key stakeholders |

### II.9 Training and Awareness

- All personnel with access to personal data complete annual data protection training
- Training covers: data classification, handling procedures, breach reporting, GDPR/DPDP, secure coding
- Training completion records maintained and made available to auditors on request

### II.10 Monitoring and Auditing

| Activity | Frequency | Owner |
|----------|-----------|-------|
| **Security Audits** | Annual (per Section 6) | Third-party auditor or internal |
| **Access Reviews** | Quarterly | Information Security Officer |
| **Configuration Audits** | Quarterly | Infrastructure team |
| **Breach Simulation** | Annual | Incident Response team |

---

## Annex III: Sub-Processors

The Processor will only engage sub-processors listed below or approved in advance by the Controller.

| Sub-Processor Name | Location | Processing Activity | Status |
|---|---|---|---|
| [TBD — e.g., "AWS (EC2, RDS, S3)"] | [TBD — e.g., "US (with replica in ap-south-1)"] | [TBD — e.g., "Infrastructure hosting, data storage"] | Active / Pending |
| [TBD] | [TBD] | [TBD] | [TBD] |

**Notes:**
- All sub-processors are subject to written data protection agreements equivalent to this DPA
- The Processor remains liable to the Controller for sub-processor performance
- Updates to this list will be provided to the Controller every 30 days or upon request

---

## Annex IV: Standard Contractual Clauses (SCC) – Module Two

**For engagements involving transfer of personal data from the EEA or UK to India (or any third country):**

This DPA incorporates by reference the EU Standard Contractual Clauses (SCCs) for transfer of personal data from controllers in the EEA/UK to processors in third countries, as set out in EU Commission Decision 2021/914 — Module Two (Controller to Processor).

The full text of the applicable SCC module is attached as a separate **signed exhibit (SCC-Module-2.md)** and forms an integral part of this DPA.

**In case of conflict between this DPA and the SCCs, the SCCs take precedence for the purposes of lawful international transfer.**

---

## Signature Block

**For the Controller:**

Signature: _____________________________ Date: ______________

Name (print): _________________________

Title: ________________________________

Organization: _________________________

**For the Processor (Kinyoubi Atelier & Co.):**

Signature: _____________________________ Date: ______________

Name (print): _________________________

Title: ________________________________

---

**Document Version:** 1.0  
**Last Updated:** 12 April 2026  
**Next Review Date:** 12 April 2027

---

**IMPORTANT REMINDER:**

This is a template. It is a DRAFT and has NOT been reviewed by a licensed attorney. Before execution:

1. Have it reviewed by your legal counsel in your jurisdiction
2. Have it reviewed by counsel in India
3. Customize Annexes I–IV with engagement-specific details
4. Obtain board or executive approval if required by your governance policies
5. Do not execute without completing all [TBD] fields and obtaining counsel sign-off

**Kinyoubi Atelier & Co. provides this template as-is for informational purposes. We assume no liability for use of this template without independent legal review.**
