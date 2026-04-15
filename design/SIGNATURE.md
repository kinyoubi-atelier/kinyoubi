# Signature Object — Wave 2 Design Note

For the founder, at the Wave 2 review gate.

## The four candidates, evaluated

### A. Enso that completes as the home page settles, then persists as a quiet watermark

An enso is a single, unhurried sumi circle closed with the brush still moving. It reveals nothing specific; it frames the whole session as a signed room. Its failure mode is the opposite of most signature marks: it becomes ornament if drawn too large, too dark, or in too literal a position. On legal surfaces and on case studies it belongs in the outer margin at watermark opacity, never in the reading column, so it cannot compete with the IP protective language or with a case study hero heading. Its reduced motion composition is the completed circle at watermark opacity from the first frame, the same mark the animation would have arrived at. It reads as drawn by the same hand as BrushStrokeDivider because both are one path, one bezier arc, one warm ink leaving paper.

### B. Brush stroke that draws across the hero and leaves an ink horizon line

A stroke across the hero reveals the hero itself, pacing the first read. Its failure mode is that it either becomes a literal underline under the headline (which the charter's worked example already claims for InkStroke) or it crosses into the reading column and fights the body copy. On case studies it risks drawing over the title; on legal surfaces any horizon line that persists feels like chrome, not material. Its reduced motion composition is the residue only, and the residue alone does not feel like a signature; it reads as a stray line. It would feel drawn by the same hand as BrushStrokeDivider; too much so, in fact. The site already has horizontal brush strokes as dividers, and a signature object should not be a scale up of an existing component.

### C. Hanko seal that stamps into the footer, varying its impression per route

A seal reveals that the page was read, and frames the act of reading as a completed transaction. Its failure mode is that the footer is the last thing the visitor sees, and a red stamp there reads as a signature block. Powerful, but it pins the signature to the moment of departure rather than to the room. On case studies it would sit uncomfortably close to the IP protective footer language, which is itself a formal statement; two formal statements in the same 200 pixels is crowding. On legal surfaces a mark that varies per route reads as a seal of approval on legal copy, which is not a claim the studio should make. Its reduced motion composition is a still stamped seal, which is considered. It would feel drawn by the same hand as BrushStrokeDivider, and it would reserve the one permitted use of seal red per surface. This is the strongest runner up.

### D. Vertical mizuhiki cord running the page edge that braids on scroll

A cord reveals the length of the page and paces the scroll. Its failure mode is that any scroll linked motion on body copy pages is explicitly forbidden by charter rule 6; even a braid feels like parallax adjacent to the reading column. On case studies with long prose and on legal surfaces the cord would be continuously active, which violates the rule against competing with headings inversely: it competes on the edge of attention for the whole scroll. Its reduced motion composition is a static centre braid cord, which reads as decoration on the margin rather than as signature. It does not feel drawn by the same hand as BrushStrokeDivider. Mizuhiki is a different craft entirely and the visual grammar clashes. Rejected early.

## Recommended candidate — Enso

The enso is the only candidate that is true signature rather than decorated chrome. It does not frame a heading, it does not stamp a transaction, and it does not run the page edge. It sits in the lower right margin as a held mark, at 0.09 opacity, outside the reading column, below the fold, anchored to the viewport rather than to any section. The first visit to the site draws it once over DURATION_SETTLE with EASE_INK, opacity lifting in parallel; every subsequent route in that session renders it already settled. It is the site's signed corner. It does not belong on a SaaS page, it does not compete with any hero, it honours the charter's one signature per surface rule by being subtractive rather than additive, and its reduced motion composition is itself: a completed enso, already at rest. This is the mark that will be remembered.

## Runner up — Hanko seal

The hanko is the second strongest candidate and the one worth weighing against the enso in this review. If the founder wants the signature to feel like proof of read rather than like a signed room, the hanko delivers that with the studio's one permitted crimson and a glyph that varies per route. Its trade off is that it lives in the footer, the moment of departure rather than the moment of presence, and it crowds the IP protective language on case studies.

## What the visitor sees

On first visit to any route in a session, the enso is invisible for the first beat. Then, over roughly 1.2 seconds, a single warm black sumi stroke traces itself around its own shape in the lower right margin, arriving at watermark opacity as it closes. The closing stroke overlaps the start by a few degrees — the hand still moving as the brush leaves. The mark holds there for the rest of the session.

On every subsequent route in that session, the enso is simply present. It is already drawn. It is already at watermark opacity. No replay, no flicker, no second arrival.

In reduced motion mode the enso renders in its settled state from the first frame on every route, including the first. The composition the animation would have arrived at is the composition the reduced motion visitor sees immediately. It is not a freeze; it is a held mark.

In reduced data mode the still branch is used; the SVG is tiny and stays inline, so nothing is fetched.

## Weight added to every route

Approximately 3.3 KB gzipped of JavaScript and inline SVG markup (raw source 7.8 KB). Well inside the 10 KB target and the 20 KB ceiling. No image assets, no font embeds, no dependencies added; framer-motion is already on every route.

## Where this signature must never appear

- Not inside the reading column. The fixed position in the lower right outer margin, clamped by vw and vh, keeps it clear of prose at every viewport.
- Not above a hero heading. It sits at the bottom of the viewport and is anchored there regardless of scroll, so it cannot read as ornament on any title.
- Not inside the IP protective footer language on case study pages. It is anchored to the viewport rather than to the footer, so it does not cross into that block when the footer enters the viewport; at default vh clamp it is roughly 20 to 48 px from the bottom of the window, floating above the footer's internal content by a comfortable margin.
- Not in seal red. Seal red is reserved; the enso draws in `var(--ink-sumi)`.
- Not above the header or over modals. Its z index is zero; header is z 50, mobile menu z 40, cookie consent z 50.

## One question for the founder

Keep this signature, or swap to the runner up?
