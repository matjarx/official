import type { Metadata } from 'next'
import VideosContent from '@/components/videos/VideosContent'

export const metadata: Metadata = {
  alternates: { canonical: '/videos' },
  title: 'Videos',
  description: 'Watch our library of videos to see how MatjarX helps small businesses get online fast, easy, and affordable.',
}

export default function Page() {
  return <VideosContent />
}
