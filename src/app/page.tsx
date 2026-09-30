import type { Metadata } from 'next'
import HomeContent from '@/components/home/HomeContent'
import { getMergedContent, getSeoOverride, pageTitle, type HomeContentShape } from '@/lib/marketing-content'

// Re-checks marketing_content at most once a minute rather than only at
// build time — otherwise an admin edit would need a full redeploy to show
// up, defeating the point of a live content editor.
export const revalidate = 60

// Falls back to the root layout's own defaults (title/description/
// canonical), which were written for the homepage in the first place —
// this only kicks in once an admin sets a __seo override for 'home'.
export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoOverride('home')
  if (!seo?.title && !seo?.description) return {}
  return {
    ...(seo.title ? { title: pageTitle(seo.title) } : {}),
    ...(seo.description ? { description: seo.description } : {}),
  }
}

export default async function HomePage() {
  const content = await getMergedContent<HomeContentShape>('home')
  return (
    <>
      {/* Written by hand because the metadata API cannot express it.
          `alternates.canonical` resolves through Next's URL normalisation,
          which drops the root's trailing slash while trailingSlash is false --
          an absolute 'https://matjarx.com/' is stripped just the same, which
          I confirmed against a render before resorting to this. The only
          setting that changes it, trailingSlash: true, would add a redirect
          to all 153 routes to fix one string.
          React hoists this into <head>. The root layout deliberately no
          longer sets a canonical, so this is the only one on the page. */}
      <link rel="canonical" href="https://matjarx.com/" />
      <HomeContent content={content} />
    </>
  )
}
