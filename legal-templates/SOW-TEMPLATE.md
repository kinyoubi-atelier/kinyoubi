# Statement of Work (SOW) Template

**Template v1 — DRAFT. Not counsel-reviewed. Do not execute without licensed legal review in both India and the relevant counterparty jurisdiction.**

---

## Header

**Statement of Work**

**Project Name:** [TBD — Client-provided or Kinyoubi-suggested name]

**Effective Date:** [TBD — Date SOW is signed or work commences]

**Expiration Date:** [TBD — Proposed end date; may be extended by mutual written consent]

---

## 1. Parties

**Client ("You"):**  
Name: [TBD — Legal entity name]  
Address: [TBD]  
Contact: [TBD — primary contact person, email, phone]  
Representative: [TBD — authorized signatory]

**Service Provider ("Kinyoubi"):**  
Name: Kinyoubi Atelier & Co.  
Address: Jeypore, Koraput District, Odisha 764001, India  
Email: ankit@kinyoubiatelier.com  
Contact: Ankit Sahu, Founder

**Governing Agreement:**  
This SOW is issued under and governed by the Master Services Agreement (MSA) executed by both parties (or to be executed contemporaneously). All terms of the MSA apply unless explicitly modified herein.

---

## 2. Description of Services

### 2.1 Overview

Kinyoubi will provide the following services to the Client:

[TBD — Prose description of the engagement, 2-4 sentences]

**Example:**
> Kinyoubi will design, develop, and deploy a cloud-based inventory management system for the Client's supply chain operations. The system will integrate with the Client's existing ERP via REST API, provide real-time visibility into stock levels across three distribution centers, and include a web dashboard for operations staff.

### 2.2 Scope of Work

The in-scope services include:

| # | Task | Responsibility |
|---|------|---|
| 1 | [TBD — e.g., "Requirements gathering and design documentation"] | [Client / Kinyoubi / Joint] |
| 2 | [TBD — e.g., "Backend API development"] | [Kinyoubi] |
| 3 | [TBD — e.g., "Frontend web application development"] | [Kinyoubi] |
| 4 | [TBD — e.g., "Database schema design and optimization"] | [Kinyoubi] |
| 5 | [TBD — e.g., "Integration testing and QA"] | [Kinyoubi] |
| 6 | [TBD — e.g., "Deployment to production"] | [Kinyoubi] |
| 7 | [TBD — e.g., "Post-launch support (30 days)"] | [Kinyoubi] |
| 8 | [TBD — add rows as needed] | |

### 2.3 Out-of-Scope

The following services are **NOT** included in this SOW and would require a separate engagement:

- [TBD — e.g., "Mobile application development"]
- [TBD — e.g., "Server infrastructure maintenance beyond initial setup"]
- [TBD — e.g., "Training for Client staff beyond documented handover"]
- [TBD — e.g., "Third-party SaaS integrations not specified in Deliverables"]

**Additional Services:** Any work requested outside the scope above will be billed separately as a Change Order (see Section 3, Changes).

---

## 3. Deliverables and Acceptance Criteria

### 3.1 Deliverables

| # | Deliverable | Description | Format | Acceptance Criteria |
|---|---|---|---|---|
| D1 | [TBD — e.g., "System Design Document"] | [Description] | [e.g., "PDF, Markdown"] | [e.g., "Approved by Client CTO"] |
| D2 | [TBD — e.g., "Source Code"] | All application code, configuration, and infrastructure-as-code | GitHub Repository + Artifacts | All unit tests pass; code review completed; deployed to staging |
| D3 | [TBD — e.g., "Deployment Runbook"] | Step-by-step guide for deploying to production and disaster recovery | PDF + Markdown | Client ops team confirms understanding via sign-off |
| D4 | [TBD — e.g., "Security Assessment Report"] | Penetration testing results and remediation recommendations | PDF | Reviewed and signed by Client security lead |
| D5 | [TBD — e.g., "API Documentation"] | Complete API reference with examples and use cases | OpenAPI/Swagger spec + generated HTML | Matches implemented endpoints; examples work |

### 3.2 Acceptance Process

1. **Kinyoubi delivers** the deliverable to the Client (via email, GitHub, S3 bucket, or agreed method)
2. **Client reviews** the deliverable against Acceptance Criteria within **5 business days**
3. **Client provides feedback:**
   - If accepted: Client signs acceptance in writing (email acceptable)
   - If rejected: Client provides written explanation of non-conformity within 5 days
4. **Kinyoubi remedies** non-conformities within an agreed timeframe (default: 10 business days)
5. **Re-submission and re-review** repeat until acceptance or dispute resolution

### 3.3 Deemed Acceptance

