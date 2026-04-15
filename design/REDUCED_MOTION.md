# Reduced Motion at Kinyoubi Atelier

## The contract

The still composition is the composition. Not a penalty, not a stripped-down
fallback, not a frozen first frame. A visitor with prefers-reduced-motion set
must see the same studio that a motion-allowed visitor sees, paced for stillness
instead of for arrival. Charter rule 5 names this; this document records how
the codebase keeps that promise.

Two layers carry the contract.

The first layer is the four primitives in design/primitives. Each one branches
on framer-motion's useReducedMotion hook and returns a fully resolved still
composition from the first frame: Reveal renders the element at opacity 1 with
no translate, SlowFade at full opacity, InkStroke fully drawn, BreathingGroup
locked to the centre of the cycle. Every consumer that goes through a primitive
inherits a considered still by construction.

The second layer is a global MotionConfig with reducedMotion="user" mounted in
app/template.tsx. Framer motion reads the user's media query and, when reduce
is set, immediately resolves all transform animations to their target values
while letting opacity and colour cross fades play. Two consequences. Every
motion.div in the codebase that uses the common pattern initial opacity 0
y 20 whileInView opacity 1 y 0 now renders at y 0 from the first frame and
only the opacity crossfades. Primitives are unaffected because their explicit
useReducedMotion branch fires before MotionConfig is ever consulted.

The two layers compose: an author who reaches for a primitive gets the right
behaviour automatically; an author who hand rolls a motion.div gets a sane
backstop without having to remember the hook.

## Audit inventory

Every animated element in the codebase, classified.

### Primitives — design/primitives

- design/primitives/Reveal.tsx — PASS. Explicit reduced branch, returns the
  element at opacity 1 in place from frame one.
- design/primitives/SlowFade.tsx — PASS. Explicit reduced branch.
- design/primitives/InkStroke.tsx — PASS. Stroke fully drawn from frame one.
- design/primitives/BreathingGroup.tsx — PASS. Locks to centre of cycle.

### Atmosphere and signature

- components/atmosphere/AtmosphereLayer.tsx + the atmosphere block in
  app/globals.css — PASS. The CSS attenuates the layer to 0.35 opacity rather
  than zeroing it; the still composition is a faintly present room rather than
  an absent one.
- components/signature/Signature.tsx — PASS. Enso renders fully closed at
  watermark opacity from frame one under reduced motion.
- components/ui/ScrollCue.tsx — PASS. Reduced branch fades a fully-opacity line
  rather than drawing one.

### Case study motifs

- components/motifs/LatticeMotif.tsx — PASS. Locks at opacity 0.12, no breath.
- components/motifs/VaultMotif.tsx + VaultSealMark — PASS. Outer ring still,
  seal renders fully stamped.
- components/motifs/RiverMotif.tsx — PASS. Static hairline at the middle of its
  travel, no scroll coupling.

### Page templates and chrome

- app/template.tsx — PASS, with new MotionConfig wrapper added in this wave.
- app/layout.tsx — PASS. Server component, no animations.
- components/layout/Header.tsx — PASS. Mobile menu uses AnimatePresence, which
  framer collapses to instant under reduced motion. The seal-dot active marker
  is a static element.
- components/layout/Footer.tsx — PASS. Server component, no animations.

### UI components

- components/ui/FAQAccordion.tsx — PASS. Each motion branch carries an explicit
  reducedMotion branch that resolves to the final state on frame one.
- components/ui/Button.tsx — PASS. Press animation lives in CSS .btn-press;
  globals.css zeros transform under prefers-reduced-motion.
- components/ui/Card.tsx — PASS. Hover-only translate; user-initiated, not
  autoplaying.
- components/ui/CookieConsent.tsx — PASS via MotionConfig. Spring entry
  collapses to instant for reduced motion users.
- components/ui/CalEmbed.tsx — PASS via MotionConfig. The 0.4s opacity-only
  fade still plays gracefully (opacity is permitted under MotionConfig).
- components/ui/Testimonials.tsx — PASS via MotionConfig. Empty array means it
  renders nothing today.
- components/ui/TechStack.tsx — PASS via MotionConfig. Tile fades stagger as
  opacity-only crossfades; y travel suppressed.
- components/ui/ProjectEstimator.tsx — PASS via MotionConfig. Form
  AnimatePresence transitions collapse to instant.
- components/ui/BrushStrokeDivider.tsx — PASS. Static SVG, no animation.

### CSS

- app/globals.css — PASS. The Interaction Polish reduced motion block at
  lines 366 to 397 disables focus ring draw, button press dip, and link
  underline draw. The Atmosphere reduced motion block at lines 168 to 172
  attenuates the ambient layer to 0.35 rather than removing it.

### Page surfaces

- app/HomeContent.tsx — FIXED. Eight residual motion.div blocks from before
  Wave 4 carried inline transition duration 0.5 with no useReducedMotion branch
  and were the principal exception in this surface. All eight have been
  replaced with the Reveal primitive in this wave. The hero block remains a
  raw motion.div but it already used token durations and the new MotionConfig
  wrapper now covers its reduced motion behaviour.
