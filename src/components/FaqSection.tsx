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
import { FaqList } from '@/components/FaqList'
import FaqSchema from '@/components/FaqSchema'
import { BUSINESS_PHONE_DISPLAY, TEL_HREF } from '@/lib/contact-details'

/** Shared with FaqSchema, which is where `fromPairs` lives. */
export type Faq = { question: string; answer: string }

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

  const ink = dark ? 'var(--ink-inverse)' : 'var(--ink-1)'
  const body = dark ? 'rgba(var(--ink-inverse-rgb), 0.72)' : 'var(--ink-4)'


  return (
    <section style={{ maxWidth: 1260, margin: '0 auto', padding: '66px 24px 0' }}>
      <FaqSchema faqs={faqs} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: 40, alignItems: 'start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, minWidth: 0 }}>
          <h2 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 'clamp(24px, 4vw, 34px)', lineHeight: 1.14, letterSpacing: '-1.1px', color: ink }}>
            {title}{' '}
            <span style={{ background: 'var(--butter)', padding: '0 8px', borderRadius: 3, color: 'var(--ink-on-butter)' }}>{titleMark}</span>
          </h2>
          <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: body }}>{intro}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5, paddingTop: 6 }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: ink }}>Still have questions?</span>
            <a href={TEL_HREF} style={{ fontSize: 14, fontWeight: 600, color: dark ? 'var(--moss-light)' : 'var(--olive)' }}>Call us: {BUSINESS_PHONE_DISPLAY}</a>
            <a href="mailto:office@matjarx.com" style={{ fontSize: 14, fontWeight: 600, color: dark ? 'var(--moss-light)' : 'var(--olive)' }}>office@matjarx.com</a>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, minWidth: 0 }}>
          <FaqList
            items={faqs.map((f) => ({ q: f.question, a: f.answer }))}
            openIdx={open}
            onToggle={setOpen}
            dark={dark}
          />
        </div>
      </div>
    </section>
  )
}
