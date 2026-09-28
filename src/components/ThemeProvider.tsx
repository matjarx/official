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

import { createContext, useContext, useEffect, useState, useCallback } from 'react'

type ThemeValue = { dark: boolean; toggle: () => void; setDark: (v: boolean) => void }

const ThemeContext = createContext<ThemeValue>({ dark: false, toggle: () => {}, setDark: () => {} })

export function useTheme() {
  return useContext(ThemeContext)
}

const STORAGE_KEY = 'matjarx-theme'

export default function ThemeProvider({
  children,
  initialDark = false,
}: {
  children: React.ReactNode
  initialDark?: boolean
}) {
  // Always starts at initialDark so the server and the first client render
  // agree; the stored preference is applied in an effect below. Reading
  // localStorage during render is what produces a hydration mismatch.
  const [dark, setDark] = useState(initialDark)

  useEffect(() => {
    if (initialDark) return // a route that is dark on purpose ignores the preference
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY)
      if (saved === 'dark') setDark(true)
    } catch {
      // Private window, blocked storage. The site is light; that is fine.
    }
  }, [initialDark])

  useEffect(() => {
    document.documentElement.classList.toggle('dark-theme', dark)
  }, [dark])

  const toggle = useCallback(() => {
    setDark((v) => {
      const next = !v
      try {
        window.localStorage.setItem(STORAGE_KEY, next ? 'dark' : 'light')
      } catch {
        // Not being able to remember the choice does not stop making it.
      }
      return next
    })
  }, [])

  return <ThemeContext.Provider value={{ dark, toggle, setDark }}>{children}</ThemeContext.Provider>
}
