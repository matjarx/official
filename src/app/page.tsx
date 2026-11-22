import type { Metadata } from 'next'
import HomeV2 from '@/components/home-v2/HomeV2'
import { announcement, previewsLive, showcase } from '@/components/home-v2/data'
import { HOME_FAQ } from '@/components/home-v2/faq'
import FaqSchema from '@/components/FaqSchema'
import SiteFooter from '@/components/SiteFooter'
import { getSeoOverride, pageSeo } from '@/lib/marketing-content'

// Re-checks the admin's announcement and SEO override at most once a minute,
// so an edit in the admin shows up without a redeploy.
export const revalidate = 60

// Falls back to the root layout's own defaults (title/description), which
// were written for the homepage in the first place -- this only kicks in
// once an admin sets a __seo override for 'home'.
export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoOverride('home')
  if (!seo?.title && !seo?.description) return {}
  return pageSeo('/', seo.title, seo.description)
}

export default async function HomePage() {
  const [templates, ann] = await Promise.all([showcase(), announcement()])
  const live = await previewsLive(templates)
  return (
    <>
      {/* Written by hand because the metadata API cannot express it:
          alternates.canonical drops the root's trailing slash while
          trailingSlash is false. React hoists this into <head>; the root
          layout sets no canonical, so this is the only one on the page. */}
      <link rel="canonical" href="https://matjarx.com/" />
      <FaqSchema faqs={HOME_FAQ} />
      <HomeV2 templates={templates} announcement={ann} liveDemos={live} />
      <SiteFooter />
    </>
  )
}
