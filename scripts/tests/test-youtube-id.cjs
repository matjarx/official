// youTubeId, against every URL shape a person actually pastes.
//
//   node scripts/tests/test-youtube-id.cjs
//
// The function is lifted out of the .tsx and its type annotations stripped,
// rather than imported, because this repo has no TS test runner and adding
// one to test a 20-line pure function would be the larger change. If the
// signature in YouTubeEmbed.tsx changes, the extraction below fails loudly
// rather than silently testing nothing.

const fs = require('fs')
const path = require('path')

const src = fs.readFileSync(
  path.join(__dirname, '../../src/components/videos/YouTubeEmbed.tsx'), 'utf8')
const m = src.match(/export function youTubeId[\s\S]*?\n\}/)
if (!m) { console.error('FAIL: could not find youTubeId in YouTubeEmbed.tsx'); process.exit(1) }
const body = m[0]
  .replace('export function youTubeId(url: string | undefined | null): string | null', 'function youTubeId(url)')
  .replace('let u: URL', 'let u')
const youTubeId = new Function(`${body}; return youTubeId`)()

let pass = 0, fail = 0
const is = (name, actual, expected) => {
  if (actual === expected) { pass++; return }
  fail++
  console.error(`FAIL ${name}\n  expected ${expected}\n  actual   ${actual}`)
}

const ID = 'dQw4w9WgXcQ'

// ── Shapes "copy link" actually produces ─────────────────────────────────
is('watch?v=',            youTubeId(`https://www.youtube.com/watch?v=${ID}`), ID)
is('watch + timestamp',   youTubeId(`https://www.youtube.com/watch?v=${ID}&t=42s&list=PLx`), ID)
is('youtu.be',            youTubeId(`https://youtu.be/${ID}`), ID)
is('youtu.be + t',        youTubeId(`https://youtu.be/${ID}?t=8`), ID)
is('/embed/',             youTubeId(`https://www.youtube.com/embed/${ID}`), ID)
is('/shorts/',            youTubeId(`https://www.youtube.com/shorts/${ID}`), ID)
is('/live/',              youTubeId(`https://www.youtube.com/live/${ID}`), ID)
is('nocookie host',       youTubeId(`https://www.youtube-nocookie.com/embed/${ID}`), ID)
is('m. subdomain',        youTubeId(`https://m.youtube.com/watch?v=${ID}`), ID)
is('no scheme',           youTubeId(`youtube.com/watch?v=${ID}`), ID)
is('bare id',             youTubeId(ID), ID)
is('surrounding spaces',  youTubeId(`  https://youtu.be/${ID}  `), ID)

// ── Must NOT match, or the card renders a dead player ────────────────────
// A lookalike domain is the one that matters: a naive `includes('youtube')`
// would accept it and embed an attacker's host in the page.
is('lookalike host',      youTubeId(`https://notyoutube.com/watch?v=${ID}`), null)
is('instagram reel',      youTubeId('https://www.instagram.com/reel/Cabc123/'), null)
is('vimeo',               youTubeId('https://vimeo.com/123456789'), null)
is('channel url',         youTubeId('https://www.youtube.com/@matjarx'), null)
is('youtube homepage',    youTubeId('https://www.youtube.com/'), null)
is('id one char short',   youTubeId('dQw4w9WgXc'), null)
is('plain text',          youTubeId('coming soon'), null)
is('empty string',        youTubeId(''), null)
is('undefined',           youTubeId(undefined), null)

console.log(`${pass} passed, ${fail} failed`)
if (fail) process.exit(1)