If the Client does not provide acceptance or rejection feedback within **10 business days** of delivery, the deliverable is **deemed accepted** and payment is due per Section 4 (Fees).

### 3.4 Defects Warranty

Kinyoubi warrants that all Deliverables are substantially free of material defects. The Client may report defects within **30 days of acceptance**. Kinyoubi will remedy reported defects at no additional charge, provided the defect is not due to Client misuse.

---

## 4. Milestones and Timeline

### 4.1 Project Schedule

| Phase | Milestone | Target Date | Deliverable(s) |
|-------|-----------|-------------|---|
| Phase 1 | Requirements & Design Complete | [TBD] | D1: System Design Document |
| Phase 2 | Backend Development Complete | [TBD] | Functional API in staging |
| Phase 3 | Frontend Development Complete | [TBD] | Web UI in staging |
| Phase 4 | Testing & Bug Fixes | [TBD] | Test report; all critical bugs fixed |
| Phase 5 | Production Deployment | [TBD] | D2: Source Code; D3: Runbook; system live |
| Phase 6 | Post-Launch Support | [TBD + 30 days] | D5: API Documentation; support log |

### 4.2 Timeline Assumptions

This schedule is based on the following assumptions:
- [TBD — e.g., "Client provides requirements and design input within 3 business days of request"]
- [TBD — e.g., "Client environment (staging, production) is available and configured by [date]"]
- [TBD — e.g., "No major scope changes after Phase 1 is complete"]
- [TBD — e.g., "Client resolves third-party dependencies (e.g., API keys, vendor setup) within 5 days"]

If Client assumptions are not met, timeline will be extended by mutual agreement, and fees may increase per Section 5.2 (Change Orders).

### 4.3 Timeline Flexibility

- **Milestone slippage:** If a milestone slips due to Kinyoubi's delay, Kinyoubi will provide a revised schedule within 5 business days and may offer a discount on fees (amount TBD) to mitigate Client impact.
- **Force majeure:** If a milestone is delayed due to Force Majeure (pandemic, outage, natural disaster), the parties will renegotiate the timeline with no penalty to either party.

---

## 5. Fees and Payment

### 5.1 Fee Structure

**[SELECT ONE]**

#### Option A: Fixed Fee

Total fee: **[TBD — amount in USD/EUR/GBP/INR]**

The fixed fee covers all in-scope services per Section 2. Out-of-scope work is billed separately.

**Milestone Payments:**

| Milestone | Percentage | Amount | Due Date |
|-----------|-------------|--------|----------|
| Upon SOW execution | 20% | [TBD] | Immediately |
| Phase 2 Completion | 20% | [TBD] | [TBD] |
| Phase 4 Completion | 30% | [TBD] | [TBD] |
| Phase 5 & 6 Completion | 30% | [TBD] | [TBD] |

#### Option B: Time & Materials (T&M)

**Hourly rates:**
- [TBD — e.g., "Senior Engineer: USD $150/hr"]
- [TBD — e.g., "Mid-Level Engineer: USD $100/hr"]
- [TBD — e.g., "Junior Engineer: USD $65/hr"]

**Estimated hours:** [TBD — e.g., "120 hours total; estimate range: 100–150 hours depending on complexity"]

**Monthly billing cap (optional):** [TBD — e.g., "Monthly billing not to exceed USD $15,000 without prior written approval"]

**Expenses:** Out-of-pocket expenses (travel, hosting, third-party services) billed at cost plus [10%] handling, subject to prior approval.

#### Option C: Hybrid (Retainer + T&M)

**Monthly retainer:** [TBD — e.g., "USD $5,000/month"]

Includes up to [TBD — e.g., "100 hours/month"] of work. Hours beyond the cap are billed at [TBD — e.g., "$75/hr"].

**Term:** [TBD — e.g., "6 months, auto-renewing unless either party provides 30 days' notice"]

---

### 5.2 Payment Terms

**Currency:** [USD / EUR / GBP / INR]

**Terms:** [TBD — select one]
- Net 30 (payment due within 30 days of invoice date)
- Net 15
- 50% upfront, balance on delivery
- Other: [TBD]

**Payment method:** Wire transfer, ACH, credit card, or as specified by Kinyoubi

**Late payment interest:** 1.5% per month on unpaid balances more than 30 days overdue (or maximum rate permitted by law)

### 5.3 Change Orders

Any changes to scope, deliverables, timeline, or fees require a written Change Order signed by both parties.

**Impact of changes:**
- **Scope expansion:** Fees increase by [TBD — e.g., hourly rate] × estimated additional hours
- **Scope reduction:** Fees are adjusted proportionally
- **Timeline extension:** May increase fees if it impacts other Client commitments (evaluated per Change Order)

