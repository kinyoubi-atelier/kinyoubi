# Export Compliance — India

All service exports from India to North America and EMEA require filing with government authorities. This runbook covers GST, tax residency, and export registration.

---

## IEC (Importer Exporter Code)

**What it is:** A unique 10-digit code issued by DGFT (Directorate General of Foreign Trade) required for all exports, including service exports.

**Who needs it:** All exporters. A single IEC covers both goods and services; separate codes are not needed for service-only businesses.

**How to apply:**
1. Visit https://icegate.gov.in (DGFT portal).
2. Register as a new user (email, password).
3. File form via "New Exporter" or "New IEC application" menu.
4. Attach documents: PAN certificate, GST registration (if applicable), bank statement, address proof.
5. Fee: Free (or nominal processing fee; confirm with CA).
6. Processing time: 3–7 days.

**When needed:** Before the first invoice to an international client. If you've already been invoicing, obtain IEC before next GST filing cycle.

**Status:** `[TBD — apply once first engagement signed; keep IEC reference for all invoices]`

---

## GST Registration & LUT

**GST Registration:**
- Mandatory if annual turnover exceeds INR 40 lakhs (as of FY 2024–25; threshold may change).
- Application: https://www.gst.gov.in (Online GST portal).
- Documents: PAN, Aadhaar, bank account, address proof, business registration (if applicable).
- Fee: Free.
- Processing: 3–5 working days online.
- **Cost trigger:** `[PAID — if revenue threshold crossed; skip if below threshold]`

**LUT (Letter of Undertaking):**
- Filed on the GST portal by the GST-registered exporter.
- Declares intent to export services without payment of IGST (Integrated GST).
- Validity: One financial year (FY); renew at FY start (April 1).
- Filing: Free; online form.
- **Prerequisite:** Active GST registration.
- Invoices must reference LUT number and contain declaration: "SUPPLY MEANT FOR EXPORT UNDER LUT WITHOUT PAYMENT OF IGST".

**Calendar:**
- First engagement with international client → Initiate GST if turnover will cross threshold.
- April (FY start) → Renew LUT for upcoming FY.
- Monthly → File GSTR-1 (outward supplies) by 11th of next month.
- Quarterly → File GSTR-3B (ITC reconciliation) by 20th of next month.

---

## Tax Residency Certificate (TRC) & Form 10FA

**What it is:** TRC is proof that the founder is a tax resident of India and eligible for DTAA (Dual Taxation Avoidance Agreement) relief.

**Who asks for it:** US, UK, EU, and other treaty-partner clients (via vendor questionnaires or W-9/W-8BEN-E demand).

**How to obtain:**
1. Apply to the local Assessing Officer (AO) in jurisdiction of PAN registration.
2. Form: Officially titled "Certificate of Residence"; some AOs call it "Form 10FA" (informal).
3. Documents: PAN certificate, current year tax return (ITR), bank statements, address proof.
4. Fee: Free (no fee for Indian residents).
5. Processing: 5–15 working days.
6. **Prerequisite:** Filed tax return (ITR) for the relevant FY. Can apply after filing; doesn't require payment of tax.

**Validity:** One financial year (April–March). Renew annually before tax filing season.

**Timeline:**
- Jan–Feb: File TRC application for current FY (before ITR deadline of July 31).
- Receive by Mar–Apr: Present to clients during Q1 engagements.
- Before contract signature: Ask CA to confirm TRC is current. If not, file renewal by May.

**Status:** `[TBD — apply with CA after first ITR filing; required before US/UK client engagement]`

---

## DTAA & Withholding Tax

**Overview:** India has income tax treaties (DTAA) with 95+ countries. Treaty reduces the withholding tax rate that clients must apply before remitting payment.

**Without treaty relief:** US clients apply 30% withholding on service payments (W-8BEN-E status required to claim treaty benefit).

**With treaty relief:** Rates vary by country:

| Country | Treaty Rate (Services) | Withholding Rate | Note |
|---------|--------|------|------|
| **USA** | 15% (some services 0%) | Default 30%; 15% with W-8BEN-E | See IRS instructions |
| **UK** | 15% | Default 30%; 15% with TRC | Check latest treaty text |
| **Canada** | 15% | Default 25%; 15% with TRC | |
| **Germany** | 0% / 5% | Depends on service type | File EU exemption form; CA to advise |
| **France** | 0% / 5% | Depends on service type | As above |
| **Australia** | 5% / 10% | Depends on service type | Case-by-case |
| **Singapore** | 10% / 15% | Depends on service type | Case-by-case |

