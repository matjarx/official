'use client'

// Reports real Core Web Vitals (CLS, LCP, INP, TTFB, FCP) from actual
// visitors into Supabase — see next/web-vitals' own docs for the metric
// shape. Mounted once in the root layout.

import { useReportWebVitals } from 'next/web-vitals'
import { usePathname } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function WebVitalsReporter() {
  const pathname = usePathname()

  useReportWebVitals((metric) => {
    supabase
      .from('site_web_vitals')
      .insert({
        path: pathname,
        metric: metric.name,
        value: metric.value,
        rating: metric.rating,
        navigation_type: metric.navigationType ?? null,
      })
      .then(({ error }) => {
        if (error) console.error('[web-vitals]', error.message)
      })
  })

  return null
}