**Change Request Process:**
1. Client submits written change request to Kinyoubi
2. Kinyoubi provides estimate of impact on fees and timeline within 5 business days
3. Parties negotiate and sign Change Order
4. Work does not proceed on changed scope until Change Order is signed

### 5.4 Expenses

For T&M and hybrid engagements:
- **Travel:** Reasonable economy flights, hotels, ground transport at cost plus 10% handling (requires approval)
- **Software licenses:** Third-party tools required for the project (e.g., cloud hosting, CI/CD platforms) billed at cost
- **Hosting & infrastructure:** AWS, GCP, or other cloud provider charges billed at cost if Client does not have existing accounts

All expenses require prior written approval by Client.

### 5.5 Invoicing and Payment

Kinyoubi will invoice:
- **Fixed-fee SOW:** Per milestone completion
- **T&M SOW:** Monthly in arrears, with detailed breakdown of hours and expenses
- **Hybrid:** Retainer due on the 1st of each month; overage T&M billed the following month

Invoices are due per Section 5.2 (Payment Terms).

---

## 6. Intellectual Property

### 6.1 Work Product Assignment

Upon receipt of **full payment**, all intellectual property rights in the Work Product created under this SOW are assigned exclusively to the Client, including:
- Custom code, scripts, and software
- Documentation, diagrams, and technical specifications
- Databases, data models, and configurations
- Any derivative works or modifications

### 6.2 Background IP and Third-Party Code

- **Background IP:** Kinyoubi retains all rights to pre-existing tools, frameworks, methodologies, and general improvements. Client receives a non-exclusive license for internal use only.
- **Open-source:** Any open-source code is subject to its original license terms (detailed in [TBD — list in Appendix])
- **Third-party code:** [TBD — identify any commercial third-party components and licensing terms]

### 6.3 Client Materials

The Client retains all rights to materials, data, or content provided to Kinyoubi. Kinyoubi receives a limited license to use such materials only to perform this SOW.

---

## 7. Warranties and Disclaimers

### 7.1 Kinyoubi's Warranties

Kinyoubi warrants that:
1. All deliverables will be created in a professional and workmanlike manner
2. Code will follow industry-standard best practices and design patterns
3. Security measures will be appropriate to the engagement's scope (detailed in [TBD — Security section])
4. Deliverables will be substantially free of material defects for 30 days post-delivery

### 7.2 Disclaimers

**KINYOUBI MAKES NO OTHER WARRANTIES, EXPRESS OR IMPLIED, INCLUDING:**
- That deliverables will meet all Client's requirements (beyond documented acceptance criteria)
- That deliverables are "production-ready" unless explicitly stated
- That services will integrate seamlessly with third-party systems
- That performance or uptime targets will be met (unless documented in an SLA below)

---

## 8. Service Level Agreement (SLA) [IF APPLICABLE]

### 8.1 Availability

[TBD — If applicable, specify uptime target]

Example:
> The application will maintain 99.5% uptime during business hours (Monday–Friday, 8 AM–6 PM EST), calculated monthly. Scheduled maintenance windows (up to 4 hours/month, announced 48 hours in advance) are excluded.

### 8.2 Response Time

[TBD — If applicable, specify support response targets]

Example:
> Kinyoubi will respond to critical production incidents within 1 hour of notification; high-priority issues within 4 hours.

### 8.3 SLA Credits

[TBD — If applicable, specify remedy for SLA breaches]

Example:
> If uptime falls below 99.5% in a calendar month, Kinyoubi will credit [1% of monthly fee] per 0.5% shortfall, capped at 10% of monthly fees.

---

## 9. Project-Specific Assumptions and Client Responsibilities

### 9.1 Client Responsibilities

The Client agrees to:

| Responsibility | Details |
|---|---|
| [TBD — e.g., "Provide requirements"] | [e.g., "Detailed written requirements within 5 business days of SOW signature"] |
| [TBD — e.g., "Designate project lead"] | [e.g., "A single point of contact with decision-making authority"] |
| [TBD — e.g., "Provide test environment"] | [e.g., "AWS account with VPC, RDS, and deployment permissions by [date]"] |
| [TBD — e.g., "Provide third-party credentials"] | [e.g., "API keys, vendor accounts for integrations"] |
| [TBD — e.g., "Approve change requests"] | [e.g., "Within 5 business days of submission"] |
| [TBD — e.g., "Accept/reject deliverables"] | [e.g., "Within 10 business days of delivery"] |

### 9.2 Risks and Mitigation

