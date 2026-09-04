import type { Metadata } from 'next'
import HomeContent from '@/components/home/HomeContent'

// Home Dark — from Marketing - Home Dark.dc.html. Per the design
// handoff: "Treat as a theme layer over one page component, not a
// second page." This route exists so the dark variant is reviewable
// at its own URL; it is not linked from navigation and shares every
// section, prop and piece of copy with `/` via HomeContent's `dark`
// prop — nothing here is a duplicate implementation.
export const metadata: Metadata = {
  title: 'Home (Dark)',
  robots: { index: false, follow: false },
}

export default function Page() {
  return <HomeContent dark />
}
