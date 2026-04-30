import type { Config } from 'tailwindcss'

/*
  Kinyoubi-House web translation.

  Tokens are split into three groups:

  1. Static accents that never flip with the OS theme. These are the
     ink and paper used inside controls and on gold-bg buttons where
     the contrast pairing has to stay stable.

  2. Theme-flipping tokens. The hex stored here is just a fallback;
     the live value comes from the CSS custom properties defined in
     app/globals.css (see :root and the prefers-color-scheme media
     block). Tailwind's `<alpha-value>` machinery reads each token as
     `rgb(var(--name) / <alpha-value>)`, which means utilities like
     `text-text-primary/60` keep working transparently across themes.

  3. Legacy aliases preserved during the redesign so the codebase
     does not need a single sweeping rename. Each alias resolves to
     a current token. Once every reference is migrated they should
     be removed.
*/

const themed = (varName: string) => `rgb(var(${varName}) / <alpha-value>)`

const config: Config = {
  darkMode: 'media',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        /* Static — never flip. Use these where the contrast pairing
           is fixed by design (ink on gold buttons, paper on dark ink). */
        ink: '#111111',
        paper: '#FFFFFF',

        /* Theme-flipping. Fallback hex shown here matches the light
           palette; the dark palette lives in globals.css. */
        background: themed('--bg'),
        surface: themed('--surface'),
        hairline: themed('--hairline'),
        gold: themed('--gold'),
        'classification-red': themed('--red'),
        'text-primary': themed('--ink'),
        'text-secondary': themed('--ink-2'),
        'text-tertiary': themed('--ink-3'),

        /* Legacy aliases preserved during migration. Each resolves
           to a Kinyoubi-House token so existing classes keep working.

           `surface-dark` historically named a deep navy contrast
           panel. In the new identity there is no contrast panel,
           but call sites still want a section that sits slightly
           apart from the page. We map it to `surface`, which is
           pure white in light mode and a quietly elevated tone in
           dark mode. */
        'background-alt': themed('--surface'),
        'surface-card': themed('--surface'),
        'surface-dark': themed('--surface'),
        'text-on-dark': themed('--ink'),
        'gold-ink': themed('--gold'),
        'gold-bright': themed('--gold'),

        /* Legacy "navy" used to be the dirty-denim contrast colour
           (#142850). Retired by user direction. The token now flips
           with the theme: in light mode it resolves to ink, in dark
           mode it resolves to paper. Existing call sites read as a
           dark-on-light or light-on-dark accent that no longer
           depends on the offending denim shade. */
        navy: themed('--ink'),
        burgundy: themed('--gold'),
        cream: themed('--bg'),
        linen: themed('--bg'),

        /* Semantic. Errors and success messages hit a small audience
           on this site; keeping the legacy values is fine for now. */
        success: '#4A9E6D',
        error: '#C75050',
      },
      fontFamily: {
        /* System stack only. No web fonts. The serif primary follows
           Kinyoubi-House: Iowan Old Style on Apple devices, Charter
           on most modern browsers, Georgia as the broadest fallback. */
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'SF Pro Text',
          '"Helvetica Neue"',
          'Helvetica',
          'Arial',
          'sans-serif',
        ],
        heading: [
          '"Iowan Old Style"',
          'Charter',
          '"Charter BT"',
          'Georgia',
          '"Times New Roman"',
          'serif',
        ],
        serif: [
          '"Iowan Old Style"',
          'Charter',
          '"Charter BT"',
          'Georgia',
          '"Times New Roman"',
          'serif',
        ],
        mono: [
          '"SF Mono"',
          'Menlo',
          'Consolas',
          '"Liberation Mono"',
          'monospace',
        ],
      },
      fontSize: {
        'hero': ['4rem', { lineHeight: '1.08', letterSpacing: '-0.02em' }],
        'hero-sm': ['2.5rem', { lineHeight: '1.12', letterSpacing: '-0.015em' }],
        'display': ['3rem', { lineHeight: '1.12', letterSpacing: '-0.015em' }],
        'display-sm': ['2rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'section': ['1.5rem', { lineHeight: '1.3' }],
      },
      borderRadius: {
        'card': '8px',
      },
      boxShadow: {
        /* Web-native card depth. Ink-light still: shadows are
           visible enough to lift cards off the page surface so the
           site reads as interactive, not as a printed brochure, but
           the spread is small and the alpha low so the discipline
           holds. The dark-mode override in globals.css uses a
           lighter shadow (so cards feel elevated rather than
           recessed) at the same restrained intensity. */
        'card': '0 1px 2px rgb(17 17 17 / 0.05), 0 6px 14px rgb(17 17 17 / 0.04)',
        'card-hover': '0 2px 4px rgb(17 17 17 / 0.06), 0 12px 28px rgb(17 17 17 / 0.07)',
        'soft': '0 1px 3px rgb(17 17 17 / 0.04)',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
    },
  },
  plugins: [],
}

export default config
