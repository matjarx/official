'use client'

// The motion layer. Everything here is progressive: it decorates markup
// that is already complete and readable without JavaScript, and it does
// nothing at all under prefers-reduced-motion (except the nav fold and the
// section rail, which are navigation, not decoration).

import { useEffect, useRef, useState } from 'react'
/* eslint-disable @next/next/no-img-element -- the cursor peek swaps src on hover; next/image would refetch */
import Lenis from 'lenis'

/** Scroll to an element through Lenis when it is running, natively otherwise. */
export function scrollToEl(el: Element | null | undefined, offset = -90) {
  if (!el) return
  const l = (window as unknown as { __hvLenis?: Lenis }).__hvLenis
  if (l) l.scrollTo(el as HTMLElement, { offset })
  else el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

type RailItem = { id: string; n: string; label: string }

const PEEKS: Record<string, string> = {
  '/done-for-you-website': '/home-v2/ccb90c285cdc81228a9ee712af33dabb.webp',
  '/local-national-and-global-seo': '/home-v2/fe653df3c8c0df3b424405d4a7f6d541.webp',
  '/growth-marketing-service': '/home-v2/e8958c627f8aae1a3e2910aaf5e170f5.webp',
  '/pricing': '/home-v2/fdccc8dbf56644e29fc80ce58e97ab17.webp',
  '/website-examples': '/home-v2/7a39a20594d0b3936fd9c3264ef81958.webp',
  '/templates': '/templates/apparel-shop.webp',
  '/complete-website-audit-for-organic-visibility': '/home-v2/67170fd8e4f04246a184c5a123fda372.webp',
}

const lerp = (a: number, b: number, t: number) => a + (b - a) * t

export default function Motion() {
  const [rail, setRail] = useState<RailItem[]>([])
  const [active, setActive] = useState(0)
  const [tone, setTone] = useState<'light' | 'dark'>('light')
  const cursor = useRef<HTMLDivElement>(null)
  const peek = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = document.querySelector<HTMLElement>('.hv2')
    if (!root) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const cleanups: (() => void)[] = []
    root.classList.add('hv-js')
    if (fine) root.classList.add('hv-fine')

    /* ── Smooth (momentum) scrolling — mouse and trackpad only ───────── */
    // Touch devices keep native scrolling, which is already smooth there and
    // which Lenis would only make heavier on low-end phones.
    if (fine && !reduce) {
      const lenis = new Lenis({ lerp: 0.11, wheelMultiplier: 0.95 })
      document.documentElement.classList.add('hv-lenis')
      ;(window as unknown as { __hvLenis?: Lenis }).__hvLenis = lenis
      let lr = 0
      const lf = (t: number) => { lenis.raf(t); lr = requestAnimationFrame(lf) }
      lr = requestAnimationFrame(lf)
      // The menu drawer locks the page by setting overflow on <html>.
      const mo = new MutationObserver(() => {
        if (document.documentElement.style.overflow === 'hidden') lenis.stop(); else lenis.start()
      })
      mo.observe(document.documentElement, { attributes: true, attributeFilter: ['style'] })
      cleanups.push(() => {
        cancelAnimationFrame(lr); mo.disconnect(); lenis.destroy()
        document.documentElement.classList.remove('hv-lenis')
        delete (window as unknown as { __hvLenis?: Lenis }).__hvLenis
      })
    }

    /* ── Section rail (segmentsix) ───────────────────────────────── */
    const secs = [...root.querySelectorAll<HTMLElement>(':scope > section')]
    const items: RailItem[] = []
    secs.forEach((s, i) => {
      const k = s.querySelector('.kick')
      const b = k?.querySelector('b')
      if (!k || !b) return
      if (!s.id) s.id = `s-${i}`
      items.push({ id: s.id, n: b.textContent || '', label: (k.textContent || '').replace(b.textContent || '', '').trim() })
    })
    // Deferred a frame: setting state synchronously in an effect re-renders twice.
    const railRaf = requestAnimationFrame(() => setRail(items))
    cleanups.push(() => cancelAnimationFrame(railRaf))

    /* ── Page colour change (burgundy), done so text stays readable ── */
    // The page takes the colour of whichever section owns the line at 60%
    // of the viewport, easing over .7s. Two rules keep every word legible:
    //  - it switches as soon as the incoming section is 40% onto the
    //    screen, so its heading arrives with its colour, never before it;
    //  - any section whose own colour is the opposite (light vs dark) of
    //    the page's dims its content while it is the one leaving, so dark
    //    text is never left sitting on a dark page, or white on cream.
    // Under reduced motion nothing changes: every section keeps its own
    // background, and the header just reads the colour under it.
    const isDark = (c: string) => {
      const m = c.match(/\d+(\.\d+)?/g)
      if (!m || (m[3] !== undefined && Number(m[3]) === 0)) return false
      const [r, g, b] = m.map(Number)
      return 0.2126 * r + 0.7152 * g + 0.0722 * b < 110
    }
    const base = root.dataset.hvBase || getComputedStyle(root).backgroundColor || 'rgb(252, 250, 243)'
    root.dataset.hvBase = base
    const own = new Map<HTMLElement, string>()
    let prevC = base
    secs.forEach((s) => {
      // Remembered on the element: a second run of this effect (Strict
      // Mode, Fast Refresh) would otherwise read the transparent backgrounds
      // the first run left behind.
      if (!s.dataset.hvBg) {
        const cs = getComputedStyle(s)
        const c = cs.backgroundColor
        // The word marquee has no colour of its own; it bridges its neighbours.
        s.dataset.hvBg = s.classList.contains('hv-wm') ? 'inherit' : (!c || c === 'rgba(0, 0, 0, 0)' ? base : c)
        // Patterned sections (the jaali texture) keep painting themselves.
        if (cs.backgroundImage !== 'none') s.dataset.hvKeep = ''
      }
      const c = s.dataset.hvBg === 'inherit' ? prevC : s.dataset.hvBg!
      own.set(s, c); prevC = c
    })
    root.style.setProperty('--hv-page', own.get(secs[0]) || base)
    let current: HTMLElement | null = null
    const setCurrent = (s: HTMLElement) => {
      if (s === current) return
      current = s
      const c = own.get(s) || base
      root.style.setProperty('--hv-page', c)
      const dark = isDark(c)
      setTone(dark ? 'dark' : 'light')
      root.dataset.tone = dark ? 'dark' : 'light'
      // The word marquee has no colour of its own, so instead of dimming
      // it re-inks with the page (motion.css, [data-tone]).
      if (!reduce) secs.forEach((x) => x.classList.toggle('hv-dim', !x.classList.contains('hv-wm') && isDark(own.get(x) || base) !== dark))
    }
    if (!reduce) root.classList.add('hv-morph')

    const mid = new IntersectionObserver((ents) => {
      ents.forEach((e) => {
        if (!e.isIntersecting) return
        const idx = items.findIndex((it) => it.id === (e.target as HTMLElement).id)
        if (idx >= 0) setActive(idx)
      })
    }, { rootMargin: '-50% 0px -50% 0px' })
    secs.forEach((s) => mid.observe(s))
    cleanups.push(() => { mid.disconnect(); root.classList.remove('hv-morph'); secs.forEach((x) => x.classList.remove('hv-dim')) })

    const pickCurrent = () => {
      const line = window.innerHeight * (reduce ? 0.04 : 0.6)
      for (const s of secs) {
        const r = s.getBoundingClientRect()
        if (r.top <= line && r.bottom > line) { setCurrent(s); return }
      }
    }

    /* ── Folding nav ───────────────────────────── */
    const nav = root.querySelector<HTMLElement>('[data-hv-nav]')
    const hero = root.querySelector<HTMLElement>('.hero')
    let lastY = window.scrollY
    let hoverNav = false
    let forceOpen = false
    nav?.addEventListener('mouseenter', () => { hoverNav = true; delete nav.dataset.folded })
    nav?.addEventListener('mouseleave', () => { hoverNav = false })
    nav?.querySelector('[data-hv-unfold]')?.addEventListener('click', () => { forceOpen = true; if (nav) delete nav.dataset.folded })

    /* ── Hero + editor scroll parallax ───────────────────────────── */
    const frames = [...root.querySelectorAll<HTMLElement>('.hero .bf, .hero .chipf')]
    const speeds = [0.12, 0.2, 0.06, 0.26, 0.16]
    const te = root.querySelector<HTMLElement>('.te')
    const wm = [...root.querySelectorAll<HTMLElement>('[data-hv-wm]')]
    let mx = 0, my = 0, tmx = 0, tmy = 0

    // Re-evaluated on scroll as well as on pointer move: content moving
    // under a still cursor (the stacking template cards) must update it too.
    let hoverCheck = () => {}

    let raf = 0
    const frame = () => {
      raf = 0
      const y = window.scrollY
      const vh = window.innerHeight
      if (nav) {
        nav.toggleAttribute('data-scrolled', y > 30)
        const down = y > lastY + 2
        const up = y < lastY - 2
        if (up) forceOpen = false
        if (down && y > 700 && !hoverNav && !forceOpen) nav.dataset.folded = ''
        else if (up || y < 700) delete nav.dataset.folded
      }
      lastY = y
      pickCurrent()
      if (!reduce) {
        mx = lerp(mx, tmx, 0.12); my = lerp(my, tmy, 0.12)
        // Parallax only where the collage sits beside the copy. Stacked
        // under it (tablet, phone) the frames would drift into the text.
        const wide = window.innerWidth >= 1100
        frames.forEach((f, i) => {
          const sp = speeds[i % speeds.length]
          f.style.translate = wide ? `${(mx * (i + 1) * 4).toFixed(1)}px ${(-y * sp + my * (i + 1) * 4).toFixed(1)}px` : ''
        })
        hoverCheck()
        if (te) {
          const r = te.getBoundingClientRect()
          const p = Math.min(1, Math.max(0, 1 - (r.top - vh * 0.15) / (vh * 0.75)))
          te.style.setProperty('--te-p', p.toFixed(3))
        }
        wm.forEach((row, i) => {
          const r = row.getBoundingClientRect()
          const off = (r.top - vh) * 0.35
          row.style.transform = `translate3d(${i % 2 ? -1200 - off : off}px,0,0)`
        })
        if (Math.abs(mx - tmx) > 0.001 || Math.abs(my - tmy) > 0.001) raf = requestAnimationFrame(frame)
      }
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(frame) }
    frame()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    cleanups.push(() => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); cancelAnimationFrame(raf) })

    if (reduce) return () => cleanups.forEach((c) => c())

    /* ── Hero pointer tilt ───────────────────────────────────────── */
    if (fine && hero) {
      const onMove = (e: PointerEvent) => {
        const r = hero.getBoundingClientRect()
        tmx = ((e.clientX - r.left) / r.width - 0.5) * 2
        tmy = ((e.clientY - r.top) / r.height - 0.5) * 2
        onScroll()
      }
      const onLeave = () => { tmx = 0; tmy = 0; onScroll() }
      hero.addEventListener('pointermove', onMove)
      hero.addEventListener('pointerleave', onLeave)
      cleanups.push(() => { hero.removeEventListener('pointermove', onMove); hero.removeEventListener('pointerleave', onLeave) })
    }

    /* ── Scroll reveals ──────────────────────────────────────────── */
    const groups: [string, string][] = [
      ['section:not(.hero) .kick, section:not(.hero) .h2, section:not(.hero) h2, section:not(.hero) .sub', 'up'],
      ['.thread .bub, .opts > .op, .ledger > *, .rc-grid > *, .steps > .st, .wg2 > *, .plans > .plan, .faq, .xg > *, .qs > *, .stats > div, .tl3 li, .calc', 'up'],
      ['.hv-tpl-card', 'scale'],
    ]
    const io = new IntersectionObserver((ents) => {
      ents.forEach((e) => {
        if (!e.isIntersecting) return
        const el = e.target as HTMLElement
        el.classList.add('in')
        io.unobserve(el)
        // Hand the element's own hover transitions back once it has landed.
        const d = parseInt(el.style.getPropertyValue('--rv-d') || '0', 10)
        setTimeout(() => el.classList.remove('rv', 'rv-up', 'rv-scale', 'in'), 1000 + d)
      })
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 })
    groups.forEach(([sel, kind]) => {
      root.querySelectorAll<HTMLElement>(sel).forEach((el) => {
        if (el.closest('.hero') || el.closest('[data-hv-nav]')) return
        const sibs = el.parentElement ? [...el.parentElement.children].filter((c) => c.matches(sel)) : [el]
        const idx = Math.max(0, sibs.indexOf(el))
        el.classList.add('rv', `rv-${kind}`)
        el.style.setProperty('--rv-d', `${Math.min(idx, 6) * 70}ms`)
        io.observe(el)
      })
    })
    cleanups.push(() => io.disconnect())

    /* ── Count-ups ───────────────────────────────────────────────── */
    const counters = [...root.querySelectorAll<HTMLElement>('.ms-n, .stat4 .n, .chipf.cf2 b, .stats b, .save, .tr-g .tp b')]
    const cio = new IntersectionObserver((ents) => {
      ents.forEach((e) => {
        if (!e.isIntersecting) return
        cio.unobserve(e.target)
        const el = e.target as HTMLElement
        const tn = [...el.childNodes].find((n) => n.nodeType === 3 && /\d/.test(n.textContent || ''))
        if (!tn) return
        const orig = tn.textContent || ''
        const m = orig.match(/^(\D*)([\d,]+(?:\.\d+)?)([\s\S]*)$/)
        if (!m) return
        const target = parseFloat(m[2].replace(/,/g, ''))
        const dec = (m[2].split('.')[1] || '').length
        const comma = m[2].includes(',')
        const t0 = performance.now()
        const dur = 1400
        const step = (t: number) => {
          const p = Math.min(1, (t - t0) / dur)
          const e2 = 1 - Math.pow(1 - p, 3)
          let val = (target * e2).toFixed(dec)
          if (comma) val = Number(val).toLocaleString('en-US')
          tn.textContent = m[1] + val + m[3]
          if (p < 1) requestAnimationFrame(step)
          else tn.textContent = orig
        }
        requestAnimationFrame(step)
      })
    }, { threshold: 0.5 })
    counters.forEach((c) => cio.observe(c))
    cleanups.push(() => cio.disconnect())

    if (!fine) return () => cleanups.forEach((c) => c())

    /* ── Cursor bubble + image peek (miguelrecio) ────────────────── */
    root.querySelectorAll<HTMLElement>('.rc, .fcard, .hero .bf').forEach((el) => { if (!el.dataset.cursor) el.dataset.cursor = 'Open' })
    root.querySelectorAll<HTMLAnchorElement>('.xg a.xc').forEach((a) => {
      const src = PEEKS[a.getAttribute('href') || '']
      if (src) a.dataset.peek = src
    })
    let cx = -100, cy = -100, px = -100, py = -100, crafting = 0
    const cur = cursor.current!
    const pk = peek.current!
    const pkImg = pk.querySelector('img')!
    const loop = () => {
      px = lerp(px, cx, 0.2); py = lerp(py, cy, 0.2)
      cur.style.transform = `translate3d(${cx}px,${cy}px,0)`
      pk.style.transform = `translate3d(${px + 28}px,${py - 90}px,0) rotate(${((cx - px) * 0.08).toFixed(2)}deg)`
      crafting = requestAnimationFrame(loop)
    }
    crafting = requestAnimationFrame(loop)
    const setHover = (el: Element | null) => {
      const t = el?.closest<HTMLElement>('[data-cursor],[data-peek]')
      const label = t?.dataset.cursor
      if (label) { cur.dataset.on = ''; cur.querySelector('span')!.textContent = label } else delete cur.dataset.on
      if (t?.dataset.peek) {
        if (pkImg.getAttribute('src') !== t.dataset.peek) pkImg.setAttribute('src', t.dataset.peek)
        pk.dataset.on = ''
      } else delete pk.dataset.on
    }
    let seen = false
    hoverCheck = () => { if (seen) setHover(document.elementFromPoint(cx, cy)) }
    const onMove = (e: PointerEvent) => {
      cx = e.clientX; cy = e.clientY; seen = true
      setHover(e.target as Element)
    }
    const onOut = (e: PointerEvent) => { if (!e.relatedTarget) { seen = false; setHover(null) } }
    document.addEventListener('pointerout', onOut)
    cleanups.push(() => document.removeEventListener('pointerout', onOut))
    window.addEventListener('pointermove', onMove, { passive: true })
    cleanups.push(() => { window.removeEventListener('pointermove', onMove); cancelAnimationFrame(crafting) })

    /* ── Magnetic buttons ────────────────────────────────────────── */
    root.querySelectorAll<HTMLElement>('.mx-btn--lg, [data-magnetic]').forEach((b) => {
      const mv = (e: PointerEvent) => {
        const r = b.getBoundingClientRect()
        const dx = (e.clientX - r.left - r.width / 2) / (r.width / 2)
        const dy = (e.clientY - r.top - r.height / 2) / (r.height / 2)
        b.style.translate = `${(dx * 6).toFixed(1)}px ${(dy * 5).toFixed(1)}px`
      }
      const lv = () => { b.style.translate = '' }
      b.addEventListener('pointermove', mv)
      b.addEventListener('pointerleave', lv)
      cleanups.push(() => { b.removeEventListener('pointermove', mv); b.removeEventListener('pointerleave', lv) })
    })

    return () => cleanups.forEach((c) => c())
  }, [])

  const goTo = (id: string) => scrollToEl(document.getElementById(id))

  return (
    <>
      <nav className="hv-rail" data-tone={tone} aria-label="Page sections">
        <span className="hv-rail-c" aria-hidden="true">{rail[active]?.n ?? '01'}<small>/{rail.length || 14}</small></span>
        <ol>
          {rail.map((r, i) => (
            <li key={r.id} className={i === active ? 'is-on' : i < active ? 'is-past' : ''}>
              <button type="button" onClick={() => goTo(r.id)} aria-current={i === active ? 'true' : undefined}>
                <i aria-hidden="true" /><span>{r.n}</span><em>{r.label}</em>
              </button>
            </li>
          ))}
        </ol>
      </nav>
      <div className="hv-cursor" ref={cursor} aria-hidden="true"><span>View</span></div>
      <div className="hv-peek" ref={peek} aria-hidden="true"><img alt="" src="/home-v2/ccb90c285cdc81228a9ee712af33dabb.webp" /></div>
    </>
  )
}
