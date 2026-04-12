# Custom Domain Migration

Move from `kinyoubiatelier.com` (GitHub Pages) to a custom domain.

---

## Phase 1: Prerequisites (Weeks 1–2)

### Step 1: Purchase Domain
**`[PAID — domain purchase, ~USD 10–20/year]`**

- Registrar options: Namecheap, Google Domains, Porkbun, Route 53.
- Domain name: `[TBD — e.g., kinyoubi-atelier.com or similar]`
- Duration: 1 year (renewable).
- Privacy: Enable WHOIS privacy to prevent founder info in public records (recommended).
- DNS: Set to custom nameservers (if registrar supports); or use registrar's DNS with CNAME records (simpler for static export).

**Save:**
- Registrar account login & 2FA backup codes.
- Domain name & registrar contact (add to vendor roster later).

---

### Step 2: Verify Vercel Compatibility
**Status: Already possible; free tier supports custom domains**

- Kinyoubi website currently on GitHub Pages using static export (next.config.js).
- Vercel free tier supports custom domain deployments.
- **Cost tier flag:** Vercel Pro (USD 20/month) required only if traffic >100GB/month; static site typically stays free.
- Decision: Migrate to **Vercel + custom domain** or keep GitHub Pages + point custom domain via DNS CNAME?
  - **Recommendation:** Migrate to Vercel (easier redirects, better uptime, simpler SSL). GitHub Pages can stay as cold backup.

**Action:** Confirm Vercel account signup ready. `[PAID — Vercel Pro if traffic threshold crossed; flag before deploying]`

---

## Phase 2: DNS & Domain Setup (Week 2–3)

### Step 3: Point Custom Domain to Vercel
**If migrating to Vercel:**

1. In Vercel dashboard:
   - Project: Kinyoubi website.
   - Settings → Domains.
   - Add domain: `[your-domain.com]`.
   - Vercel provides CNAME record (or NS records if using Vercel nameservers).

2. In domain registrar dashboard:
   - Add DNS records provided by Vercel.
   - Most common: CNAME pointing to `cname.vercel.sh` or similar.
   - Propagation time: 5 minutes to 48 hours (typically <1 hour).

3. Verify:
   - `nslookup your-domain.com` should resolve.
   - Visit `https://your-domain.com` in browser; should show your site.

**If keeping GitHub Pages:**

1. Add CNAME file to repo root:
   ```
   your-domain.com
   ```
2. In GitHub repo Settings → Pages → Custom domain: enter domain name.
3. In registrar: Point DNS CNAME to `kinyoubiatelier.com`.
4. GitHub auto-generates SSL cert (takes 5–15 minutes).

---

### Step 4: SSL/TLS Certificate
- **Vercel:** Auto-generates free SSL cert via Let's Encrypt. No action needed.
- **GitHub Pages:** Auto-generates free SSL cert (check box "Enforce HTTPS" in Settings → Pages).
- **Result:** `https://your-domain.com` works immediately after DNS propagation.

---

## Phase 3: Code Updates (Week 3)

### Step 5: Update next.config.js

**Current file:** `/Users/ankitsahu/Desktop/KINYOUBI ATELIER & CO./KINYOUBI WEBSITE CODE/next.config.mjs`

**Change log:**
- If currently using `basePath: '/kinyoubiatelier.com'`, **remove it** (custom domain is root).
- If using `assetPrefix`, update to new domain or remove if static export handles it.

**Example:**
```javascript
// Before (GitHub Pages):
const nextConfig = {
  basePath: '/kinyoubiatelier.com',
  assetPrefix: '/kinyoubiatelier.com',
  output: 'export',
  reactStrictMode: true,
};

// After (custom domain):
const nextConfig = {
  basePath: '', // Remove basePath
  output: 'export',
  reactStrictMode: true,
  // assetPrefix: '' // Optional; remove if not needed
};
```

