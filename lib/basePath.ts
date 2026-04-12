/**
 * Asset path helper.
 *
 * Now hosted on Vercel at kinyoubiatelier.com — no subpath prefix
 * needed. This helper is kept as a no-op so existing imports don't
 * break, and it'll be useful again if you ever need a CDN prefix.
 */

export function asset(path: string): string {
  return path
}