- app/services/ServicesContent.tsx — PASS via MotionConfig. Four whileInView
  reveals; under reduced motion they crossfade in place without translate.
- app/capabilities/CapabilitiesContent.tsx — PASS via MotionConfig. Five
  whileInView reveals.
- app/security/SecurityContent.tsx — PASS via MotionConfig. Seven whileInView
  reveals.
- app/about/AboutContent.tsx — PASS via MotionConfig. Eight whileInView
  reveals.
- app/contact/ContactContent.tsx — PASS. Combines explicit reducedMotion
  branches for the form-step transitions with whileInView blocks that pass
  through MotionConfig.
- app/work/WorkContent.tsx — PASS. Has explicit useReducedMotion branches for
  the case study card stagger; remaining whileInView blocks pass through
  MotionConfig.
- app/work/timetable-engine/TimetableEngineContent.tsx — PASS via MotionConfig.
  Thirteen whileInView reveals; all crossfade in place under reduced motion
  with the LatticeMotif locked still in the hero.
- app/work/bfsi-mis/BfsiMisContent.tsx — PASS via MotionConfig. Eleven
  whileInView reveals; VaultMotif stays still and the seal renders stamped.
- app/work/archive-automation/ArchiveAutomationContent.tsx — PASS via
  MotionConfig. Twelve whileInView reveals; RiverMotif holds at its middle
  position.
- app/not-found.tsx — PASS via MotionConfig. The four-stage entrance becomes
  an opacity-only crossfade.

### Gratuitousness flagged

None recommended for removal under charter rule 4. Every animated element
inspected does compositional work (revealing, framing, pacing). The previous
wave's pre Wave-4 inline durations were too short for the house language but
they were not gratuitous; replacing them with the Reveal primitive corrects
both the duration and the reduced motion question in a single move.

## The five-second test, under reduced motion

### Home page, top to bottom

The visitor lands on a quiet upper-third hero. The brand mark is in place. The
heading reads "We build software that ships. Complexity, handled." with the
gold half held still — the breathing group locks to its centre cycle so the
weight is the weight the designer set. A single hand drawn brush stroke sits
beneath the heading, fully drawn, from the first frame. The CTA sits below.
The scroll cue at the bottom of the hero appears at full opacity briefly and
fades, no draw. Scrolling reveals the tech stack grid: each tile fades into
place at its natural y position, no slide. The services trio fades in at full
position. The dark process band shows the four numbered steps at y zero with
their staggered opacity crossfade. The pipeline diagram arrives next. The
capabilities grid and orchestrator diagram fade in. The static stats strip is
already present. The founder block, the checklist, the case study cards, the
Core Web Vitals card, and the final CTA all crossfade into their resting
positions. The enso watermark in the lower right corner has been there from
the first paint. At no point is anything stuck at opacity 0; nothing slides,
nothing translates, nothing pulses. The page reads as a composed plate that
the visitor walks down through, not as a sequence of arrivals.

### Timetable Engine case study, top to bottom

The page opens on a hero with the lattice motif behind the heading, locked at
opacity 0.12 — a calm constraint field, no breath. The "Back to work" link,
the case study tag, and the heading "Building a timetable management engine
from the solver up" are in place from frame one; no slide. The lede paragraph
and the hero tags fade in. The four-up metric strip lands next, opacity only.
The problem section and the outcome section read as plates of body copy that
arrive through opacity. The pipeline section's three concentric layer cards
fade in at their natural staggered positions. Stage 1, Stage 2, and Stage 3
sections each fade in. The technology and architecture sections, the engine
caveat, the closing summary all crossfade into place. The lattice motif holds
at its locked opacity throughout. Nothing slides. The brush stroke divider
between the pipeline and the stages is fully drawn from the first frame. The
enso watermark is in the corner, signed.

## Residual concerns

None blocking. Three notes on the seam between MotionConfig and explicit
primitives.

First: components/ui/Header.tsx has small motion.div nav items inside the
mobile menu's AnimatePresence stack. They use simple x and opacity transitions.
Under MotionConfig these fade in at x 0 instantly, which is the right still
composition for a menu that is itself instant under reduced motion.

Second: components/ui/CookieConsent.tsx uses a spring transition on its
entrance. MotionConfig's reduced branch suppresses the spring's transform
component cleanly; the consent banner fades in, which is what the contract
asks for.

Third: app/contact/ContactContent.tsx is the one surface that already wired
its own useReducedMotion branches before this wave. Those branches still run.
MotionConfig is a backstop, not an override; the explicit branches take
precedence and continue to do the right thing.

## How to keep this contract

A new motion consumer should reach for a primitive first. Reveal for content
that surfaces in the layout. SlowFade for prose plates. InkStroke for a
signature mark. BreathingGroup for at most one element per surface.

If a primitive does not fit, write a motion.div by hand and rely on the
template's MotionConfig to handle reduced motion. Author the still composition
on paper before the animated one. If the still reads as abandoned or partially
drawn, the move is wrong; pick a different gesture.

If a new primitive is proposed, the still composition belongs in the proposal
above the animated one. The orchestrator approves primitives, not consumers.
