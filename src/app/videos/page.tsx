import type { Metadata } from 'next'
import VideosContent, { type VideosContentShape } from '@/components/videos/VideosContent'
import { getMergedContent } from '@/lib/marketing-content'

export const metadata: Metadata = {
  alternates: { canonical: '/videos' },
  title: 'Videos',
  description: 'Watch our library of videos to see how MatjarX helps small businesses get online fast, easy, and affordable.',
}

export const revalidate = 60

export default async function Page() {
  const content = await getMergedContent<VideosContentShape>('videos')
  return <VideosContent content={content} />
}
