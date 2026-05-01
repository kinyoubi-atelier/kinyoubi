export const SITE = {
  name: 'Kinyoubi Atelier & Co.',
  tagline: 'Software that ships. Complexity, handled.',
  description: 'Software development, technical consulting, and regulatory research. Delivered with precision and speed.',
  url: 'https://kinyoubiatelier.com',
  email: 'ankit@kinyoubiatelier.com',
  founder: 'Ankit Sahu',
  copyright: `© ${new Date().getFullYear()} Kinyoubi Atelier & Co. All rights reserved.`,
} as const

// Nav labels are boutique register, not SaaS register. URLs are kept on
// the conventional slugs (/about, /services, /capabilities, /contact) so
// search-engine titles, deep links from emails, and existing inbound
// references continue to resolve. Visitors see Studio / Practice / Method
// / Commission. Search engines see the page metadata as published.
export const NAV_LINKS = [
  { label: 'Studio', href: '/about' },
  { label: 'Practice', href: '/services' },
  { label: 'Work', href: '/work' },
  { label: 'Method', href: '/capabilities' },
  { label: 'Notes', href: '/notes' },
  { label: 'Commission', href: '/contact' },
] as const

export const LEGAL_LINKS = [
  { label: 'Terms of Use', href: '/legal/terms' },
  { label: 'Privacy Policy', href: '/legal/privacy' },
  { label: 'Security', href: '/security' },
  { label: 'DPA', href: '/legal/dpa' },
  { label: 'MSA', href: '/legal/msa' },
  { label: 'Copyright', href: '/legal/copyright' },
  { label: 'Email Compliance', href: '/compliance' },
] as const
