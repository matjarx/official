// Records, for every route under src/app, the date its content last changed
// in git, for the sitemap's <lastmod>. Writes src/lib/generated/route-lastmod.json.
//
// Runs as `prebuild`. A build from a shallow clone (or with no git at all)
// can't see history, and every file would report the clone's one commit --
// so then the committed JSON is kept as it is rather than overwritten with
// a single date. Refresh it from a full clone with: node scripts/seo/gen-lastmod.mjs
//
// ── Which files count as a page's content ─────────────────────────────
// The route's own page.tsx, the section components it imports
// (@/components/<section>/*) and the data files behind both (@/lib/*-data).
// Sitewide modules -- the header, footer, routes, the Supabase client --
// are deliberately not followed: a footer edit would otherwise date every
// page on the site to the same day, which is the problem this replaces.
// Pages that share a data file (63 cities on location-data.ts) still share
// its date; database edits (marketing_content.updated_at) are layered on
// top at request time in lib/marketing-sitemap.ts.
//
// ── Commits that don't change content ────────────────────────────────
// scripts/seo/lastmod-ignore-revs.txt lists commits that touched page files
// without changing what a visitor reads (adding a robots tag to 106 pages,
// say). They are skipped, the way .git-blame-ignore-revs works for blame.

import { execFileSync } from 'node:child_process'
import { existsSync, readdirSync, readFileSync, writeFileSync, mkdirSync, statSync } from 'node:fs'
import { join, dirname, relative } from 'node:path'

const ROOT = process.cwd()
const APP = join(ROOT, 'src/app')
const OUT = join(ROOT, 'src/lib/generated/route-lastmod.json')
const IGNORE_FILE = join(ROOT, 'scripts/seo/lastmod-ignore-revs.txt')

function git(args) {
  return execFileSync('git', args, { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim()
}

let shallow
try {
  shallow = git(['rev-parse', '--is-shallow-repository']) === 'true'
} catch {
  console.warn('[gen-lastmod] no git repository; keeping the committed route-lastmod.json')
  process.exit(0)
}
if (shallow) {
  console.warn('[gen-lastmod] shallow clone, history incomplete; keeping the committed route-lastmod.json')
  process.exit(0)
}

const ignored = new Set(
  existsSync(IGNORE_FILE)
    ? readFileSync(IGNORE_FILE, 'utf8').split('\n').map((l) => l.replace(/#.*/, '').trim()).filter(Boolean)
    : [],
)

/** `@/lib/x-data` -> src/lib/x-data.ts(x), only for the modules that are page content. */
function resolveContentImport(spec) {
  const m = /^@\/(lib\/[\w-]+-data|components\/[\w-]+\/[\w-]+)$/.exec(spec)
  if (!m) return null
  for (const ext of ['.ts', '.tsx']) {
    const p = join(ROOT, 'src', m[1] + ext)
    if (existsSync(p)) return p
  }
  return null
}

function contentFiles(pageFile) {
  const seen = new Set([pageFile])
  const queue = [pageFile]
  while (queue.length) {
    const file = queue.shift()
    const src = readFileSync(file, 'utf8')
    for (const [, spec] of src.matchAll(/from\s+['"]([^'"]+)['"]/g)) {
      const p = resolveContentImport(spec)
      if (p && !seen.has(p)) {
        seen.add(p)
        queue.push(p)
      }
    }
  }
  return [...seen]
}

function lastContentCommit(files) {
  const rel = files.map((f) => relative(ROOT, f))
  const log = git(['log', '--format=%H %cI', '--', ...rel])
  for (const line of log.split('\n')) {
    const [hash, date] = line.split(' ')
    if (hash && !ignored.has(hash)) return date
  }
  return null
}

function pages(dir) {
  const out = []
  for (const name of readdirSync(dir)) {
    const p = join(dir, name)
    if (statSync(p).isDirectory()) {
      if (name === 'api') continue
      out.push(...pages(p))
    } else if (name === 'page.tsx') {
      out.push(p)
    }
  }
  return out
}

const result = {}
for (const page of pages(APP).sort()) {
  const route = '/' + relative(APP, dirname(page)).split('\\').join('/')
  const date = lastContentCommit(contentFiles(page))
  if (date) result[route === '/' ? '/' : route.replace(/\/$/, '')] = new Date(date).toISOString()
}

mkdirSync(dirname(OUT), { recursive: true })
writeFileSync(OUT, JSON.stringify(result, null, 2) + '\n')
console.log(`[gen-lastmod] ${Object.keys(result).length} routes, ${new Set(Object.values(result)).size} distinct dates`)
