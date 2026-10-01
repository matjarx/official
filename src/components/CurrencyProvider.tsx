'use client'

// One currency choice, shared by everything that shows a price.
//
// The footer selector used to convert only its own little list, which is why
// picking AED there left the pricing page in rupees -- the two knew nothing
// about each other. The choice belongs above both: the footer sets it, and
// any component showing a price reads it.
//
// See lib/currency.ts for why the initial guess comes from the browser's time
// zone rather than the visitor's IP.

import { createContext, useCallback, useContext, useEffect, useMemo, useState, useSyncExternalStore } from 'react'
import { CURRENCIES, FALLBACK_RATES, convert, detectCurrency, formatCurrency, parsePkr, type CurrencyCode } from '@/lib/currency'

const STORAGE_KEY = 'matjarx:currency'

// Read through useSyncExternalStore rather than set from an effect: both
// localStorage and the time zone live outside React and neither exists on the
// server, so this returns the server snapshot during render and hydration and
// the real one straight after, with no mismatch. Cached because a snapshot
// getter must return a stable value or React re-renders forever.
let cachedInitial: CurrencyCode | null = null

function readInitialCurrency(): CurrencyCode {
  if (cachedInitial) return cachedInitial
  let stored: string | null = null
  try {
    stored = window.localStorage.getItem(STORAGE_KEY)
  } catch {
    // Private mode or blocked storage — detection still works.
  }
  const candidate = (stored as CurrencyCode) || detectCurrency()
  cachedInitial = CURRENCIES.some((c) => c.code === candidate) ? candidate : 'PKR'
  return cachedInitial
}

/** Nothing outside React changes this after load, so the unsubscribe is a
 *  deliberate no-op. */
function subscribeNever() {
  return () => {}
}

type CurrencyContextValue = {
  currency: CurrencyCode
  setCurrency: (code: CurrencyCode) => void
  /** True while the base currency is selected — callers use it to skip
   *  rendering an "≈" line that would just repeat the rupee price. */
  isBase: boolean
  /** A PKR amount, converted, rounded and formatted. Returns null for the
   *  base currency so a caller can fall back to its own formatting. */
  price: (pkr: number) => string | null
  /** An already-formatted rupee string like "Rs. 4,500", converted in place.
   *  Returns it untouched in the base currency, and for anything with no
   *  number in it -- "Let's talk" and "Custom quote" must keep reading as
   *  words rather than becoming a figure nobody quoted. */
  display: (original: string) => string
  /** Rewrites every rupee amount INSIDE a sentence, leaving the words alone:
   *  "PKR 35,000 value" becomes "AED 465 value", not just "AED 465". Needed
   *  wherever a price is embedded in copy rather than standing on its own. */
  inText: (original: string) => string
}

const CurrencyContext = createContext<CurrencyContextValue>({
  currency: 'PKR',
  setCurrency: () => {},
  isBase: true,
  price: () => null,
  display: (original: string) => original,
  inText: (original: string) => original,
})

export function useCurrency() {
  return useContext(CurrencyContext)
}

export default function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const initial = useSyncExternalStore(subscribeNever, readInitialCurrency, () => 'PKR' as CurrencyCode)
  const [chosen, setChosen] = useState<CurrencyCode | null>(null)
  const [rates, setRates] = useState<Record<string, number>>(FALLBACK_RATES)

  const currency = chosen ?? initial

  useEffect(() => {
    let cancelled = false
    fetch('/api/exchange-rates')
      .then((r) => r.json())
      .then((data) => {
        if (!cancelled && data?.rates) setRates(data.rates)
      })
      .catch(() => {
        // Bundled rates are already in state; nothing to do.
      })
    return () => {
      cancelled = true
    }
  }, [])

  const setCurrency = useCallback((code: CurrencyCode) => {
    setChosen(code)
    try {
      window.localStorage.setItem(STORAGE_KEY, code)
    } catch {
      // Not remembering is a small loss; failing to switch would not be.
    }
  }, [])

  const value = useMemo<CurrencyContextValue>(() => {
    const rate = rates[currency] ?? FALLBACK_RATES[currency] ?? 1
    const isBase = currency === 'PKR'
    return {
      currency,
      setCurrency,
      isBase,
      price: (pkr: number) => (isBase ? null : formatCurrency(convert(pkr, rate), currency)),
      display: (original: string) => {
        if (isBase) return original
        const pkr = parsePkr(original)
        return pkr === null ? original : formatCurrency(convert(pkr, rate), currency)
      },
      inText: (original: string) => {
        if (isBase) return original
        // Only a number carrying a rupee marker is touched. A bare number in
        // the same sentence -- "10 blog posts", "5+ specialists" -- is not a
        // price and must survive untouched.
        return original.replace(/(?:Rs\.?|PKR)\s?([\d,]+(?:\.\d+)?)/g, (whole, digits) => {
          const n = Number(String(digits).replace(/,/g, ''))
          return Number.isFinite(n) && n > 0 ? formatCurrency(convert(n, rate), currency) : whole
        })
      },
    }
  }, [currency, rates, setCurrency])

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>
}
