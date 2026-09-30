// Exchange rates for the footer's currency converter.
//
// Proxied through our own origin rather than called from the browser for
// three reasons: the upstream is fetched once per day for everyone instead of
// once per visitor, a third party never sees our readers' IPs, and the
// response is ours to cache.
//
// Never fails the caller. A converter that shows nothing on a bad network day
// is worse than one showing a figure a few percent out -- the numbers are
// labelled approximate and nobody is billed from them -- so an upstream
// outage falls back to the bundled rates and says so in `stale`.

import { NextResponse } from 'next/server'
import { BASE_CURRENCY, FALLBACK_RATES, type CurrencyCode } from '@/lib/currency'

// Rates move slowly enough that a day is plenty, and it keeps us far inside
// any free tier no matter how much traffic the footer sees.
export const revalidate = 86400

const UPSTREAM = `https://open.er-api.com/v6/latest/${BASE_CURRENCY}`

export async function GET() {
  try {
    const res = await fetch(UPSTREAM, { next: { revalidate } })
    if (!res.ok) throw new Error(`upstream ${res.status}`)
    const data = await res.json()
    if (data?.result !== 'success' || !data?.rates) throw new Error('unexpected payload')

    // Only the currencies actually offered, so a change upstream cannot add
    // a currency the UI has no label or symbol for.
    const rates: Partial<Record<CurrencyCode, number>> = {}
    for (const code of Object.keys(FALLBACK_RATES) as CurrencyCode[]) {
      const value = data.rates[code]
      if (typeof value === 'number' && value > 0) rates[code] = value
    }
    rates.PKR = 1

    return NextResponse.json({ base: BASE_CURRENCY, rates, updated: data.time_last_update_utc ?? null, stale: false })
  } catch {
    return NextResponse.json({ base: BASE_CURRENCY, rates: FALLBACK_RATES, updated: null, stale: true })
  }
}
