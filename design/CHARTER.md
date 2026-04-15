# Kinyoubi Atelier Design Charter

## Purpose of this document

This charter sets the house vocabulary for motion, texture, and composition at Kinyoubi Atelier and Co. It exists so that every wave of the visual pass speaks the same grammar. If you are reading this before you touch a component, you are doing it right. If you are reading this after, you are checking your work against a standard that does not flex.

## The ten charter rules

1. Ma first. Negative space is the primary material. If a move reduces breathing room, it is wrong.
2. One signature object per surface. Do not stack flourishes. Choose the one thing that earns its stillness.
3. Long eases, slow curves. Default transition duration 600 to 1200 ms. Default curve cubic-bezier(0.2, 0.6, 0.1, 1) or slower. Nothing snaps.
4. Subtraction over addition. If a move requires a second move to justify it, it is already too much.
5. Honour prefers-reduced-motion without exception. Every animated element must have a still fallback that is itself considered, not a dead freeze.
6. No decorative drop shadows, no glossy gradients, no neon glow, no parallax on body copy, no marquees, no cursor followers that chase, no confetti, no spring bounces. These are not seijaku.
7. Texture not ornament. Paper grain, ink bleed, seal red, sumi black, considered neutrals. If an effect could belong on a SaaS landing page in 2022, reject it.
8. Performance budget: no wave adds more than 20 KB gzipped of JS or more than 40 KB of images to any single route. SVG first, lottie last, video never unless explicitly approved.
9. Accessibility is a seijaku principle, not a compliance check. Focus rings should be beautiful. Keyboard paths should feel intentional.
10. Every change is reversible in isolation. Build in a way that any single wave can be dialled back without breaking the others.

## The seijaku translation test

Every token or primitive added to this system must answer these five questions in writing before it ships.

a) What is this move revealing, framing, or pacing?
b) If I removed it, what would the visitor lose?
c) Does it reward the viewer who lingers, or demand attention from the viewer who does not?
d) Could the same move appear on a SaaS landing page in 2022 without looking out of place? If yes, reject.
e) In reduced motion mode, is the still composition itself considered, or is it a freeze?

## How to use the motion tokens

The tokens live in `design/tokens/motion.ts`. Import from there. Do not inline durations or eases anywhere else.

Eases.

- `EASE_SUMI` is the house default. Reach for it first.
- `EASE_INK` is for brush draws and ink bleeds. It commits early and trails off, so a line finishes like a brush leaving paper.
- `EASE_SETTLE` is for objects arriving to rest. Symmetrical. Use it for anything that needs to look placed rather than thrown.
- `EASE_BREATH` is for respiration loops. Never for a transition with a start and an end.

Each ease is also exported as a four number array, suffixed `_ARRAY`, for framer motion consumers that want a native curve rather than a CSS string.

Durations.

- `DURATION_GLANCE` (300 ms) is for micro state: a hover underline, a caret, a focus outline that slides in.
- `DURATION_CONSIDER` (600 ms) is for reveals inside content flow and for SlowFade.
- `DURATION_LINGER` (900 ms) is the default for Reveal. A considered read.
- `DURATION_SETTLE` (1200 ms) is for a large object arriving to rest, and for the InkStroke draw.
- `DURATION_BREATH` (4200 ms) is the period of a respiration cycle, not a transition duration.
- `DURATION_PRESS` (60 ms) is reserved for the Wave 6 button press dip. Nothing else may use it.

Stagger.

- `STAGGER_SHORT` (90 ms) is for lists read as a single block.
- `STAGGER_LONG` (180 ms) is for lists where each item deserves its own beat.

Framer motion variants.

- `revealUp`, `slowFade`, `strokeDraw`, `breath`, `staggerShort`, `staggerLong` are pre shaped variants. Use them with motion components instead of authoring transition objects inline. If none fit, propose a new variant to the orchestrator.

