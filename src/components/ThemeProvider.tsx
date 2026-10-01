'use client'

// Where dark mode lives.
//
// It used to live in HomeContent's useState, which is why only the home
// page could go dark. The state is the same; what changes is that it sits
// above every page instead of inside one, and that it now drives the CSS
// tokens rather than only the `dark` props threaded through components.
//
// Two mechanisms, deliberately both:
//
//   * .dark-theme on <html> re-points the tokens in globals.css, which is
//     what step 1's 1,600 replacements were for. Everything styled through
//     a token flips with no component change at all.
//   * the `dark` boolean still reaches SiteHeader and HomeContent, which
//     branch on it in JS in 35 and 40 places. Those branches predate the
//     tokens and are not unpicked here -- doing both at once would mean no
//     way to tell which half broke something.
//
// The class goes on <html>, not a wrapper div, so a token is in scope for
// anything portalled outside the tree (the popup, the announcement bar)
// and for the page background itself.

import { createContext, useContext, useEffect, useState, useCallback, useSyncExternalStore } from 'react'

type ThemeValue = { dark: boolean; toggle: () => void; setDark: (v: boolean) => void }

const ThemeContext = createContext<ThemeValue>({ dark: false, toggle: () => {}, setDark: () => {} })

export function useTheme() {
  return useContext(ThemeContext)
}

const STORAGE_KEY = 'matjarx-theme'

// Read through useSyncExternalStore, the same way CurrencyProvider reads its
// own stored choice. The preference used to be applied with setState inside
// an effect, which React flags as a cascading render and which showed as a
// light frame before the stored dark one took hold. The store getter returns
// the server snapshot during render and hydration and the real value straight
// after, so there is no mismatch and no second render to see. Cached because
// a snapshot getter has to return a stable value or React re-renders forever.
let cachedStoredDark: boolean | null = null

function readStoredDark(): boolean {
  if (cachedStoredDark !== null) return cachedStoredDark
  try {
    cachedStoredDark = window.localStorage.getItem(STORAGE_KEY) === 'dark'
  } catch {
    // Private window, blocked storage. The site is light; that is fine.
    cachedStoredDark = false
  }
  return cachedStoredDark
}

/** Nothing outside React changes this after load, so the unsubscribe is a
 *  deliberate no-op. */
function subscribeNever() {
  return () => {}
}

export default function ThemeProvider({
  children,
  initialDark = false,
}: {
  children: React.ReactNode
  initialDark?: boolean
}) {
  // A route that is dark on purpose ignores the stored preference.
  const storedDark = useSyncExternalStore(subscribeNever, readStoredDark, () => false)
  const [override, setOverride] = useState<boolean | null>(null)
  const dark = override ?? (initialDark || storedDark)
  const setDark = useCallback((v: boolean) => setOverride(v), [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark-theme', dark)
  }, [dark])

  // Deliberately not a functional update. Writing to localStorage and
  // refreshing the cache are side effects, and React invokes an updater
  // twice in development -- the second pass would read the cache the first
  // had just moved and flip the answer back, which is exactly what it did.
  // `dark` from render scope is the current value, so plain setState is both
  // correct and simpler.
  const toggle = useCallback(() => {
    const next = !dark
    try {
      window.localStorage.setItem(STORAGE_KEY, next ? 'dark' : 'light')
    } catch {
      // Not being able to remember the choice does not stop making it.
    }
    cachedStoredDark = next
    setOverride(next)
  }, [dark])

  return <ThemeContext.Provider value={{ dark, toggle, setDark }}>{children}</ThemeContext.Provider>
}
