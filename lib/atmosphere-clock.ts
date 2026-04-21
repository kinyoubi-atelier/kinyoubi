/**
 * Atmosphere Clock
 *
 * Seijaku purpose
 * The room shifts with the visitor's local hour and season. A visitor at
 * nine in the morning in Toronto sees a cooler, higher light than a visitor
 * at nine at night in Sydney. The move is subtle and uses only the browser's
 * timezone, never the IP, so the studio stays honest about privacy.
 *
 * Contract
 *   a) Location inference is timezone only. IANA string via
 *      Intl.DateTimeFormat().resolvedOptions().timeZone. No network, no
 *      third party service, no IP lookup.
 *   b) Time of day modulates the light wash warmth and direction and the
 *      overall atmosphere dim factor. Never the signature object position.
 *   c) Season modulates the enso tilt and the vignette opacity. Both are
 *      orthogonal to the time of day variables so they never interfere.
 *   d) Reduced motion and reduced data are honoured at the CSS layer via
 *      the existing --atmosphere-opacity hook, which multiplies against
 *      the new --atmosphere-time-dim. No extra logic in this file.
 */

type Hemisphere = 'north' | 'south'
type Climate = 'temperate' | 'monsoon'
export type Season =
  | 'spring'
  | 'summer'
  | 'autumn'
  | 'winter'
  | 'pre-monsoon'
  | 'monsoon'
  | 'post-monsoon'

/** Timezones in the southern hemisphere. Not exhaustive, but covers the
 *  populated landmasses. Anything not matched here defaults to northern. */
const SOUTHERN_TZ_PREFIXES: readonly string[] = [
  'Australia/',
  'Pacific/',
  'Antarctica/',
  'Indian/',
]

const SOUTHERN_TZ_EXACT: ReadonlySet<string> = new Set([
  'America/Argentina/Buenos_Aires',
  'America/Argentina/Cordoba',
  'America/Argentina/Salta',
  'America/Argentina/Jujuy',
  'America/Argentina/Tucuman',
  'America/Argentina/Catamarca',
  'America/Argentina/La_Rioja',
  'America/Argentina/San_Juan',
  'America/Argentina/Mendoza',
  'America/Argentina/San_Luis',
  'America/Argentina/Rio_Gallegos',
  'America/Argentina/Ushuaia',
  'America/Asuncion',
  'America/Bogota',
  'America/Campo_Grande',
  'America/Cuiaba',
  'America/Guayaquil',
  'America/La_Paz',
  'America/Lima',
  'America/Montevideo',
  'America/Noronha',
  'America/Punta_Arenas',
  'America/Santiago',
  'America/Sao_Paulo',
  'America/Recife',
  'America/Bahia',
  'America/Fortaleza',
  'America/Quito',
  'Atlantic/Stanley',
  'Africa/Johannesburg',
  'Africa/Harare',
  'Africa/Maputo',
  'Africa/Lusaka',
  'Africa/Windhoek',
  'Africa/Gaborone',
  'Africa/Maseru',
  'Africa/Mbabane',
  'Africa/Luanda',
  'Africa/Kinshasa',
  'Africa/Lubumbashi',
  'Africa/Dar_es_Salaam',
  'Africa/Nairobi',
])

/** Monsoon climate timezones: the South Asian and Southeast Asian belt
 *  that runs on a four phase pre monsoon, monsoon, post monsoon, winter
 *  cycle rather than four temperate seasons. */
const MONSOON_TZ: ReadonlySet<string> = new Set([
  'Asia/Kolkata',
  'Asia/Calcutta',
  'Asia/Dhaka',
  'Asia/Dacca',
  'Asia/Kathmandu',
  'Asia/Colombo',
  'Asia/Karachi',
  'Asia/Yangon',
  'Asia/Rangoon',
  'Asia/Bangkok',
  'Asia/Ho_Chi_Minh',
  'Asia/Saigon',
  'Asia/Phnom_Penh',
  'Asia/Vientiane',
  'Asia/Manila',
  'Asia/Jakarta',
  'Asia/Makassar',
  'Asia/Jayapura',
  'Asia/Pontianak',
  'Asia/Singapore',
  'Asia/Kuala_Lumpur',
  'Asia/Kuching',
  'Asia/Brunei',
])

export function detectHemisphere(tz: string): Hemisphere {
  if (SOUTHERN_TZ_EXACT.has(tz)) return 'south'
  for (const prefix of SOUTHERN_TZ_PREFIXES) {
    if (tz.startsWith(prefix)) return 'south'
  }
  return 'north'
}

export function detectClimate(tz: string): Climate {
  return MONSOON_TZ.has(tz) ? 'monsoon' : 'temperate'
}

/** Determine the visitor's local season from their timezone and date. */
export function detectSeason(tz: string, localDate: Date): Season {
  const month = localDate.getMonth() + 1 // 1 through 12
  const climate = detectClimate(tz)

  if (climate === 'monsoon') {
    if (month >= 3 && month <= 5) return 'pre-monsoon'
    if (month >= 6 && month <= 9) return 'monsoon'
    if (month >= 10 && month <= 11) return 'post-monsoon'
    return 'winter'
  }

  const hemisphere = detectHemisphere(tz)
  // Southern hemisphere seasons are offset by six months.
  const effectiveMonth = hemisphere === 'south' ? ((month + 5) % 12) + 1 : month
  if (effectiveMonth >= 3 && effectiveMonth <= 5) return 'spring'
  if (effectiveMonth >= 6 && effectiveMonth <= 8) return 'summer'
  if (effectiveMonth >= 9 && effectiveMonth <= 11) return 'autumn'
  return 'winter'
}

