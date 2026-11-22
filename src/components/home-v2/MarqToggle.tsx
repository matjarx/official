'use client'

// Icon-only pause/play for the industry marquee. Toggles the class on its
// sibling strip directly, so the 18 KB of chips around it can stay
// server-rendered HTML rather than shipping as JavaScript too.

import { useState } from 'react'

export default function MarqToggle() {
  const [paused, setPaused] = useState(false)
  const label = paused ? 'Play animation' : 'Pause animation'
  return (
    <button
      type="button"
      className="mq-btn mq-btn--icon"
      aria-pressed={paused}
      aria-label={label}
      title={label}
      onClick={(e) => {
        const next = !paused
        setPaused(next)
        e.currentTarget.parentElement?.querySelector('.marq')?.classList.toggle('is-paused', next)
      }}
    >
      {paused ? (
        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.4-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" /></svg>
      ) : (
        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><rect x="6" y="5" width="4" height="14" rx="1.2" /><rect x="14" y="5" width="4" height="14" rx="1.2" /></svg>
      )}
    </button>
  )
}
