/*
  Kinyoubi-House web translation: system font stack only.

  No web fonts, no @import, no CDN references. Type discipline comes
  from the cascade declared in tailwind.config.ts. This file is kept
  as a thin export surface so layout.tsx can stay structurally close
  to its previous form during the migration; it returns an object
  with no className contributions, which means the <html> element
  no longer receives font CSS variables that nothing references.
*/

export const fontStackClassName = ''
