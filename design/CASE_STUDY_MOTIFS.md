# Case study motifs — Wave 3

## Purpose

Wave 3 gives each of the three case studies a single surface signature. One motif per study, running through accent, divider, and one landmark element inside the existing hero region. Copy, structure, and sections are untouched. The aim is that a visitor should be able to tell which case study they are on from the silhouette alone, before the type has even settled.

## The three motifs

### Timetable Engine — lattice

A very fine grid, drawn once as an SVG pattern behind the hero heading. Lines at 1 px, spaced at 28 px. The whole grid floats between opacity 0.10 and 0.14 across a cycle double DURATION_BREATH, so the surface never feels like it is pulsing. A constraint space for a study about a constraint engine. The studio voice for this motif: the page is a statement made from inside a matrix, and the matrix is visible.

Accent hue shift: `#a08535` (gold) → `#7D8E6A` (muted sage-gold, a quarter step toward cool).

### BFSI MIS — vault

Six concentric hairline circles, centred behind the hero heading, forming an aperture opening onto a regulated interior. The outermost ring carries a slow respiration in its opacity; the inner rings are still. In the compliance footer area, above the IP protective language, a single seal stamp in SEAL_RED. One per page, by construction. The studio voice for this motif: the page opens, is read, and is stamped.

Accent hue shift: `#a08535` (gold) → `#6B5A28` (deeper sumi-gold).

### Archive Automation — river

A single vertical hairline at the left edge of the viewport, outside the reading column, that moves down the page at 0.2 times the scroll speed. It never catches the reader. A study about a flow of records gets a silent horizontal current. Left edge chosen deliberately so the signature enso at lower right is left unchallenged. The studio voice for this motif: the page flows, and the flow is on the margin.

Accent hue shift: `#a08535` (gold) → `#B59557` (warmer paper-gold).

## The 50-metre silhouette test

### Timetable Engine

At 1440 width, the page reads as a calm broadsheet of grey type over a faint grid that extends behind the hero heading. The grid is not a background pattern; it is a signature. A viewer scanning three open tabs picks Timetable out by the lattice alone.

### BFSI MIS

At 1440 width, the page reads as a compliance brief with an aperture behind the hero heading and a single crimson seal near the foot of the page. A viewer scanning three open tabs picks BFSI out by the concentric rings and the seal alone.

### Archive Automation

At 1440 width, the page reads as a technical write-up with a quiet vertical hairline down the left margin of the viewport that drifts as the reader scrolls. A viewer scanning three open tabs picks Archive out by that drifting margin line alone.

## Seijaku translation test

### Lattice (Timetable Engine)

a) It frames the hero region of the Timetable Engine page as the inside of a constraint matrix, so the heading reads as a statement made against a structure.
b) Removing it would leave the hero visually identical to the other two case studies; the lattice is what gives this page its silhouette at 50 metres.
c) It rewards the lingerer. The breath is long enough that a scanning viewer never notices it move. A viewer who stays sees the grid settle and release.
d) A 2022 SaaS grid would animate in on scroll and carry a colourful keyline. This lattice is monochrome, slow, and respects ma between cells.
e) Reduced motion locks the grid at opacity 0.12 with no breath. The still composition is a calm constraint field.

### Vault (BFSI MIS)

a) It frames the hero region as an aperture opening onto a regulated interior, pacing the reader's entry into a dense, compliance-heavy case study.
b) Removing it would leave the BFSI page visually identical to the other two case studies; the aperture is what gives this page its silhouette at 50 metres.
c) It rewards the lingerer. The respiration is slow enough that a scanning viewer does not notice it; a viewer who stays long enough to read the architecture diagram sees the outermost ring settle.
d) A 2022 SaaS vault motif would use a gradient iris and a glossy lock icon. This motif is monochrome hairlines on paper.
e) Reduced motion renders the hairlines fully present, no respiration; the seal is fully stamped on the first frame.

### River (Archive Automation)

a) It paces the reader. A study about a flow of records gets a silent horizontal current that moves with the reader, which is what the page is about.
b) Removing it would leave the Archive Automation page visually identical to the other two case studies; the river is what gives this page its silhouette at 50 metres.
c) It rewards the lingerer. At 0.2x scroll speed the line drifts so slowly that a quick read never registers it; a reader who scrolls slowly watches it trail.
d) A 2022 SaaS page would use a coloured progress bar pinned to the top of the viewport. This is the opposite move: an outer margin hairline that is easy to miss.
e) Reduced motion locks the line at its middle position, static, no scroll coupling. The still composition is a calm vertical margin stroke.

## Added JS weight per route

Each motif is inline SVG with no new dependencies. Estimated gzipped sizes of the new components:

- `LatticeMotif.tsx`: ~0.9 KB
- `VaultMotif.tsx` (including `VaultSealMark`): ~1.3 KB
- `RiverMotif.tsx`: ~0.8 KB

Combined across the three routes: ~3.0 KB gzipped, well inside the 20 KB charter ceiling for a wave.

Per-route cost:
- Timetable Engine: ~0.9 KB (lattice only)
- BFSI MIS: ~1.3 KB (vault + seal)
- Archive Automation: ~0.8 KB (river only)

No new image assets. No new dependencies.

## Scoping confirmation

Every accent shift is applied as a scoped CSS custom property on the page wrapper of the relevant case study. The `--study-accent` variable is set locally on a root `<div>` inside each case study content file. It does not leak to other routes.

- `tailwind.config.ts`: untouched
- `app/globals.css`: untouched
- `app/layout.tsx`: untouched
- Home, services, capabilities, security, about, contact, compliance, legal surfaces: untouched

## IP protective language and IPNotice

The `IPNotice` component at `components/ui/IPNotice.tsx` is untouched. None of the three case study content files imports `IPNotice`; the IP protective footer language on each of the three pages lives inline as section copy, and that copy is also untouched across this wave. The BFSI seal is placed in its own section above the footer disclosure, not inside it.

## Question for the founder

Are the three silhouettes distinct at 50 metres, or does one need strengthening?

The intention is that a side-by-side of all three case studies at 1440 width reads as three pages with their own signatures, not as the same page with three colour variations. If any one of the three feels weaker than the others, the next iteration can raise its opacity ceiling, widen its spacing, or, in the case of the river, increase its travel distance without breaking the charter.