| Risk | Mitigation |
|------|---|
| [TBD — e.g., "Third-party API rate limits"] | [e.g., "Kinyoubi will implement caching and request throttling"] |
| [TBD — e.g., "Data migration complexity"]] | [e.g., "Client will conduct data audit and provide sample datasets by [date]"] |
| [TBD — e.g., "Scope creep"] | [e.g., "All change requests require written Change Order"] |

---

## 10. Data Protection and Security

### 10.1 Personal Data Processing

[SELECT AS APPLICABLE]

**If NO personal data is processed:**
> This SOW does not involve processing personal data. The Data Processing Addendum is not applicable.

**If personal data IS processed:**
> This SOW involves processing personal data as defined in the Data Processing Addendum (DPA). The DPA is incorporated herein and governs all data handling, security, breach notification, and sub-processor management.

### 10.2 Security Measures

[TBD — Describe project-specific security controls]

Example:
> All data at rest will be encrypted using AES-256 in AWS RDS. Data in transit will use TLS 1.3. Access logs will be retained for 90 days. The application will undergo penetration testing prior to production launch. Results and remediation will be documented in D4: Security Assessment Report.

### 10.3 Breach Notification

If the services involve personal data and a breach occurs, Kinyoubi will notify the Client in writing within 72 hours of confirming the breach, per the DPA (Section 5.7).

---

## 11. Confidentiality

Both parties agree to maintain confidentiality of sensitive information shared during the engagement, per the MSA Section 6 (Confidentiality).

**Specific considerations:**
- [TBD — e.g., "All Client source code is confidential and will not be reused without written permission"]
- [TBD — e.g., "Kinyoubi may list the Client as a reference customer with Client's permission"]

---

## 12. Support and Maintenance

### 12.1 Transition Support [IF APPLICABLE]

**Duration:** [TBD — e.g., "30 days post-launch"]

**Included in Deliverables:**
- [TBD — e.g., "Bug fixes and patches for defects discovered during transition"]
- [TBD — e.g., "Knowledge transfer sessions (up to 8 hours total)"]
- [TBD — e.g., "Documentation updates based on feedback"]

**Not included:**
- [TBD — e.g., "Ongoing maintenance or enhancements beyond transition period"]
- [TBD — e.g., "24/7 on-call support (unless separately contracted)"]

### 12.2 Post-SOW Support

After the transition period, support and maintenance are **out of scope** of this SOW. If the Client requires ongoing support, a separate Maintenance SOW or retainer agreement will be negotiated.

---

## 13. Termination

### 13.1 Termination for Convenience

Either party may terminate this SOW by providing **30 days' written notice**.

**Effect:**
- Kinyoubi will cease work at the end of the notice period
- Client must pay for all services performed and expenses incurred through termination
- Incomplete deliverables will not be delivered unless Client pays for work completed to date

### 13.2 Termination for Cause

Either party may terminate immediately if the other party:
- Materially breaches this SOW and does not cure within 15 business days of written notice
- Becomes insolvent or enters bankruptcy proceedings

---

## 14. Governing Law

This SOW is governed by the Master Services Agreement and both are governed by **Indian law**. Disputes are subject to the jurisdiction of **competent courts in Koraput District, Odisha, India**, or (if agreed) **SIAC Singapore arbitration**.

---

## 15. Approval and Signature

By signing below, both parties confirm that:
- They are authorized to execute this SOW
- This SOW represents the complete and agreed scope of work
- All terms and conditions of the MSA apply to this SOW unless explicitly modified herein

### Client

Signature: _____________________________ Date: ______________

Name (print): _________________________

Title: ________________________________

### Kinyoubi Atelier & Co.

Signature: _____________________________ Date: ______________

Name (print): _________________________

Title: ________________________________

---

## Appendices

**Appendix A:** Technical Specifications or Design Documents (if attached)

**Appendix B:** Sample Data or Example Outputs (if applicable)

**Appendix C:** List of Open-Source Licenses Used (if applicable)

**Appendix D:** Detailed Timeline or Gantt Chart (if applicable)

---

**SOW Version:** 1.0  
**Effective Date:** [TBD]  
**Last Updated:** 12 April 2026

---

**IMPORTANT NOTES:**

1. **This is a template.** Customize all [TBD] fields with engagement-specific details.
2. **Not counsel-reviewed.** Have this SOW reviewed by legal counsel in your jurisdiction before signature.
3. **Entire Agreement:** This SOW, together with the MSA and DPA (if applicable), constitutes the entire agreement. No prior conversations, emails, or handshake deals override this written document.
4. **Change Control:** All changes require a written Change Order. Verbal requests are not binding.
5. **Payment Terms:** No work proceeds until this SOW is signed; payment is due per the terms herein.

