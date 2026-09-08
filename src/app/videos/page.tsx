import type { Metadata } from 'next'
import VideosContent, { type VideosContentShape } from '@/components/videos/VideosContent'
import { getMergedContent, getSeoOverride, pageTitle } from '@/lib/marketing-content'

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoOverride('videos')
  return {
    alternates: { canonical: '/videos' },
    title: pageTitle(seo?.title || 'Videos'),
    description: seo?.description || 'Watch our library of videos to see how MatjarX helps small businesses get online fast, easy, and affordable.',
  }
}

export const revalidate = 60

export default async function Page() {
  const content = await getMergedContent<VideosContentShape>('videos')
  return <VideosContent content={content} />
}
