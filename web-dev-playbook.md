# Web Development Playbook — Kinyoubi Atelier & Co.

*A distilled reference from building kinyoubiatelier.com. Not a rigid template — a set of patterns that worked, meant to be adapted per client.*

---

## 0. Philosophy

Three things that matter, in order:

1. **Price the scope before writing code.** Once you start building, you've lost negotiating leverage. The client anchors to "it's almost done" and you anchor to sunk cost. Neither is healthy.
2. **Ship fast, ship quality.** Speed comes from systematised workflows (component libraries, deployment pipelines, pre-built integrations), not from cutting corners. Quality comes from understanding who actually visits the site.
3. **Design is personality, not decoration.** A chartered accountant's site and a streetwear brand's site should feel like different planets. The Kinyoubi site uses navy/gold/serif because the audience is CTOs and founders evaluating a consulting firm. The next project might need neon gradients and monospace type. Don't carry over aesthetics — carry over process.

---

## 1. Pricing & Market Analysis (Do This First)

### Why This Matters

The Indian freelance/agency market has a specific dynamic: clients are budget-conscious, but they're also burned by contractors who deliver broken WordPress themes and disappear. If you quote 70% of what those contractors charge for a genuinely better product, you're leaving money on the table and training the market to undervalue good work.

### The Pricing Workflow

**Step 1: Scope decomposition.** Break the project into concrete deliverables. Not "build a website" — instead: "5-page marketing site with contact form, CMS integration, SEO setup, and deployment." Each deliverable gets a time estimate.

**Step 2: Market scan.** Before quoting, research what comparable work costs. Sources to check: Upwork/Fiverr for the low end, agency rate cards for the high end, and LinkedIn posts from Indian devs sharing project breakdowns. This isn't to match their prices — it's to know the landscape.

**Step 3: Engagement matrix.** Use this rough framework (adapt per project):

| Service | Scope | Standard Timeline | Accelerated |
|---|---|---|---|
| Marketing site (5-10 pages) | Small | 2–4 weeks | 1–2 weeks |
| Multi-feature web app | Medium | 6–10 weeks | 4–6 weeks |
| Full platform / migration | Large | 12–20 weeks | 8–14 weeks |
| Technical consulting / audit | Small | 1–2 weeks | 3–5 days |
| AI workflow / automation | Medium | 6–10 weeks | 4–7 weeks |

**Step 4: Quote with confidence.** Your rate should reflect the quality delta between your output and the commodity market. If a local contractor charges ₹30K for a basic site and delivers something broken, and you charge ₹25K for something polished — you're the fool. Charge ₹40-50K and justify it with the deliverable list, the timeline, and the post-launch support window.

**Step 5: Scope document before code.** Write a 1-2 page scope document that lists every deliverable, the timeline, what's included in post-launch support, and what's explicitly out of scope. Get it signed off before touching a code editor.

### Pricing Red Flags

- Client wants "a simple website" but keeps adding features in conversation → scope creep incoming. Pin it down in writing.
- Client compares your quote to a ₹5K Fiverr gig → this isn't your client. Walk away politely.
- Client wants "something like [major SaaS product]" on a ₹50K budget → reset expectations with a phased approach or decline.

---

## 2. Tech Stack & Architecture Decisions

### The Default Stack (What We Used)

This is the stack that worked for Kinyoubi. It's a sensible default for most marketing sites and small-to-medium web apps, but it's not gospel.

- **Framework:** Next.js 14 (App Router, React Server Components)
- **Language:** TypeScript (strict mode — catches bugs before runtime)
- **Styling:** Tailwind CSS (utility-first, fast iteration)
- **Animation:** Framer Motion (scroll reveals, page transitions, micro-interactions)
- **Icons:** Lucide React (tree-shakeable, consistent)
- **Deployment:** Static export → GitHub Pages (free) or Vercel (free tier)

### When to Deviate

The above stack is for when the client needs a fast, polished, static-ish site. Here's when to pick something else:

- **Client needs a CMS they can edit:** Add Sanity, Strapi, or Contentful. Or use WordPress if the client is already comfortable with it — don't be a snob about it.
- **Client needs e-commerce:** Shopify for simple stores, Medusa or Saleor for custom.
- **Client needs a mobile app:** React Native or Flutter depending on complexity.
- **Client needs real-time features:** Add Supabase or Firebase. Consider server-side rendering instead of static export.
- **Client has zero budget for hosting:** Static export + GitHub Pages (completely free). Netlify and Cloudflare Pages are also free-tier options.

### Architecture Patterns That Worked

**Component-driven with atomic primitives.** Build small, reusable pieces first (Button, Card, Section), then compose them into page sections. This pays off on every subsequent page you build.

