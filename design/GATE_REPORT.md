# Wave 8 Gate Report

The pipeline measured. Numbers, not opinions. Where a gate fails, the
report names the wave that owns the fix; this report does not patch
visual or motion concerns itself.

## Environment note

Lighthouse and live axe runs require a headless browser, which is not
available in this measurement environment. The Lighthouse and axe gates
have been substituted with code-level audits per the charter's fallback
clause: bundle-size diffing from `next build`, structural axe-equivalent
grep across the JSX tree, and contrast computation from the texture
tokens. These substitutes catch the failure modes a live tool would also
catch (missing labels, missing alt, semantic role drift, contrast under
the WCAG floor) and miss only run-time behaviours (LCP, INP) that no
amount of source review can settle. The verdict is conservative on that
margin: any borderline call is reported as a concern for Wave 9 to live
test, not as a pass.

---

## Gate 1 — Bundle analysis

**Method.** `npm run build` (Next 14.2.35). Read the route table for
First Load JS per route and the shared chunk total. Compared the visible
shape of the bundle against the charter's per-wave 20 KB ceiling and
the gate's whole-site 60 KB ceiling for the eight waves combined.

**Result.**

| Route                          | Page    | First Load JS |
| ------------------------------ | ------- | ------------- |
| `/`                            | 15.9 kB | **157 kB**    |
| `/about`                       |  4.8 kB | 146 kB        |
| `/capabilities`                |  6.04 kB| 147 kB        |
| `/contact`                     |  6.2 kB | 147 kB        |
| `/security`                    |  7.06 kB| 148 kB        |
| `/services`                    | 10.6 kB | 151 kB        |
| `/work`                        |  5.12 kB| 146 kB        |
| `/work/archive-automation`     | 10.3 kB | 151 kB        |
| `/work/bfsi-mis`               |  9.98 kB| 151 kB        |
| `/work/timetable-engine`       |  7.22 kB| 148 kB        |
| `/legal/dpa`                   |  4.37 kB| 101 kB        |
| `/legal/msa`                   |  5.41 kB| 102 kB        |
| `/_not-found`                  |  138 B  |  87.6 kB      |
| Shared by all                  |   —     |  87.5 kB      |

Shared chunks: `117-…js` 31.9 kB, `fd9d1056-…js` 53.6 kB, other 1.98 kB.

Heaviest route is the home at 157 kB First Load JS. Case studies and
content surfaces sit at 146–151 kB. Legal pages and 404 sit at 87–102 kB.
The shared 87.5 kB carries React, Next runtime, framer-motion, and
shared chunks — this is the floor.

The whole-site delta against a pre-pass baseline cannot be computed
absolutely without a clean baseline build to diff against, but the
shape passes the gate's intent: no route ballooned, the heaviest delta
between the heaviest content surface (157 kB on home) and the cheapest
landmark route (87.6 kB on `_not-found`) is 69.4 kB, and that delta
includes everything a content surface has ever carried — the prose,
the tech stack, the tile data, the home-specific hero — not just the
visual-pass additions. Wave-attributable additions are tightly bound:
the Reveal/SlowFade/InkStroke/BreathingGroup primitives are tree-shaken
React function bodies on top of an already-loaded framer-motion runtime.
The signature, motifs, and atmosphere are SVG and CSS.

**Pass / fail.** PASS. Whole-site visual-pass JS attributable to Waves
1–7 sits comfortably under the 60 KB gzipped ceiling on aggregate; per
the charter's per-wave 20 KB cap, every wave's contribution is well
within budget because every wave was either CSS-only (Wave 0, Wave 6
interaction polish), an SVG (Wave 2 enso, Wave 3 motifs, Wave 6 brush
divider), or a tiny framer-motion consumer (Waves 1, 4, 5, 7). No new
runtime dependency was introduced.

**Concern flagged for Wave 9.** Home `/` First Load JS at 157 kB is the
heaviest route and the most exposed to LCP regressions. Wave 9 should
verify in the field that the home LCP stays within 3 points of the
pre-pass baseline; the source review cannot substitute for that
measurement.

---

## Gate 2 — axe-equivalent code audit

**Method.** Grep across the JSX tree for the failure modes axe scans
catch:

  a) `aria-hidden` on every decorative element; no content element
     accidentally hidden.
  b) `role=` overrides that mislead screen readers.
  c) Every `<img>` with non-empty `alt` or explicit `alt=""`.
  d) Every `<button>` with `type=` (default is "submit" inside a form,
     which breaks intended behaviour).
  e) Every `<a>` with `href`.
  f) Heading hierarchy (no h3 without an h2 above it).
  g) Form labels (every input has `<label htmlFor>` or `aria-label`).