**Test locally:**
```bash
npm run build
# Verify output in out/ directory; check asset paths are correct
```

---

### Step 6: Update lib/constants.ts

**Find & update SITE.url:**

```typescript
// Before:
export const SITE = {
  url: 'https://kinyoubiatelier.com',
  // ...
};

// After:
export const SITE = {
  url: 'https://your-domain.com', // [TBD — insert actual domain]
  // ...
};
```

**Why:** Affects canonical tags, Open Graph links, robots.txt, sitemaps.

---

### Step 7: Update app/structured-data.tsx

**Find & update URL references:**

Search file for:
- `https://kinyoubiatelier.com`
- `basePath` references

Replace with `https://your-domain.com` (or reference SITE.url from constants if not already).

**Example:**
```typescript
// Before:
const schema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "url": "https://kinyoubiatelier.com",
  // ...
};

// After:
const schema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "url": SITE.url, // or inline "https://your-domain.com"
  // ...
};
```

---

### Step 8: Grep for Hardcoded Refs (Do Once Before Migration)

```bash
grep -r "kinyoubiatelier.com" /Users/ankitsahu/Desktop/KINYOUBI\ ATELIER\ \&\ CO./KINYOUBI\ WEBSITE\ CODE/ --include="*.ts" --include="*.tsx" --include="*.js" --include="*.jsx" --include="*.json"
```

**Fix all results** (likely in constants, structured-data, next.config, robots.txt, sitemap generation).

---

## Phase 4: Email Migration (Week 3–4)

### Step 9: Email Domain Setup
**`[PAID — Google Workspace or Zoho Mail, ~USD 4–6/user/month or INR 250–300/month]`**

**Option A: Google Workspace**
1. Sign up at workspace.google.com with your custom domain.
2. Verify domain ownership in Google Search Console (add DNS TXT record).
3. Update MX, SPF, DKIM records in registrar (provided by Google).
4. Create email: [founder]@your-domain.com.
5. Propagation: 24–48 hours.

**Option B: Zoho Mail**
1. Sign up at zoho.com/mail.
2. Same domain verification process.
3. Update MX, SPF, DKIM in registrar.
4. Cheaper than Google Workspace (~USD 1.5–2/user/month).

**Preferred:** Google Workspace if running YouTube/SEO-heavy site; Zoho if cost is priority.

**Action:** `[PAID — decide between Google Workspace and Zoho; set up before public launch of custom domain]`

---

### Step 10: Update Contact Forms & Public Channels
- Site contact form: ensure reply-to is new domain email (not old GitHub Pages).
- LinkedIn, GitHub profile: update website URL to custom domain.
- Socials: update in bio if linked.
- Legal page: update company website URL.

---

## Phase 5: Deployment & Testing (Week 4)

### Step 11: Build & Deploy to Vercel
```bash
npm run build
# Verify: out/ directory exists with all assets
vercel deploy --prod
# Follow prompts; link to custom domain
```

---

### Step 12: Pre-Flight Checklist

Before going live on custom domain:

- [ ] DNS records propagated (`nslookup your-domain.com` returns correct IP).
- [ ] HTTPS/SSL working (`https://your-domain.com` loads).
- [ ] All internal links use relative paths (not absolute github.io URLs).
- [ ] Contact form works and replies go to new domain email.
- [ ] Open Graph tags in `structured-data.tsx` reference new domain URL.
- [ ] Canonical tags (in _document.tsx or _app.tsx) reference new domain.
- [ ] 404 page works.
- [ ] Mobile view responsive.
- [ ] Lighthouse score >90 for performance (if critical for SEO).
- [ ] Search Console updated with new domain (add as separate property).

---

### Step 13: Search Console & Analytics

1. **Google Search Console:**
   - Add new property for custom domain.
   - Verify via DNS TXT record (or if using Google Workspace, auto-verified).
   - Update sitemap URL to `https://your-domain.com/sitemap.xml`.
   - Check for errors & indexation status.

