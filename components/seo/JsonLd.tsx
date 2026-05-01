/**
 * Renders a single application/ld+json script tag. Use one component
 * per schema (Article, BreadcrumbList, etc.); separate scripts are
 * easier for Google's Rich Results test to parse than a stuffed array.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
