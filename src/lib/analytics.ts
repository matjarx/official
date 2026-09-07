// Activity tracking — every call here does two things: (1) a fire-and-
// forget insert into Supabase (site_analytics_events), first-party, no
// cookies, no cross-site tracking; (2) the same event to GA4 via gtag
// (loaded by the <GoogleAnalytics> component in the root layout), so the
// same 9 real interactions already instrumented across the site — CTA
// clicks, form submissions, pageviews — show up in GA4's own Realtime and
// Events reports too, not just this first-party table. Neither path can
// affect the page: both are wrapped so a failure (gtag not loaded yet, a
// blocked request, an ad-blocker) is swallowed, never surfaced.
//
// `sessionId` groups events from the same browser tab visit without
// identifying the person — a random id kept in sessionStorage, never sent
// anywhere else, and cleared when the tab closes.

import { supabase } from './supabase'

type GtagWindow = Window & { gtag?: (...args: unknown[]) => void }

// 'pageview' maps to GA4's own page_view event name — GA4's built-in
// page/session/landing-page reports are keyed off that exact name, and
// this SPA needs it fired manually on route changes anyway (see
// PageviewTracker), since GA4's automatic page_view only fires once on
// the initial full page load. Every other event keeps its own name and
// shows up as a custom event, which the user can mark as a GA4 key
// event (conversion) from the GA4 UI directly — no code change needed
// for that part.
function sendToGa4(event: string, path: string, label?: string) {
  try {
    const gtag = (window as GtagWindow).gtag
    if (typeof gtag !== 'function') return
    const gaEventName = event === 'pageview' ? 'page_view' : event
    gtag('event', gaEventName, {
      page_path: path,
      page_location: window.location.href,
      ...(label ? { event_label: label } : {}),
    })
  } catch {
    // gtag not ready yet, blocked, or anything else — never break the page
  }
}

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

  sendToGa4(event, path, opts?.label)

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