/** Linear interpolation between two values. */
function lerp(fraction: number, from: number, to: number): number {
  return from + (to - from) * fraction
}

interface TimeOfDayAnchor {
  h: number
  x: number
  y: number
  dim: number
  hue: number
}

/** Seven anchor points across the day, interpolated linearly.
 *  x, y are gradient centre percentages in the viewport. dim is the
 *  atmosphere multiplier (one is full, smaller is dimmer). hue is the
 *  warmth hue shift in degrees, negative is cooler. */
const DAY_ANCHORS: readonly TimeOfDayAnchor[] = [
  { h: 3, x: 20, y: 80, dim: 0.5, hue: -5 },
  { h: 6, x: 25, y: 20, dim: 0.75, hue: -10 },
  { h: 9, x: 50, y: 18, dim: 1.0, hue: -5 },
  { h: 12, x: 78, y: 22, dim: 1.0, hue: 0 },
  { h: 16, x: 85, y: 35, dim: 1.0, hue: 5 },
  { h: 19, x: 90, y: 65, dim: 0.9, hue: 12 },
  { h: 22, x: 50, y: 85, dim: 0.6, hue: 5 },
]

interface TimeOfDayVars {
  lightX: number
  lightY: number
  atmosphereTimeDim: number
  warmthHueShift: number
}

/** Interpolate the time of day variables for a given local hour.
 *  Wraps cleanly across midnight. */
export function timeOfDayVars(localHour: number): TimeOfDayVars {
  const h = ((localHour % 24) + 24) % 24
  let before = DAY_ANCHORS[DAY_ANCHORS.length - 1]
  let after = DAY_ANCHORS[0]
  let beforeH = before.h - 24
  let afterH = after.h

  for (let i = 0; i < DAY_ANCHORS.length; i++) {
    if (DAY_ANCHORS[i].h <= h) {
      before = DAY_ANCHORS[i]
      beforeH = before.h
      after = DAY_ANCHORS[(i + 1) % DAY_ANCHORS.length]
      afterH = after.h > before.h ? after.h : after.h + 24
    } else {
      break
    }
  }

  const range = afterH - beforeH
  const fraction = range > 0 ? (h - beforeH) / range : 0

  return {
    lightX: lerp(fraction, before.x, after.x),
    lightY: lerp(fraction, before.y, after.y),
    atmosphereTimeDim: lerp(fraction, before.dim, after.dim),
    warmthHueShift: lerp(fraction, before.hue, after.hue),
  }
}

interface SeasonVars {
  /** Enso tilt in degrees. Positive clockwise. */
  tilt: number
  /** Vignette opacity multiplier. Higher means a firmer hold. */
  vignetteFactor: number
}

/** Map a season to the two reserved micro variations: enso tilt and
 *  vignette opacity factor. Both modulate variables that the time of day
 *  clock does not touch, so the two axes never interfere. */
export function seasonVars(season: Season): SeasonVars {
  switch (season) {
    case 'spring':
      return { tilt: 0, vignetteFactor: 1.0 }
    case 'summer':
      return { tilt: 1, vignetteFactor: 0.9 }
    case 'autumn':
      return { tilt: 0, vignetteFactor: 1.0 }
    case 'winter':
      return { tilt: -1, vignetteFactor: 1.1 }
    case 'pre-monsoon':
      return { tilt: 1, vignetteFactor: 0.9 }
    case 'monsoon':
      return { tilt: -1, vignetteFactor: 1.1 }
    case 'post-monsoon':
      return { tilt: 0, vignetteFactor: 1.0 }
  }
}

export interface AtmosphereVars {
  lightX: string
  lightY: string
  lightWashColor: string
  atmosphereTimeDim: string
  signatureTilt: string
  vignetteOpacity: string
  /** Diagnostic metadata, useful for tests and inspection. Not set into CSS. */
  meta: {
    tz: string
    localHour: number
    season: Season
    hemisphere: Hemisphere
    climate: Climate
  }
}

const BASE_VIGNETTE_OPACITY = 0.08
const BASE_WARMTH_HUE = 40
const HUE_MIN = 20
const HUE_MAX = 60

/** Compute every CSS custom property the clock should set, given a
 *  timezone and a reference date. Pure, deterministic, safe to call on
 *  server and on client. */
export function computeAtmosphereVars(tz: string, now: Date): AtmosphereVars {
  const hour = now.getHours() + now.getMinutes() / 60
  const season = detectSeason(tz, now)
  const tod = timeOfDayVars(hour)
  const sv = seasonVars(season)

  const hue = Math.min(HUE_MAX, Math.max(HUE_MIN, BASE_WARMTH_HUE + tod.warmthHueShift))
  const vignette = BASE_VIGNETTE_OPACITY * sv.vignetteFactor

  return {
    lightX: `${tod.lightX.toFixed(1)}%`,
    lightY: `${tod.lightY.toFixed(1)}%`,
    lightWashColor: `hsl(${hue.toFixed(1)}, 22%, 96%)`,
    atmosphereTimeDim: tod.atmosphereTimeDim.toFixed(3),
    signatureTilt: `${sv.tilt}deg`,
    vignetteOpacity: vignette.toFixed(4),
    meta: {
      tz,
      localHour: hour,
      season,
      hemisphere: detectHemisphere(tz),
      climate: detectClimate(tz),
    },
  }
}
