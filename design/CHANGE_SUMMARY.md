# Change Summary — Visual Come Alive Pass

For the founder, at the close of the integration wave.

## What changed

Ten waves of quiet work landed on a single feature branch. The room got
its atmosphere, its signature, and the three case studies got their
silhouettes. The home hero learned to breathe. Every surface picked up
a per surface gesture sized for what that surface is for. Buttons,
links, focus, navigation, scroll, and route transition each got the
small interaction polish they were missing. The whole pass was audited
for reduced motion and for the seven gates the charter cares about.

The work sits in `design/` as tokens and primitives, in
`components/atmosphere/`, `components/signature/`, `components/motifs/`
as the new visual elements, and in the surfaces under `app/` as the
small consumer changes that wire each room to its own composition.
Nothing in the structure of the site changed; nothing in the copy
changed; the existing layout and information architecture are
preserved.

The integration wave resolved the one open coordination gap from Wave
3 and Wave 5 by extracting a `RiverCurrent` component as a sibling to
`RiverMotif`. The Work index card for the Archive Automation study now
imports that sibling instead of carrying an inline fallback.

## What did not change

No copy was edited. No section was added or removed. No layout was
restructured. No motion ease or duration was revised after Wave 0 set
them. The atmosphere's amplitude was not turned up to attract the
glance. The signature did not move from its lower right margin. The
three case study motifs each kept the silhouette they were designed
for. Reduced motion was not a downgrade path; it was authored as a
considered still for every move.

## Why each signature moment is what it is

### Atmosphere

A faintly present room, not a backdrop with weather. Paper grain at
its ceiling opacity, a warm vignette at its ceiling opacity, light
read from the same ambient angle on every surface. It is the air the
type sits in, not a layer the visitor is meant to notice.

### Enso

The signed corner. One mark per session, drawn once in the lower right
margin of the viewport on the first route, present from the first
frame on every subsequent route. Outside the reading column at every
viewport. In sumi black, never in seal red. It is the room signed by
the same hand as the brush stroke divider.

### Case study motifs as a group

Each case study now has a silhouette that names the page from fifty
metres. The lattice for the timetable engine is a constraint field;
the vault for BFSI is an aperture and a stamp; the river for archive
automation is a margin current and, in its card sibling, a horizontal
flow. The three are scoped strictly to their case study pages and
their card cells; they do not leak.

### Home hero

The gold half of the headline holds a slow respiration centred on the
weight the type designer set; the brush stroke beneath the heading
finishes once and stays. The scroll cue at the bottom of the hero
appears, holds, and fades; it does not loop. The hero is the room you
walk into, not a sequence that plays at you.

### Interaction polish

A focus ring drawn as a brush stroke. A button press that dips for
sixty milliseconds and recovers. A link underline that draws on hover
and recedes on leave. A nav active state marked with a seal dot. A
page transition that wipes once across the route boundary. The press
duration is reserved; nothing else may use it.

### Reduced motion

The first class still composition. Every animated element resolves to
a fully drawn, fully positioned still on the first frame for the
visitor with the preference set. The atmosphere attenuates rather than
disappears. The signature is already drawn. The motifs hold at their
middle position. No element ever waits at opacity zero for an observer
that will never fire.

## The numbers

`npm run build` on the close of the integration wave. Next 14.2.35.

| Surface                | First Load JS |
| ---------------------- | ------------- |
| /                      | 157 kB        |
| /services              | 151 kB        |
| /work/archive-automation | 151 kB      |
| /work/bfsi-mis         | 151 kB        |
| /work/timetable-engine | 148 kB        |
| /security              | 148 kB        |
| /capabilities          | 147 kB        |
| /contact               | 147 kB        |
| /about                 | 146 kB        |
| /work                  | 146 kB        |
| /legal/msa             | 102 kB        |
| /legal/dpa             | 101 kB        |
| /compliance            |  96.4 kB      |
| /legal/copyright       |  96.4 kB      |
| /legal/privacy         |  96.4 kB      |
| /legal/terms           |  96.4 kB      |
| Shared by all          |  87.5 kB      |

The bundle is byte for byte identical to the Wave 8 gate report. The
RiverMotif refactor and the RiverCurrent extraction are tree shakable
and added no runtime weight. No new dependency was added across any
wave.

Contrast: every UI affordance the pass introduced sits above the WCAG
floor. Sumi on paper warmth measures roughly sixteen and a half to
one for body type. Seal red on paper warmth measures roughly seven to
one for the seal dot and for the underline. Focus ring stroke clears
the WCAG 2.2 AA non text indicator threshold.

Accessibility: zero new violations introduced. Every motif, every
atmosphere sublayer, the signature, the page transition wipe, and the
nav seal dot are aria hidden. Every button gained an explicit type
attribute during Wave 8.

## What was deliberately not touched

The `BrandLockup` brand gradient flagged in Wave 0. It was held back
because the gradient is not the kind of move this pass speaks for; if
the founder wants the lockup itself revisited, that belongs in a
follow up brief with its own seijaku translation test.

The IP protective footer language across the case studies and the
legal surfaces. None of that copy was modified.

The screenshot captures across forty five frames. The capture plan is
written and stored at `design/SCREENSHOT_INDEX.md`. Running it against
the dev server is one more pass.

The two open Wave 8 verification items: home route LCP under live
Lighthouse, and contact form CLS during conditional field expansion.
Both are bounded; both want a headless browser.

## Next steps if the founder approves

Push the branch. Open a pull request from `visual/come-alive-pass` to
`main`. Deploy to a preview environment for the live Lighthouse and
axe pass. If the live numbers hold the substituted gate's verdict,
merge.
