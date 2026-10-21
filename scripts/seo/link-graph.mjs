#!/usr/bin/env node
// Body inbound-link counts, crawled from a running build.
//
//   node scripts/seo/link-graph.mjs http://localhost:3100 [out.json]
//
// Crawls every URL in the sitemap, cuts the <header> and <footer> out of
// each page so only a page's own content counts (the method of
// docs/internal-link-graph.md), and counts, per target, how many distinct
// pages link to it. Prints the counts for the money pages in spec group 5.
//
// It also fails if the footer links to a noindexed page (spec group 5,
// item 1), reading the list from src/lib/seo-noindex-list.ts.

import { readFileSync, writeFileSync } from 'node:fs'

const base = (process.argv[2] || 'http://localhost:3100').replace(/\/$/, '')
const out = process.argv[3]

const MAIN = [
  '/', '/done-for-you-website', '/pricing', '/local-national-and-global-seo',
  '/growth-marketing-service', '/concierge-service', '/complete-website-audit-for-organic-visibility',
  '/best-website-builder-pakistan', '/templates', '/website-examples',
  '/website-for-online-stores-ecommerce',
  '/website-design-karachi', '/website-design-lahore', '/website-design-islamabad',
]

async function get(path) {
  const res = await fetch(base + path, { redirect: 'manual' })
  return { status: res.status, text: res.status === 200 ? await res.text() : '' }
}

async function sitemapPaths() {
  const seen = new Set()
  const queue = ['/sitemap.xml']
  const pages = []
  while (queue.length) {
    const p = queue.shift()
    if (seen.has(p)) continue
    seen.add(p)
    const { text } = await get(p)
    for (const [, loc] of text.matchAll(/<loc>([^<]+)<\/loc>/g)) {
      const path = new URL(loc).pathname
      if (path.endsWith('.xml')) queue.push(path)
      else pages.push(path)
    }
  }
  return [...new Set(pages)]
}

function norm(href) {
  if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return null
  let u
  try { u = new URL(href, 'https://matjarx.com') } catch { return null }
  if (u.hostname !== 'matjarx.com' && u.hostname !== 'www.matjarx.com') return null
  const p = u.pathname.replace(/\/+$/, '') || '/'
  return p
}

const cut = (html, tag) => html.replace(new RegExp(`<${tag}[\\s>][\\s\\S]*?</${tag}>`, 'g'), '')
const hrefs = (html) => [...html.matchAll(/<a\b[^>]*?\shref="([^"]*)"/g)].map((m) => norm(m[1].replace(/&amp;/g, '&'))).filter(Boolean)

const pages = await sitemapPaths()
const inbound = new Map()
let footerLinks = []
for (const page of pages) {
  const { status, text } = await get(page)
  if (status !== 200) continue
  if (page === '/') {
    const footer = text.match(/<footer[\s>][\s\S]*?<\/footer>/)?.[0] || ''
    footerLinks = [...new Set(hrefs(footer))]
  }
  const body = cut(cut(text, 'header'), 'footer')
  for (const target of new Set(hrefs(body))) {
    if (target === page) continue
    if (!inbound.has(target)) inbound.set(target, new Set())
    inbound.get(target).add(page)
  }
}

const counts = Object.fromEntries([...inbound].map(([t, s]) => [t, s.size]).sort((a, b) => b[1] - a[1]))
if (out) writeFileSync(out, JSON.stringify({ pages: pages.length, counts }, null, 1))

console.log(`${pages.length} sitemap pages crawled`)
for (const p of MAIN) console.log(String(counts[p] || 0).padStart(5), p)

const noindex = new Set([...readFileSync(new URL('../../src/lib/seo-noindex-list.ts', import.meta.url), 'utf8').matchAll(/'(\/[^']+)'/g)].map((m) => m[1]))
const bad = footerLinks.filter((l) => noindex.has(l))
console.log(`footer: ${footerLinks.length} links, ${bad.length} to noindexed pages${bad.length ? ': ' + bad.join(', ') : ''}`)
if (bad.length) process.exit(1)
