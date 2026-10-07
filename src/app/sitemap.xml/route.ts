// The sitemap index for matjarx.com.
//
// Written by hand rather than through Next's generateSitemaps. That helper
// does serve the children at /sitemap/<id>.xml, but it does not produce an
// index at /sitemap.xml -- which I only found by requesting the URL after
// switching to it, and which would have 404'd the exact address already
// submitted to Search Console. An index there is a supported swap for the
// urlset that used to live at it; a 404 is not.
//
// Why split at all: Search Console reports coverage PER SUBMITTED SITEMAP.
// As one file, "40 URLs not indexed" never says which forty. With the 63
// city pages, the comparisons and everything blog in separate children, the
// same report names the group that is struggling. On the site that sells
// getting found on Google, not being able to answer that about our own pages
// was the wrong way round.
//
// The same argument splits the languages: Arabic lives in its own children
// (/sitemap/ar-pages.xml) rather than mixed into the English ones. A child
// with no URLs is omitted entirely -- an empty urlset reads to Search Console
// as a section that lost all its pages, and until a locale is translated it
// genuinely has none.

import { NextResponse } from 'next/server'
import { sitemapChildren, urlsForChild } from '@/lib/marketing-sitemap'

const SITE_URL = 'https://matjarx.com'

export const revalidate = 60

export async function GET() {
  const sections = await Promise.all(
    sitemapChildren().map(async (child) => {
      const urls = await urlsForChild(child)
      // The newest entry in a section becomes that child's lastmod, so a
      // crawler can skip a section nothing has changed in.
      const newest = urls
        .map((u) => u.lastModified)
        .filter(Boolean)
        .sort((a, b) => (a as Date).getTime() - (b as Date).getTime())
        .pop()
      return { id: child.id, count: urls.length, lastmod: newest as Date | undefined }
    })
  )

  const body = sections
    .filter((s) => s.count > 0)
    .map((s) =>
      [
        '  <sitemap>',
        `    <loc>${SITE_URL}/sitemap/${s.id}.xml</loc>`,
        s.lastmod ? `    <lastmod>${s.lastmod.toISOString().split('T')[0]}</lastmod>` : null,
        '  </sitemap>',
      ]
        .filter(Boolean)
        .join('\n')
    )
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</sitemapindex>`

  return new NextResponse(xml, { headers: { 'Content-Type': 'application/xml' } })
}
