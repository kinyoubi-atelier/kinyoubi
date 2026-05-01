import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { BrushStrokeDivider } from '@/components/ui/BrushStrokeDivider'

const title = 'Fuzzy record linkage in Python: when rapidfuzz is enough'

// Meta description: utilitarian, keyword-aware, written for the SERP.
const description =
  'Python fuzzy matching and record linkage with rapidfuzz: normalise, block, match, audit. When the library is enough, when to reach for dedupe, recordlinkage, or Splink.'

// Sub-deck: written for the human reader, sits under the h1, calibrated
// to the body voice. Deliberately not the same string as the meta
// description: the SERP and the page header have different jobs.
const subdeck =
  'Most reconciliations need a normalisation pass and a string distance, not a machine-learning system. Until they don’t.'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/notes/python-fuzzy-record-linkage' },
  openGraph: {
    title,
    description,
    url: '/notes/python-fuzzy-record-linkage',
    type: 'article',
    publishedTime: '2026-05-01T00:00:00.000Z',
    authors: ['Ankit Sahu'],
  },
  twitter: { title, description },
}

function Section({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <section className="mb-14">
      <h2 className="font-heading text-2xl md:text-3xl text-text-primary tracking-tight mb-6 leading-snug">
        {heading}
      </h2>
      <div className="space-y-5 text-text-primary leading-relaxed">{children}</div>
    </section>
  )
}

const codeNormalise = `import re, unicodedata

_UNIT_SUFFIX = re.compile(
    r'\\b(road|rd|street|st|lane|ln|nagar|pur|colony)\\b',
    re.IGNORECASE,
)

def normalise(name: str) -> str:
    s = unicodedata.normalize('NFKD', str(name))
    s = s.encode('ascii', 'ignore').decode('ascii')
    s = s.lower().strip()
    s = re.sub(r'\\s+', ' ', s)
    s = _UNIT_SUFFIX.sub('', s).strip()
    return s
`

const codeMatch = `from rapidfuzz import fuzz, process

# block first: only compare names that share a postal code
for postal_code, group in df.groupby('postal_code'):
    names = group['locality'].map(normalise).tolist()
    for i, name in enumerate(names):
        match, score, j = process.extractOne(
            name, names[:i] + names[i+1:],
            scorer=fuzz.token_set_ratio,
        )
        if score >= 92:
            log_merge(group.iloc[i], group.iloc[j], score)
`

