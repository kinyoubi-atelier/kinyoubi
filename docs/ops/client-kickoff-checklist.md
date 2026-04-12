# Client Kickoff Checklist

**72-hour post-signature workflow: MSA/SOW → DPA/NDA → Kickoff Call → Data Classification → First Invoice.**

---

## T-1 (Before Signature)

### Contract Review
- [ ] MSA reviewed with CA (if high-value or complex). `[PAID — CA retainer]`
- [ ] SOW scope is clear & specific (hours, deliverables, timeline, acceptance criteria).
- [ ] Liability cap in place (if insurance not yet active, set to fees paid or 12-month retainer fee).
- [ ] Payment terms & invoicing currency locked (see international-invoicing.md).
- [ ] Confidentiality & IP ownership clear.
- [ ] Key performance indicators (KPIs) / success criteria stated (optional but helpful).
- [ ] Termination clause includes data deletion (30 days post-termination).

### Signatures
- [ ] Founder signature (digital or wet ink).
- [ ] Client authorized signatory identified & notified.
- [ ] Both parties sign and exchange.

---

## T-0 to T+24h (Immediately Post-Signature)

### Data Protection & Compliance

**NDA (Mutual):**
- [ ] Mutual NDA signed (if not folded into MSA).
- [ ] Signature page scanned and filed at `/legal/executed-agreements/[client-name]-nda-[date].pdf`.

