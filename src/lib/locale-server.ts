// The current request's locale, for server components.
//
// Separate from lib/locale.ts because that one is imported by client
// components too, and next/headers cannot be.

import { headers } from 'next/headers'
import { DEFAULT_LOCALE, LOCALE_HEADER, isLocale, type Locale } from '@/lib/locale'

export async function currentLocale(): Promise<Locale> {
  try {
    const h = await headers()
    const v = h.get(LOCALE_HEADER)
    return isLocale(v) ? v : DEFAULT_LOCALE
  } catch {
    // headers() throws outside a request scope -- during a static build, for
    // instance. English is the right answer there: it is what the bare path
    // serves, and it is what gets prerendered.
    return DEFAULT_LOCALE
  }
}
