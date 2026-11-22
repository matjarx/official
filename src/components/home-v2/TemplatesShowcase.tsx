'use client'

// Templates, in the manner of ksenpanchenko.com's "Selected work": a sticky
// numbered index on the left that follows the reader, beside a deck of
// cards that stick and stack as they scroll past. The active index entry
// is whichever card currently sits on top of the deck.

 
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export type ShowcaseItem = {
  name: string
  blurb: string
  tags: string[]
  img: string
  href: string
  plan: string | null
  /** The theme's live preview address, framed at phone size on phones. */
  mobile: string | null
  /** A captured screenshot of that live mobile page, shown until tapped. */
  mobileShot: string | null
}

// Desktop and tablet: a deck of 1920 × 1080 cards showing each theme's
// screenshot. Phones: one phone mock-up with a swipeable slider inside it,
// each slide the live theme at a real 390 × 844 viewport (PhoneSlider).

/** Space between stacked cards in the flow (matches the CSS gap). */
const GAP = 48

const Arrow = () => (
  <svg className="ic ic-arrow" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
)

export default function TemplatesShowcase({ items, live = false }: { items: ShowcaseItem[]; live?: boolean }) {
  const [active, setActive] = useState(0)
  const cards = useRef<(HTMLAnchorElement | null)[]>([])

  useEffect(() => {
    let raf = 0
    const tick = () => {
      raf = 0
      const els = cards.current
      let a = 0
      els.forEach((el, i) => {
        if (!el) return
        const stickTop = parseFloat(el.style.top) || 0
        const r = el.getBoundingClientRect()
        // On top of the deck = stuck at (or past) its sticky line.
        if (r.top <= stickTop + 8) a = i
        // How far the NEXT card has slid over this one, 0..1, drives the
        // covered card's scale-down so the deck reads as a stack.
        const next = els[i + 1]
        let cover = 0
        if (next) {
          const nr = next.getBoundingClientRect()
          cover = Math.min(1, Math.max(0, 1 - (nr.top - stickTop) / r.height))
        }
        el.style.setProperty('--cover', cover.toFixed(3))
      })
      setActive(a)
    }
    const on = () => { if (!raf) raf = requestAnimationFrame(tick) }
    tick()
    window.addEventListener('scroll', on, { passive: true })
    window.addEventListener('resize', on)
    return () => {
      window.removeEventListener('scroll', on)
      window.removeEventListener('resize', on)
      cancelAnimationFrame(raf)
    }
  }, [])

  // A stuck card's own position is its sticky line, so scroll to where it
  // sits in the flow instead: the deck's top plus the cards before it.
  const go = (i: number) => {
    const el = cards.current[i]
    if (!el) return
    const deck = el.parentElement as HTMLElement
    const prev = cards.current.slice(0, i).reduce((h, c) => h + (c ? c.offsetHeight + GAP : 0), 0)
    const y = deck.getBoundingClientRect().top + window.scrollY + prev - (110 + i * 14)
    const l = (window as unknown as { __hvLenis?: { scrollTo: (y: number) => void } }).__hvLenis
    if (l) l.scrollTo(y); else window.scrollTo({ top: y, behavior: 'smooth' })
  }
  const cur = items[active]

  return (
    <section data-z="tpl" className="hv-tpl sec on-dark" aria-labelledby="hv-tpl-h">
      <div className="wrap hv-tpl-g">
        <div className="hv-tpl-side">
          <div className="stick-h">
            <p className="kick"><b>07</b>Templates</p>
            <h2 className="h2" id="hv-tpl-h">Start from a design <em>made for your trade.</em></h2>
            <Link prefetch={false} className="hv-tpl-all" href="/templates">All templates <Arrow /></Link>
          </div>
          <ol className="hv-tpl-idx">
            {items.map((t, i) => (
              <li key={t.name} className={i === active ? 'is-on' : ''}>
                <button type="button" onClick={() => go(i)} aria-current={i === active ? 'true' : undefined}>
                  <span className="n">{String(i + 1).padStart(2, '0')}</span>
                  <span className="t">{t.name}</span>
                  <i aria-hidden="true" />
                </button>
              </li>
            ))}
          </ol>
          {cur && (
            <div className="hv-tpl-now" key={cur.name}>
              <p>{cur.blurb}</p>
              {cur.tags.length > 0 && <div className="tags">{cur.tags.slice(0, 4).map((t) => <span key={t}>{t}</span>)}</div>}
            </div>
          )}
          <Link prefetch={false} className="mx-btn mx-btn--dark" href="/templates">Browse all templates <Arrow /></Link>
        </div>

        <PhoneSlider items={items} live={live} />

        <div className="hv-tpl-deck">
          {items.map((t, i) => (
              <Link prefetch={false} key={t.name} className="hv-tpl-card" href={t.href} data-cursor="View" ref={(el) => { cards.current[i] = el }} style={{ top: `${110 + i * 14}px` }}>
                <span className="screen">
                  <span className="bar"><i /><i /><i /><span>{t.name} · 1920 × 1080</span></span>
                  <span className="view"><Image src={t.img} alt={`${t.name} website template preview`} fill sizes="(max-width: 1099px) 92vw, 700px" quality={70} /></span>
                </span>
                <span className="meta">
                  <span className="n">{String(i + 1).padStart(2, '0')}</span>
                  <span className="nm">{t.name}</span>
                  {t.plan && <span className="pl">From {t.plan}</span>}
                  <span className="go"><Arrow /></span>
                </span>
              </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Phones: one phone, the templates slide inside it ─────────────────── */
function PhoneSlider({ items, live }: { items: ShowcaseItem[]; live: boolean }) {
  const [idx, setIdx] = useState(0)
  // Slides switched to the live site. A slide shows its captured mobile
  // screenshot (~20 KB, instant) until the reader taps "Try it live"; the
  // live site is a whole website and takes several seconds on a phone.
  const [liveOn, setLiveOn] = useState<Set<number>>(() => new Set())
  const track = useRef<HTMLDivElement>(null)
  // Where a tap is heading, so a second quick tap counts from there rather
  // than from the slide still sliding out.
  const tgt = useRef<number | null>(null)
  const anim = useRef(0)

  useEffect(() => {
    const t = track.current
    if (!t) return
    let settle: ReturnType<typeof setTimeout> | undefined
    const on = () => {
      const w = Math.max(1, t.clientWidth)
      setIdx(Math.round(t.scrollLeft / w))
      clearTimeout(settle)
      settle = setTimeout(() => { tgt.current = null }, 180)
    }
    t.addEventListener('scroll', on, { passive: true })
    return () => { t.removeEventListener('scroll', on); clearTimeout(settle) }
  }, [])

  const step = (d: number) => {
    const t = track.current
    if (!t) return
    const n = ((tgt.current ?? idx) + d + items.length) % items.length
    tgt.current = n
    // Animated by hand, with snapping paused for the move: native smooth
    // scrolling inside a snap container is unreliable across browsers.
    cancelAnimationFrame(anim.current)
    const from = t.scrollLeft
    const to = n * t.clientWidth
    const dur = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 420
    const t0 = performance.now()
    t.style.scrollSnapType = 'none'
    const tick = (now: number) => {
      const p = dur ? Math.min(1, (now - t0) / dur) : 1
      t.scrollLeft = from + (to - from) * (1 - Math.pow(1 - p, 3))
      if (p < 1) anim.current = requestAnimationFrame(tick)
      else { t.style.scrollSnapType = ''; tgt.current = null; setIdx(n) }
    }
    anim.current = requestAnimationFrame(tick)
  }
  const cur = items[idx] ?? items[0]
  const canLive = live && !!cur?.mobile && !liveOn.has(idx)

  return (
    <div className="hv-ps" aria-roledescription="carousel" aria-label="Template previews on a phone">
      <div className="hv-ps-phone">
        <span className="hv-ps-notch" aria-hidden="true" />
        <div className="hv-ps-track" ref={track}>
          {items.map((t, i) => (
            <div key={t.name} className="hv-ps-slide" role="group" aria-roledescription="slide" aria-label={`${i + 1} of ${items.length}: ${t.name}`}>
              {/* Both always present, so the slider never changes shape
                  mid-swipe; going live only sets the frame's src. */}
              {t.mobileShot
                ? <Image src={t.mobileShot} alt={`${t.name} on a phone`} fill sizes="270px" />
                : <Image src={t.img} alt={`${t.name} preview`} fill sizes="270px" quality={60} style={{ objectFit: 'cover', objectPosition: '0 0' }} />}
              {live && t.mobile && (
                <iframe src={liveOn.has(i) ? t.mobile : undefined} title={`${t.name}, live on a phone`} scrolling="no" tabIndex={-1} />
              )}
            </div>
          ))}
        </div>
        {canLive && (
          <button type="button" className="hv-ps-live" onClick={() => setLiveOn((p) => new Set([...p, idx]))}>
            <i aria-hidden="true" />Try it live
          </button>
        )}
      </div>
      <div className="hv-ps-meta">
        <button type="button" className="hv-ps-b" onClick={() => step(-1)} aria-label="Previous template">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6" /></svg>
        </button>
        <div className="hv-ps-info" aria-live="polite">
          <span className="n">{String(idx + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}</span>
          <span className="nm">{cur?.name}</span>
          <span className="dots" aria-hidden="true">{items.map((t, i) => <i key={t.name} className={i === idx ? 'on' : ''} />)}</span>
        </div>
        <button type="button" className="hv-ps-b" onClick={() => step(1)} aria-label="Next template">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6" /></svg>
        </button>
      </div>
      {cur && <Link prefetch={false} className="mx-btn mx-btn--dark mx-btn--block" href={cur.href}>View {cur.name} <Arrow /></Link>}
    </div>
  )
}
