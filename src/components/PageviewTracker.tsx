'use client'

// Mounted once in the root layout — fires a pageview event on first load
// and every client-side route change, so every one of the ~250 routes gets
// coverage from this single component rather than needing a per-page edit.

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { trackEvent } from '@/lib/analytics'

export default function PageviewTracker() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    const query = searchParams.toString()
    trackEvent('pageview', { path: query ? `${pathname}?${query}` : pathname })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, searchParams])

  return null
}