2. **Google Analytics / Vercel Analytics:**
   - Update tracking domain in gtag or Vercel config.
   - Test by visiting site and checking real-time events.

---

## Phase 6: GitHub Pages Teardown (Week 5)

### Step 14: Keep as Cold Backup (Recommended) OR Disable

**Option A: Keep GitHub Pages Active (for redundancy)**
- Revert `next.config.js` basePath for GitHub Pages backup.
- In GitHub repo Settings → Pages → keep enabled but **uncheck "Enforce HTTPS"** to avoid cert conflicts.
- CNAME record still points to old repo; keep it or remove entirely (your choice).
- **Pro:** If Vercel goes down, old site still accessible at old URL.
- **Con:** Slightly higher DNS complexity.

**Option B: Disable GitHub Pages Entirely**
1. GitHub repo Settings → Pages → set "Source" to "None".
2. Delete CNAME file from repo root.
3. GitHub will keep the repo but stop serving the site.
4. **Pro:** Cleaner DNS, less confusion.
5. **Con:** Lose backup if Vercel fails.

**Recommendation:** Keep GitHub Pages in standby; revert CNAME to point there if Vercel fails. Costs nothing.

---

## Rollback Plan

**If something breaks after migration:**

1. **DNS issue:** Revert CNAME in registrar to point back to GitHub Pages within 1 hour.
   - Site resumes at old URL (`kinyoubiatelier.com`) within 5 minutes.

2. **Vercel down:** Same as above; DNS revert.

3. **Build error after deploy:** Revert to previous Vercel deployment via Vercel dashboard (auto-keeps 5 prior builds).

4. **Git rollback:** If code change broke site, revert commit:
   ```bash
   git revert [commit-hash]
   git push origin main
   vercel deploy --prod
   ```

**Time to rollback:** <5 minutes if DNS revert; <10 minutes if git revert.

---

## Post-Migration Cleanup (Week 6+)

- [ ] Monitor error logs for 1 week (Search Console, Vercel analytics).
- [ ] Set up uptime monitoring (Vercel has built-in; or use free tier Uptime Robot).
- [ ] Update all internal documentation & runbooks to reference custom domain.
- [ ] Deprecate `kinyoubiatelier.com` from all public channels.
- [ ] Archive any DNS records pointing to old GitHub Pages (keep for 1 month in case).

---

## Summary Timeline

| Phase | Duration | Key Actions |
|-------|----------|---|
| **Phase 1:** Prereqs | Week 1–2 | Buy domain, decide on Vercel vs GitHub Pages |
| **Phase 2:** DNS | Week 2–3 | Add DNS records, verify SSL |
| **Phase 3:** Code | Week 3 | Update next.config, constants, structured-data |
| **Phase 4:** Email | Week 3–4 | Set up domain email (Google Workspace or Zoho) |
| **Phase 5:** Deploy | Week 4 | Build, test, deploy to Vercel |
| **Phase 6:** GitHub Pages | Week 5 | Keep as backup or disable |
| **Post-Migration:** Monitor | Week 6+ | Logs, uptime, documentation cleanup |

---

## Cost Summary

| Item | Cost | Timing |
|---|---|---|
| Domain (annual) | ~USD 10–20 | Once at start |
| Vercel Pro (if >100GB traffic) | USD 20/month | Only if triggered |
| Google Workspace (if chosen) | USD 4–6/user/month | Start in Phase 4 |
| Zoho Mail (if chosen) | USD 1.5–2/user/month | Start in Phase 4 |
| **Subtotal (minimal)** | **~USD 15/year + email** | |

---

## Contact & TBD

- **Domain name:** `[TBD — fill once purchased]`
- **Registrar:** `[TBD — select and create account]`
- **Email provider:** `[TBD — decide Google vs Zoho]`
- **Vercel account:** Ready; link to GitHub.
