'use client'

// The FAQ block, in the shape /pricing established: a column of framing
// on the left — heading, one line, and how to reach a person — and the
// accordion on the right.
//
// ── Why every page gets one ──────────────────────────────────────────
// Eleven pages had an FAQ and nine did not, including all four service
// pages, all 42 comparison pages, /alternatives, /website-examples and
// /become-a-partner. Each of those is a page somebody lands on from
// search with a specific question, and the answer was a phone call away
// rather than on the page.
//
// ── And why it emits schema ──────────────────────────────────────────
// Of the pages that DID have one, only the plans, industries, cities and
// /faqs emitted FAQPage JSON-LD. /pricing, the homepage, /features,
// /videos and the rest rendered the questions and told Google nothing
// about them. It is the same array; emitting it costs one script tag.
//
// The schema goes out even before a visitor opens an answer, which is
// the point — an accordion's closed panels are still in the DOM, and
// Google reads them.

import { useState } from 'react'

export type Faq = { question: string; answer: string }

/** `[question, answer]` pairs, which is how most of the data files store them. */
export function pairsToFaqs(pairs: [string, string][]): Faq[] {
  return pairs.map(([question, answer]) => ({ question, answer }))
}

export default function FaqSection({
  faqs,
  title = 'Frequently asked',
  titleMark = 'questions',
  intro = 'Everything you need to use MatjarX like a pro.',
  dark = false,
}: {
  faqs: Faq[]
  title?: string
  /** Rendered on the butter highlight, after `title`. */
  titleMark?: string
  intro?: string
  dark?: boolean
}) {
  const [open, setOpen] = useState(0)
  if (faqs.length === 0) return null

  const ink = dark ? '#FFFFFF' : '#04121F'
  const body = dark ? 'rgba(255,255,255,0.72)' : '#435A70'
  const chev = dark ? 'rgba(255,255,255,0.6)' : '#5A6F82'

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  }

  return (
    <section style={{ maxWidth: 1260, margin: '0 auto', padding: '66px 24px 0' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: 40, alignItems: 'start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, minWidth: 0 }}>
          <h2 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 'clamp(24px, 4vw, 34px)', lineHeight: 1.14, letterSpacing: '-1.1px', color: ink }}>
            {title}{' '}
            <span style={{ background: 'var(--butter)', padding: '0 8px', borderRadius: 3, color: '#04121F' }}>{titleMark}</span>
          </h2>
          <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: body }}>{intro}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5, paddingTop: 6 }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: ink }}>Still have questions?</span>
            <a href="tel:+923033720953" style={{ fontSize: 14, fontWeight: 600, color: dark ? 'var(--moss-light)' : 'var(--olive)' }}>Call us: +92 303 372 0953</a>
            <a href="mailto:office@matjarx.com" style={{ fontSize: 14, fontWeight: 600, color: dark ? 'var(--moss-light)' : 'var(--olive)' }}>office@matjarx.com</a>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, minWidth: 0 }}>
          {faqs.map((q, i) => {
            const isOpen = open === i
            return (
              <div key={q.question} className="glass-card" style={{ borderRadius: 16, overflow: 'hidden' }}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  style={{ all: 'unset', cursor: 'pointer', boxSizing: 'border-box', width: '100%', display: 'flex', alignItems: 'center', gap: 14, padding: '18px 20px' }}
                >
                  <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 15, color: '#04121F', marginRight: 'auto', textAlign: 'left' }}>{q.question}</span>
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke={chev} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flex: '0 0 auto', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 200ms ease' }}><path d="m6 9 6 6 6-6" /></svg>
                </button>
                {isOpen && <p style={{ margin: 0, padding: '0 20px 20px', fontSize: 14.5, lineHeight: 1.65, color: '#435A70' }}>{q.answer}</p>}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
