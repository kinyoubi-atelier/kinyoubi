import { SITE } from './constants'

/**
 * Per-page JSON-LD builders for Article and BreadcrumbList schemas.
 * The site-wide Organization, ProfessionalService, and WebSite schemas
 * are rendered globally from app/structured-data.tsx; this file is for
 * the per-page additions that earn rich SERP treatment for individual
 * articles and section pages.
 */

export type ArticleSchemaInput = {
  /** Path beginning with /, e.g. "/notes/dpdp-for-saas-builders". */
  url: string
  /** The page's primary headline. Usually the same as the metadata title. */
  headline: string
  /** Short description, usually the same as the metadata description. */
  description: string
  /** ISO 8601, e.g. "2026-05-01T00:00:00.000Z". */
  datePublished: string
  /** ISO 8601. Defaults to datePublished if absent. */
  dateModified?: string
  /** schema.org subtype. Defaults to TechArticle for engineering content. */
  type?: 'Article' | 'TechArticle' | 'BlogPosting'
  /** Author name. Defaults to SITE.founder. */
  author?: string
  /** Image URL or path. Defaults to the site's OG image. */
  image?: string
}

export function buildArticleSchema(input: ArticleSchemaInput) {
  const author = input.author ?? SITE.founder
  const image = input.image
    ? input.image.startsWith('http')
      ? input.image
      : `${SITE.url}${input.image}`
    : `${SITE.url}/og-image.png`

  return {
    '@context': 'https://schema.org',
    '@type': input.type ?? 'TechArticle',
    headline: input.headline,
    description: input.description,
    datePublished: input.datePublished,
    dateModified: input.dateModified ?? input.datePublished,
    author: {
      '@type': 'Person',
      name: author,
      url: SITE.url,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE.name,
      url: SITE.url,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE.url}/logos/logo-transparent.svg`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE.url}${input.url}`,
    },
    image,
  }
}

export type BreadcrumbItem = {
  name: string
  /** Path beginning with /, e.g. "/notes". */
  url: string
}

export function buildBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE.url}${item.url}`,
    })),
  }
}
