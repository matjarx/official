'use client'

// The "try it" controls under the editor mock-up. One docked bar instead
// of four cards: the photo swap is a one-off action button, and bookings vs
// store is a two-way switch, so the either/or reads at a glance.

import type { V2Vals } from './vals'

const Img = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="3" /><circle cx="9" cy="9" r="2" /><path d="m21 15-3.1-3.1a2 2 0 0 0-2.8 0L6 21" /></svg>
)
const Cal = () => (
  <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>
)
const Bag = () => (
  <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><path d="M3 6h18M16 10a4 4 0 0 1-8 0" /></svg>
)
const Hand = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M18 11V6a2 2 0 0 0-4 0v5M14 10V4a2 2 0 0 0-4 0v6M10 10.5V6a2 2 0 0 0-4 0v8" /><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.9-6-2.4l-3.6-3.6a2 2 0 0 1 2.8-2.8L7 15" /></svg>
)

export default function EditorTray({ v }: { v: V2Vals }) {
  return (
    <div className="hv-tray" role="group" aria-label="Try the editor">
      <span className="hv-tray-k"><Hand />Try it</span>

      <button type="button" className={`hv-tray-act ${v.e1}`} onClick={v.edImage}>
        <Img />Change image
      </button>

      <div className={`hv-tray-sw is-${v.mode}`} role="radiogroup" aria-label="What the site does">
        <i className="thumb" aria-hidden="true" />
        <button type="button" role="radio" aria-checked={v.mode === 'book'} onClick={v.edBook}><Cal />Book a table</button>
        <button type="button" role="radio" aria-checked={v.mode === 'shop'} onClick={v.edShop}><Bag />Sell products</button>
      </div>

      <p className="hv-tray-st" aria-live="polite"><i aria-hidden="true" /><span key={v.storeNote}>{v.storeNote}</span></p>
    </div>
  )
}
