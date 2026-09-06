import HomeContent from '@/components/home/HomeContent'
import { getContentOverride, type HomeOverride } from '@/lib/marketing-content'

// Re-checks marketing_content at most once a minute rather than only at
// build time — otherwise an admin edit would need a full redeploy to show
// up, defeating the point of a live content editor.
export const revalidate = 60

export default async function HomePage() {
  const override = await getContentOverride<HomeOverride>('home')
  return <HomeContent override={override} />
}
