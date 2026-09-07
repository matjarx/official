'use client'

// Triggerable modal — content, trigger, and schedule come from the
// admin's Marketing Site > Announcements tab. Same config-as-prop pattern
// as AnnouncementBar (see its own comment for why no client fetch here).
//
// Frequency capping: once dismissed, stores a timestamp and won't show
// again until frequency_days have passed — independent of the
// announcement bar's own dismissal, and reset automatically whenever the
// heading text changes (a new campaign should get a fresh chance to show).

import { useEffect, useState } from 'react'
import Image from 'next/image'
import type { PopupConfig } from '@/lib/marketing-content'

const STORAGE_KEY = 'matjarx-popup-last-dismissed'

export default function SitePopup({ config }: { config: PopupConfig }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!config.heading) return
    let lastDismissedFor: string | null = null
    let dismissedAt = 0
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw) as { heading: string; at: number }
        lastDismissedFor = parsed.heading
        dismissedAt = parsed.at
      }
    } catch {
      // storage unavailable — treat as never dismissed
    }
    const daysSince = (Date.now() - dismissedAt) / 86_400_000
    const frequencyDays = config.frequency_days ?? 7
    if (lastDismissedFor === config.heading && daysSince < frequencyDays) return

    if (config.trigger === 'delay') {
      const t = setTimeout(() => setOpen(true), (config.delay_seconds || 5) * 1000)
      return () => clearTimeout(t)
    }
    if (config.trigger === 'exit_intent') {
      function onMouseLeave(e: MouseEvent) {
        if (e.clientY <= 0) {
          setOpen(true)
          document.removeEventListener('mouseleave', onMouseLeave)
        }
      }
      document.addEventListener('mouseleave', onMouseLeave)
      return () => document.removeEventListener('mouseleave', onMouseLeave)
    }
    // Same as AnnouncementBar: the frequency-cap check above needs
    // localStorage, so this can't be computed during render — has to run
    // as an effect after mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOpen(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config.heading])

  if (!config.heading || !open) return null

  function close() {
    setOpen(false)
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ heading: config.heading, at: Date.now() }))
    } catch {
      // storage unavailable — the popup just won't remember the dismissal
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={close}
      style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(4,18,31,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ position: 'relative', width: '100%', maxWidth: 420, borderRadius: 24, background: '#fff', overflow: 'hidden', boxShadow: '0 30px 70px rgba(4,18,31,0.35)' }}
      >
        <button
          onClick={close}
          aria-label="Close"
          style={{ position: 'absolute', right: 14, top: 14, width: 30, height: 30, borderRadius: '50%', display: 'grid', placeItems: 'center', background: 'rgba(4,18,31,0.06)', border: 'none', cursor: 'pointer', zIndex: 1 }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#04121F" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
        </button>
        {config.image_url && (
          <div style={{ position: 'relative', width: '100%', height: 180 }}>
            <Image src={config.image_url} alt={config.image_alt || ''} fill sizes="420px" style={{ objectFit: 'cover' }} />
          </div>
        )}
        <div style={{ padding: '28px 28px 32px', textAlign: 'center' }}>
          <h3 style={{ margin: '0 0 10px', fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 800, fontSize: 24, color: '#04121F' }}>{config.heading}</h3>
          {config.body && <p style={{ margin: '0 0 20px', fontSize: 14.5, lineHeight: 1.6, color: '#3D4A16' }}>{config.body}</p>}
          {config.cta_text && config.cta_url && (
            <a
              href={config.cta_url}
              onClick={close}
              style={{ display: 'inline-block', padding: '14px 28px', borderRadius: 999, fontWeight: 700, fontSize: 14.5, color: '#fff', background: 'linear-gradient(160deg, #10293D, #04121F)' }}
            >
              {config.cta_text}
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
