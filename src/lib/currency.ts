// Showing MatjarX's prices in the reader's own currency.
//
// ── What this deliberately does NOT do ──────────────────────────────────
//
// It does not redirect anyone, and it does not change a URL. Currency is a
// display choice layered on top of the page, never a different page.
//
// Server-side IP detection was the obvious approach and is the wrong one
// here. It varies the HTML per visitor, which breaks full-page caching on a
// mostly-static site, and Googlebot crawls predominantly from US addresses --
// so the version Google indexed would quietly become the dollar one. Locking
// a crawler into one variant is the single most common way international SEO
// gets wrecked, and it is not worth risking to save a click.
//
// The visitor's own time zone is used instead. It comes from the browser,
// after the page is cached and served, so every visitor and every crawler
// gets the same HTML; it is a good proxy for where someone actually is; and
// it costs no geolocation service. A VPN or an unusual setting just means the
// selector is one click away.
//
// PKR remains the real price everywhere. Converted figures are labelled
// approximate and are never written into structured data -- a priceCurrency
// that changes per visitor would make our own schema unstable between crawls.

export type CurrencyCode = 'PKR' | 'AED' | 'SAR' | 'USD' | 'GBP' | 'EUR'

export const BASE_CURRENCY: CurrencyCode = 'PKR'

export const CURRENCIES: { code: CurrencyCode; label: string; symbol: string }[] = [
  { code: 'PKR', label: 'Pakistan (PKR)', symbol: 'Rs.' },
  { code: 'AED', label: 'UAE (AED)', symbol: 'AED' },
  { code: 'SAR', label: 'Saudi Arabia (SAR)', symbol: 'SAR' },
  { code: 'USD', label: 'United States (USD)', symbol: '$' },
  { code: 'GBP', label: 'United Kingdom (GBP)', symbol: '£' },
  { code: 'EUR', label: 'Europe (EUR)', symbol: '€' },
]

/**
 * Rates as of the last time the bundled copy was refreshed, used only when
 * the live API is unreachable.
 *
 * Kept because a converter that shows nothing on a bad network day is worse
 * than one showing a figure a few percent out -- these are already labelled
 * approximate, and nobody is billed from them. They are the reason the widget
 * can render immediately rather than after a round trip.
 */
export const FALLBACK_RATES: Record<CurrencyCode, number> = {
  PKR: 1,
  AED: 0.013267,
  SAR: 0.013547,
  USD: 0.003612,
  GBP: 0.002729,
  EUR: 0.003183,
}

/**
 * Time zone to currency.
 *
 * Only zones worth distinguishing are listed: the Gulf markets MatjarX
 * actually sells into, plus the two English-speaking markets its diaspora
 * customers sit in. Everything unlisted falls back to PKR, which is the
 * right default for a Pakistani business and the currency actually charged.
 */
const ZONE_CURRENCY: Record<string, CurrencyCode> = {
  'Asia/Karachi': 'PKR',
  'Asia/Dubai': 'AED',
  'Asia/Muscat': 'AED',
  'Asia/Riyadh': 'SAR',
  'Asia/Qatar': 'SAR',
  'Asia/Bahrain': 'SAR',
  'Asia/Kuwait': 'SAR',
  'Europe/London': 'GBP',
  'America/New_York': 'USD',
  'America/Chicago': 'USD',
  'America/Denver': 'USD',
  'America/Los_Angeles': 'USD',
  'America/Toronto': 'USD',
}

/** Best guess from the browser, never from the server. PKR when unsure. */
export function detectCurrency(): CurrencyCode {
  try {
    const zone = Intl.DateTimeFormat().resolvedOptions().timeZone
    if (zone && ZONE_CURRENCY[zone]) return ZONE_CURRENCY[zone]
    // A zone we do not list still tells us the continent, which is enough to
    // avoid showing rupees to someone in Frankfurt.
    if (zone?.startsWith('Europe/')) return 'EUR'
    if (zone?.startsWith('America/')) return 'USD'
  } catch {
    // Intl can throw in locked-down environments; PKR is the safe answer.
  }
  return 'PKR'
}

/**
 * "Rs. 22,500" -> 22500. Returns null for the prices that are not numbers,
 * like Custom's "Let's talk" -- those must keep reading as words rather than
 * being converted into a figure nobody quoted.
 */
export function parsePkr(price: string): number | null {
  // Matches the first number rather than stripping non-digits, because
  // stripping keeps the full stop in "Rs." -- "Rs. 4,500" became ".4500",
  // i.e. 0.45, and every converted price in the footer rendered as "AED 1".
  const match = price.match(/\d[\d,]*(?:\.\d+)?/)
  if (!match) return null
  const value = Number(match[0].replace(/,/g, ''))
  return Number.isFinite(value) && value > 0 ? value : null
}

/**
 * Converted and rounded to something a person would say.
 *
 * Rounded UP to a whole unit (and to the nearest 5 above 100) on purpose: an
 * approximate price that lands under the real one reads as a quote, and the
 * first thing it would do is disappoint someone at checkout.
 */
export function convert(pkr: number, rate: number): number {
  const raw = pkr * rate
  if (raw >= 100) return Math.ceil(raw / 5) * 5
  return Math.ceil(raw)
}

export function formatCurrency(amount: number, code: CurrencyCode): string {
  const symbol = CURRENCIES.find((c) => c.code === code)?.symbol || code
  const formatted = amount.toLocaleString('en-US')
  // Rs. and the three-letter codes read better before a space; the glyph
  // currencies do not take one.
  return /^[A-Za-z.]+$/.test(symbol) ? `${symbol} ${formatted}` : `${symbol}${formatted}`
}
