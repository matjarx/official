'use client'

// The enquiry form, once.
//
// /contact and /help each carried their own copy — same five fields, same
// topic chips, same marketing_leads insert, same thank-you redirect, same
// privacy line. They differed in the wrapper's styling, the heading copy,
// the word above the chips and the label on the message box, and in
// nothing else. Two copies of a form that writes to the database is how
// one of them quietly stops matching the table.
//
// ── Why every field now has a `name` ─────────────────────────────────
// Not one of the nineteen form fields on this site had a `name` or an
// `id`. Chrome reports it ("A form field element should have an id or
// name attribute") and it is not cosmetic: without a name, and without
// autocomplete, the browser cannot offer a saved name, phone or email.
// Every visitor to a lead form was being asked to type their own contact
// details out by hand on a phone. The labels wrap their inputs, so the
// accessible name was always fine — this is purely about autofill.

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { trackEvent } from '@/lib/analytics'
import { routes } from '@/lib/routes'

const LABEL: React.CSSProperties = {
  fontSize: 11.5,
  letterSpacing: '1.2px',
  textTransform: 'uppercase',
  color: 'var(--ink-muted)',
  fontWeight: 600,
}
const FIELD: React.CSSProperties = { display: 'flex', flexDirection: 'column', gap: 7 }

export default function LeadForm({
  source,
  topics,
  topicLabel,
  heading,
  intro,
  headingStyle,
  messageLabel,
  messagePlaceholder,
  className,
  style,
  submitClassName,
  chipBg,
}: {
  /** Written to marketing_leads.source, and the ?source= on /thank-you. */
  source: string
  topics: readonly string[]
  topicLabel: string
  heading: string
  intro: string
  headingStyle: React.CSSProperties
  messageLabel: string
  messagePlaceholder: string
  className?: string
  style?: React.CSSProperties
  submitClassName: string
  /** The unselected chip's fill. /contact sits on white and uses
   *  --surface; /help sits on --cream and matched it. They are different
   *  colours (#FFFFFF vs #FCFAF3), so this is not a detail to unify. */
  chipBg: string
}) {
  const [name, setName] = useState('')
  const [businessName, setBusinessName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [topic, setTopic] = useState(topics[0])
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'error'>('idle')
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('submitting')
    const { error } = await supabase.from('marketing_leads').insert({
      source, name, business_name: businessName || null,
      phone: phone || null, email: email || null, topic, message,
    })
    if (error) {
      setStatus('error')
      return
    }
    trackEvent('form_submit', { label: source })
    router.push(`/thank-you?source=${source}`)
  }

  return (
    <form onSubmit={handleSubmit} className={className} style={style}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <h2 style={headingStyle}>{heading}</h2>
        <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.6, color: 'var(--ink-5)' }}>{intro}</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))', gap: 16 }}>
        <label style={FIELD}>
          <span style={LABEL}>Your name</span>
          <input required type="text" name="name" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Ahmed Khan" className="input" style={{ width: '100%' }} />
        </label>
        <label style={FIELD}>
          <span style={LABEL}>Business name</span>
          <input type="text" name="business_name" autoComplete="organization" value={businessName} onChange={(e) => setBusinessName(e.target.value)} placeholder="Al-Falah Traders" className="input" style={{ width: '100%' }} />
        </label>
        <label style={FIELD}>
          <span style={LABEL}>Phone / WhatsApp</span>
          <input type="tel" name="phone" autoComplete="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="0300 441 2887" className="input" style={{ width: '100%' }} />
        </label>
        <label style={FIELD}>
          <span style={LABEL}>Email</span>
          <input type="email" name="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@yourbusiness.pk" className="input" style={{ width: '100%' }} />
        </label>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
        <span style={LABEL}>{topicLabel}</span>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {topics.map((label) => {
            const active = topic === label
            return (
              <button key={label} type="button" onClick={() => setTopic(label)} style={{ all: 'unset', cursor: 'pointer', padding: '10px 16px', borderRadius: 999, fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap', color: active ? 'var(--ink-inverse)' : 'var(--ink-4-alt)', background: active ? 'var(--navy)' : chipBg, border: `1.5px solid ${active ? 'var(--navy)' : 'rgba(var(--ink-1-rgb), 0.14)'}`, transition: 'background 160ms ease' }}>{label}</button>
            )
          })}
        </div>
      </div>

      <label style={FIELD}>
        <span style={LABEL}>{messageLabel}</span>
        <textarea required rows={5} name="message" value={message} onChange={(e) => setMessage(e.target.value)} placeholder={messagePlaceholder} className="input" style={{ width: '100%' }} />
      </label>

      {status === 'error' && <p style={{ margin: 0, fontSize: 13, color: '#B4432F' }}>Something went wrong sending that — please try again or message us on WhatsApp instead.</p>}

      <button type="submit" disabled={status === 'submitting'} className={submitClassName} style={submitClassName === 'btn-navy' ? { textAlign: 'center', boxShadow: '0 12px 28px rgba(var(--navy-rgb), 0.24)' } : { textAlign: 'center' }}>{status === 'submitting' ? 'Sending…' : 'Send message'}</button>
      <span style={{ fontSize: 12.5, lineHeight: 1.55, color: 'var(--ink-muted)' }}>By sending this you agree to our <Link href={routes.legal('privacy')} style={{ fontWeight: 600 }}>privacy policy</Link>. We never share your details.</span>
    </form>
  )
}
