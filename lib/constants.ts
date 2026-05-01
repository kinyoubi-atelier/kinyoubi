export const SITE = {
  name: 'Kinyoubi Atelier & Co.',
  tagline: 'Software that ships. Complexity, handled.',
  description: 'Software development, technical consulting, and regulatory research. Delivered with precision and speed.',
  url: 'https://kinyoubiatelier.com',
  email: 'ankit@kinyoubiatelier.com',
  founder: 'Ankit Sahu',
  copyright: `© ${new Date().getFullYear()} Kinyoubi Atelier & Co. All rights reserved.`,
} as const

export const NAV_LINKS = [
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Work', href: '/work' },
  { label: 'Capabilities', href: '/capabilities' },
  { label: 'Contact', href: '/contact' },
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
