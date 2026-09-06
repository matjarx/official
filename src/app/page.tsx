import type { Metadata } from 'next'
import HomeContent from '@/components/home/HomeContent'
import { getMergedContent, getSeoOverride, type HomeContentShape } from '@/lib/marketing-content'

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
    ...(seo.title ? { title: seo.title } : {}),
    ...(seo.description ? { description: seo.description } : {}),
  }
}

export default async function HomePage() {
  const content = await getMergedContent<HomeContentShape>('home')
  return <HomeContent content={content} />
}
