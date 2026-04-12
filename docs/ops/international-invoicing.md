# International Invoicing

Template, W-8BEN-E, withholding, bank rails, and payment terms for clients outside India.

---

## Invoice Template

**Mandatory Fields (Indian GST + export compliance):**

```
INVOICE
Invoice #: INV-2026-001
Date: 2026-04-15
Due Date: 2026-05-15 (Net 15 default; see payment terms below)

ISSUED BY:
Kinyoubi Atelier & Co.
[Full Registered Address, Jeypore, Koraput District, Odisha, India PIN TBD]
GSTIN: [GSTIN TBD — if registered; omit if below GST threshold]
IEC: [IEC code; required for export — obtained from DGFT]
PAN: [PAN TBD]
CIN / DIN: N/A (sole proprietor; upgrade to private limited if scaling)

BILL TO:
[Client Legal Entity Name]
[Client Address]
[Client Country]

DESCRIPTION OF SERVICES:
[Scope: e.g., "Software architecture consultation, 40 hours @ $250/hour"]
[or time-and-materials: "April 2026: Dev team support, T&M"]

SAC Code: 998399 (Other professional services; confirm with CA for your specific service)
Quantity: [hours / deliverables]
Rate: [USD/EUR/GBP]
Amount (local currency): [total in invoice currency]

SUBTOTAL (INR): INR [amount in Indian rupees @ exchange rate]
Exchange Rate: [rate on invoice date, e.g., 1 USD = INR 83.30]
CGST: 0% (zero-rated export under LUT)
SGST: 0% (zero-rated export under LUT)
IGST: 0% (zero-rated export under LUT)

TOTAL DUE: [local currency] / INR [equivalent]

---

COMPLIANCE DECLARATIONS:

1. SUPPLY MEAN FOR EXPORT UNDER LUT WITHOUT PAYMENT OF IGST
   LUT Reference: [LUT number on file with GST authority]

2. PLACE OF SUPPLY: [Client country; e.g., "United States"]

3. TERMS OF PAYMENT:
   - Net [15/30/45] from invoice date
   - Late payment: [1.5% per month or as per contract]
   - Wire transfer (SWIFT) to account below
   - Withholding tax: Client to apply treaty rate per W-8BEN-E + TRC

4. BANK ACCOUNT (BENEFICIARY):
   Kinyoubi Atelier & Co.
   Bank: [Bank Name TBD]
   Account Number: [TBD]
   IFSC: [TBD]
   SWIFT/BIC: [TBD]
   Beneficiary Address: [Jeypore address TBD]
   Correspondence: Contact [founder email]

5. WITHHOLDING TAX DOCUMENTATION:
   - W-8BEN-E: Attached (US clients only)
   - Tax Residency Certificate (TRC): On file with client; confirm with [founder email]
   - DTAA Treaty Relief: [Treaty rate per jurisdiction — see table below]

6. FOR GST/TAX INQUIRIES:
   Contact: [Founder name / CA name] [phone/email]

---

NOTES:
- Prices in this invoice are fixed; no adjustment for exchange rate fluctuation.
- Invoice paid in full; any dispute must be raised within 30 days of receipt.
- This is an export invoice under Indian GST. Reverse charge applies to EU B2B digital services.
```

---

## W-8BEN-E (US Clients Only)

**What it is:** IRS Form W-8BEN-E (Certificate of Status of Beneficial Owner for US Tax Withholding and Reporting — Individuals).

**Who signs:** The founder (as beneficial owner of the sole proprietorship).

**When to provide:** At contract signature or first invoice.

**How to fill (key fields for sole proprietor):**

| Field | Your Value |
|-------|-----------|
| Name | [Founder full name] |
| Country of citizenship | India |
| Country of residence | India |
| Permanent address | [Jeypore address TBD] |
| U.S. taxpayer ID (SSN/ITIN) | N/A (leave blank; see note below) |
| Foreign tax ID | [PAN: Indian tax ID] |
| Part II: Type of beneficial owner | `☐ Individual` (check this) |
| Claim treaty benefit? | `☒ YES` (check "yes" if claiming DTAA relief; see table below) |
| Treaty country | United States |
| Treaty article | [Typically "Article 15 (Dependent Personal Services)" or "Article 21 (Other Income)"; verify with CA] |
| Specific provision(s): | Per treaty, reduces withholding from 30% to 15% (or lower per service type) |
| Signature | [Founder signature + date] |
| Capacity | Self (beneficial owner) |

**Key note on SSN/ITIN:** Most US clients will accept a foreign PAN in place of SSN/ITIN if you're a non-US resident. **If the client insists on SSN/ITIN**, you may need to apply for an ITIN (Individual Tax ID Number) via IRS Form W-7, filed with a US tax return (complex for non-US residents; consult CA before committing).

**Validity:** 3 years from date of signature. Renew before expiration.

**Status:** `[TBD — obtain W-8BEN-E form from IRS.gov; customize with founder details; keep ready for first US client]`

---

## Withholding Tax by Jurisdiction

**Table: Applicable treaty rates for service income**

