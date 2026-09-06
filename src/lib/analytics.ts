// First-party activity tracking — no third-party analytics script, no
// cookies, no cross-site tracking. Every call is a fire-and-forget insert
// into Supabase (site_analytics_events); a failure here should never affect
// the page, so errors are swallowed rather than surfaced.
//
// `sessionId` groups events from the same browser tab visit without
// identifying the person — a random id kept in sessionStorage, never sent
// anywhere else, and cleared when the tab closes.

import { supabase } from './supabase'

function getSessionId(): string {
  if (typeof window === 'undefined') return ''
  try {
    const key = 'mx_session_id'
    let id = window.sessionStorage.getItem(key)
    if (!id) {
      id = crypto.randomUUID()
      window.sessionStorage.setItem(key, id)
    }
    return id
  } catch {
    return ''
  }
}

export function trackEvent(event: string, opts?: { label?: string; path?: string }) {
  if (typeof window === 'undefined') return
  const path = opts?.path ?? window.location.pathname
  supabase
    .from('site_analytics_events')
    .insert({
      event,
      label: opts?.label ?? null,
      path,
      referrer: document.referrer || null,
      session_id: getSessionId(),
    })
    .then(({ error }) => {
      if (error) console.error('[analytics]', error.message)
    })
}
