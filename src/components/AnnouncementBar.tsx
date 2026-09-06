'use client'

// Persistent top strip — content and schedule come from the admin's
// Marketing Site > Announcements tab. Rendered directly from the root
// layout (already fetched the config server-side, so this just receives
// it as a prop — no client fetch needed, unlike SiteFooter's socials).
//
// Dismissal is keyed by the announcement's own text, not a flat boolean —
// so publishing a new announcement always shows again even if a visitor
// dismissed a previous one, without needing the admin to remember to
// clear anything.

import { useEffect, useState } from 'react'
import type { AnnouncementBarConfig } from '@/lib/marketing-content'

const STORAGE_KEY = 'matjarx-announcement-dismissed'

export default function AnnouncementBar({ config }: { config: AnnouncementBarConfig }) {
  const [dismissed, setDismissed] = useState(true) // default hidden until we've checked storage, avoids a flash

  useEffect(() => {
    // localStorage only exists client-side, so this genuinely can't be
    // computed during render/SSR — has to be read after mount.
    try {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDismissed(config.dismissible !== false && window.localStorage.getItem(STORAGE_KEY) === config.text)
    } catch {
      setDismissed(false)
    }
  }, [config.text, config.dismissible])

  if (!config.text || dismissed) return null

  function dismiss() {
    setDismissed(true)
    try {
      window.localStorage.setItem(STORAGE_KEY, config.text || '')
    } catch {
      // storage unavailable — the bar just won't remember the dismissal
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        flexWrap: 'wrap',
        padding: '10px 44px 10px 16px',
        fontSize: 13.5,
        position: 'relative',
        background: config.bg_color || '#04121F',
        color: config.text_color || '#FFFFFF',
      }}
    >
      <span>{config.text}</span>
      {config.link_url && config.link_text && (
        <a href={config.link_url} style={{ color: 'inherit', fontWeight: 700, textDecoration: 'underline' }}>
          {config.link_text}
        </a>
      )}
      {config.dismissible !== false && (
        <button
          onClick={dismiss}
          aria-label="Dismiss"
          style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: 'inherit', opacity: 0.7, background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
        </button>
      )}
    </div>
  )
}