export default function PythonFuzzyRecordLinkagePage() {
  return (
    <article className="min-h-screen">
      {/* Header */}
      <header className="py-20 md:py-28 px-6 md:px-12 border-b border-text-primary/5">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/notes"
            className="text-sm text-gold hover:underline mb-6 inline-block"
          >
            ← Notes
          </Link>
          <p className="text-sm font-medium text-gold uppercase tracking-widest mb-4">
            Notes · Engineering view
          </p>
          <h1 className="font-heading text-hero-sm md:text-hero text-text-primary tracking-tight mb-6 leading-tight">
            {title}
          </h1>
          <p className="text-lg md:text-xl text-text-secondary leading-relaxed max-w-2xl">
            {subdeck}
          </p>
          <p className="text-sm text-text-tertiary mt-6">
            Published 1 May 2026 · Ankit Sahu
          </p>
        </div>
      </header>

      {/* Body */}
      <div className="py-16 md:py-24 px-6 md:px-12">
        <div className="max-w-3xl mx-auto">
          {/* Lead */}
          <div className="space-y-5 text-lg text-text-primary leading-relaxed mb-14">
            <p>
              Fuzzy record linkage in Python is one of those problems where
              the search results all look helpful and almost none of them
              are. Half of them point at a specific library (most often
              rapidfuzz, sometimes fuzzywuzzy, sometimes thefuzz). The
              other half point at a heavyweight machine-learning approach
              and ask you to label a thousand training pairs before you
              have done anything useful. The reason the field looks
              confused is that two different problems wear the same name.
            </p>
            <p>
              The first problem is the same entity written messily in two
              places. <em>Ramanagar</em> in 2014, <em>Raamnagar</em> in
              2017, <em>Rama Nagar</em> in 2021. Same village, three
              entries, three keys. The second problem is two different
              entities the system has decided are one. Two customers in
              the same building, with the same surname, sharing one
              loyalty record because the data-entry clerk reused the
              first match the auto-complete suggested. Both problems
              show up as &ldquo;duplicates&rdquo; in a report. They have
              almost nothing else in common.
            </p>
            <p>
              Most teams reach for the wrong tool because they have not
              separated the two flavours. The first wants normalisation
              and a string-distance score; rapidfuzz finishes the job in
              an afternoon. The second wants entity resolution with a
              human in the loop; rapidfuzz on its own will quietly make
              it worse. The piece below is the framework I use to
              decide which one I am looking at, and how far the cheap
              tool will actually take you.
            </p>
          </div>

          <Section heading="The pattern that works">
            <p>
              Whatever library you reach for, the shape of a working
              record-linkage pipeline is the same. Four steps, in this
              order. Skip a step and the next one inherits the failure.
            </p>
            <p>
              <strong className="text-text-primary">Normalise first.</strong>{' '}
              Lowercase, strip whitespace, ASCII-fold the diacritics,
              collapse runs of spaces, drop unit suffixes that the
              data-entry layer is inconsistent about (Road versus Rd,
              Street versus St, Lane versus Ln). The point is not to
              produce a pretty value; the point is to produce a value
              that two people typing the same place will both write the
              same way after the function runs. Most of the duplicates
              you think are fuzzy are not fuzzy at all once normalisation
              is honest.
            </p>
            <p>
              <strong className="text-text-primary">Block second.</strong>{' '}
              A naive all-pairs comparison is O(n^2). At ten thousand
              records that is a hundred million comparisons; at a hundred
              thousand it is ten billion and your laptop is no longer a
              participant. Blocking is the operation that says: only
              compare records that share a hash key. Postal code, year of
              entry, first three letters of surname, the first character
              of the normalised locality. The block key does not need to
              be perfect; it needs to partition the data into buckets
              small enough that comparing inside each bucket is cheap.
              That is what gets you from O(n^2) to roughly O(n).
            </p>
            <p>
              <strong className="text-text-primary">Match third.</strong>{' '}
              Inside each block, score every pair with a string-distance
              function and apply a threshold. Levenshtein for short
              strings, token-set ratio for multi-word strings where the
              order varies, partial ratio for substring containment. The
              threshold is the only parameter that matters and it is
              data-specific; pick it from a labelled sample of fifty
              pairs, not from a blog post.
            </p>
            <p>
              <strong className="text-text-primary">Audit fourth.</strong>{' '}
              Every merge writes a row to a log. Original keys, the
              canonical key it was merged into, the score, the policy
              (the threshold and the scorer name). Without the log you
              have a one-way operation. With the log you have an
              operation that a human can replay, override, or undo six
              months later when ground truth changes.
            </p>
          </Section>

          <Section heading="rapidfuzz, what it is and is not">
            <p>
              rapidfuzz is a fast, BSD-licensed Python implementation of
              the standard string-distance algorithms. Levenshtein,
              Damerau-Levenshtein, Jaro-Winkler, token-sort ratio,
              token-set ratio, partial ratio. The internals are C++ with
              SIMD where it helps, and the Python bindings are thin
              enough that you can comfortably score millions of pairs in
              a single-threaded script. It is correct, well-tested, and
              the API is small enough that a working import-to-output
              loop is forty lines.
            </p>
            <p>
              What rapidfuzz is not: it is not a record linkage system.
              It does not do active learning. It does not do blocking.
              It does not know anything about entities. It does not
              provide a framework for training a classifier on labelled
              pairs, or for combining multiple fields into a single
              probabilistic score. Every one of those is a real,
              well-defined problem with real, well-defined libraries
              behind it (dedupe.io, recordlinkage, Splink). They just
              are not the problem rapidfuzz solves.
            </p>
            <p>
              The reason this matters is that most reconciliations are
              normalisation problems wearing a fuzzy-matching hat. The
              data is dirty in three or four predictable ways: case,
              whitespace, suffix variants, transliteration drift. Once
              you have a normalisation function that handles those, the
              residue that genuinely needs a string-distance score is
              small, and rapidfuzz handles it without ceremony. The
              teams that bounce off rapidfuzz tend to have skipped the
              normalisation step, raised the threshold to compensate,
              and then complained that the matcher misses obvious
              duplicates.
            </p>
            <p>
              A short illustration. The function below is the kind of
              normaliser that does most of the work before the
              string-distance call ever runs.
            </p>
            <pre className="bg-surface-dark text-text-on-dark/90 rounded-card border border-text-primary/10 p-5 md:p-6 overflow-x-auto text-[12.5px] md:text-[13px] leading-relaxed font-mono my-2">
              <code>{codeNormalise}</code>
            </pre>
            <p>
              Run that across a column before the matcher sees it and
              the duplicate count typically drops by half. The remaining
              half is what rapidfuzz is for.
            </p>
          </Section>

          <Section heading="The archive-automation pattern, with numbers">
            <p>
              The case study below was the engagement that taught me
              this discipline. An LPG distributorship had accumulated a
              flat directory of roughly four thousand scanned KYC
              images, named only by an internal consumer number, and a
              parallel Excel sheet with the consumer record. Finding a
              single customer&rsquo;s file meant looking up the consumer
              number in the spreadsheet and then scrolling through
              thousands of identically named files on disk. For field
              staff working delivery areas with dozens of villages
              under each, the system was functionally unusable.
            </p>
            <p>
              The reconciliation step was straightforward: read the
              Excel, build a lookup keyed by consumer number, copy each
              image into a region/locality folder. The fuzzy step was
              the one that mattered. Ten years of manual data entry had
              produced more than a hundred fuzzy-duplicate locality
              names. <em>Market Street</em> and <em>Market Road</em>{' '}
              and <em>Marketpur</em> were the same village.{' '}
              <em>Ramanagar</em> entered by one operator and{' '}
              <em>Raamnagar</em> by another needed to collapse into a
              single folder. After the first naive sort the archive
              had 796 distinct region/locality folders; the actual
              number of localities was closer to 680.
            </p>
            <p>
              The matcher was rapidfuzz, blocked by region. Inside each
              region the locality names were normalised, scored
              pairwise with token-set ratio, and pairs above a
              data-specific threshold went into a merge candidate list.
              A human (me) walked the candidate list once, accepted or
              rejected each, and the accepted set produced a shell
              script that did the actual filesystem moves. The
              filesystem step was deliberately a separate stage,
              outside Python; <code className="text-sm text-gold bg-background-alt px-1.5 py-0.5 rounded border border-text-primary/10">mv</code>{' '}
              at the shell level is faster and more legible than the
              equivalent in <code className="text-sm text-gold bg-background-alt px-1.5 py-0.5 rounded border border-text-primary/10">shutil</code>.
            </p>
            <p>
              The numbers: 3,905 records reconciled against the
              spreadsheet, 116 fuzzy duplicates merged into canonical
              folders, 796 folders generated and then collapsed, around
              fourteen hours of manual triage replaced by a sub-minute
              idempotent re-run. The merge log captured every operation;
              a re-run after a quarterly data refresh touches only
              what changed.
            </p>
            <p>
              The matcher itself, with the blocking step inline, is
              roughly the shape below.
            </p>
            <pre className="bg-surface-dark text-text-on-dark/90 rounded-card border border-text-primary/10 p-5 md:p-6 overflow-x-auto text-[12.5px] md:text-[13px] leading-relaxed font-mono my-2">
              <code>{codeMatch}</code>
            </pre>
            <p>
              Three principles that paid for themselves. The pipeline is
              idempotent at every stage, so a re-run on partially
              processed data does not double-count or lose work.
              Deletions go through a log, not a direct call, so a wrong
              merge can be undone. The normalisation log and the match
              log live in separate files, because the failure modes are
              different and the audit answer for each is different.
            </p>
          </Section>

          <Section heading="When rapidfuzz is not enough">
            <p>
              The cheap pipeline stops being enough when the assumptions
              that made it cheap stop holding. Three signs are reliable.
            </p>
            <p>
              <strong className="text-text-primary">The blocking key is unstable.</strong>{' '}
              You do not have a high-cardinality field that reliably
              partitions records into small buckets. Postal codes are
              missing for a third of rows; surnames are entered with
              honorifics half the time; year of entry is a free-text
              field. Without a blocking key, the all-pairs comparison
              comes back, and a hand-rolled script does not scale to it.
              At this point a tool that does blocking for you (Splink,
              recordlinkage) earns its complexity.
            </p>
            <p>
              <strong className="text-text-primary">Ground truth is unclear.</strong>{' '}
              Humans disagree on whether two records are the same
              entity. The disagreement is not noise; it is the
              definition shifting under you. A merger of two corporate
              entities last quarter means rows that used to be distinct
              are now the same legal customer. A divorce means one
              record needs to split into two. When the disagreement
              rate on a labelled sample crosses around fifteen percent,
              you are no longer doing string matching; you are doing
              policy, and policy needs an active-learning loop.
              dedupe.io is built for exactly this case.
            </p>
            <p>
              <strong className="text-text-primary">Data shape changes quarterly.</strong>{' '}
              The schema drifts. New fields appear. Old fields get
              repurposed. The matcher you wrote in March is matching on
              a field that means something different in June. At this
              point you want a framework where the matching logic is
              declarative and versioned, not a script. Splink, modern
              and Spark-scaled, is the heavier tool for this end of
              the spectrum; it brings probabilistic matching and a
              proper model registry, at the cost of a Spark cluster
              between you and your data.
            </p>
            <p>
              Each of those three tools (dedupe.io, recordlinkage,
              Splink) adds genuine power. Each also adds operational
              complexity: a training step, a model file, a runtime
              dependency, an explanation surface. The decision is not
              &ldquo;which library is best.&rdquo; It is &ldquo;has the
              cheap pipeline broken yet, and on which axis.&rdquo;
            </p>
          </Section>

          <Section heading="The deduplication trap">
            <p>
              The thing nobody tells you about dedup is that it
              destroys information. Two rows go in, one row comes out.
              Whatever the discarded row knew that the canonical row
              did not, you have lost. A correction six months later
              that says &ldquo;actually those were two different
              customers&rdquo; cannot be applied, because the row that
              would have to come back is gone.
            </p>
            <p>
              The discipline is non-negotiable. Every merge writes to
              a log before the merge happens. The log entry has the
              original keys (both of them), the canonical key after
              the merge, the score the matcher returned, and the
              policy under which the merge fired (the scorer name and
              the threshold). The log is append-only. The log is in a
              separate file from the data, because the data will get
              restored from a backup at some point and you do not want
              your audit trail to come back with it.
            </p>
            <p>
              With a complete log, a future ground-truth correction is
              a replayable operation: walk the log backwards, undo the
              merges flagged by the correction, re-apply the rest. No
              log means no correction. No correction means the wrong
              merges are permanent and the policy that produced them
              cannot be tested. The cost of the log is one row per
              merge; the cost of not having it is the entire dedup
              run becoming irreversible.
            </p>
            <p>
              The same discipline applies to deletions. A deletion is
              a merge with one side empty; it deserves the same log,
              for the same reason.
            </p>
          </Section>

          <Section heading="Closing">
            <p>
              The reason most fuzzy-matching pain feels disproportionate
              to the bug list in front of you is that the bug is not
              the bug. The bug is unfinished schema design from two
              years earlier. The locality field that should have been a
              foreign key into a master table was a free-text box. The
              consumer record that should have had a stable canonical
              identifier was keyed off a name and a date. The clerk
              who entered <em>Raamnagar</em> in 2017 was not making a
              fuzzy match problem; the system was, by accepting
              <em> Raamnagar</em> as a new value instead of asking
              whether the operator meant <em>Ramanagar</em>.
            </p>
            <p>
              rapidfuzz is good at retroactive rescue. It is not a
              substitute for designing the column properly the first
              time. The cheapest fuzzy match is the one you do not
              have to do, because the data layer never let the
              ambiguity in.
            </p>
          </Section>

          {/* Cross-link to archive-automation */}
          <div className="mt-16 mb-10">
            <Link
              href="/work/archive-automation"
              className="group block card-hover-lift rounded-card border border-text-primary/5 hover:border-gold/25 bg-background-alt shadow-card p-6 md:p-8"
            >
              <p className="text-xs text-text-tertiary uppercase tracking-widest mb-2">
                Companion case study · Python automation
              </p>
              <h3 className="font-heading text-xl md:text-2xl text-text-primary tracking-tight mb-2">
                Reconciling a 4,000-record consumer archive
              </h3>
              <p className="text-text-secondary leading-relaxed mb-4">
                An LPG distributorship reconciliation pipeline. 3,905
                records reconciled, 116 fuzzy duplicates merged, around
                fourteen hours of manual triage replaced by a
                sub-minute idempotent re-run. The architectural depth
                this piece skipped, with code.
              </p>
              <span className="text-sm font-medium text-gold group-hover:underline inline-flex items-center gap-1.5">
                Read the case study
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          </div>

          <BrushStrokeDivider variant={1} className="my-12 opacity-60" />

          {/* Closing note */}
          <div className="text-sm text-text-tertiary leading-relaxed border-l border-gold/30 pl-4 italic">
            Library notes are deliberately at the level of fit, not
            feature-by-feature comparison. Library APIs, default
            scorers, and recommended thresholds change with releases;
            this piece is meant to outlive the next minor version. For
            a current evaluation against your own dataset and
            constraint shape, write to the studio.
          </div>

          {/* CTA */}
          <div className="mt-16 pt-10 border-t border-text-primary/5">
            <p className="text-sm font-medium text-gold uppercase tracking-widest mb-3">
              Have a reconciliation problem shaped like this?
            </p>
            <h3 className="font-heading text-2xl md:text-3xl text-text-primary tracking-tight mb-4">
              Start a conversation.
            </h3>
            <p className="text-text-secondary leading-relaxed mb-6 max-w-xl">
              We respond within 48 business-day hours with a sketch of
              where your data sits on the framework above and what the
              cheap pipeline would cost in engineering time before
              anything heavier is justified.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-sm font-medium text-gold hover:underline"
            >
              Tell us about your project
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}
