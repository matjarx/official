#!/usr/bin/env node
// Does a change alter what any page renders?
//
// Built for the dark-mode tokenisation, where the entire safety argument is
// "swapping a literal for the variable that holds the same value changes
// nothing". That claim is only worth anything if something checks it across
// every page, because the failure mode is a single colour quietly moving on
// one section of one route.
//
//   node scripts/dom-diff.mjs capture before
//   ...make the change...
//   node scripts/dom-diff.mjs capture after
//   node scripts/dom-diff.mjs compare before after
//
// A CONTROL PASS IS MANDATORY BEFORE TRUSTING A RESULT:
//
//   node scripts/dom-diff.mjs capture control-a
//   node scripts/dom-diff.mjs capture control-b
//   node scripts/dom-diff.mjs compare control-a control-b   -> must be 0
//
// Two captures of unchanged code must come back identical. If they do not,
// the normaliser below is incomplete and a real regression could hide in
// the noise -- a comparison that always passes proves nothing, and so does
// one that always fails.

import { mkdir, writeFile, readFile, readdir } from 'fs/promises'
import { existsSync } from 'fs'
import { createHash } from 'crypto'
import path from 'path'

const BASE = process.env.DIFF_BASE || 'http://localhost:3100'
const ROOT = '.domdiff'
const CONCURRENCY = 6

// ── What legitimately differs between two runs of identical code ────────
//
// Every rule here was added because it fired in a control pass. None is
// speculative: a rule that strips something stable would be hiding real
// changes, which is the one thing this script must not do.
function normalise(html) {
  return html
    // React streams Suspense boundaries and marks them as it goes. A
    // boundary that has not flushed yet is <!--$?-->, a resolved one is
    // <!--$-->. Which you get depends on timing, not on the code, so the
    // same page differs between two runs of the same build.
    .replace(/<!--\$[?!]?-->/g, '<!--$-->')
    .replace(/<!--\/\$-->/g, '')
    // The RSC payload encodes component tree POSITIONS. Adding a wrapper
    // renumbers every id after it, so this is the single noisiest thing in
    // the document and the reason a naive byte diff is useless here.
    .replace(/<script>self\.__next_f\.push\([\s\S]*?\)<\/script>/g, '')
    // Chunk filenames carry content hashes; a rebuild moves them even when
    // nothing rendered changes.
    .replace(/\/_next\/static\/[^"']*/g, '/_next/static/HASH')
    // Build id, and the nonce if CSP is on.
    .replace(/"buildId":"[^"]*"/g, '"buildId":"ID"')
    .replace(/\snonce="[^"]*"/g, '')
    // React's own internal ids for useId(), which are position-derived in
    // the same way the payload is.
    .replace(/«[^»]*»/g, '«ID»')
    // Trailing whitespace only. Interior whitespace is left alone: it can
    // be a real rendering change.
    .split('\n').map((l) => l.replace(/\s+$/, '')).join('\n')
}

async function urls() {
  const xml = await (await fetch(`${BASE}/sitemap.xml`)).text()
  const fromSitemap = [...xml.matchAll(/<loc>([^<]*)<\/loc>/g)].map((m) => m[1].replace(/^https?:\/\/[^/]*/, ''))
  // /home-dark and anything else deliberately kept out of the sitemap.
  const extra = ['/home-dark']
  return [...new Set([...fromSitemap, ...extra])].filter(Boolean).sort()
}

async function capture(label) {
  const dir = path.join(ROOT, label)
  await mkdir(dir, { recursive: true })
  const list = await urls()
  let done = 0, failed = 0
  const queue = [...list]
  const workers = Array.from({ length: CONCURRENCY }, async () => {
    while (queue.length) {
      const u = queue.shift()
      const name = (u === '/' ? '_root' : u.replace(/^\//, '').replace(/\//g, '__')) + '.html'
      try {
        const res = await fetch(BASE + u, { headers: { 'accept': 'text/html' } })
        const body = normalise(await res.text())
        await writeFile(path.join(dir, name), `<!-- status:${res.status} -->\n${body}`)
      } catch (err) {
        failed++
        await writeFile(path.join(dir, name), `<!-- FETCH FAILED: ${err.message} -->`)
      }
      if (++done % 25 === 0) process.stdout.write(`  ${done}/${list.length}\n`)
    }
  })
  await Promise.all(workers)
  console.log(`captured ${done} pages into ${dir}${failed ? ` (${failed} failed)` : ''}`)
}

async function compare(a, b) {
  const da = path.join(ROOT, a), db = path.join(ROOT, b)
  for (const d of [da, db]) if (!existsSync(d)) { console.error(`missing capture: ${d}`); process.exit(2) }
  const fa = new Set(await readdir(da)), fb = new Set(await readdir(db))
  const only = [...[...fa].filter((f) => !fb.has(f)).map((f) => `only in ${a}: ${f}`),
                ...[...fb].filter((f) => !fa.has(f)).map((f) => `only in ${b}: ${f}`)]
  const changed = []
  for (const f of [...fa].filter((x) => fb.has(x)).sort()) {
    const [x, y] = await Promise.all([readFile(path.join(da, f), 'utf8'), readFile(path.join(db, f), 'utf8')])
    if (x === y) continue
    const hx = createHash('sha1').update(x).digest('hex').slice(0, 8)
    const hy = createHash('sha1').update(y).digest('hex').slice(0, 8)
    // First differing CHARACTER, not line. Next renders the whole
    // document on one line, so a line diff says "line 2" for every page
    // and tells you nothing about what actually moved.
    let i = 0
    const n = Math.min(x.length, y.length)
    while (i < n && x[i] === y[i]) i++
    const ctx = (s) => s.slice(Math.max(0, i - 70), i + 70).replace(/\n/g, ' ')
    changed.push({ f, hx, hy, at: i, a: ctx(x), b: ctx(y) })
  }
  only.forEach((o) => console.log('  ' + o))
  for (const c of changed) {
    console.log(`\n  ${c.f}  ${c.hx} -> ${c.hy}   first change at char ${c.at}`)
    console.log(`    - ...${c.a}...`)
    console.log(`    + ...${c.b}...`)
  }
  console.log(`\n${changed.length} of ${fa.size} pages differ${only.length ? `, ${only.length} present in only one capture` : ''}`)
  process.exit(changed.length || only.length ? 1 : 0)
}

const [cmd, ...rest] = process.argv.slice(2)
if (cmd === 'capture') await capture(rest[0] || 'capture')
else if (cmd === 'compare') await compare(rest[0], rest[1])
else { console.error('usage: dom-diff.mjs capture <label> | compare <a> <b>'); process.exit(2) }
