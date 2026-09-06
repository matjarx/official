import type { MetadataRoute } from 'next'
import { routes } from '@/lib/routes'
import { BLOG_POSTS } from '@/lib/blog-data'
import { RIVAL_DATA } from '@/lib/comparison-data'
import { INDUSTRY_SLUGS } from '@/lib/industry-data'
import { CITY_SLUGS } from '@/lib/location-data'
import { PLAN_DATA } from '@/lib/plan-data'
import { HELP_SLUGS } from '@/lib/help-articles-data'
import { LEGAL_DOC_KEYS } from '@/lib/legal-data'

// Built from the same data exports that drive each route's own
// generateStaticParams (or static folder list), so this can never list a
// route that doesn't exist or drift out of sync as pages are added.

const SITE_URL = 'https://matjarx.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticRoutes = [
    { url: routes.home, changeFrequency: 'weekly', priority: 1 },
    { url: routes.service('dfy'), changeFrequency: 'monthly', priority: 0.9 },
    { url: routes.service('seo'), changeFrequency: 'monthly', priority: 0.9 },
    { url: routes.service('concierge'), changeFrequency: 'monthly', priority: 0.9 },
    { url: routes.service('growth'), changeFrequency: 'monthly', priority: 0.9 },
    { url: routes.websiteExamples, changeFrequency: 'weekly', priority: 0.8 },
    { url: routes.pricing, changeFrequency: 'weekly', priority: 1 },
    { url: routes.features, changeFrequency: 'monthly', priority: 0.8 },
    { url: routes.websiteAudit, changeFrequency: 'monthly', priority: 0.7 },
    { url: routes.videos, changeFrequency: 'monthly', priority: 0.6 },
    { url: routes.alternatives, changeFrequency: 'monthly', priority: 0.8 },
    { url: routes.templates, changeFrequency: 'monthly', priority: 0.7 },
    { url: routes.bestBuilder, changeFrequency: 'monthly', priority: 0.8 },
    { url: routes.help, changeFrequency: 'monthly', priority: 0.6 },
    { url: routes.blog, changeFrequency: 'weekly', priority: 0.7 },
    { url: routes.about, changeFrequency: 'yearly', priority: 0.4 },
    { url: routes.contact, changeFrequency: 'yearly', priority: 0.5 },
    { url: routes.faqs, changeFrequency: 'monthly', priority: 0.5 },
    { url: routes.careers, changeFrequency: 'monthly', priority: 0.3 },
    { url: routes.partner, changeFrequency: 'monthly', priority: 0.4 },
    { url: routes.thankYou, changeFrequency: 'yearly', priority: 0.1 },
  ] as const
  const staticRoutesFinal: MetadataRoute.Sitemap = staticRoutes.map((r) => ({ ...r, url: `${SITE_URL}${r.url}`, lastModified: now }))

  const planRoutes: MetadataRoute.Sitemap = (Object.keys(PLAN_DATA) as (keyof typeof PLAN_DATA)[]).map((slug) => ({
    url: `${SITE_URL}${routes.plan(slug)}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  const industryRoutes: MetadataRoute.Sitemap = Object.values(INDUSTRY_SLUGS).map((slug) => ({
    url: `${SITE_URL}${routes.industry(slug)}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const cityRoutes: MetadataRoute.Sitemap = CITY_SLUGS.map((slug) => ({
    url: `${SITE_URL}${routes.location(slug)}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  const compareRoutes: MetadataRoute.Sitemap = Object.keys(RIVAL_DATA).map((rival) => ({
    url: `${SITE_URL}${routes.compare(rival)}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  const helpRoutes: MetadataRoute.Sitemap = HELP_SLUGS.map((slug) => ({
    url: `${SITE_URL}${routes.helpArticle(slug)}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }))

  const blogRoutes: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${SITE_URL}${routes.blogPost(post.slug)}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  const legalRoutes: MetadataRoute.Sitemap = LEGAL_DOC_KEYS.map((doc) => ({
    url: `${SITE_URL}${routes.legal(doc)}`,
    lastModified: now,
    changeFrequency: 'yearly' as const,
    priority: 0.2,
  }))

  return [
    ...staticRoutesFinal,
    ...planRoutes,
    ...industryRoutes,
    ...cityRoutes,
    ...compareRoutes,
    ...helpRoutes,
    ...blogRoutes,
    ...legalRoutes,
  ]
}
