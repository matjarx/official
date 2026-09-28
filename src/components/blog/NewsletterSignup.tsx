'use client'

// The "Get one email a month" box in the blog sidebar.
//
// It had a Subscribe button that was a <Link href={routes.blog}> — a
// link back to the blog index you were already on. No field, no
// submission, nothing recorded. Anyone who clicked it got the page they
// came from and presumably assumed they had subscribed.
//
// The blog INDEX had the same problem in a different shape: a real
// email input bound to nothing and a <button type="button"> with no
// handler. Typing an address and pressing it did exactly nothing, with
// no error — the worst version, because it looks like it worked.
//
// Both now render this component. It writes to marketing_leads with
// source 'newsletter', the same table and the same anon-key insert that
// Contact, Help and Become a Partner use, so a subscriber shows up in
// the admin's Marketing Site > Leads list beside every other enquiry
// rather than in a list of its own.

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { trackEvent } from '@/lib/analytics'

/** `dark` is the navy sidebar box; `light` is the butter panel on the index. */
export default function NewsletterSignup({
  postSlug,
  variant = 'dark',
}: {
  postSlug?: string
  variant?: 'dark' | 'light'
}) {
  const light = variant === 'light'
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'done' | 'error'>('idle')

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim()) return
    setStatus('submitting')
    const { error } = await supabase.from('marketing_leads').insert({
      source: 'newsletter',
      name: 'Newsletter subscriber',
      email: email.trim(),
      topic: 'Newsletter',
      // Which article convinced them is the only interesting thing about
      // a newsletter signup, and it is free to record here.
      message: postSlug ? `Subscribed from /blogs/${postSlug}` : 'Subscribed from the blog',
    })
    if (error) {
      setStatus('error')
      return
    }
    trackEvent('form_submit', { label: 'newsletter' })
    setStatus('done')
    setEmail('')
  }

  return (
    <div
      style={
        light
          ? { padding: '34px 32px', borderRadius: 24, background: 'linear-gradient(150deg, var(--butter), var(--moss-light))', display: 'flex', flexDirection: 'column', gap: 16, justifyContent: 'center' }
          : { padding: '24px 26px', borderRadius: 20, background: 'var(--navy-deepest)', display: 'flex', flexDirection: 'column', gap: 12 }
      }
    >
      {light && (
        <span style={{ fontSize: 12, letterSpacing: '1.8px', textTransform: 'uppercase', color: '#4A5518', fontWeight: 700 }}>Newsletter</span>
      )}
      {light ? (
        <h2 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 30, lineHeight: 1.12, letterSpacing: '-1px', color: '#1F2A08' }}>
          Get monthly advice and exclusive deals
        </h2>
      ) : (
        <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 17, color: 'var(--ink-inverse)' }}>Get one email a month</span>
      )}
      <p style={{ margin: 0, fontSize: light ? 14.5 : 13.5, lineHeight: 1.6, color: light ? '#3D4A16' : 'rgba(var(--ink-inverse-rgb), 0.6)' }}>
        {light
          ? 'One email a month: what\u2019s working for businesses like yours, plus partner offers.'
          : 'Practical advice for growing a business online in Pakistan and the Gulf.'}
      </p>

      {status === 'done' ? (
        <p style={{ margin: '4px 0 0', fontSize: 13.5, lineHeight: 1.6, color: light ? '#1F2A08' : 'var(--butter)' }}>
          You&rsquo;re on the list. Look out for the next one.
        </p>
      ) : (
        <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 4 }}>
          <label htmlFor="newsletter-email" className="sr-only">Email address</label>
          <input
            id="newsletter-email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={light ? 'you@yourbusiness.pk' : 'you@yourbusiness.com'}
            style={
              light
                ? { width: '100%', padding: '15px 17px', borderRadius: 13, fontFamily: 'inherit', fontSize: 14.5, color: '#1F2A08', background: 'rgba(var(--surface-rgb), 0.75)', border: '1.5px solid rgba(31,42,8,0.18)', outline: 'none' }
                : { padding: '12px 14px', borderRadius: 12, border: '1px solid rgba(var(--ink-inverse-rgb), 0.18)', background: 'rgba(var(--surface-rgb), 0.07)', color: 'var(--surface)', fontSize: 14, fontFamily: 'inherit' }
            }
          />
          <button
            type="submit"
            disabled={status === 'submitting'}
            className={light ? 'btn-navy' : undefined}
            style={
              light
                ? { textAlign: 'center', cursor: status === 'submitting' ? 'default' : 'pointer', opacity: status === 'submitting' ? 0.7 : 1 }
                : {
                    padding: '13px 18px',
                    borderRadius: 12,
                    border: 'none',
                    fontFamily: 'var(--font-lato), Lato, sans-serif',
                    fontWeight: 700,
                    fontSize: 13.5,
                    color: 'var(--ink-on-butter)',
                    background: 'var(--butter)',
                    cursor: status === 'submitting' ? 'default' : 'pointer',
                    opacity: status === 'submitting' ? 0.7 : 1,
                  }
            }
          >
            {status === 'submitting' ? 'Subscribing…' : 'Subscribe'}
          </button>
          {light && (
            <span style={{ fontSize: 11.5, lineHeight: 1.5, color: '#4A5518' }}>
              By subscribing you agree to the MatjarX privacy policy. Unsubscribe any time.
            </span>
          )}
          {status === 'error' && (
            <span style={{ fontSize: 12.5, color: light ? '#7A2E1B' : '#FFB4A8' }}>
              That didn&rsquo;t go through. Try again, or email office@matjarx.com.
            </span>
          )}
        </form>
      )}
    </div>
  )
}