**Server/client split.** Page wrappers and layouts are server components (SEO-friendly, fast). Interactive bits (forms, animations, estimators) are client components marked with `'use client'`. Keep the client boundary as narrow as possible.

**Data co-located with components.** For marketing sites, hardcode content in the component files or a constants file. Don't over-engineer with a CMS unless the client will actually update content themselves. Most don't.

**Static export as default.** Unless the project needs server-side logic (auth, database queries, API routes), export as static HTML. It's faster, cheaper to host, and has zero server maintenance.

---

## 3. Design System (Adapt Per Client)

### What We Built for Kinyoubi

The Kinyoubi design system targets a specific audience: decision-makers evaluating a consulting firm. It communicates trust, precision, and craftsmanship. The choices were deliberate:

- **Navy (#142850) + Gold (#a08535):** Authority and premium positioning. Not playful, not corporate-bland.
- **Playfair Display (headings) + Inter (body):** Serif headings for gravitas, clean sans-serif body for readability.
- **Cream background (#F8F7F4):** Warmer than pure white, feels more considered.
- **Minimal animation:** Scroll reveals, subtle hovers. Nothing flashy — the audience would find that unserious.

### How to Build a Design System for a Different Client

**Step 1: Who visits this site?** A yoga studio's visitors and a fintech startup's visitors have completely different expectations. Spend 15 minutes writing down 3-4 adjectives that describe the ideal visitor's world.

**Step 2: Colour palette.** Pick 2-3 colours max. One dominant, one accent, one neutral. Use tools like Coolors or Realtime Colors to preview. Test contrast ratios (WCAG AA minimum).

**Step 3: Typography.** Two fonts maximum. One for headings, one for body. Google Fonts is free and has everything you need. Match the font personality to the brand personality.

**Step 4: Spacing and sizing.** Consistent padding and margins matter more than most people think. Define a scale (e.g., 4px base: 4, 8, 12, 16, 24, 32, 48, 64) and stick to it. Tailwind's default scale is excellent.

**Step 5: Component variants.** Define 2-3 button variants, a card style, section padding, and heading sizes. That's enough for most marketing sites. Don't over-design — let the content guide what you need.

### Tailwind Config as Design Tokens

The `tailwind.config.ts` file IS the design system. Custom colours, fonts, shadows, border radii, and animation keyframes all live here. When starting a new project, copy this file and modify the tokens — don't start from scratch every time.

Key tokens to customise per project:
- `colors` (brand palette)
- `fontFamily` (heading, body, accent fonts)
- `borderRadius.card` (sharp vs. rounded feel)
- `boxShadow` (card elevation style)
- `animation` and `keyframes` (motion personality)

---

## 4. Component Library (Reusable Across Projects)

### Core Components (Port These)

These components are generic enough to reuse with minimal changes:

**Button** — Polymorphic (renders as `<a>`, `<Link>`, or `<button>` based on props). Three variants (primary, secondary, ghost), three sizes. This pattern is worth memorising.

**Card** — Simple wrapper with optional border and hover elevation. Doesn't prescribe internal layout.

**Section** — Layout wrapper that handles max-width, padding, and optional background colour. Keeps page files clean.

**FAQAccordion** — Uses native `<details>/<summary>` for accessibility, enhanced with Framer Motion. Generates FAQ structured data for SEO automatically.

**AnimatedCounter** — Counts up to a target number when scrolled into view. Uses `useInView` from Framer Motion with `once: true`.

**BrushStrokeDivider** — SVG section dividers. Unique to Kinyoubi's Japanese aesthetic, but the pattern (decorative SVG dividers with variants) is reusable.

### Interactive Widgets

**ProjectEstimator** — Multi-step wizard (service → scope → timeline → estimate). This pattern generalises well: any time the client wants visitors to self-qualify or get a ballpark quote, build a stepped wizard with a matrix of outcomes.

**CookieConsent** — DPDP Act 2023 compliant. Adapt the legal text per project but keep the consent-before-tracking pattern.

### Patterns to Replicate

**Scroll reveal animation wrapper:**
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
  viewport={{ once: true, margin: '-80px' }}
>
  {children}
</motion.div>
```
This is the single most-used animation pattern. Wrap any section in it for a polished feel. The negative margin triggers the animation slightly before the element enters the viewport, so it feels immediate rather than laggy.

**Staggered card grids:**
```tsx
{items.map((item, index) => (
  <motion.div
    key={item.id}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.08, duration: 0.5 }}
    viewport={{ once: true }}
  >
    <Card>{/* content */}</Card>
  </motion.div>
))}
```

**Section header pattern:**
```tsx
<p className="text-sm font-medium text-accent uppercase tracking-widest mb-4">Label</p>
<h2 className="font-heading text-display-sm md:text-display tracking-tight mb-4">Title</h2>
<p className="text-lg text-text-secondary max-w-2xl leading-relaxed">Description</p>
```

---

## 5. SEO & Performance

### SEO Checklist (Per Project)

- [ ] Root metadata with title, description, OpenGraph image (1200x630), Twitter card
- [ ] Per-page metadata overrides
- [ ] Structured data (Organization, LocalBusiness, or appropriate schema)
- [ ] Dynamic sitemap (Next.js `sitemap.ts`)
- [ ] robots.txt (optionally block AI crawlers — discuss with client)
- [ ] Semantic heading hierarchy (one H1 per page, H2s for sections, H3s for subsections)
- [ ] FAQ structured data if the page has FAQs
- [ ] Canonical URLs to avoid duplicate content
- [ ] Alt text on all meaningful images

### Performance Checklist

- [ ] Static export if possible (zero server, maximum speed)
- [ ] Font subsetting (Latin only unless the site needs other scripts)
- [ ] `font-display: 'swap'` on all fonts
- [ ] SVG for logos and icons (not PNGs)
- [ ] Lazy loading for below-fold images
- [ ] Tree-shakeable icon library (Lucide, not Font Awesome)
- [ ] Lighthouse score ≥ 90 on all four metrics before delivery

### Accessibility Baseline

- [ ] Skip-to-content link
- [ ] ARIA labels on interactive elements
- [ ] Keyboard navigable (tab order, focus rings)
- [ ] Colour contrast WCAG AA compliant
- [ ] Semantic HTML (nav, main, section, article, footer)
- [ ] `prefers-reduced-motion` respected

---

## 6. Third-Party Integrations (Free-Tier Stack)

For budget-conscious clients, this stack delivers professional functionality at zero cost:

| Need | Tool | Free Tier |
|---|---|---|
| Analytics | Umami (self-hosted) or Plausible | Unlimited (self-hosted) |
| Live chat | Crisp | 1 seat, unlimited conversations |
| Contact form | Web3Forms | 250 submissions/month |
| Contact form (alt) | Formspree | 50 submissions/month |
| Scheduling | Cal.com | 1 calendar, unlimited bookings |
| Form logging | Google Sheets + Apps Script | Unlimited |
| Hosting | GitHub Pages / Cloudflare Pages | Unlimited static sites |
| Domain | Client purchases (.in domains ~₹700/year) | — |

All integrations should be optional (gated behind environment variables). If the client doesn't need live chat, don't include the Crisp script. Keep the bundle lean.

---

## 7. Deployment Pipeline

### GitHub Pages (Free, Reliable)

The deploy workflow (`.github/workflows/deploy.yml`) is straightforward: push to main → build → deploy. It takes about 2 minutes from commit to live. Good enough for most marketing sites.

Key config for static export:
```js
// next.config.mjs
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
}
```

### Vercel (When You Need More)

Use Vercel when the project needs: server-side rendering, API routes, edge functions, or preview deployments for client review. The free tier is generous for small projects.

Add security headers via `vercel.json`: X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy.

---

## 8. Client Handoff Checklist

Before declaring a project done:

- [ ] All pages responsive (test on actual mobile device, not just browser devtools)
- [ ] Contact form tested end-to-end (submission → notification → data logged)
- [ ] SEO metadata verified (use a social card preview tool)
- [ ] Lighthouse audit passed (Performance ≥ 90, Accessibility ≥ 90)
- [ ] Documentation written (how to update content, where things live)
- [ ] Knowledge transfer session done (walk the client through the admin side)
- [ ] Post-launch support window defined and communicated
- [ ] All credentials and access transferred to client
- [ ] Scope document signed off — everything delivered

---

## 9. What to Remember

**Every site is a custom thing.** The Kinyoubi site exists in a specific context (consulting firm, Indian market, CTO audience). The next site might be for a bakery, a SaaS startup, or a portfolio photographer. Carry over the process and the component patterns, not the visual identity.

**Price with confidence.** You're not competing with ₹5K WordPress installers. You're competing with the client's alternative: hiring a full-time developer or going to an agency that charges 3x your rate and takes 3x as long. Position accordingly.

**Ship, then iterate.** A live site that's 90% perfect beats a local site that's 100% perfect. Get it deployed, get feedback, refine. The deployment pipeline exists to make this painless.

**The scope document is your shield.** When a client says "can you also add X" mid-project, the scope document is what you point to. If it's not in the scope, it's a change request with a separate timeline and cost.
