import { permanentRedirect } from 'next/navigation'

// The redesign was reviewed here before it replaced the homepage. The
// address may have been shared, so it forwards rather than 404s.
export default function Page() {
  permanentRedirect('/')
}