## How to use the texture tokens

The tokens live in `design/tokens/texture.ts`. They describe the material, not the composition.

- `PAPER_GRAIN_OPACITY` (0.06) is the ceiling for any noise or fibre overlay. Paper does not advertise itself.
- `PAPER_WARMTH` is the companion tone to the existing background. Use it for vignette interiors, card fills, ambient light wash. Not for prose.
- `INK_SUMI` is the deep near black for type on light and for concentrated strokes. Faintly warm so it reads as ink on paper.
- `INK_VIGNETTE_OPACITY` (0.08) is the ceiling for off frame light falloff.
- `SEAL_RED` is the single crimson. One per surface. Reserved for a moment that wants the viewer to pause.
- `LIGHT_DIRECTION` (112 deg) is the shared ambient window angle. Every vignette and every faint shadow should read as lit from this direction.

The helper `textureCssVars()` emits all of the above as a single CSS declaration string. The Atmosphere Agent injects it once at `:root`. Components read the values with `var()`.

## How to compose the four primitives

- `Reveal` is the default enter in view wrapper. Use it when content in the normal layout should surface with a quiet rise.
- `SlowFade` is the opacity only sibling. Use it on legal surfaces, long form prose, and anywhere a translate would feel theatrical.
- `InkStroke` is the brush stroke primitive. Use it for an underline beneath a hero heading, a seal mark beside a case study title, or any signature object candidate. One per surface.
- `BreathingGroup` is the respiration loop. Wrap at most one element per surface, typically a hero heading. Never around anything that carries information.

## What to never do

- No decorative drop shadows.
- No glossy gradients.
- No neon glow.
- No parallax on body copy.
- No marquees.
- No cursor followers that chase.
- No confetti.
- No spring bounces.

## How reduced motion works in this codebase

Every primitive reads `prefers-reduced-motion` via framer motion's `useReducedMotion` hook and branches at render. In the reduced branch the primitive returns a still composition that is itself considered: `Reveal` renders the element at opacity 1 with no translate, `SlowFade` renders at full opacity, `InkStroke` renders the stroke fully drawn from the first frame, `BreathingGroup` locks to the centre of the cycle. No primitive ever holds at opacity 0 waiting for an observer that will never fire. The still composition is the composition, not an accident.

When proposing a new primitive, write the still composition first. If that composition reads as abandoned or incomplete, the primitive is not ready.

## How to propose a new token or primitive

Route the proposal through the orchestrator. Do not self approve tokens. A proposal includes the seijaku translation test answers, the still composition description, the performance cost, and a single example consumer that justifies the token existing.

The design folder is the only place these primitives and tokens live. Components in `components/**` and surfaces in `app/**` consume them; they do not invent their own.

## Worked seijaku test

One hypothetical move that passes.

An underline beneath the home hero heading, drawn once as an `InkStroke` over `DURATION_SETTLE` with `EASE_INK`, then held.

a) It frames the hero heading and paces the viewer's first read.
b) Removing it would leave the heading unframed, which is a different composition; the stroke is doing compositional work.
c) It rewards the lingerer; the heading is already legible, the stroke arrives as a second beat for someone who is still there.
d) A SaaS page in 2022 would underline with a static gradient bar or a sliding highlight bar. A drawn brush stroke on easing that mimics a hand leaving paper does not belong there.
e) In reduced motion the stroke is present in full from the first frame. The still composition is a calm headline under a hand drawn line. That is the composition.

One hypothetical move that fails.

A shimmer sweep across a call to action button every eight seconds to draw attention to it.

a) It demands attention from someone who was not already looking at the button.
b) Removing it would lose nothing of the composition; the button is still a button.
c) It punishes the lingerer by re triggering.
d) This is a SaaS tactic, precisely the 2022 kind.
e) In reduced motion it is either gone entirely or a frozen gradient. Neither is a considered still composition; both are residue.

Rejected.
