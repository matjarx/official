'use client'

// The footer's currency selector.
//
// Just the control now. It used to also list Launch/Boost/Growth with their
// converted prices, which put a small price table in the footer of all 189
// pages -- and still left the pricing page itself in rupees, because the
// widget only ever converted its own copy of the numbers.
//
// The choice lives in CurrencyProvider instead, so picking one here changes
// every price on the site, which is what someone reaching for this wants.

import { CURRENCIES, type CurrencyCode } from '@/lib/currency'
import { useCurrency } from '@/components/CurrencyProvider'

export default function CurrencyConverter() {
  const { currency, setCurrency } = useCurrency()

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
      <label
        htmlFor="matjarx-currency"
        style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: '0.6px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)' }}
      >
        Show prices in
      </label>
      <select
        id="matjarx-currency"
        value={currency}
        onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
        style={{
          appearance: 'auto',
          padding: '7px 10px',
          borderRadius: 9,
          fontSize: 13,
          fontFamily: 'inherit',
          color: 'var(--ink-1, #10212F)',
          background: 'rgba(255,255,255,0.92)',
          border: '1px solid rgba(255,255,255,0.28)',
          maxWidth: 200,
        }}
      >
        {CURRENCIES.map((c) => (
          <option key={c.code} value={c.code}>
            {c.label}
          </option>
        ))}
      </select>
    </div>
  )
}
