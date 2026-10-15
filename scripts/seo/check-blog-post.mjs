// Checks a rendered blog post against the markdown it was made from.
//
//   node scripts/seo/check-blog-post.mjs <base-url> <post.md>
//
// - exactly one <h1>, equal to the frontmatter h1
// - every ## / ### in the markdown appears as an <h2>/<h3>, in the same order
// - one <table> per markdown table, with the same number of rows
// - every link in the markdown is on the page with the same href; links to
//   nofollow_links domains carry rel="nofollow", others don't; each target
//   answers 200 (matjarx.com links are requested from <base-url>)
// - every JSON-LD block parses; Article is present; FAQPage has one
//   Question per ### under "Frequently asked questions", same text
// - <title> and meta description match the frontmatter

import { readFileSync } from 'node:fs'

const [BASE_ARG, MD] = process.argv.slice(2)
const BASE = BASE_ARG.replace(/\/$/, '')
const raw = readFileSync(MD, 'utf8')
const [, fm, md] = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/.exec(raw)
const field = (k) => (new RegExp(`^${k}:\\s*"?(.*?)"?\\s*$`, 'm').exec(fm) || [])[1]
const slug = field('slug')
const nofollow = JSON.parse((/^nofollow_links:\s*(\[.*\])/m.exec(fm) || [, '[]'])[1])

let failures = 0
const ok = (m) => console.log(`OK   ${m}`)
const fail = (m) => { failures++; console.log(`FAIL ${m}`) }
const check = (cond, m) => (cond ? ok(m) : fail(m))

const decode = (s) => s.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&#x27;|&#39;|&rsquo;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim()
const stripMd = (s) => s.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/\*\*(.+?)\*\*/g, '$1').trim()

const res = await fetch(`${BASE}/blogs/${slug}`)
const html = await res.text()
check(res.status === 200, `/blogs/${slug} returns ${res.status}`)

// Headings.
const h1s = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/g)].map((m) => decode(m[1]))
check(h1s.length === 1 && h1s[0] === field('h1'), `one <h1>: ${JSON.stringify(h1s)}`)
const pageHeadings = [...html.matchAll(/<(h[23])\b[^>]*>([\s\S]*?)<\/\1>/g)].map((m) => `${m[1]} ${decode(m[2])}`)
const mdHeadings = [...md.matchAll(/^(#{2,3}) (.+)$/gm)].map((m) => `${m[1] === '##' ? 'h2' : 'h3'} ${stripMd(m[2])}`)
let cursor = 0
const missing = []
for (const h of mdHeadings) {
  const at = pageHeadings.indexOf(h, cursor)
  if (at === -1) missing.push(h)
  else cursor = at + 1
}
check(missing.length === 0, `${mdHeadings.length} markdown headings appear as h2/h3 in order${missing.length ? ` -- missing/out of order: ${missing.join(' | ')}` : ''}`)
const firstH3 = pageHeadings.findIndex((h) => h.startsWith('h3') && mdHeadings.includes(h))
const firstH2 = pageHeadings.findIndex((h) => h.startsWith('h2') && mdHeadings.includes(h))
check(firstH2 !== -1 && firstH2 < firstH3, 'no h3 before the first h2 (no skipped levels)')

// Tables.
const mdTables = []
let run = 0
for (const l of [...md.split('\n'), '']) {
  if (l.startsWith('|')) { if (!/^\|[\s:|-]+\|$/.test(l.trim())) run++ }
  else if (run) { mdTables.push(run); run = 0 }
}
const pageTables = [...html.matchAll(/<table\b[\s\S]*?<\/table>/g)].map((m) => (m[0].match(/<tr\b/g) || []).length)
check(JSON.stringify(mdTables) === JSON.stringify(pageTables), `tables: markdown rows ${JSON.stringify(mdTables)}, page rows ${JSON.stringify(pageTables)}`)

// Links.
const anchors = [...html.matchAll(/<a\b([^>]*)>/g)].map((m) => ({
  href: (/href="([^"]*)"/.exec(m[1]) || [])[1]?.replace(/&amp;/g, '&'),
  rel: (/rel="([^"]*)"/.exec(m[1]) || [])[1] || '',
}))
const mdLinks = [...md.matchAll(/\[[^\]]+\]\(([^\s)]+)\)/g)].map((m) => m[1])
for (const href of [...new Set(mdLinks)]) {
  const onPage = anchors.filter((a) => a.href === href)
  if (!onPage.length) { fail(`link missing from page: ${href}`); continue }
  const host = new URL(href).hostname.replace(/^www\./, '')
  const wantNofollow = nofollow.some((d) => host === d || host.endsWith(`.${d}`))
  const relOk = onPage.every((a) => /\bnofollow\b/.test(a.rel) === wantNofollow)
  const internal = /(^|\.)matjarx\.com$/.test(host)
  const target = internal ? `${BASE}${new URL(href).pathname}` : href
  let status
  try {
    const r = await fetch(target, { redirect: 'follow', headers: { 'user-agent': 'Mozilla/5.0 (link check)' }, signal: AbortSignal.timeout(20000) })
    status = r.status
  } catch (e) {
    status = `error: ${e.cause?.code || e.message}`
  }
  const line = `${href}  rel="${onPage[0].rel}"  -> ${status}${internal ? ' (local)' : ''}`
  if (status === 200 && relOk) ok(line)
  else fail(`${line}${relOk ? '' : `  (nofollow expected: ${wantNofollow})`}`)
}

// JSON-LD.
const ld = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => m[1])
const parsed = []
for (const block of ld) {
  try { parsed.push(JSON.parse(block)) } catch (e) { fail(`JSON-LD does not parse: ${e.message}`) }
}
const types = parsed.map((p) => p['@type'])
ok(`JSON-LD blocks: ${types.join(', ')}`)
check(types.includes('Article'), 'Article schema present')
const faqPage = parsed.find((p) => p['@type'] === 'FAQPage')
const faqMd = (md.split(/^## Frequently asked questions\s*$/m)[1] || '').split(/^## /m)[0]
const faqQs = [...faqMd.matchAll(/^### (.+)$/gm)].map((m) => stripMd(m[1]))
const schemaQs = faqPage ? faqPage.mainEntity.map((q) => q.name) : []
check(faqPage && JSON.stringify(schemaQs) === JSON.stringify(faqQs), `FAQPage: ${schemaQs.length}/${faqQs.length} questions match the FAQ H3s`)
check(faqPage && faqPage.mainEntity.every((q) => q['@type'] === 'Question' && q.acceptedAnswer?.['@type'] === 'Answer' && q.acceptedAnswer.text.length > 20), 'FAQPage: every Question has an Answer with text')

// Head.
const title = decode((/<title>([\s\S]*?)<\/title>/.exec(html) || [])[1] || '')
const desc = decode((/<meta name="description" content="([^"]*)"/.exec(html) || [])[1] || '')
check(title === field('title'), `<title>: ${title}`)
check(desc === field('meta_description'), `meta description matches frontmatter (${desc.length} chars)`)

console.log(failures ? `\n${failures} failure(s)` : '\nall checks passed')
process.exit(failures ? 1 : 0)
