'use client'

// The footer's "what does this cost me" widget.
//
// MatjarX quotes in rupees everywhere, which is correct -- it is what gets
// charged -- and means nothing to someone reading from Dubai or London. The
// Gulf is a market the site actively sells into, and the pricing page asked
// those readers to do the conversion themselves.
//
// Renders immediately from the bundled rates and quietly upgrades to live
// ones, so the footer never shows a spinner or shifts layout. The currency is
// guessed from the browser's time zone on first visit (see lib/currency.ts
// for why not IP) and remembered afterwards, because a guess that cannot be
// overridden is worse than no guess.
//
// Everything here is approximate and says so. The rupee figure stays on the
// page next to it -- this adds a second reading of the price, it does not
// replace the real one.

import { useEffect, useState, useSyncExternalStore } from 'react'
import {
  CURRENCIES,
  FALLBACK_RATES,
  convert,
  detectCurrency,
  formatCurrency,
  parsePkr,
  type CurrencyCode,
} from '@/lib/currency'
import { ALL_PLANS } from '@/lib/plan-data'

const STORAGE_KEY = 'matjarx:currency'

// The stored choice, or a guess from the time zone, read through
// useSyncExternalStore rather than set from an effect.
//
// Both live outside React and neither exists on the server, so this is
// exactly what that hook is for: it returns the server snapshot during
// render and hydration, then the real one, with no synchronous setState in
// an effect and no hydration mismatch. The result is cached because a
// snapshot getter must return a stable value or React re-renders forever.
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

/** Nothing outside React changes this after load, so there is nothing to
 *  subscribe to -- the unsubscribe is a no-op on purpose. */
function subscribeNever() {
  return () => {}
}

// The three plans worth showing in a footer. Platinum and Custom are
// conversations, not list prices, and a footer is not where that starts.
const SHOWN_PLANS = ['launch', 'boost', 'growth'] as const

export default function CurrencyConverter() {
  // PKR on the server and during hydration, the visitor's own currency
  // immediately after — so the markup React sends and the markup it hydrates
  // always agree.
  const initialCurrency = useSyncExternalStore(subscribeNever, readInitialCurrency, () => 'PKR' as CurrencyCode)
  const [chosen, setChosen] = useState<CurrencyCode | null>(null)
  const currency = chosen ?? initialCurrency

  const [rates, setRates] = useState<Record<string, number>>(FALLBACK_RATES)

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

  function choose(code: CurrencyCode) {
    setChosen(code)
    try {
      window.localStorage.setItem(STORAGE_KEY, code)
    } catch {
      // Not remembering is a small loss; failing to switch would not be.
    }
  }

  const rate = rates[currency] ?? FALLBACK_RATES[currency] ?? 1
  const isBase = currency === 'PKR'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <label
        htmlFor="matjarx-currency"
        style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.6px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.62)' }}
      >
        Prices in your currency
      </label>

      <select
        id="matjarx-currency"
        value={currency}
        onChange={(e) => choose(e.target.value as CurrencyCode)}
        style={{
          appearance: 'auto',
          padding: '9px 11px',
          borderRadius: 10,
          fontSize: 13.5,
          fontFamily: 'inherit',
          color: 'var(--ink-1, #10212F)',
          background: 'rgba(255,255,255,0.92)',
          border: '1px solid rgba(255,255,255,0.28)',
          maxWidth: 230,
        }}
      >
        {CURRENCIES.map((c) => (
          <option key={c.code} value={c.code}>
            {c.label}
          </option>
        ))}
      </select>

      <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 5 }}>
        {SHOWN_PLANS.map((key) => {
          const plan = ALL_PLANS[key]
          const pkr = parsePkr(plan.price)
          return (
            <li key={key} style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.74)', lineHeight: 1.5 }}>
              <span style={{ color: 'rgba(255,255,255,0.92)', fontWeight: 600 }}>{plan.name}</span>{' '}
              {plan.price}/mo
              {/* The rupee price never leaves; the conversion is added
                  beside it. Nothing is appended while PKR is selected, which
                  is also what the server renders — so there is no flash of a
                  wrong figure before the visitor's own currency resolves. */}
              {!isBase && pkr !== null && (
                <span style={{ color: 'rgba(255,255,255,0.58)' }}> ≈ {formatCurrency(convert(pkr, rate), currency)}</span>
              )}
            </li>
          )
        })}
      </ul>

      {(() => {
        const setup = parsePkr(ALL_PLANS.launch.setup)
        return (
          <p style={{ margin: 0, fontSize: 11.5, color: 'rgba(255,255,255,0.5)', lineHeight: 1.55, maxWidth: 260 }}>
            One-time setup {ALL_PLANS.launch.setup}
            {!isBase && setup !== null ? ` ≈ ${formatCurrency(convert(setup, rate), currency)}` : ''}.
            {!isBase ? ' Conversions are approximate; billing is in PKR.' : ''}
          </p>
        )
      })()}
    </div>
  )
}
