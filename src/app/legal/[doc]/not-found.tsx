// The branded 404 for this segment.
//
// app/not-found.tsx only covers routes Next never matched. A notFound()
// raised from INSIDE a matched segment looks for the nearest boundary in
// that segment or above, and finding none it fell back to Next's own
// unstyled default -- a page with a title and nothing else. Measured
// live before this existed: 24 characters of visible text against the
// real page's 2,916, with no header, no nav, no way back.
//
// Two things were tried first and are recorded so they are not retried:
// `export { default } from '@/app/not-found'` renders an empty Suspense
// shell, because Next treats a re-export as a module boundary rather
// than this segment's own component; and returning 404 metadata from the
// page's own generateMetadata does nothing, because notFound() discards
// the page's metadata and uses the boundary's. Hence both the wrapper
// component and the metadata export below.
import type { Metadata } from 'next'
import NotFound from '@/app/not-found'

export const metadata: Metadata = {
  title: 'Page Not Found',
  robots: { index: false, follow: true },
}

export default function SegmentNotFound() {
  return <NotFound />
}
