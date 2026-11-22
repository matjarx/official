'use client'

// Dark mode has been removed sitewide: no toggle in the header, no
// /home-dark review route. This provider now always reports `dark: false`
// -- including for a visitor who has an old 'dark' preference saved from
// before this change, since nothing here reads that storage key anymore.
//
// `toggle`/`setDark` stay as no-ops rather than being deleted from the
// type, so every existing `useTheme()` call site (SiteHeader, HomeContent)
// keeps compiling unchanged; they're calls nothing can trigger any more
// now that the button that drove them is gone.
//
// The `dark ?` branches throughout SiteHeader/HomeContent are left in
// place, not unpicked -- they now always take their light-mode side,
// which is correct but still a separate, larger cleanup from removing the
// switch itself.

import { createContext, useContext } from 'react'

type ThemeValue = { dark: boolean; toggle: () => void; setDark: (v: boolean) => void }

const ThemeContext = createContext<ThemeValue>({ dark: false, toggle: () => {}, setDark: () => {} })

export function useTheme() {
  return useContext(ThemeContext)
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  return <ThemeContext.Provider value={{ dark: false, toggle: () => {}, setDark: () => {} }}>{children}</ThemeContext.Provider>
}
