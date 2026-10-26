// Checks every live URL in the sitemap against the spec sheet (SEO group 3).
//
//   node scripts/seo/check-metadata.mjs <base-url> [--only=/path,/path]
//
// For every URL in /sitemap.xml (and the child sitemaps it lists), fetched
// from <base-url>:
// - <title> is at most 60 characters, the meta description at most 160
// - exactly one <h1>
// - og:title / twitter:title equal <title>, og:description /
//   twitter:description equal the meta description
// - where the sheet has a row for the URL (src/lib/generated/seo-map.json,
//   written by gen-seo-migration.py from the sheet and the reviewed
//   rewrites): title, description and H1 equal the sheet's values
// Exits 1 on any failure.

import { readFileSync } from 'node:fs'

const args = process.argv.slice(2)
const BASE = args.find((a) => !a.startsWith('--')).replace(/\/$/, '')
const ONLY = (args.find((a) => a.startsWith('--only=')) || '').slice(7).split(',').filter(Boolean)
const MAP = JSON.parse(readFileSync(new URL('../../src/lib/generated/seo-map.json', import.meta.url), 'utf8'))

const decode = (s) => s
  .replace(/<!-- -->/g, '').replace(/<[^>]+>/g, '')
  .replace(/&amp;/g, '&').replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
  .replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim()
const meta = (html, attr, key) => {
  const m = new RegExp(`<meta ${attr}="${key}" content="([^"]*)"`).exec(html)
  return m ? decode(m[1]) : null
}
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

const paths = ONLY.length ? ONLY : await sitemapUrls()
let failures = 0
let checkedAgainstSheet = 0
const fail = (path, msg) => { failures++; console.log(`FAIL ${path}  ${msg}`) }

for (const path of paths) {
  const { status, text: html } = await get(`${BASE}${path}`)
  if (status !== 200) { fail(path, `status ${status}`); continue }
  const head = html.slice(0, html.indexOf('</head>') + 7)
  const title = decode((/<title>([\s\S]*?)<\/title>/.exec(head) || [])[1] || '')
  const desc = meta(head, 'name', 'description') ?? ''
  const h1s = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/g)].map((m) => decode(m[1]))
  const problems = []
  if (!title) problems.push('no <title>')
  if (title.length > 60) problems.push(`title ${title.length} > 60`)
  if (!desc) problems.push('no meta description')
  if (desc.length > 160) problems.push(`description ${desc.length} > 160`)
  if (h1s.length !== 1) problems.push(`${h1s.length} <h1>`)
  if (meta(head, 'property', 'og:title') !== title) problems.push(`og:title ${JSON.stringify(meta(head, 'property', 'og:title'))}`)
  if (meta(head, 'name', 'twitter:title') !== title) problems.push(`twitter:title ${JSON.stringify(meta(head, 'name', 'twitter:title'))}`)
  if (meta(head, 'property', 'og:description') !== desc) problems.push('og:description differs')
  if (meta(head, 'name', 'twitter:description') !== desc) problems.push('twitter:description differs')
  const sheet = MAP[path]
  if (sheet) {
    checkedAgainstSheet++
    if (title !== sheet.title) problems.push(`title ${JSON.stringify(title)} != sheet ${JSON.stringify(sheet.title)}`)
    if (desc !== sheet.description) problems.push(`description != sheet ${JSON.stringify(sheet.description)}`)
    if (h1s.length === 1 && h1s[0] !== sheet.h1) problems.push(`h1 ${JSON.stringify(h1s[0])} != sheet ${JSON.stringify(sheet.h1)}`)
  }
  if (problems.length) fail(path, problems.join('; '))
}

const missing = Object.keys(MAP).filter((p) => !ONLY.length && !paths.includes(p))
for (const p of missing) console.log(`NOTE ${p}  in the sheet but not in the sitemap`)
console.log(`\n${paths.length} URLs checked, ${checkedAgainstSheet} against the sheet, ${failures} failing`)
process.exit(failures ? 1 : 0)