**DPA (Data Protection Agreement):**
- [ ] Standard DPA from `legal-templates/DPA.md` customized with:
  - [ ] Client legal name & address.
  - [ ] Scope of personal data (identify what's PII for each regulated jurisdiction).
  - [ ] Purpose of processing (per SOW scope).
  - [ ] Data categories (name, email, IP, etc. — fill in actual list).
  - [ ] Jurisdictions of data subjects (if mixed: "EU residents under GDPR, India residents under DPDP Act 2023, US under CCPA").
  - [ ] Processing instructions (founder is data processor; client is controller).
  - [ ] Subprocessor list (typically "None; founder only").
  - [ ] Data deletion timeline (30 days post-engagement per default MSA).
  - [ ] Incident notification timeline (within 24 hours of internal discovery).
  - [ ] Client audit rights (if applicable).
- [ ] Client DPO or privacy contact identified (ask explicitly: "Who is your Data Protection Officer or privacy contact?").
- [ ] DPA signed by both parties.
- [ ] Signature page filed at `/legal/executed-agreements/[client-name]-dpa-[date].pdf`.
- [ ] DPA reference added to founder's incident response contacts (see incident-response-runbook.md, "Contacts" table).

**Confidentiality:**
- [ ] Founder's own confidentiality obligations confirmed (e.g., "do not disclose client's proprietary tech to others").
- [ ] Data handling expectations clear (e.g., "all code on private repo, never on public GitHub").

---

### Access Provisioning

**Founder's Credentials & Access:**
- [ ] Client system access method confirmed (SSH keys, GitHub team, Jira, Slack, etc.).
- [ ] Credentials issued & tested.
- [ ] MFA enabled on all accounts (GitHub, AWS, etc.).
- [ ] Access level set to "developer" or equivalent (principle of least privilege).
- [ ] Audit logging enabled on founder's account (for incident response trail).

**Client's Responsibility:**
- [ ] Ask client: "Are there any existing security baselines or compliance rules we should follow?" (e.g., IP whitelisting, VPN requirement).
- [ ] Confirm access revocation process (who revokes at project end? timeline?).

---

## T+24h to T+48h (Day 2)

### Kickoff Call

**Attendees:**
- Founder.
- Client project lead / primary contact.
- Client technical lead (if applicable).
- Client DPO or privacy officer (if data-heavy engagement).

**Agenda (1–2 hours):**
1. **Scope confirmation** (5 min): Walk SOW again; confirm shared understanding of deliverables & timeline.
2. **Success criteria** (5 min): How will we measure success? Any KPIs?
3. **Communication** (5 min): Preferred channel (Slack, email, weekly calls)? Response SLA?
4. **Technical deep-dive** (30 min): Client systems, architecture, tech stack, constraints (performance, security, compliance).
5. **Data classification** (10 min): See next section; identify all data types founder will touch.
6. **Risk & assumptions** (5 min): Any known risks? External blockers (third-party APIs, hardware delays)?
7. **Incident response** (5 min): Confirm DPA incident notification timeline. Provide incident response runbook (link to `/docs/ops/incident-response-runbook.md`).
8. **Next steps & schedule** (5 min): Recap action items. Confirm first deliverable date & format.

**Output:**
- [ ] Kickoff meeting notes documented (share with client; file locally).
- [ ] Action items & owners assigned.
- [ ] Client DPO contact confirmed & saved.

---

### First Invoice & Payment Setup

**Invoice:**
- [ ] First invoice prepared (see international-invoicing.md).
- [ ] Invoice includes all mandatory fields (LUT declaration, exchange rate, bank account, W-8BEN-E/TRC references if applicable).
- [ ] Invoice sent within 24 hours of kickoff call (per contract payment terms).
- [ ] Client finance/tax team receives W-8BEN-E + TRC (if US or DTAA-jurisdiction client).
- [ ] Client's finance contact confirms receipt & asks questions (allow 2–3 days).

**Payment Method:**
- [ ] Wire transfer details (SWIFT) confirmed with client.
- [ ] Payment terms reconfirmed (Net 15/30/45 per contract).

---

## T+24h to T+72h (Day 3)

### Project Tracker Setup

**Choose platform per client preference:**
- [ ] GitHub Issues (if code-heavy project).
- [ ] Jira (if client uses Jira).
- [ ] Linear (modern alternative).
- [ ] Notion or Asana (if client prefers).

**Setup:**
- [ ] Project created with name: "[Client Name] — [Project Code/Name]".
- [ ] Milestone/epic created for each SOW deliverable.
- [ ] Initial user stories / issues created.
- [ ] Sprint planning (if applicable): define 2-week sprints; create backlog.
- [ ] Client access granted; permissions set (read-only for client unless otherwise agreed).

---

### Environment & Repository Access

**Git Repository:**
- [ ] Client code repo cloned locally (or existing repo joined).
- [ ] Founder's GitHub SSH key added to repo (read + write access).
- [ ] Branch strategy confirmed (main/develop/feature branching convention).
- [ ] If new repo: README, .gitignore, LICENSE (if open source), initial commit completed.
- [ ] Protected branches set up (e.g., "require PR review before merge to main").

**Development Environment:**
- [ ] Local dev environment set up on founder's machine.
- [ ] Dependencies installed & tested (npm install, docker compose, etc.).
- [ ] Staging/preview environment confirmed (if applicable).
- [ ] Database access (if applicable): credentials stored in .env (never in git).
- [ ] Logging & monitoring access: New Relic, Datadog, CloudWatch (credentials in `.env` or via IAM).

---

### Recurring Meetings & Communication

**Schedule:**
- [ ] Weekly check-in call (30 min; same day/time each week if possible).
- [ ] Async update channel (Slack #[project-name] or email weekly digest).
- [ ] Escalation path confirmed (who to call if urgent issue?).

**Communication Expectations:**
- [ ] Founder's core hours: [TBD — clarify if any client overlap required; note in kickoff notes].
- [ ] Response SLA for urgent issues: [TBD — typically 4 hours for P1, 24 hours for P2].
- [ ] Vacation / unavailability: Founder to give 2+ weeks notice; escalation contact if needed.

---

## T+72h (Final)

### Data Classification & Security

**Identify All Data Founder Will Touch:**

Create a **Data Inventory** (file at `/docs/projects/[client-name]/data-inventory.md`):

| Data Type | Examples | Jurisdiction (Reg.) | Sensitivity | Access | Encryption |
|---|---|---|---|---|---|
| User PII | Name, email, phone | GDPR (EU) / DPDP (India) | High | Founder only | TLS + at-rest |
| Product data | Features, pricing | N/A | Medium | Founder + client team | TLS |
| API keys | AWS, Stripe | N/A | High | Founder only | .env (never git) |
| Logs | Requests, errors | N/A | Low | Founder + monitoring tool | TLS |

**Output:**
- [ ] Data inventory signed off by client.
- [ ] Confirm with client: "Are there any data types we've missed? Any restrictions on access?"
- [ ] Identify regulated data (GDPR, DPDP, CCPA, etc.). If yes → confirm DPA scope covers it.

---

### Kickoff Deck Template (If Needed)

If client requested a formal kickoff presentation:
- [ ] Deck created (Google Slides or PDF) with sections:
  - Overview of engagement scope & success criteria.
  - Technical architecture (as discussed in kickoff call).
  - Proposed timeline & milestone dates.
  - Communication & escalation.
  - Risk mitigation & assumptions.
- [ ] Presented to client stakeholders (if multi-person client team).
- [ ] Copy saved at `/docs/projects/[client-name]/kickoff-deck-[date].pdf`.

---

### First Deliverable Checklist

Before delivering first work product:
- [ ] Deliverable defined & agreed (code commit, design file, report, etc.).
- [ ] Acceptance criteria clear (what does "done" look like?).
- [ ] Review process confirmed with client (who reviews? QA required?).
- [ ] Version control / delivery method clear (GitHub merge, email, cloud link).

---

## Files & Templates

**Create/File These Post-Signature:**

| File | Path | Content |
|---|---|---|
| **Kickoff Notes** | `/docs/projects/[client-name]/kickoff-notes-[date].md` | Meeting summary, action items, DPO contact |
| **Data Inventory** | `/docs/projects/[client-name]/data-inventory.md` | Data types, regulations, access, sensitivity |
| **Executed DPA** | `/legal/executed-agreements/[client-name]-dpa-[date].pdf` | Signed copy |
| **Executed MSA** | `/legal/executed-agreements/[client-name]-msa-[date].pdf` | Signed copy |
| **Executed NDA** | `/legal/executed-agreements/[client-name]-nda-[date].pdf` | Signed copy (if separate from MSA) |
| **First Invoice** | `/invoices/[client-name]-INV-001-[date].pdf` | Filed after sending |

---

## TBD Placeholders

- **Client DPO contact:** Collected at T+24h; fed into incident-response-runbook.md contacts table.
- **Project code name:** Client-specific identifier for internal org.
- **Core hours:** If client requires synchronous overlap.
- **Response SLA:** P1/P2 targets; confirm in kickoff call.
- **Escalation contact:** Who is backup if founder unavailable?

---

## Post-Kickoff Communication

**Day 1–7 Post-Call:**
- Send client: summary email with action items + next meeting date.
- Share: kickoff notes, incident response runbook link, data inventory.
- Confirm first deliverable date & format.

**Ongoing:**
- Weekly async update (Friday EOD): what was done, blockers, next week plan.
- Bi-weekly sync call (or frequency per contract).

---

## Abort / Escalation Triggers

If any of the below occur pre-kickoff, escalate to founder for decision:

- Client cannot provide adequate security baseline (no 2FA, no SSL, etc.) and refuses to harden → **Renegotiate scope or abort.**
- Data scope unclear or explodes beyond SOW → **Scope creep; trigger change order.**
- Client DPO indicates DPA terms unacceptable & non-negotiable → **Legal review; potential abort.**
- Client uses vendor (e.g., Salesforce, HubSpot) without DPA with founder → **Risk; document & escalate.**

---

## Summary Checklist (Quick Ref)

- [ ] Contracts signed & filed.
- [ ] DPA signed & client DPO contact stored.
- [ ] Access provisioned & tested.
- [ ] Kickoff call completed; notes filed.
- [ ] Data inventory created & signed off.
- [ ] Project tracker created & seeded.
- [ ] Recurring meetings scheduled.
- [ ] First invoice sent.
- [ ] W-8BEN-E / TRC sent (if applicable).
- [ ] All documentation filed in `/docs/projects/[client-name]/` & `/legal/executed-agreements/`.

**Target completion:** 72 hours post-MSA signature. Ready to deliver work by T+5 business days.
