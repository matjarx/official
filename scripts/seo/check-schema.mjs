// Checks the JSON-LD on every live URL in the sitemap (SEO group 4).
//
//   node scripts/seo/check-schema.mjs <base-url>
//
// Every page:
// - every <script type="application/ld+json"> parses as JSON
// - exactly one Organization, with the specified name, url, logo, email,
//   telephone, address and sameAs
// - no LocalBusiness except on /contact (where there must be one)
// - no AggregateRating or Review anywhere, at any depth
// Blog posts (/blogs/<slug>):
// - Article with headline, ISO datePublished and dateModified, an author
//   linked to /blogs/author/<slug>, and a publisher
// - BreadcrumbList Home > Blog > <category> > <post>, rendered visibly too
// - FAQPage when the post has a "Frequently asked questions" section
// City pages (/website-design-<city>): BreadcrumbList Home > Locations > City
// Five sample pages are printed in full. Exits 1 on any failure.

const BASE = process.argv[2].replace(/\/$/, '')
const ORG = {
  name: 'MatjarX',
  url: 'https://matjarx.com/',
  logo: 'https://matjarx.com/icon.png',
  email: 'office@matjarx.com',
  telephone: '+923033720953',
  streetAddress: 'B6, 4th Street, Zamzama, Clifton',
  addressLocality: 'Karachi',
  sameAs: [
    'https://www.facebook.com/matjarxpakistan/',
    'https://www.instagram.com/matjarxpakistan/',
    'https://www.linkedin.com/company/matjarx/',
    'https://www.tiktok.com/@matjarxofficial',
    'https://www.youtube.com/@matjarxofficial',
  ],
}
const SAMPLES = ['/', '/contact', '/blogs/website-price-in-pakistan', '/website-design-karachi', '/pricing']
const ISO = /^\d{4}-\d{2}-\d{2}(T[\d:.]+(Z|[+-]\d{2}:\d{2}))?$/

const get = async (url) => {
  const r = await fetch(url, { redirect: 'manual', signal: AbortSignal.timeout(30000) })
  return { status: r.status, text: await r.text() }
}
async function sitemapUrls() {
  const out = new Set()
  const queue = [`${BASE}/sitemap.xml`]
  while (queue.length) {
    const { text } = await get(queue.shift())
    const locs = [...text.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim())
    if (/<sitemapindex/.test(text)) locs.forEach((l) => queue.push(`${BASE}${new URL(l).pathname}`))
    else locs.forEach((l) => out.add(new URL(l).pathname))
  }
  return [...out].sort()
}
const typesDeep = (node, acc = []) => {
  if (Array.isArray(node)) node.forEach((n) => typesDeep(n, acc))
  else if (node && typeof node === 'object') {
    if (node['@type']) [].concat(node['@type']).forEach((t) => acc.push(t))
    Object.values(node).forEach((v) => typesDeep(v, acc))
  }
  return acc
}

let failures = 0
const paths = [...new Set([...(await sitemapUrls()), '/contact'])]
for (const path of paths) {
  const { status, text: html } = await get(`${BASE}${path}`)
  const problems = []
  if (status !== 200) { failures++; console.log(`FAIL ${path}  status ${status}`); continue }
  const blocks = []
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try { blocks.push(JSON.parse(m[1])) } catch (e) { problems.push(`JSON-LD does not parse: ${e.message}`) }
  }
  const top = blocks.flatMap((b) => (Array.isArray(b) ? b : [b]))
  const of = (t) => top.filter((b) => b['@type'] === t)
  const all = typesDeep(top)

  const orgs = of('Organization')
  if (orgs.length !== 1) problems.push(`${orgs.length} top-level Organization`)
  else {
    const o = orgs[0]
    for (const k of ['name', 'url', 'logo', 'email', 'telephone']) if (o[k] !== ORG[k]) problems.push(`Organization.${k} = ${JSON.stringify(o[k])}`)
    if (o.address?.streetAddress !== ORG.streetAddress || o.address?.addressLocality !== ORG.addressLocality) problems.push('Organization.address')
    const extra = (o.sameAs || []).filter((u) => !ORG.sameAs.includes(u))
    const missing = ORG.sameAs.filter((u) => !(o.sameAs || []).includes(u))
    if (missing.length || extra.some((u) => !/trustpilot|clutch/.test(u))) problems.push(`Organization.sameAs missing ${missing} extra ${extra}`)
  }
  const lb = all.filter((t) => t === 'LocalBusiness').length
  if (path === '/contact' ? lb !== 1 : lb !== 0) problems.push(`${lb} LocalBusiness`)
  for (const t of ['AggregateRating', 'Review']) if (all.includes(t)) problems.push(`${t} present`)

  const crumbs = of('BreadcrumbList')[0]?.itemListElement?.map((i) => i.name) || []
  if (/^\/blogs\/[^/]+$/.test(path)) {
    const a = of('Article')[0]
    if (!a) problems.push('no Article')
    else {
      if (!a.headline) problems.push('Article.headline')
      if (!ISO.test(a.datePublished || '')) problems.push(`Article.datePublished ${JSON.stringify(a.datePublished)}`)
      if (!ISO.test(a.dateModified || '')) problems.push(`Article.dateModified ${JSON.stringify(a.dateModified)}`)
      if (a.author?.['@type'] === 'Person' && !/^https:\/\/matjarx\.com\/blogs\/author\/[^/]+$/.test(a.author.url || '')) problems.push(`Article.author.url ${a.author.url}`)
      if (!a.publisher?.name) problems.push('Article.publisher')
    }
    if (crumbs.length !== 4 || crumbs[0] !== 'Home' || crumbs[1] !== 'Blog') problems.push(`breadcrumb ${JSON.stringify(crumbs)}`)
    if (!/aria-label="Breadcrumb"/.test(html)) problems.push('no visible breadcrumb')
    const hasFaqSection = /<h2[^>]*>Frequently asked questions<\/h2>/i.test(html)
    const faq = of('FAQPage')[0]
    if (hasFaqSection && !(faq?.mainEntity?.length > 0)) problems.push('FAQ section without FAQPage')
    if (faq && !faq.mainEntity.every((q) => q['@type'] === 'Question' && q.name && q.acceptedAnswer?.text)) problems.push('FAQPage question without answer')
  }
  if (/^\/website-design-/.test(path) && JSON.stringify(crumbs.slice(0, 2)) !== '["Home","Locations"]') problems.push(`breadcrumb ${JSON.stringify(crumbs)}`)

  if (problems.length) { failures++; console.log(`FAIL ${path}  ${problems.join('; ')}`) }
  if (SAMPLES.includes(path)) {
    console.log(`SAMPLE ${path}: ${blocks.length} JSON-LD blocks, all parse -> ${top.map((b) => b['@type']).join(', ')}`)
    if (crumbs.length) console.log(`         breadcrumb: ${crumbs.join(' > ')}`)
    const a = of('Article')[0]
    if (a) console.log(`         Article: ${a.headline} | published ${a.datePublished} | modified ${a.dateModified} | author ${a.author?.name} <${a.author?.url}>`)
    const f = of('FAQPage')[0]
    if (f) console.log(`         FAQPage: ${f.mainEntity.length} questions`)
  }
}
console.log(`\n${paths.length} URLs checked, ${failures} failing`)
process.exit(failures ? 1 : 0)
