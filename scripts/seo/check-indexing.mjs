// Group 2 acceptance check: robots meta + sitemap exclusion + real lastmod.
//
//   node scripts/seo/check-indexing.mjs [base-url]   (default https://matjarx.com)
//
// - Every noindex path (the sheet's 59 + /thank-you) renders
//   <meta name="robots" content="noindex, follow">.
// - /ar and /ur render that meta tag AND send X-Robots-Tag: noindex.
// - None of those URLs appears in /sitemap.xml or ANY child sitemap it
//   lists -- every child is fetched, not just the index.
// - Sitemap <lastmod> values are not all identical, and none is "today"
//   for every URL.

import { readFileSync } from 'node:fs'

const BASE = (process.argv[2] || 'https://matjarx.com').replace(/\/$/, '')
const SITE = 'https://matjarx.com'
let failures = 0
const fail = (msg) => { failures++; console.log(`FAIL ${msg}`) }
const ok = (msg) => console.log(`OK   ${msg}`)

const listSrc = readFileSync(new URL('../../src/lib/seo-noindex-list.ts', import.meta.url), 'utf8')
const NOINDEX = [...listSrc.matchAll(/^\s*'([^']+)',/gm)].map((m) => m[1]).concat('/thank-you')
if (NOINDEX.length !== 60) fail(`expected 60 noindex paths, found ${NOINDEX.length}`)

const robotsMeta = (html) =>
  [...html.matchAll(/<meta[^>]+name="robots"[^>]*>/g)].map((m) => (/content="([^"]*)"/.exec(m[0]) || [])[1])

async function get(path) {
  const res = await fetch(BASE + path, { redirect: 'manual' })
  return { status: res.status, headers: res.headers, text: await res.text() }
}

// 1. Robots meta on all 60.
let metaOk = 0
for (const path of NOINDEX) {
  const { status, text } = await get(path)
  const metas = robotsMeta(text)
  if (status === 200 && metas.length === 1 && metas[0] === 'noindex, follow') metaOk++
  else fail(`${path}: status ${status}, robots meta ${JSON.stringify(metas)}`)
}
console.log(`${metaOk === NOINDEX.length ? 'OK  ' : 'FAIL'} robots meta "noindex, follow" on ${metaOk}/${NOINDEX.length} pages`)

// 2. /ar and /ur: meta tag and header.
for (const path of ['/ar', '/ur']) {
  const { status, headers, text } = await get(path)
  const metas = robotsMeta(text)
  const header = headers.get('x-robots-tag') || ''
  if (status === 200 && metas.length === 1 && metas[0] === 'noindex, follow' && /noindex/.test(header)) ok(`${path}: 200, meta ${metas[0]}, header "${header}"`)
  else fail(`${path}: status ${status}, meta ${JSON.stringify(metas)}, header "${header}"`)
}
const internal = await get('/untranslated-home/ur')
if (internal.status === 404) ok('/untranslated-home/ur is not reachable directly (404)')
else fail(`/untranslated-home/ur returned ${internal.status}`)

// 3. Every sitemap.
const index = await get('/sitemap.xml')
const children = [...index.text.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
const entries = []
for (const child of children) {
  const { status, text } = await get(child.replace(SITE, ''))
  if (status !== 200) fail(`${child} returned ${status}`)
  for (const m of text.matchAll(/<url>([\s\S]*?)<\/url>/g)) {
    const loc = (/<loc>([^<]+)<\/loc>/.exec(m[1]) || [])[1]
    const lastmod = (/<lastmod>([^<]+)<\/lastmod>/.exec(m[1]) || [])[1]
    entries.push({ child: child.replace(SITE, ''), loc, lastmod })
  }
}
console.log(`     ${children.length} child sitemaps, ${entries.length} URLs`)
const noindexUrls = new Set(NOINDEX.flatMap((p) => [SITE + p, ...['ar', 'ur'].map((l) => `${SITE}/${l}${p}`)]))
const leaked = entries.filter((e) => noindexUrls.has(e.loc) || /\/(ar|ur)\/?$/.test(e.loc))
if (leaked.length) leaked.forEach((e) => fail(`${e.loc} listed in ${e.child}`))
else ok(`none of the 60 noindex URLs (or /ar, /ur) in any of the ${children.length} child sitemaps`)

// 4. lastmod.
const dates = entries.map((e) => e.lastmod).filter(Boolean)
const distinct = new Set(dates.map((d) => d.slice(0, 10)))
const today = new Date().toISOString().slice(0, 10)
if (distinct.size > 1 && dates.filter((d) => d.startsWith(today)).length < dates.length) {
  ok(`lastmod: ${dates.length}/${entries.length} URLs dated, ${distinct.size} distinct days`)
} else {
  fail(`lastmod: ${distinct.size} distinct day(s) across ${dates.length} URLs`)
}

console.log(failures ? `\n${failures} failure(s)` : '\nall checks passed')
process.exit(failures ? 1 : 0)