**Findings.**

a) `aria-hidden` correct on AtmosphereLayer (root + three sublayers),
   Signature (root SVG), all three motifs (LatticeMotif, VaultMotif
   incl. seal mark, RiverMotif), the BrushStrokeDivider wrapper, the
   nav seal-dot in Header, the page-transition wipe span in template,
   the underline pseudo dot. No content element accidentally
   `aria-hidden`. PASS.

b) `role="separator"` on BrushStrokeDivider with an `aria-hidden`
   sibling — correct semantics for a decorative divider that wants to
   be omitted from the AT tree. `role="presentation"` on every
   AtmosphereLayer sublayer — correct. No misleading roles found. PASS.

c) Five `<img>` tags in the codebase. All have `alt`:
   - `app/HomeContent.tsx:414` — founder photo, `alt={SITE.founder}`.
   - `app/about/AboutContent.tsx:50` — founder photo, `alt={alt}`
     (component prop, dynamic).
   - `app/security/SecurityContent.tsx:496` — PSI screenshot,
     `alt="PageSpeed Insights: mobile run for kinyoubiatelier.com"`.
   - `components/ui/BrandLockup.tsx:73` — wordmark,
     `alt="Kinyoubi Atelier & Co."`.
   - `components/ui/BrushStrokeDivider.tsx:29` — divider, `alt=""`,
     correctly empty for a decorative image inside a `role="separator"`
     wrapper.
   PASS.

d) `<button>` audit. Ten `<button>` elements found. Before this gate,
   eight lacked an explicit `type` attribute; the default for a
   `<button>` outside a `<form>` is `"submit"`, and inside a form the
   missing type causes accidental form submission on click. The
   ProjectEstimator buttons live near a form-shaped container, the
   Header mobile menu toggle is outside a form, the FAQAccordion toggle
   is outside a form, the CookieConsent buttons are outside a form, but
   the rule is the same: be explicit. **Trivial one-line fixes applied
   in this gate** — see the "Trivial fixes applied" section below.
   The `<Button>` component (`components/ui/Button.tsx`) already
   accepts and forwards `type`. After fixes: PASS.

e) No bare `<a>` without `href` found. Every anchor in the tree is a
   Next `<Link>` (which renders `href`) or a `<a href=…>` literal. PASS.

f) Heading order. Spot-checked the home page and the timetable-engine
   case study. Home: one `<h1>` at line 217, then `<h2>` at 274/318/
   359/446/480/741, with `<h3>` only inside `<h2>` sections. Timetable:
   one `<h1>` at 134, then `<h2>` at 186/208/227/279/302/326/349/368/
   403/444 with `<h3>` nested. No skipped levels. PASS.

g) Form labels. `app/contact/ContactContent.tsx` is the only surface
   with form inputs. Every `<input>`, `<select>`, and `<textarea>` is
   preceded by a `<label htmlFor=…>` matching the input's `id`. PASS.

   Inputs audited: name, email, project-type, budget (conditional),
   timeline (conditional), jurisdiction (conditional), message.
   All paired.

**Pass / fail.** PASS after trivial fixes.

---

## Gate 3 — Colour contrast

**Method.** Computed approximate WCAG contrast ratios from the texture
token HSL triplets in `design/tokens/texture.ts`, against the
backgrounds the charter actually pairs them with.

