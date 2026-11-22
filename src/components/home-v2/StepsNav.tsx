'use client'

// Controls for the "Three steps. Seven days." slider. The track itself is
// the .steps element right before this one, made a scroll-snap row in CSS,
// so it swipes natively on touch and still reads as a list without JS.

import { useEffect, useRef, useState } from 'react'

const Chev = ({ d }: { d: 'l' | 'r' }) => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={d === 'l' ? 'm15 18-6-6 6-6' : 'm9 18 6-6-6-6'} /></svg>
)

export default function StepsNav() {
  const me = useRef<HTMLDivElement>(null)
  const [idx, setIdx] = useState(0)
  const [n, setN] = useState(3)
  const [prog, setProg] = useState(0)

  const track = () => me.current?.previousElementSibling as HTMLElement | null

  useEffect(() => {
    const t = track()
    if (!t) return
    t.setAttribute('tabindex', '0')
    t.setAttribute('aria-label', 'How it works, three steps')
    const cards = [...t.children] as HTMLElement[]
    const update = () => {
      const max = t.scrollWidth - t.clientWidth
      setProg(max > 0 ? t.scrollLeft / max : 0)
      // Active card: the one whose left edge is closest to the track's.
      let best = 0, d = Infinity
      cards.forEach((c, i) => { const x = Math.abs(c.offsetLeft - t.offsetLeft - t.scrollLeft); if (x < d) { d = x; best = i } })
      setIdx(max > 0 && t.scrollLeft >= max - 4 ? cards.length - 1 : best)
    }
    const raf = requestAnimationFrame(() => { setN(cards.length); update() })
    t.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)

    // Mouse drag, for desktop (touch already swipes).
    let down = false, sx = 0, sl = 0, moved = false
    const pd = (e: PointerEvent) => { if (e.pointerType !== 'mouse') return; down = true; moved = false; sx = e.clientX; sl = t.scrollLeft; t.classList.add('is-drag') }
    const pm = (e: PointerEvent) => { if (!down) return; const dx = e.clientX - sx; if (Math.abs(dx) > 4) moved = true; t.scrollLeft = sl - dx }
    const pu = () => { if (!down) return; down = false; t.classList.remove('is-drag') }
    const clk = (e: MouseEvent) => { if (moved) { e.preventDefault(); e.stopPropagation() } }
    t.addEventListener('pointerdown', pd)
    window.addEventListener('pointermove', pm)
    window.addEventListener('pointerup', pu)
    t.addEventListener('click', clk, true)
    return () => {
      cancelAnimationFrame(raf)
      t.removeEventListener('scroll', update); window.removeEventListener('resize', update)
      t.removeEventListener('pointerdown', pd); window.removeEventListener('pointermove', pm); window.removeEventListener('pointerup', pu)
      t.removeEventListener('click', clk, true)
    }
  }, [])

  const go = (i: number) => {
    const t = track()
    const c = t?.children[Math.max(0, Math.min(n - 1, i))] as HTMLElement | undefined
    if (t && c) t.scrollTo({ left: c.offsetLeft - t.offsetLeft, behavior: 'smooth' })
  }

  return (
    <div className="hv-sn" ref={me}>
      <span className="hv-sn-c" aria-live="polite">Step <b>{idx + 1}</b> of {n}</span>
      <span className="hv-sn-bar" aria-hidden="true"><i style={{ transform: `scaleX(${Math.max(1 / n, prog)})` }} /></span>
      <button type="button" className="hv-sn-b" onClick={() => go(idx - 1)} disabled={idx === 0} aria-label="Previous step"><Chev d="l" /></button>
      <button type="button" className="hv-sn-b" onClick={() => go(idx + 1)} disabled={idx >= n - 1} aria-label="Next step"><Chev d="r" /></button>
    </div>
  )
}