**Status:** `[TBD — confirm rates with CA; obtain treaty text for each jurisdiction; verify client's local withholding rules]`

**How to claim treaty relief:**
1. US clients: Sign W-8BEN-E (see international-invoicing.md) + provide TRC.
2. Other clients: Provide TRC + tax residency declaration.
3. Send both documents to client's finance/tax team at contract start.

---

## GSTR Treatment of Zero-Rated Exports

**GSTR-1 (Outward Supplies):**
- Report zero-rated export services in GSTR-1.
- Line item must include: invoice number, date, client GSTIN (if India; if foreign, "UNREGISTERED"), amount, SAC code, place of supply (country code), LUT reference number.
- Mark supply as "zero-rated (export under LUT)".

**GSTR-3B (ITC Reconciliation):**
- Input tax credit (ITC) on zero-rated supplies is claimed in GSTR-3B, part of reconciliation.
- No IGST output due (0% rate).
- Any input taxes on business expenses (vendor services, tools, travel) claimed as ITC.

**Example:**
```
GSTR-1 Line Item (zero-rated export):
- Invoice: INV-2026-001
- Date: 2026-04-15
- Client: ABC Corp, USA (UNREGISTERED)
- Amount: USD 5,000 (INR 4,16,500 @ 83.30/USD)
- SAC: 998399 (other professional services)
- Place of Supply: US (840)
- LUT Ref: [LUT number]
- Rate: 0% (export under LUT without IGST)
- ITC: Eligible on input services/materials
```

---

## Filing Calendar (FY 2026–27, i.e., April 2026–March 2027)

| Month | Deadline | Filing | Notes |
|-------|----------|--------|-------|
| April 1 | Start of FY | Renew LUT | File before first export invoice |
| Monthly (11th) | — | GSTR-1 | File for all outward supplies of previous month |
| Monthly (20th) | — | GSTR-3B | File after GSTR-1; reconcile ITC |
| June 15 | Q1 estimate | Advance Tax (if applicable) | If expected tax > INR 10K per quarter; consult CA |
| Sep 15 | Q2 estimate | Advance Tax (if applicable) | |
| Dec 15 | Q3 estimate | Advance Tax (if applicable) | |
| Mar 15 | Q4 estimate | Advance Tax (if applicable) | |
| July 31 (next FY) | — | ITR Filing | File annual income tax return for FY 2026–27 |
| Oct 31 (next FY) | — | TRC Renewal | Apply for tax residency certificate for FY 2027–28 |

---

## Paid Prerequisites

| Item | Cost | Status |
|------|------|--------|
| IEC application | Free / nominal | `[PAID — apply when first client signed]` |
| GST registration | Free | `[PAID — if turnover > INR 40L; skip otherwise]` |
| CA retainer (quarterly + annual) | INR 5K–15K/year | `[PAID — needed for TRC, ITR, DTAA guidance]` |
| Digital Signature Certificate (if AO requires e-filing of TRC) | INR 2K–4K/year | `[PAID — if required by local AO]` |

---

## Summary

**Before first international invoice:**
1. Obtain IEC.
2. If revenue crosses threshold: file GST registration + LUT.
3. Provide client with TRC + W-8BEN-E (see international-invoicing.md).

**Every April 1:**
- Renew LUT.

**Monthly:**
- File GSTR-1 by 11th; GSTR-3B by 20th.

**Annually (before July 31 next FY):**
- File ITR.
- Renew TRC by Oct 31 of next FY.

**Ongoing:**
- Work with CA to confirm DTAA rates for each client jurisdiction.
- Update withholding expectations in invoice terms.

---

## Key Contacts & Resources

- DGFT (IEC): https://icegate.gov.in
- GST: https://www.gst.gov.in
- CERT-In: https://www.cert-in.org.in
- DTAA treaty texts: https://www.incometaxindia.gov.in (search "DTAA")
- Local AO (TRC): [Name & address TBD — ask CA for jurisdiction]
