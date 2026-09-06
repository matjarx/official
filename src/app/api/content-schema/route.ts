import { NextResponse } from 'next/server'
import { CITY_DATA, CITY_SLUGS } from '@/lib/location-data'
import { INDUSTRY_DATA } from '@/lib/industry-data'
import { RIVAL_DATA } from '@/lib/comparison-data'
import { BLOG_POSTS } from '@/lib/blog-data'
import { HELP_ARTICLES, HELP_SLUGS } from '@/lib/help-articles-data'
import { LEGAL_DATA, LEGAL_DOC_KEYS } from '@/lib/legal-data'
import { ALL_PLANS } from '@/lib/plan-data'
import { SERVICE_TABS } from '@/lib/services-data'

type Entry = { slug: string; label: string; category: string }

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

// Every real, editable page/entity on the site, grouped by category — the
// admin's page list is built entirely from this rather than a hardcoded
// list, so it can never drift out of sync as pages are added.
export async function GET() {
  const entries: Entry[] = []

  entries.push({ slug: 'home', label: 'Home', category: 'Main pages' })
  entries.push({ slug: 'pricing', label: 'Pricing', category: 'Main pages' })
  entries.push({ slug: 'features', label: 'Features', category: 'Main pages' })
  entries.push({ slug: 'about', label: 'About Us', category: 'Main pages' })
  entries.push({ slug: 'contact', label: 'Contact', category: 'Main pages' })
  entries.push({ slug: 'faqs', label: 'FAQs', category: 'Main pages' })
  entries.push({ slug: 'careers', label: 'Careers', category: 'Main pages' })
  entries.push({ slug: 'partner', label: 'Partner Program', category: 'Main pages' })
  entries.push({ slug: 'templates', label: 'Templates', category: 'Main pages' })
  entries.push({ slug: 'videos', label: 'Videos', category: 'Main pages' })
  entries.push({ slug: 'website-audit', label: 'Website Audit', category: 'Main pages' })
  entries.push({ slug: 'website-examples', label: 'Website Examples', category: 'Main pages' })
  entries.push({ slug: 'best-builder', label: 'Best Website Builder', category: 'Main pages' })
  entries.push({ slug: 'alternatives', label: 'Alternatives (hub)', category: 'Main pages' })
  entries.push({ slug: 'thank-you', label: 'Thank You', category: 'Main pages' })
  entries.push({ slug: 'help', label: 'Help Centre (hub)', category: 'Main pages' })

  for (const key of Object.keys(ALL_PLANS) as (keyof typeof ALL_PLANS)[]) {
    entries.push({ slug: `plans/${key}`, label: `${ALL_PLANS[key].name} Plan`, category: 'Plans' })
  }
  for (const t of SERVICE_TABS) {
    entries.push({ slug: `services/${t.id}`, label: t.label, category: 'Services' })
  }
  for (const key of Object.keys(INDUSTRY_DATA)) {
    entries.push({ slug: `industries/${key}`, label: INDUSTRY_DATA[key as keyof typeof INDUSTRY_DATA].name, category: 'Industries' })
  }
  for (const key of CITY_SLUGS) {
    entries.push({ slug: `cities/${key}`, label: CITY_DATA[key].name, category: 'Cities' })
  }
  for (const key of Object.keys(RIVAL_DATA)) {
    entries.push({ slug: `comparisons/${key}`, label: `MatjarX vs ${RIVAL_DATA[key as keyof typeof RIVAL_DATA].name}`, category: 'Comparisons' })
  }
  for (const post of BLOG_POSTS) {
    entries.push({ slug: `blog/${post.slug}`, label: post.title, category: 'Blog posts' })
  }
  for (const key of HELP_SLUGS) {
    entries.push({ slug: `help/${key}`, label: HELP_ARTICLES[key].title, category: 'Help articles' })
  }
  for (const key of LEGAL_DOC_KEYS) {
    entries.push({ slug: `legal/${key}`, label: LEGAL_DATA[key].title, category: 'Legal' })
  }

  return NextResponse.json({ entries }, { headers: CORS_HEADERS })
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS })
}
