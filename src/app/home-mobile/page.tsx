import type { Metadata } from 'next'
import HomeMobileContent from '@/components/home/HomeMobileContent'

// Home Mobile — from Marketing - Home Mobile.dc.html. A dedicated
// 390×844 phone-frame layout, not a scaled desktop. Like /home-dark,
// this is a review surface for the design's own separate mobile
// composition — not linked from navigation. The real `/` route
// reflows responsively on its own; this page exists because Home is
// the one page the handoff gives a deliberately distinct phone layout.
export const metadata: Metadata = {
  title: 'Home (Mobile)',
  robots: { index: false, follow: false },
}

export default function Page() {
  return <HomeMobileContent />
}
