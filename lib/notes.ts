/**
 * Single source of truth for the /notes editorial surface. Both the
 * /notes index and the home-page "From the studio" section read from
 * this list. Add new pieces at the top so the home page surfaces the
 * latest three by slicing.
 */

export type Note = {
  slug: string
  title: string
  blurb: string
  date: string
  topic: string
}

export const notes: Note[] = [
  {
    slug: 'postgres-rls-multitenant',
    title: 'Multi-tenant Postgres with Row-Level Security: a working pattern',
    blurb:
      'RLS is one SQL clause and three operational disciplines. Skip a discipline and the clause stops protecting you.',
    date: '1 May 2026',
    topic: 'Postgres · Multi-tenant · RLS',
  },
  {
    slug: 'python-fuzzy-record-linkage',
    title: 'Fuzzy record linkage in Python: when rapidfuzz is enough',
    blurb:
      'Most reconciliations need a normalisation pass and a string distance, not a machine-learning system. Until they don’t.',
    date: '1 May 2026',
    topic: 'Python · Fuzzy matching · Record linkage',
  },
  {
    slug: 'or-tools-vs-fet-comparison',
    title: 'OR-Tools vs FET vs commercial timetabling: an honest comparison',
    blurb:
      'Three legitimate tools for the same problem. Picking the wrong one is the kind of unfinished decision that compounds for years.',
    date: '1 May 2026',
    topic: 'Constraint solvers · Build vs buy',
  },
  {
    slug: 'dpdp-for-saas-builders',
    title: 'DPDP for SaaS builders: where the Act meets the schema',
    blurb:
      'The architect’s reading of DPDP, not the buyer’s. Written for the schema design step, where the obligations actually have to land.',
    date: '1 May 2026',
    topic: 'Regulated SaaS · DPDP',
  },
]
