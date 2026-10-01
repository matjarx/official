'use client'

// "In this article" — the rail beside a blog post.
//
// ── Two separate problems, both fixed here ───────────────────────────
// It did not stick. It was written `position: sticky`, it COMPUTED as
// sticky, and it scrolled away anyway, because `overflow-x: hidden` on
// html/body/the page wrapper makes each of them a scroll container and a
// sticky element sticks to its nearest scroll container. That is fixed
// in globals.css (clip, not hidden); this file assumes it.
//
// And it did not look clickable. Six lines of #3B5063 text at 14px, no
// underline, no marker, no hover, no cursor change, stacked under a
// small-caps label. Nothing about it said "these are links" -- which is
// why it read as a summary of the article rather than a way through it.
//
// So: a rule down the left that each item sits against, the active one
// marked in olive with its rule thickened, a hover state, and real
// numbering.
//
// ── Why the active item is not an IntersectionObserver ───────────────
// It was, and the marker went wrong in two ways that only show up once
// you actually scroll a long post. An observer fires on CROSSINGS, so a
// jump -- a hash link, a restored scroll position, a flick on a
// trackpad -- can skip every heading between where you were and where
// you are, and the marker stays on whatever it last saw. And with a
// narrow band nothing is intersecting most of the time, so the answer
// to "which section am I in" was frequently "the last one that happened
// to pass through the band", which on this post meant heading 04
// staying lit from 2,200px to 6,000px.
//
// The question is not "which heading is crossing a line" but "which
// heading did I most recently pass", and that is a scroll position
// compared against a list of offsets. rAF-throttled, so it is one cheap
// read per frame at most.

import { useEffect, useState } from 'react'

export type TocItem = { id: string; text: string }

export default function ArticleToc({ items }: { items: TocItem[] }) {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    if (items.length === 0) return

    // Just under the sticky site header, so a heading becomes current as
    // it settles into place rather than as it touches the top edge.
    const LINE = 120
    let frame = 0

    function update() {
      frame = 0
      const tops = items
        .map((i) => {
          const el = document.getElementById(i.id)
          return el ? { id: i.id, top: el.getBoundingClientRect().top } : null
        })
        .filter((x): x is { id: string; top: number } => !!x)
      if (tops.length === 0) return

      // The last heading that has passed the line. Before the first one
      // does, nothing is marked -- the reader is still in the intro.
      const passed = tops.filter((t) => t.top <= LINE)
      let next = passed.length > 0 ? passed[passed.length - 1].id : ''

      // At the very bottom the final section may never reach the line,
      // because there is not enough page left below it to scroll.
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2
      if (atBottom) next = tops[tops.length - 1].id

      setActiveId(next)
    }

    function onScroll() {
      if (frame) return
      frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [items])

  if (items.length === 0) return null

  return (
    <nav className="glass-card" aria-label="In this article" style={{ padding: '22px 24px 24px', borderRadius: 20 }}>
      <span style={{ display: 'block', fontSize: 11.5, letterSpacing: '1.6px', textTransform: 'uppercase', color: 'var(--olive)', fontWeight: 600, marginBottom: 14 }}>
        In this article
      </span>
      <ol style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column' }}>
        {items.map((t, i) => {
          const active = t.id === activeId
          return (
            <li key={t.id}>
              <a
                href={`#${t.id}`}
                className={`toc-link${active ? ' is-active' : ''}`}
                aria-current={active ? 'true' : undefined}
              >
                <span className="toc-num">{String(i + 1).padStart(2, '0')}</span>
                <span>{t.text}</span>
              </a>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
