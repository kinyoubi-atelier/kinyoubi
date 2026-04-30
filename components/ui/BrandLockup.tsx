/*
  BrandLockup is a transitional alias. The canonical identity is
  the Wordmark component at './Wordmark'. This file exists so the
  redesign does not require updating every import site in one go;
  existing `import { BrandLockup } from '@/components/ui/BrandLockup'`
  statements continue to resolve, now to the new typographic wordmark
  with no kanji and no brand-gradient.
*/
export { BrandLockup, Wordmark } from './Wordmark'
