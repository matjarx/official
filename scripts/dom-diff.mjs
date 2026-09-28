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
// RESOLVE_VARS=1 rewrites var(--token) back to the value :root gives it
// before comparing.
//
// Needed for the tokenisation pass, where the rendered HTML legitimately
// changes -- an inline style says var(--ink-1) where it used to say
// #04121F -- while the COLOUR must not. Resolving makes the two captures
// comparable again, and still catches the failure that matters: swap in
// the wrong token and it resolves to a different hex, so the diff fires.
//
// It reads :root only. A token's .dark-theme value is not a name for that
// colour in light mode.
const RESOLVE = process.env.RESOLVE_VARS === '1'
let ROOT_VARS = null
async function rootVars() {
  if (ROOT_VARS) return ROOT_VARS
  const css = await readFile('src/app/globals.css', 'utf8')
  const open = css.indexOf('{', css.indexOf(':root'))
  let d = 0, j = open
  for (;; j++) { if (css[j] === '{') d++; else if (css[j] === '}') d--; if (d === 0) break }
  ROOT_VARS = new Map()
  for (const m of css.slice(open, j).matchAll(/--([a-z0-9-]+)\s*:\s*([^;]+);/g)) {
    ROOT_VARS.set('--' + m[1], m[2].trim())
  }
  return ROOT_VARS
}
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
    // Next fingerprints the generated OG image per BUILD, so this moves on
    // every rebuild even when nothing rendered changed. Note the trade-off:
    // it also hides a genuine change to the OG image itself, which this
    // harness does not check anyway (it compares HTML, not rendered PNGs).
    .replace(/opengraph-image\?[0-9a-f]+/g, 'opengraph-image?HASH')
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
  const vars = RESOLVE ? await rootVars() : new Map()
  const only = [...[...fa].filter((f) => !fb.has(f)).map((f) => `only in ${a}: ${f}`),
                ...[...fb].filter((f) => !fa.has(f)).map((f) => `only in ${b}: ${f}`)]
  const changed = []
  for (const f of [...fa].filter((x) => fb.has(x)).sort()) {
    // Applied here as well as at capture time, so a baseline taken before
    // a rule existed is still comparable without recapturing it -- the old
    // build it came from is gone.
    const late = (t) => {
      t = t.replace(/opengraph-image\?[0-9a-f]+/g, 'opengraph-image?HASH')
      // Three kinds of framework noise, each caught by capturing the SAME
      // build twice and seeing it move. None is content:
      //
      //   next-size-adjust  an empty Next font meta that is emitted or not
      //                     depending on when the font loader resolves
      //   <!-- -->          React's text-node separator, invisible, and it
      //                     appeared in OPPOSITE directions on two similar
      //                     pages in one run
      //   preload links     resource hints, emitted in varying order and
      //                     completeness; they are not rendered content
      t = t.replace(/<meta name="next-size-adjust"[^>]*\/?>/g, '')
      t = t.replace(/<!-- -->/g, '')
      t = t.replace(/<link rel="preload"[^>]*\/?>/g, '')
      // Resolution must apply to BOTH sides. The layout already used
      // var(--cream) before any of this, so resolving only the newer
      // capture reports every such style as a change.
      if (RESOLVE) {
        t = t.replace(/var\((--[a-z0-9-]+)\)/g, (all, n) => vars.get(n) ?? all)
        // rgba(var(--ink-1-rgb), 0.09) resolves to rgba(4,18,31, 0.09):
        // the same colour written with one more space than the literal it
        // replaced. Whitespace inside a colour function is not content.
        t = t.replace(/rgba?\([^)]*\)/g, (m) => m.replace(/\s+/g, ''))
      }
      return t
    }
    const [x, y] = (await Promise.all([readFile(path.join(da, f), 'utf8'), readFile(path.join(db, f), 'utf8')])).map(late)
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