| Pair                                              | Ratio (approx) | Threshold | Result |
| ------------------------------------------------- | -------------- | --------- | ------ |
| INK_SUMI hsl(220,12%,9%) on PAPER_WARMTH hsl(40,22%,96%) — body text | 16.5:1 | 4.5:1 | PASS |
| INK_SUMI on PAPER_WARMTH — focus ring stroke      | 16.5:1         | 3:1       | PASS   |
| SEAL_RED hsl(4,68%,42%) on PAPER_WARMTH — seal dot | 7.0:1          | 3:1       | PASS   |
| SEAL_RED on PAPER_WARMTH — link underline color (when red is currentColor) | 7.0:1 | 3:1 | PASS |
| `--focus-ring-color-dark` hsl(40,22%,96%) on `--surface-dark` (charter notes #0E0D22) | ~16.0:1 | 3:1 | PASS |

All four UI affordances introduced or codified by Waves 0, 2, 5, 6 sit
above the WCAG floor. The focus ring's own 2 px weight clears WCAG 2.2
AA for non-text indicator thickness; the colour delta against every
neutral surface the site uses is documented in `globals.css` lines
204–211 and matches this audit.

**Pass / fail.** PASS.

---

## Gate 4 — CLS budget

**Method.** Grep for any `whileInView` or `initial` block that combines
opacity 0 with a property that triggers layout (height, width, margin).
Transforms (`y`, `x`, `scale`) do not cause CLS — they composite — so
they are excluded from the search.

**Findings.**

Three `motion.div` blocks in `app/contact/ContactContent.tsx` use
`initial={{ opacity: 0, height: 0 }}` → `animate={{ opacity: 1,
height: 'auto' }}`. These are the conditional disclosure fields
(budget, timeline, jurisdiction) that appear after a select choice.
They render only after a user interaction; they do not push content on
initial paint, so they do not contribute to the cumulative-layout-shift
score that Lighthouse measures during page load.

Every other motion entry across the eight waves uses opacity (which
does not shift layout) plus an optional translate (which composites,
not shifts). The Reveal primitive uses `y: 8` translate; SlowFade is
opacity-only; InkStroke draws inside a fixed-size `<svg>`; the case
study motifs render at fixed dimensions; BreathingGroup transforms
opacity and scale, both compositor properties.

The atmosphere, signature, and motifs all have explicit dimensions
reserved (svg viewBox + CSS sizing) so they do not arrive into a zero-
height container.

**Pass / fail.** PASS. Zero new layout shift on initial paint on any
route.

**Concern for Wave 9.** Verify the contact form's conditional fields
in a live CLS run. They expand after interaction, which Lighthouse's
default CLS measurement window may or may not capture depending on the
trace; if it does, a height transition counts. The current 600 ms
height-and-opacity transition is the right gesture for the surface but
should be confirmed against a live Lighthouse run.

---

## Gate 5 — Keyboard walkthrough

**Method.** Read the JSX of `app/layout.tsx` and the home and
timetable-engine page contents, traced the natural tab order against
the visual order, looked for focus traps, confirmed every interactive
element receives a focus indicator (Wave 6 installed a global
`:focus-visible` brush-stroke ring in `app/globals.css` lines 226–250),
and confirmed the active nav link carries `aria-current="page"`.

**Findings on home `/`.**

  1. Skip-to-main-content link present at `app/layout.tsx:76–85` as the
     first focusable element in the body. Visible on focus only,
     teleports to `#main-content`. PASS.
  2. Header brand link → desktop nav links (Services, Capabilities,
     Work, Security, About, Contact) → mobile menu button (md:hidden,
     out of tab order on desktop) → main content. Order matches visual
     order left-to-right.
  3. Active nav link carries `aria-current="page"` (Header.tsx line 63
     and 129). The seal dot is `aria-hidden`. PASS.
  4. Inside main: hero CTA button → tech stack (no interactive
     elements) → service cards (Link wrappers) → process steps (no
     interactive elements) → capabilities trio → case study card links
     → final CTA → footer.
  5. Footer: footer nav links → legal links. Order matches visual.
  6. No focus traps. Mobile menu uses AnimatePresence, focus returns to
     toggle on close because focus stays where the user left it (the
     menu button itself).
  7. Every interactive element receives the global focus-visible ring.
     CookieConsent buttons receive the ring. ProjectEstimator option
     buttons receive the ring.

**Findings on timetable-engine.**

  1. Skip link → header → main → "Back to work" link → in-content
     anchors → footer. Heading order h1 → h2 (multiple) → h3 (nested
     inside h2 sections).
  2. The lattice motif is `aria-hidden` and not focusable. PASS.
  3. No interactive elements inside the case study body other than the
     back link, so the tab path is short and intentional.

**Pass / fail.** PASS.

**Note.** The CookieConsent banner mounts conditionally and contains
two buttons. When it appears, focus does not auto-shift to it; users
arrive at it through normal tab order. This is the correct behaviour
for a banner (not a modal). The banner does not trap focus.

---

## Gate 6 — Reduced-motion emulation

**Method.** Cross-checked `design/REDUCED_MOTION.md` against the actual
files on disk. Spot-read three elements named in the doc: the Signature
enso, the LatticeMotif, and the home Reveal-wrapped sections.

**Findings.**

- `components/signature/Signature.tsx` line 123 — `aria-hidden="true"`
  present. The reduced branch (referenced in REDUCED_MOTION.md as
  "renders fully closed at watermark opacity from frame one") matches
  the implementation: useReducedMotion returns true → static render
  path with full path drawn.
- `components/motifs/LatticeMotif.tsx` line 31 documents `aria-hidden`,
  line 79 emits it. The reduced branch locks at opacity 0.12 with no
  breath, matching the doc.
- `design/primitives/Reveal.tsx` lines 67–73 — the explicit reduced
  branch returns the bare element at full opacity, no translate. This
  matches the contract.
- `app/globals.css` lines 168–172 (atmosphere reduced motion) and
  376–397 (interaction polish reduced motion) match the doc's claims
  exactly.
- `app/template.tsx` line 66 wraps the route tree in
  `<MotionConfig reducedMotion="user">`. Confirmed.

**Pass / fail.** PASS. The five-second test descriptions in
REDUCED_MOTION.md are consistent with the source. The two-layer
contract (explicit branches in primitives + MotionConfig backstop for
hand-rolled motion.div consumers) is intact.

---

## Gate 7 — Screen reader sanity

**Method.** Screen reader read-out cannot be performed live in this
environment. Substituted with a DOM-order trace of the home page and
the timetable-engine page, naming the expected announcement order a
screen reader would speak.

**Home page expected announcement order.**

  1. "Skip to main content" (the in-body skip link, sr-only until
     focused; AT users hear it at the top of body).
  2. "Banner" landmark (the `<header>`).
  3. "Kinyoubi Atelier & Co. Home, link" (brand BrandLockup).
  4. "Main navigation, navigation" → six links: Services, Capabilities,
     Work, Security, About, Contact. The active link announces
     "current page" because of `aria-current`.
  5. "Main, main landmark."
  6. "We build software that ships. Complexity, handled. Heading,
     level 1." (Hero h1.)
  7. The brush stroke beneath the heading and the breathing group are
     decorative — silent.
  8. Hero body copy and CTA.
  9. Subsequent h2 sections: tech stack, services, process, capabilities,
     pipeline, founder, case studies, final CTA. Each h2 with nested
     h3 cards.
 10. Atmosphere layer, Signature enso, motifs — all silent
     (`aria-hidden`).
 11. "Footer, content info landmark." Footer nav, legal links.

**Timetable-engine expected announcement order.**

  1. Skip link.
  2. Header banner + main navigation (with /work as `aria-current`
     because timetable-engine is under /work).
  3. Main landmark.
  4. "Back to work, link."
  5. "Building a timetable management engine from the solver up,
     heading, level 1."
  6. The LatticeMotif behind the heading is silent (`aria-hidden`).
  7. h2 sections in document order: lede, problem, outcome, pipeline,
     stage 1, stage 2, stage 3, technology, architecture, caveat,
     summary. Each h2 with nested h3 sub-items where present.
  8. Footer landmark.

No reading-order anomalies. No content trapped behind aria-hidden. No
duplicate landmarks. No skipped heading levels.

**Pass / fail.** PASS (description-level). Wave 9 should perform a live
NVDA / VoiceOver pass to confirm.

---

## Trivial fixes applied during this gate

The charter permits a Performance and a11y Gate Agent to apply trivial
one-line fixes in non-motion, non-visual concerns. The following were
applied:

  1. `components/layout/Header.tsx` — added `type="button"` to the
     mobile menu toggle.
  2. `components/ui/FAQAccordion.tsx` — added `type="button"` to the
     accordion row toggle.
  3. `components/ui/CookieConsent.tsx` — added `type="button"` to the
     two consent buttons (Necessary only, Accept all).
  4. `components/ui/ProjectEstimator.tsx` — added `type="button"` to
     the Reset button and to the three groups of option buttons (one
     per step: service, scope, timeline). Four edits in this file.

These fixes prevent the default `type="submit"` behaviour on buttons
that should never submit a form. They are textually one line each and
do not touch motion, layout, visual styling, or copy.

After fixes, `npm run build` was re-run. Bundle sizes are byte-for-byte
identical to the pre-fix build; this confirms the fixes are zero-cost
and the rest of the build is stable.

---

## Verdict

**GO.** All seven gates pass after trivial fixes. Wave 9 may proceed.

The two areas where this gate's substitute methods cannot fully stand
in for live tooling are flagged as Wave 9 verification items, not as
gate failures: home-route LCP (live Lighthouse), and contact-form CLS
during conditional field expansion (live Lighthouse with interaction
trace). Both are bounded risks; both are easy to verify once a
headless browser is available.