| Jurisdiction | Default Withholding (No Treaty Relief) | DTAA Treaty Rate | Required Documentation | Notes |
|--------------|------|------|------|------|
| **USA** | 30% | 15% (some services 0%) | W-8BEN-E + TRC | Treaty Art. 15/21; confirm service category |
| **UK** | 30% (standard) | 15% | TRC + tax residency declaration | Treaty Art. 15/21; check latest amended text |
| **Canada** | 25% (standard) | 15% | TRC + declaration | Treaty Art. 15/21 |
| **Germany** | 26.375% | 0% / 5% | EU reverse charge exemption form + TRC | EU VAT reverse charge applies; confirm with client CA |
| **France** | 26% | 0% / 5% | As above | As above |
| **Netherlands** | 26.5% | 0% / 5% | As above | As above |
| **Ireland** | 20% | 0% / 5% | As above | As above |
| **Australia** | 45% (non-resident) | 10% / 15% | TRC + treaty declaration | Confirm service type; may vary |
| **Singapore** | 15% / 22% (depends on income type) | 10% / 15% | TRC + treaty declaration | Service income typically 15%; confirm |
| **UAE** | 0% (no treaty; non-resident no tax) | Treaty text TBD | Confirm with client CA | No DTAA yet (as of 2026); check updates |

**Status:** `[TBD — confirm all rates with CA; obtain official treaty text for each client jurisdiction]`

### How Withholding Works

1. **Client (payer) responsibility:** Client's finance/tax team applies withholding at treaty rate before sending payment.
   - Example: US client owes USD 5,000. Withholds 15% (treaty rate) = USD 750 tax, sends USD 4,250 to your bank.

2. **Your documentation:** Send W-8BEN-E + TRC to client's tax/finance team. They keep it for IRS records.

3. **Your India filing:** The withheld amount is a credit against your Indian income tax. Show on ITR (income tax return). File Form 15CA + 15CB (or equivalent) if required by your AO.

4. **No refund expected:** Withholding is a tax payment, not a refund mechanism. Net of withholding is your actual receipt.

---

## Payment Terms

**Default posture:**
- **Under USD 3,000:** Net 15 (payment due 15 days from invoice).
- **USD 3,000–USD 50,000:** Net 30 (default; align with SOW).
- **Over USD 50,000:** Net 45 (or broken into milestone payments; align with SOW).

**Late payment interest:**
- 1.5% per month (18% annually) applied to unpaid balance after due date.
- Include in contract/invoice.

**Currency:**
- Quote in USD, EUR, or GBP based on client location.
- Fixed at invoice date; no true-up for exchange fluctuation.
- Example: Invoice dated 2026-04-15 @ 1 USD = 83.30 INR. If rate drops to 82 INR/USD by payment date, no adjustment; you bear FX risk.
- Alternative (if high-value engagement): **Float FX until payment received** (requires contract amendment; more complex; avoid unless >USD 100K).

---

## Bank Rails

**Baseline: Wire transfer (SWIFT)**

Setup once:
1. Obtain your SWIFT/BIC code from your bank.
2. Provide to every client: full account number, IFSC, SWIFT, beneficiary name, address.
3. Add to invoice template (see above).

**Bank options for international receipts:**

| Option | Monthly Cost | FX Spread | Timeline | Status |
|--------|------|------|------|------|
| **Standard bank wire (SWIFT)** | Free (most Indian banks) | 0.5%–1.5% | 3–5 business days | Ready now; confirm SWIFT with your bank |
| **Wise Business Account** | Free tier; INR/USD/EUR/GBP wallets | 0.4% real mid-rate | 1–3 business days | `[PAID — requires signup/KYC/verification]` |
| **Mercury (US-only)** | Free | 0.5% | 1 business day (if client also on Mercury) | `[PAID — requires US LLC; not applicable to sole proprietor; skip]` |
| **Stripe Connect** | 2.2% + USD 0.30 per transfer | 2%+ | 1–3 days | `[PAID — requires US legal entity; skip for now]` |
| **Razorpay Payout** | 0% (India domestic); FX fees for international | 1%+ | 1–2 days | `[PAID — requires business account; may not support inbound wire]` |

**Recommendation:** Start with your bank's SWIFT; upgrade to **Wise Business** once first few payments clear (simpler FX conversion, transparent rates).

**Status:** `[PAID — select wire transfer from primary bank first; then evaluate Wise Business for multi-currency reconciliation]`

---

## Invoice Checklist

Before sending to client:

- [ ] Invoice number, date, due date filled.
- [ ] Client legal entity name & address correct (match contract).
- [ ] Your full address, GSTIN (if any), IEC, PAN filled.
- [ ] SAC code correct for your service type.
- [ ] Amount in words and figures; currency code (USD/EUR/GBP).
- [ ] Exchange rate documented (if invoicing in INR equivalent).
- [ ] Zero-rated export declaration present + LUT reference (if applicable).
- [ ] Bank account & SWIFT details correct & current.
- [ ] W-8BEN-E + TRC copied to client finance team (US clients).
- [ ] Payment terms match contract/SOW.
- [ ] Late interest clause included.
- [ ] Founder signature or digital sign (optional; many clients accept PDF).

---

## Summary

1. **Use template above.** Customize with your details (address TBD, GSTIN if applicable).
2. **Always include LUT declaration + export declaration** (required for zero-rated GST treatment).
3. **W-8BEN-E to every US client** at contract start.
4. **Provide TRC to clients asking for treaty relief** (UK, Canada, others).
5. **Wire transfer to your bank account** as default. Upgrade to Wise once routine.
6. **Net 15–30 as default.** Negotiate in contract for larger engagements.
7. **Keep copies** of all invoices & payment evidence for GST (GSTR-1) and ITR (income proof).
