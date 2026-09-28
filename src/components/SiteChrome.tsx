import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import type { NavKey } from '@/lib/nav'

// The header / main / footer triple, in one place.
//
// It was written out 27 times, once per page component, which is how the
// last two chrome bugs happened: ten /templates pages rendered neither
// header nor footer because I built them that way and nobody noticed, and
// sixteen pages had the footer INSIDE <main> until a landmark audit found
// it. Both are the same failure -- a structure repeated by hand drifts.
//
// A fragment, not a wrapper element: every page keeps its own outer div,
// which carries that page's background and type. So the rendered DOM is
// byte-identical to the hand-written version -- this is a refactor of
// where the markup lives, not of what it produces.
export default function SiteChrome({
  active,
  children,
}: {
  active: NavKey
  children: React.ReactNode
}) {
  return (
    <>
      <SiteHeader active={active} />
      <main>{children}</main>
      <SiteFooter />
    </>
  )
}
