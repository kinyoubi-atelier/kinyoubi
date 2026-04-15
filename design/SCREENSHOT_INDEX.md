# Screenshot Index — Wave 9

## Status

Captures pending. The integration environment did not have a running
preview server attached at branch close. The plan below stands as the
capture script for whoever runs the dev server next; nothing here is
fabricated.

## Capture plan

Three viewports per route. The 360 capture stands in for handheld, the
768 capture for tablet, the 1440 capture for laptop. Captures are taken
against `npm run dev` on the default port. Pages are scrolled to the
top before each capture; long pages are captured at the fold.

### Routes, fourteen each at three viewports

| Route                          | 360 | 768 | 1440 |
| ------------------------------ | --- | --- | ---- |
| /                              | pending | pending | pending |
| /about                         | pending | pending | pending |
| /services                      | pending | pending | pending |
| /capabilities                  | pending | pending | pending |
| /security                      | pending | pending | pending |
| /work                          | pending | pending | pending |
| /work/timetable-engine         | pending | pending | pending |
| /work/bfsi-mis                 | pending | pending | pending |
| /work/archive-automation       | pending | pending | pending |
| /contact                       | pending | pending | pending |
| /compliance                    | pending | pending | pending |
| /legal/terms                   | pending | pending | pending |
| /legal/privacy                 | pending | pending | pending |
| /legal/copyright               | pending | pending | pending |
| /legal/dpa                     | pending | pending | pending |
| /legal/msa                     | pending | pending | pending |

### Reduced motion captures, three at 1440

| Route                          | reduced motion at 1440 |
| ------------------------------ | ---------------------- |
| /                              | pending |
| /work/archive-automation       | pending |
| /contact                       | pending |

## Before captures

The visual come alive pass landed directly on the working tree, so a
clean before capture against the same files was not available at branch
time. Four routes carry enough signal that a description from the prior
file content stands in.

### Home, before

A static hero with the wordmark, the headline, and the CTA. No
respiration on the gold half of the headline. No drawn underline. No
scroll cue at the bottom of the hero. The tech stack grid below the
hero was a static block, no opacity stagger. The lower right corner
was empty.

### Archive Automation case study, before

The hero opened on the back link, the case study tag, the heading, the
lede, and the four metric strip. No left margin hairline. No watermark
in the lower right corner. The page read the same as the other two
case studies at silhouette distance.

### Services, before

A hero, a section per service with the standard reveal, no per surface
gesture in the chrome. The page read as a list of services with a
single rhythm.

### Contact, before

A hero, a project estimator with an entry transition, the form. No
considered still on reduced motion for the form steps; the steps
crossfaded with the same translate as everywhere else.

## How to run the captures

The site runs on `npm run dev` from the project root. Each route loads
in a few hundred milliseconds; the home and case studies need a brief
hold for the enso to settle and the breathing group to land. For the
reduced motion captures, set the operating system motion preference to
reduced before opening the route, or emulate it in dev tools.

When the captures land, this index is the manifest. Replace each
"pending" cell with a relative path to the file under
`design/screenshots/` and the index becomes the record.
