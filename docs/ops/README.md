# Kinyoubi Atelier & Co. — Operational Runbooks

Runbooks for solo independent software development, technical consulting, and regulatory research practice. All processes assume the founder operates as a sole proprietor from Jeypore, Odisha, India, serving North America and EMEA clients.

## Read first, by scenario

**Before signing a new engagement:**
→ [Client Kickoff Checklist](./client-kickoff-checklist.md) — ensures DPA, NDA, access, and data classification are locked down in the first 72 hours.

**On the morning of (or during) a suspected incident:**
→ [Incident Response Runbook](./incident-response-runbook.md) — decision trees for marketing site vs. client engagements; 72-hour clock; severity tiers; notification templates.

**Before a sales call with a new prospect:**
→ [Vendor Onboarding Cheatsheet](./vendor-onboarding-cheatsheet.md) — standard answers to questionnaires about SOC 2, cyber insurance, controls.

**When invoicing an international client:**
→ [International Invoicing](./international-invoicing.md) — invoice template, W-8BEN-E, withholding per DTAA, bank rails, payment terms.

**Filing quarterly GST or year-end taxes:**
→ [Export Compliance & India](./export-compliance-india.md) — IEC, LUT, Form 10FA (TRC), GSTR treatment, filing calendar.

**Moving to a custom domain:**
→ [Custom Domain Migration](./custom-domain-migration.md) — DNS, Vercel config, email, GitHub Pages teardown, rollback.

---

## Quick reference

| Paid Prerequisites | Cost Indicator | Status |
|-------------------|---|---|
| Domain purchase | ~$10–20/year | `[PAID — skip for now]` |
| Google Workspace or Zoho Mail | ~$4–6/user/month | `[PAID — skip for now]` |
| GST registration (if revenue threshold crossed) | Free/nominal | `[PAID — skip for now if not triggered]` |
| CA retainer (quarterly, annual filings) | Varies; INR 5K–15K+ annual | `[PAID — skip for now]` |
| Cyber insurance / E&O | ~INR 20K–100K/year | `[PAID — not yet procured]` |
| Wise Business, Mercury, Stripe, Razorpay | Free tier + FX fees | `[PAID — requires signup/KYC]` |
| Vercel Pro (if traffic threshold crossed) | $20/month | `[PAID — flag before deploying]` |
| Digital Signature Certificate (if TRC renewal requires e-filing) | ~INR 2K–4K/year | `[PAID — if required]` |

---

## TBD placeholders

- **Registered address (full PIN code)** — required for GSTIN, IEC filing, vendor forms.
- **Entity type** — currently assumed sole proprietor; if scaling, a private limited company may be preferable for tax treaties and liability limits.
- **CA contact details** — for DTAA rates table and quarterly compliance.
- **Domain name** — needed before custom domain migration.
- **Client DPO contacts** — collected at engagement kickoff and fed into incident response.
- **Insurance carrier(s)** — cyber insurance shortlist to research.

---

## Links

- [Incident Response Runbook](./incident-response-runbook.md)
- [Export Compliance & India](./export-compliance-india.md)
- [International Invoicing](./international-invoicing.md)
- [Vendor Onboarding Cheatsheet](./vendor-onboarding-cheatsheet.md)
- [Custom Domain Migration](./custom-domain-migration.md)
- [Client Kickoff Checklist](./client-kickoff-checklist.md)
