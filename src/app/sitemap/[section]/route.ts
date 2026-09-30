// One child sitemap: /sitemap/pages.xml, /sitemap/locations.xml and so on.
//
// The `.xml` is part of the captured segment rather than a real extension --
// a dynamic segment cannot be part of a folder name, and the suffix is worth
// keeping because every SEO tool, and every human reading a Search Console
// report, expects a sitemap URL to end in .xml. Same shape the client
// storefronts serve, so both sides of the platform look alike.
//
// An unknown section 404s rather than serving an empty urlset, so a typo in a
// submitted URL shows up as an error instead of looking like a section that
// lost all its pages.

import { NextResponse } from 'next/server'
import { MARKETING_SITEMAP_SECTIONS, urlsForSection, type MarketingSitemapSection } from '@/lib/marketing-sitemap'

export const revalidate = 60

function escapeXml(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;')
}

export async function GET(request: Request, { params }: { params: Promise<{ section: string }> }) {
  const { section: raw } = await params
  const section = raw.replace(/\.xml$/, '') as MarketingSitemapSection

  if (!MARKETING_SITEMAP_SECTIONS.includes(section)) {
    return new NextResponse('Not found', { status: 404 })
  }

  const urls = await urlsForSection(section)
  const body = urls
    .map((u) =>
      [
        '  <url>',
        `    <loc>${escapeXml(u.url)}</loc>`,
        u.lastModified ? `    <lastmod>${u.lastModified.toISOString().split('T')[0]}</lastmod>` : null,
        u.changeFrequency ? `    <changefreq>${u.changeFrequency}</changefreq>` : null,
        u.priority !== undefined ? `    <priority>${u.priority.toFixed(1)}</priority>` : null,
        '  </url>',
      ]
        .filter(Boolean)
        .join('\n')
    )
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>`

  return new NextResponse(xml, { headers: { 'Content-Type': 'application/xml' } })
}
