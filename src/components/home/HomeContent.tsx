'use client'

// Home page — from Marketing - Home.dc.html. Eleven sections after the
// hero: Editor Showcase, category marquee, "Did you know", three options,
// mascot/urgency panel, editor features + second showcase, how it works,
// website examples, savings calculator, pricing, trust band, FAQs.
//
// Dark theme layer: pass `dark` to render Home Dark (same structure/copy,
// swapped tokens + Site Header Dark) rather than building a second page.

import { useState } from 'react'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import AmbientOrbs from '@/components/AmbientOrbs'
import EditorShowcase from '@/components/EditorShowcase'
import { routes } from '@/lib/routes'

const RATING_BADGES = [
  { name: 'Trustpilot', score: '4.8 / 5', tint: 'rgba(0,182,122,0.14)', mark: '#00B67A', icon: 'm12 2 2.9 6.6 7.1.6-5.4 4.7 1.6 7-6.2-3.8-6.2 3.8 1.6-7L2 9.2l7.1-.6z' },
  { name: 'Google Reviews', score: '4.8 / 5', tint: 'rgba(66,133,244,0.14)', mark: '#4285F4', icon: 'M12 3.5a8.5 8.5 0 1 0 8.4 9.9h-8.4V10h11.5v2a11.5 11.5 0 1 1-3.4-8.2l-2.1 2.1A8.4 8.4 0 0 0 12 3.5Z' },
  { name: 'Clutch', score: '4.9 / 5', tint: 'rgba(230,58,53,0.14)', mark: '#E63A35', icon: 'M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 8.2-6.2l-3-1a5.4 5.4 0 1 1 0-2.6l3-1A8.5 8.5 0 0 0 12 3.5Zm0 5.6a2.9 2.9 0 1 0 0 5.8 2.9 2.9 0 0 0 0-5.8Z' },
]

const CATEGORIES_BASE = ['Restaurants', 'Boutiques', 'Clinics', 'Law firms', 'Salons', 'Real estate', 'Construction', 'Gyms', 'Caterers', 'Auto repair', 'Textiles', 'Travel agents', 'Accountants', 'Event planners', 'Coffee shops', 'Furniture']
const CATEGORIES = [...CATEGORIES_BASE, ...CATEGORIES_BASE]

const VOICES = [
  { quote: "I really tried to build a website myself, but it didn't look good and I have no idea how to make it show up on Google.", name: 'Ahmed Khan', trade: 'Fabric wholesaler, Lahore', initials: 'AK', tint: '#C6CB8A' },
  { quote: "My cousin built my website. I'm not really happy with it, but I can't tell him that.", name: 'Sabika Noor', trade: 'Boutique owner, Karachi', initials: 'SN', tint: '#F4F2AE' },
  { quote: "I got quotes in the thousands for a website. I've just started out — I can't afford that.", name: 'Saeed Ahmed', trade: 'Caterer, Islamabad', initials: 'SA', tint: '#BFD4E6' },
]

const EDITOR_FEATURES = [
  { title: 'Change image', body: 'Click any photo and swap it. Your new menu, your new stock, live in seconds.', icon: 'M4 5.5h16v13H4zM8.3 10.6a1.2 1.2 0 1 0 0-2.4 1.2 1.2 0 0 0 0 2.4ZM4 16.2l4.6-4.2 4.4 3.9 2.6-2.4L20 17' },
  { title: 'Book a table', body: 'Switch on bookings and the button becomes a real reservation form, synced to your calendar.', icon: 'M5 5.5h14v14H5zM5 10h14M9 3.5v4M15 3.5v4M9 14h2' },
  { title: 'Sell products', body: 'Turn on the store and the same button reads Shop now — cart, checkout and 0% commission included.', icon: 'M4 6h2.2l2.3 9.5h9L20 8H7M9.5 20a1.2 1.2 0 1 0 0-2.4 1.2 1.2 0 0 0 0 2.4Zm7.5 0a1.2 1.2 0 1 0 0-2.4 1.2 1.2 0 0 0 0 2.4Z' },
]

const STEPS = [
  { n: '1', title: 'Tell us about your business', body: 'A short questionnaire: what you do, who you serve, and what the site needs to achieve.', time: '15–30 minutes' },
  { n: '2', title: 'We build the whole thing', body: 'Design, copy, images, SEO, store or bookings — assembled by a specialist in your category.', time: '7 days' },
  { n: '3', title: 'We launch it together', body: 'A live call to walk your new site, make final changes, and show you the editor.', time: '30 minutes' },
]

const EXAMPLES = [
  { name: 'Celestial Delicacies', category: 'Fine dining, Karachi', result: 'Bookings up 3×', tint: 'linear-gradient(150deg, #8E1B22, #3A0A0E)' },
  { name: 'Bin Adam Textile', category: 'Wholesale textiles, Faisalabad', result: '#1 on Google', tint: 'linear-gradient(150deg, #003366, #2E6EA8)' },
  { name: 'Sacred Wellness', category: 'Spa & wellness, Lahore', result: 'Leads every day', tint: 'linear-gradient(150deg, #707538, #C6CB8A)' },
]

const PROOF_STATS = [
  { value: '70,000', label: 'websites built' },
  { value: '7 days', label: 'average launch' },
  { value: '0%', label: 'commission on sales' },
]

const REVIEWS = [
  { quote: 'What you get for the value you pay is almost unheard of. You get all the support and tech help you need, in a quick turnaround.', name: 'Zohaib Sethia', company: 'Bin Adam Textile' },
  { quote: 'Very cooperative team. They handle strategy and consultation, and they now manage both of my websites.', name: 'Farooq Butt', company: 'Butt Enterprises' },
]

const FAQ_DATA = [
  { question: 'How does it actually work?', answer: 'Pick a plan and check out. You fill in a short questionnaire about your business, our team builds the whole site in seven days, then we launch it with you on a live call and show you how to edit it yourself.' },
  { question: 'Which plan is right for me?', answer: 'Launch gets you online with a professional site, domain, email and hosting. Boost is our most popular — it adds unlimited edits done by us, advanced SEO and selling on Google, Facebook and Instagram. Growth adds a dedicated team and monthly marketing sessions. Platinum is a fully custom build for serious e-commerce.' },
  { question: 'Can I edit the website myself afterwards?', answer: "Yes. Every site comes with our own editor — change photos, text, prices and products from any device, no technical skill needed. If you'd rather not, send the change to your concierge and we'll do it." },
  { question: 'Are hosting, domain and email included?', answer: 'Yes, in every plan: a custom domain (or connect one you already own), matching business email, fast secure hosting and an SSL certificate. There are no separate charges for these.' },
  { question: "What if I don't like the website?", answer: "You get 30 days of unlimited edits so we can get it right, and a 30-day money-back guarantee. If you're unhappy for any reason in that window, ask and we refund you." },
  { question: 'Do you work with businesses outside Pakistan?', answer: 'Yes — we serve clients across the Gulf as well. Pricing is quoted in AED for UAE, Saudi and Qatar businesses, and your concierge works your time zone.' },
]

const LIGHT_PLAN_THEME = {
  bg: 'rgba(255,255,255,0.62)', border: 'rgba(255,255,255,0.85)', shadow: '0 16px 40px rgba(4,18,31,0.07), inset 0 1px 0 rgba(255,255,255,0.9)', blur: 'blur(22px)',
  ink: '#04121F', muted: '#6A7F92', body: '#3B5063', rule: 'rgba(4,18,31,0.09)',
  tick: '#707538', ctaInk: '#04121F', ctaBg: '#FCFAF3', ctaBorder: 'rgba(4,18,31,0.16)',
}
const DARK_PLAN_THEME = {
  bg: 'linear-gradient(160deg, rgba(0,51,102,0.96), rgba(0,28,51,0.96))', border: 'rgba(255,255,255,0.16)', shadow: '0 30px 66px rgba(4,18,31,0.3), inset 0 1px 0 rgba(255,255,255,0.2)', blur: 'blur(26px)',
  ink: '#FFFFFF', muted: 'rgba(255,255,255,0.62)', body: 'rgba(255,255,255,0.8)', rule: 'rgba(255,255,255,0.16)',
  tick: '#C6CB8A', ctaInk: '#04121F', ctaBg: '#F4F2AE', ctaBorder: '#F4F2AE',
}
const PLAN_ROWS = [
  { name: 'Launch', pitch: 'We build and launch your website.', price: 'Rs. 4,500', setup: 'Rs. 22,500', cta: 'Choose Launch', theme: LIGHT_PLAN_THEME, tag: '', href: routes.plan('launch'),
    features: ['Multi-page site, written for you', 'Domain + 1 business email', 'Google Business Profile set up', 'Live chat support'] },
  { name: 'Boost', pitch: 'We manage your online presence.', price: 'Rs. 15,600', setup: 'Rs. 22,500', cta: 'Choose Boost', theme: DARK_PLAN_THEME, tag: 'Most popular', href: routes.plan('boost'),
    features: ['Everything in Launch', '4 business emails', 'Unlimited edits, done by us', 'Advanced SEO + custom logo', 'Sell on Google, Facebook, Instagram'] },
  { name: 'Growth', pitch: 'We grow your business online.', price: 'Rs. 27,000', setup: 'Rs. 22,500', cta: 'Choose Growth', theme: LIGHT_PLAN_THEME, tag: '', href: routes.plan('growth'),
    features: ['Everything in Boost', 'Dedicated growth team', 'Monthly 1-on-1 marketing session', '2,000 words of fresh content monthly'] },
  { name: 'Platinum', pitch: 'We scale your e-commerce business.', price: 'Rs. 55,000', setup: 'Rs. 140,000', cta: 'Talk to us', theme: LIGHT_PLAN_THEME, tag: 'Custom', href: routes.plan('platinum'),
    features: ['Everything in Growth', 'Custom design in our own tool', 'Full webstore, unlimited products', 'Subscriptions & digital products', 'Multi-seat bookings'] },
]

const HOUR_STEPS = [10, 15, 25, 40, 60]
const RATE_STEPS = [2500, 5000, 7500, 10000]

function money(n: number) {
  return 'Rs. ' + n.toLocaleString('en-US')
}

export default function HomeContent({ dark = false }: { dark?: boolean }) {
  const [openFaq, setOpenFaq] = useState(0)
  const [hours, setHours] = useState(15)
  const [rate, setRate] = useState(5000)

  const diyTotal = hours * rate
  const matjarxCost = 22500
  const saving = diyTotal - matjarxCost

  const ink1 = dark ? '#FFFFFF' : '#04121F'
  const ink4 = dark ? 'rgba(255,255,255,0.7)' : '#435A70'
  const cream = dark ? undefined : '#FCFAF3'
  const bgGradient = dark
    ? 'linear-gradient(172deg, #001C33, #00263F, #001526)'
    : undefined

  return (
    <div style={{ position: 'relative', fontFamily: 'var(--font-open-sans), "Open Sans", Arial, sans-serif', background: bgGradient ?? cream, color: dark ? '#E9EFF5' : '#0B2135', overflowX: 'hidden' }}>
      <AmbientOrbs dark={dark} />
      <div className="page-content">
        <SiteHeader active="home" dark={dark} />

        {/* Hero */}
        <section style={{ maxWidth: 1080, margin: '0 auto', padding: '66px 24px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 22, textAlign: 'center' }}>
          <p style={{ margin: 0, fontSize: 'clamp(14px, 1.6vw, 17px)', color: ink4 }}>Having trouble launching the right website for your business?</p>

          <h1 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 'clamp(32px, 5.6vw, 60px)', lineHeight: 1.08, letterSpacing: '-2px', color: ink1 }}>
            We&apos;ll build complete <span className="marker">small business websites</span> in 7 days for Rs. 22,500
          </h1>

          <p style={{ margin: 0, maxWidth: '34em', fontSize: 'clamp(14.5px, 1.7vw, 17.5px)', lineHeight: 1.6, color: ink4 }}>
            Support your business growth with affordable agency services.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center', paddingTop: 4 }}>
            <Link href={routes.pricing} className="btn-primary">Let&apos;s begin</Link>
            <a href="#examples" className="btn-secondary" style={dark ? { color: '#FFFFFF', background: 'rgba(255,255,255,0.08)', border: '1.5px solid rgba(255,255,255,0.18)' } : undefined}>See the quality of our websites</a>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', justifyContent: 'center', paddingTop: 12 }}>
            <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 14, letterSpacing: '0.3px', color: ink1 }}>RATED 4.8 EXCELLENT</span>
            <span style={{ display: 'flex', gap: 2 }}>
              {[1, 2, 3, 4, 5].map((n) => (
                <span key={n} style={{ width: 21, height: 21, display: 'grid', placeItems: 'center', background: '#00B67A' }}>
                  <svg viewBox="0 0 24 24" width="15" height="15" fill="#FFFFFF"><path d="m12 3.4 2.7 6.1 6.6.5-5 4.3 1.5 6.4L12 17.2l-5.8 3.5 1.5-6.4-5-4.3 6.6-.5z" /></svg>
                </span>
              ))}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <svg viewBox="0 0 24 24" width="17" height="17" fill="#00B67A"><path d="m12 2 2.9 6.6 7.1.6-5.4 4.7 1.6 7-6.2-3.8-6.2 3.8 1.6-7L2 9.2l7.1-.6z" /></svg>
              <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 15.5, color: ink1 }}>Trustpilot</span>
            </span>
          </div>

          <p style={{ margin: 0, fontSize: 'clamp(13.5px, 1.6vw, 16px)', fontWeight: 600, color: dark ? '#F4F2AE' : '#8A7A12' }}>Become part of a thriving network of over 70,000 business owners.</p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center', paddingTop: 10 }}>
            {RATING_BADGES.map((b) => (
              <div key={b.name} className={dark ? 'glass-dark-inner' : 'glass-card'} style={{ display: 'flex', alignItems: 'center', gap: 13, padding: '13px 20px 13px 16px', borderRadius: 16 }}>
                <span style={{ width: 34, height: 34, flex: '0 0 auto', borderRadius: 10, display: 'grid', placeItems: 'center', background: b.tint }}>
                  <svg viewBox="0 0 24 24" width="18" height="18" fill={b.mark}><path d={b.icon} /></svg>
                </span>
                <span style={{ display: 'flex', flexDirection: 'column', gap: 2, textAlign: 'left' }}>
                  <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 14, letterSpacing: '-0.2px', color: ink1 }}>{b.name}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ fontSize: 12, letterSpacing: '1.5px', color: b.mark }}>★★★★★</span>
                    <span style={{ fontSize: 12, fontWeight: 600, color: dark ? 'rgba(226,236,245,0.6)' : '#6A7F92' }}>{b.score}</span>
                  </span>
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Editor Showcase #1 */}
        <section style={{ maxWidth: 1240, margin: '0 auto', padding: '46px 24px 66px' }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '0 4px 14px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 18px 10px 12px', borderRadius: 999, background: 'var(--navy-gradient)', border: '1.5px solid rgba(244,242,174,0.5)', boxShadow: '0 12px 28px rgba(4,18,31,0.3), inset 0 1px 0 rgba(255,255,255,0.2)' }}>
              <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="var(--butter)" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" style={{ flex: '0 0 auto' }}><path d="M12 3.5 4.5 6.5v5c0 4.4 3.1 7.6 7.5 9 4.4-1.4 7.5-4.6 7.5-9v-5ZM9 12l2.2 2.2L15.5 10" /></svg>
              <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 12.5, letterSpacing: '0.4px', color: 'var(--butter)', whiteSpace: 'nowrap' }}>30-day money-back guarantee</span>
            </span>
          </div>
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', inset: '-16px -12px -20px -12px', borderRadius: 34, background: 'linear-gradient(150deg, rgba(0,51,102,0.92), rgba(112,117,56,0.86))', boxShadow: '0 44px 96px rgba(4,18,31,0.3)', zIndex: 0 }} />
            <div style={{ position: 'relative', zIndex: 1, padding: 4 }}>
              <EditorShowcase />
            </div>
          </div>
        </section>

        {/* Category marquee */}
        <section style={{ borderTop: `1px solid ${dark ? 'rgba(255,255,255,0.1)' : 'rgba(4,18,31,0.08)'}`, borderBottom: `1px solid ${dark ? 'rgba(255,255,255,0.1)' : 'rgba(4,18,31,0.08)'}`, padding: '22px 0', overflow: 'hidden' }}>
          <div className="mx-marquee" style={{ display: 'flex', width: 'max-content', gap: 46, alignItems: 'center' }}>
            {CATEGORIES.map((c, i) => (
              <span key={i} style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 15, color: dark ? 'rgba(226,236,245,0.42)' : '#8C9CAA', whiteSpace: 'nowrap' }}>{c}</span>
            ))}
          </div>
        </section>

        {/* Did you know */}
        <section style={{ maxWidth: 1200, margin: '0 auto', padding: '82px 24px 20px' }}>
          <div style={{ maxWidth: 860, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, textAlign: 'center' }}>
            <span style={{ fontSize: 12, letterSpacing: '2.4px', textTransform: 'uppercase', color: dark ? 'var(--moss-light)' : 'var(--olive)', fontWeight: 600 }}>Did you know?</span>
            <h2 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 'clamp(27px, 4.6vw, 42px)', lineHeight: 1.14, letterSpacing: '-1.3px', color: ink1 }}>
              <span style={{ color: dark ? 'var(--moss-light)' : 'var(--olive)' }}>4 out of 5</span> small business owners either have no website, or don&apos;t like the one they have.
            </h2>
          </div>

          <div style={{ marginTop: 44, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 290px), 1fr))', gap: 22, alignItems: 'start' }}>
            {VOICES.map((v) => (
              <div key={v.name} style={{ position: 'relative', marginBottom: 8 }}>
                <div style={{ position: 'absolute', inset: '8px -8px -8px 8px', borderRadius: 20, background: dark ? '#3A3F1E' : '#A8AD6A', zIndex: 0 }} />
                <div style={{ position: 'relative', zIndex: 1, padding: '22px 24px 24px', borderRadius: 20, background: dark ? '#0B2138' : '#FFFFFF', border: `1px solid ${dark ? 'rgba(255,255,255,0.1)' : 'rgba(4,18,31,0.06)'}`, boxShadow: '0 10px 26px rgba(4,18,31,0.08)', display: 'flex', flexDirection: 'column', gap: 13 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{ width: 44, height: 44, flex: '0 0 auto', borderRadius: '50%', background: v.tint, border: '2px solid #FFFFFF', boxShadow: '0 3px 10px rgba(4,18,31,0.16)', display: 'grid', placeItems: 'center', fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 14, color: '#04121F' }}>{v.initials}</span>
                    <span style={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0 }}>
                      <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 19, letterSpacing: '-0.4px', color: ink1 }}>{v.name}</span>
                      <span style={{ fontSize: 12, color: dark ? 'rgba(226,236,245,0.5)' : '#6A7F92' }}>{v.trade}</span>
                    </span>
                  </div>
                  <p style={{ margin: 0, fontSize: 15.5, lineHeight: 1.58, color: dark ? 'rgba(226,236,245,0.82)' : '#24384A' }}>&ldquo;{v.quote}&rdquo;</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, paddingTop: 34 }}>
            <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 30, letterSpacing: '-0.8px', color: dark ? 'var(--moss-light)' : 'var(--olive)' }}>Why?</span>
          </div>
        </section>

        {/* Three options */}
        <section style={{ maxWidth: 1200, margin: '0 auto', padding: '72px 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: 20, alignItems: 'stretch' }}>
            <div className={dark ? 'glass-dark-inner' : undefined} style={{ padding: '30px 28px', borderRadius: 22, background: dark ? undefined : 'rgba(242,238,226,0.6)', border: dark ? undefined : '1px solid rgba(255,255,255,0.7)', backdropFilter: dark ? undefined : 'blur(20px)', display: 'flex', flexDirection: 'column', gap: 12 }}>
              <span style={{ fontSize: 12, letterSpacing: '1.6px', textTransform: 'uppercase', color: dark ? 'rgba(226,236,245,0.5)' : '#8A7A5E', fontWeight: 600 }}>Option one</span>
              <h3 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 24, letterSpacing: '-0.6px', color: ink1 }}>DIY builders</h3>
              <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.6, color: dark ? 'rgba(226,236,245,0.7)' : '#4B5D6E' }}>Hand you a toolbox and a blank page. Most people never finish.</p>
              <span style={{ marginTop: 8, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 15, color: dark ? '#E5A97F' : '#8A5B3C' }}>Rs. 140,000 / yr + your weekends</span>
            </div>
            <div className={dark ? 'glass-dark-inner' : undefined} style={{ padding: '30px 28px', borderRadius: 22, background: dark ? undefined : 'rgba(242,238,226,0.6)', border: dark ? undefined : '1px solid rgba(255,255,255,0.7)', backdropFilter: dark ? undefined : 'blur(20px)', display: 'flex', flexDirection: 'column', gap: 12 }}>
              <span style={{ fontSize: 12, letterSpacing: '1.6px', textTransform: 'uppercase', color: dark ? 'rgba(226,236,245,0.5)' : '#8A7A5E', fontWeight: 600 }}>Option two</span>
              <h3 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 24, letterSpacing: '-0.6px', color: ink1 }}>Web agencies</h3>
              <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.6, color: dark ? 'rgba(226,236,245,0.7)' : '#4B5D6E' }}>Good work, big invoices — and you still can&apos;t change a phone number yourself.</p>
              <span style={{ marginTop: 8, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 15, color: dark ? '#E5A97F' : '#8A5B3C' }}>Rs. 420,000–840,000 + upkeep</span>
            </div>
            <div style={{ padding: '30px 28px', borderRadius: 22, background: '#003366', display: 'flex', flexDirection: 'column', gap: 12, boxShadow: '0 24px 50px rgba(0,51,102,0.28)' }}>
              <span style={{ fontSize: 12, letterSpacing: '1.6px', textTransform: 'uppercase', color: 'var(--butter)', fontWeight: 600 }}>Option three</span>
              <h3 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 24, letterSpacing: '-0.6px', color: '#FFFFFF' }}>MatjarX</h3>
              <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.6, color: 'rgba(255,255,255,0.78)' }}>Agency quality, built for you in a week, with an editor simple enough to actually use.</p>
              <span style={{ marginTop: 8, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 15, color: 'var(--butter)' }}>Rs. 22,500 once, then Rs. 4,500 / mo</span>
            </div>
          </div>
        </section>

        {/* Mascot / urgency panel */}
        <section style={{ maxWidth: 1240, margin: '0 auto', padding: '30px 24px 0' }}>
          <div style={{ position: 'relative', borderRadius: 30, overflow: 'hidden', background: 'linear-gradient(120deg, #04121F 0%, #00243D 46%, #0A3A63 100%)', border: '1px solid rgba(255,255,255,0.14)', boxShadow: '0 34px 76px rgba(4,18,31,0.32), inset 0 1px 0 rgba(255,255,255,0.16)' }}>
            <div style={{ position: 'absolute', width: 620, height: 620, right: -160, bottom: -220, borderRadius: '50%', background: 'radial-gradient(circle, rgba(198,203,138,0.34) 0%, rgba(198,203,138,0) 68%)', pointerEvents: 'none' }} />
            <video src="/showcase-video/mascot.mp4" autoPlay muted loop playsInline style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5 }} />
            <div style={{ position: 'relative' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 18, maxWidth: '46em', padding: 'clamp(34px, 5vw, 62px)', minWidth: 0 }}>
                <h2 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 'clamp(26px, 3.8vw, 40px)', lineHeight: 1.1, letterSpacing: '-1.3px', color: '#FFFFFF' }}>
                  50 milliseconds. <span style={{ color: 'rgba(255,255,255,0.6)' }}>That&apos;s how much time you have to make a first impression.</span>
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                  <span style={{ fontSize: 'clamp(14px, 1.6vw, 16px)', lineHeight: 1.6, color: 'rgba(255,255,255,0.62)' }}>After that you have another 3 to 8 seconds to</span>
                  <span style={{ fontSize: 'clamp(14px, 1.6vw, 16px)', lineHeight: 1.6, fontWeight: 600, color: '#FFFFFF' }}>convince a customer you are worth their money.</span>
                  <span style={{ fontSize: 'clamp(14px, 1.6vw, 16px)', lineHeight: 1.6, color: 'rgba(255,255,255,0.62)' }}>If your website doesn&apos;t do it in that window, they leave.</span>
                  <span style={{ fontSize: 'clamp(14px, 1.6vw, 16px)', lineHeight: 1.6, color: 'rgba(255,255,255,0.62)' }}>Your competitor down the road will be delighted.</span>
                </div>
                <Link href={routes.pricing} className="btn-primary" style={{ alignSelf: 'flex-start', marginTop: 6 }}>Not on my watch — I want results</Link>
              </div>
            </div>
          </div>
        </section>

        {/* Editor features + second showcase */}
        <section style={{ background: dark ? '#00121F' : '#04121F', padding: '84px 24px' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))', gap: 50, alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 22, minWidth: 0 }}>
              <span style={{ fontSize: 12, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--moss-light)', fontWeight: 600 }}>The editor</span>
              <h2 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 'clamp(28px, 4.8vw, 42px)', lineHeight: 1.12, letterSpacing: '-1.4px', color: '#FFFFFF' }}>Change a photo. Take a booking. Start selling.</h2>
              <p style={{ margin: 0, fontSize: 16.5, lineHeight: 1.65, color: 'rgba(255,255,255,0.7)', maxWidth: '32em' }}>
                Every MatjarX site ships with our own editor. Swap images, edit text and switch on the functions your business needs — no code, no plugins, no developer on retainer.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, paddingTop: 6 }}>
                {EDITOR_FEATURES.map((f) => (
                  <div key={f.title} style={{ display: 'flex', alignItems: 'flex-start', gap: 14, padding: '18px 20px', borderRadius: 16, background: 'rgba(255,255,255,0.055)', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <span style={{ width: 36, height: 36, flex: '0 0 auto', borderRadius: 11, background: 'rgba(198,203,138,0.16)', display: 'grid', placeItems: 'center' }}>
                      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="var(--moss-light)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={f.icon} /></svg>
                    </span>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4, minWidth: 0 }}>
                      <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 15.5, color: '#FFFFFF' }}>{f.title}</span>
                      <span style={{ fontSize: 13.5, lineHeight: 1.55, color: 'rgba(255,255,255,0.62)' }}>{f.body}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ minWidth: 0 }}>
              <EditorShowcase />
            </div>
          </div>
        </section>

        {/* How it works */}
        <section style={{ maxWidth: 1200, margin: '0 auto', padding: '82px 24px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 24, flexWrap: 'wrap', marginBottom: 40 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginRight: 'auto', maxWidth: 560 }}>
              <span style={{ fontSize: 12, letterSpacing: '2px', textTransform: 'uppercase', color: dark ? 'var(--moss-light)' : 'var(--olive)', fontWeight: 600 }}>How it works</span>
              <h2 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 'clamp(27px, 4.6vw, 40px)', lineHeight: 1.12, letterSpacing: '-1.2px', color: ink1 }}>Three steps. Seven days.</h2>
            </div>
            <span style={{ padding: '11px 18px', borderRadius: 999, background: 'var(--butter)', fontSize: 13.5, fontWeight: 600, color: '#3D3A08' }}>Start today → live next Friday</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: 20 }}>
            {STEPS.map((s) => (
              <div key={s.n} className={dark ? 'glass-dark-inner' : 'glass-card'} style={{ padding: '30px 28px', borderRadius: 22, display: 'flex', flexDirection: 'column', gap: 14 }}>
                <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 44, lineHeight: 1, letterSpacing: '-2px', color: 'var(--moss-light)' }}>{s.n}</span>
                <h3 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 20, letterSpacing: '-0.4px', color: ink1 }}>{s.title}</h3>
                <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.6, color: dark ? 'rgba(226,236,245,0.7)' : '#4B5D6E' }}>{s.body}</p>
                <span style={{ marginTop: 'auto', paddingTop: 12, fontSize: 13, fontWeight: 600, color: dark ? 'var(--moss-light)' : 'var(--olive)' }}>{s.time}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Website examples */}
        <section id="examples" style={{ background: dark ? 'rgba(255,255,255,0.03)' : '#F2EEE2', padding: '82px 0' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'flex-end', gap: 24, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginRight: 'auto', maxWidth: 560 }}>
              <span style={{ fontSize: 12, letterSpacing: '2px', textTransform: 'uppercase', color: dark ? 'var(--moss-light)' : 'var(--olive)', fontWeight: 600 }}>Real sites, real businesses</span>
              <h2 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 'clamp(27px, 4.6vw, 40px)', lineHeight: 1.12, letterSpacing: '-1.2px', color: ink1 }}>70,000 websites built and counting</h2>
            </div>
            <Link href={routes.websiteExamples} style={{ padding: '14px 24px', borderRadius: 999, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 14.5, color: ink1, background: dark ? 'rgba(255,255,255,0.07)' : '#FFFFFF', border: `1.5px solid ${dark ? 'rgba(255,255,255,0.16)' : 'rgba(4,18,31,0.14)'}` }}>Browse all examples</Link>
          </div>
          <div style={{ maxWidth: 1200, margin: '40px auto 0', padding: '0 24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: 20 }}>
            {EXAMPLES.map((ex) => (
              <div key={ex.name} className={dark ? 'glass-dark-inner' : 'glass-card'} style={{ borderRadius: 22, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <div style={{ height: 210, background: ex.tint, display: 'grid', placeItems: 'center' }}>
                  <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 21, letterSpacing: '0.4px', color: 'rgba(255,255,255,0.9)', textAlign: 'center', padding: '0 20px' }}>{ex.name}</span>
                </div>
                <div style={{ padding: '20px 22px', display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 3, marginRight: 'auto', minWidth: 0 }}>
                    <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 16, color: ink1 }}>{ex.name}</span>
                    <span style={{ fontSize: 12.5, color: dark ? 'rgba(226,236,245,0.5)' : '#6A7F92' }}>{ex.category}</span>
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 600, padding: '6px 12px', borderRadius: 999, color: '#3D3A08', background: 'var(--butter)', whiteSpace: 'nowrap' }}>{ex.result}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Savings calculator */}
        <section style={{ maxWidth: 1200, margin: '0 auto', padding: '82px 24px' }}>
          <div className="glass-dark-panel" style={{ padding: 'clamp(28px, 4vw, 46px)', borderRadius: 30, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: 'clamp(26px, 4vw, 46px)', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20, minWidth: 0 }}>
              <span style={{ fontSize: 12, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--moss-light)', fontWeight: 600 }}>What it really costs to do it yourself</span>
              <h2 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 'clamp(26px, 4.4vw, 38px)', lineHeight: 1.14, letterSpacing: '-1.2px', color: '#FFFFFF' }}>Your time has a price. Work out what a DIY website costs you.</h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, paddingTop: 4 }}>
                <div className="glass-dark-inner" style={{ display: 'flex', flexDirection: 'column', gap: 11, padding: '18px 20px', borderRadius: 18 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{ fontSize: 13.5, color: 'rgba(233,239,245,0.82)', marginRight: 'auto' }}>Number of hours</span>
                    <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 19, letterSpacing: '-0.4px', color: 'var(--butter)', whiteSpace: 'nowrap' }}>{hours} hours</span>
                  </div>
                  <div style={{ display: 'flex', gap: 6 }}>
                    {HOUR_STEPS.map((h) => {
                      const on = hours === h
                      return (
                        <button key={h} type="button" onClick={() => setHours(h)} style={{ all: 'unset', cursor: 'pointer', flex: 1, textAlign: 'center', padding: '11px 4px', borderRadius: 11, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 13, color: on ? '#14210b' : 'rgba(233,239,245,0.75)', background: on ? 'var(--cta-grad, linear-gradient(160deg, #F7F5C0, #E7E49B))' : 'rgba(255,255,255,0.07)', border: `1px solid ${on ? '#E7E49B' : 'rgba(255,255,255,0.16)'}`, transition: 'background 160ms ease' }}>{h}</button>
                      )
                    })}
                  </div>
                </div>

                <div className="glass-dark-inner" style={{ display: 'flex', flexDirection: 'column', gap: 11, padding: '18px 20px', borderRadius: 18 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{ fontSize: 13.5, color: 'rgba(233,239,245,0.82)', marginRight: 'auto' }}>Per hour cost</span>
                    <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 19, letterSpacing: '-0.4px', color: 'var(--butter)', whiteSpace: 'nowrap' }}>{money(rate)} / hour</span>
                  </div>
                  <div style={{ display: 'flex', gap: 6 }}>
                    {RATE_STEPS.map((r) => {
                      const on = rate === r
                      return (
                        <button key={r} type="button" onClick={() => setRate(r)} style={{ all: 'unset', cursor: 'pointer', flex: 1, textAlign: 'center', padding: '11px 4px', borderRadius: 11, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 13, color: on ? '#14210b' : 'rgba(233,239,245,0.75)', background: on ? 'linear-gradient(160deg, #F7F5C0, #E7E49B)' : 'rgba(255,255,255,0.07)', border: `1px solid ${on ? '#E7E49B' : 'rgba(255,255,255,0.16)'}`, transition: 'background 160ms ease' }}>{r / 1000}k</button>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, minWidth: 0 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14, padding: '26px 28px', borderRadius: 22, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.16)', backdropFilter: 'blur(22px)', boxShadow: '0 20px 46px rgba(0,10,25,0.28), inset 0 1px 0 rgba(255,255,255,0.2)' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, paddingBottom: 13, borderBottom: '1px solid rgba(255,255,255,0.12)' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 3, marginRight: 'auto', minWidth: 0 }}>
                    <span style={{ fontSize: 13.5, color: 'rgba(233,239,245,0.84)' }}>Doing it yourself</span>
                    <span style={{ fontSize: 11.5, color: 'rgba(226,236,245,0.5)' }}>{hours} hours × {money(rate)} / hour</span>
                  </div>
                  <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 22, letterSpacing: '-0.6px', color: '#FFFFFF', whiteSpace: 'nowrap' }}>{money(diyTotal)}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, paddingBottom: 13, borderBottom: '1px solid rgba(255,255,255,0.12)' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 3, marginRight: 'auto', minWidth: 0 }}>
                    <span style={{ fontSize: 13.5, color: 'rgba(233,239,245,0.84)' }}>MatjarX, live in 7 days</span>
                    <span style={{ fontSize: 11.5, color: 'rgba(226,236,245,0.5)' }}>One-time Launch setup fee</span>
                  </div>
                  <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 22, letterSpacing: '-0.6px', color: 'var(--moss-light)', whiteSpace: 'nowrap' }}>{money(matjarxCost)}</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 5, paddingTop: 2 }}>
                  <span style={{ fontSize: 12, letterSpacing: '1.6px', textTransform: 'uppercase', color: 'var(--moss-light)', fontWeight: 600 }}>You save</span>
                  <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 'clamp(34px, 5vw, 46px)', lineHeight: 1.05, letterSpacing: '-1.6px', color: 'var(--butter)' }}>{money(saving > 0 ? saving : 0)}</span>
                  <span style={{ fontSize: 13, lineHeight: 1.55, color: 'rgba(226,236,245,0.6)' }}>
                    {saving > 0 ? `And you don't spend a single one of those ${hours} hours.` : 'Even at this rate, your time is better spent running the business.'}
                  </span>
                </div>

                <Link href={routes.pricing} className="btn-primary" style={{ marginTop: 6, display: 'block', textAlign: 'center' }}>Sign up now</Link>
              </div>
              <span style={{ fontSize: 12, lineHeight: 1.55, textAlign: 'center', color: 'rgba(226,236,245,0.45)' }}>Rs. 22,500 is the one-time Launch setup fee. Hosting, domain and business email are included.</span>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" style={{ maxWidth: 1200, margin: '0 auto', padding: '82px 24px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'center', textAlign: 'center', maxWidth: 620, margin: '0 auto 44px' }}>
            <span style={{ fontSize: 12, letterSpacing: '2px', textTransform: 'uppercase', color: dark ? 'var(--moss-light)' : 'var(--olive)', fontWeight: 600 }}>Plans</span>
            <h2 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 'clamp(27px, 4.6vw, 40px)', lineHeight: 1.12, letterSpacing: '-1.2px', color: ink1 }}>One setup fee. One monthly fee. No surprises.</h2>
            <p style={{ margin: 0, fontSize: 16, lineHeight: 1.6, color: ink4 }}>Every plan includes the website, domain, business email, hosting, SSL and 0% transaction fees.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))', gap: 18, alignItems: 'stretch' }}>
            {PLAN_ROWS.map((p) => {
              const t = p.theme
              return (
                <div key={p.name} style={{ padding: '28px 26px 30px', borderRadius: 22, display: 'flex', flexDirection: 'column', gap: 14, background: t.bg, border: `1.5px solid ${t.border}`, backdropFilter: t.blur, boxShadow: t.shadow }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 21, letterSpacing: '-0.5px', color: t.ink, marginRight: 'auto' }}>{p.name}</span>
                    {p.tag && <span style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: '0.8px', textTransform: 'uppercase', padding: '5px 10px', borderRadius: 999, color: '#3D3A08', background: 'var(--butter)', whiteSpace: 'nowrap' }}>{p.tag}</span>}
                  </div>
                  <span style={{ fontSize: 13.5, lineHeight: 1.5, color: t.muted }}>{p.pitch}</span>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, paddingTop: 6 }}>
                    <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 30, letterSpacing: '-1px', color: t.ink }}>{p.price}</span>
                    <span style={{ fontSize: 13, color: t.muted }}>/ mo</span>
                  </div>
                  <span style={{ fontSize: 12.5, color: t.muted }}>+ {p.setup} setup</span>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 9, paddingTop: 12, marginTop: 4, borderTop: `1px solid ${t.rule}` }}>
                    {p.features.map((f) => (
                      <span key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 9, fontSize: 13.5, lineHeight: 1.45, color: t.body }}>
                        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke={t.tick} strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" style={{ flex: '0 0 auto', marginTop: 3 }}><path d="m5 12.5 4.5 4.5L19 7" /></svg>
                        {f}
                      </span>
                    ))}
                  </div>
                  <Link href={p.href} style={{ marginTop: 'auto', paddingTop: 18, display: 'block' }}>
                    <span style={{ display: 'block', textAlign: 'center', padding: '13px 18px', borderRadius: 999, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 14, color: t.ctaInk, background: t.ctaBg, border: `1.5px solid ${t.ctaBorder}` }}>{p.cta}</span>
                  </Link>
                </div>
              )
            })}
          </div>
          <p style={{ margin: '26px auto 0', maxWidth: 640, textAlign: 'center', fontSize: 13.5, lineHeight: 1.6, color: dark ? 'rgba(226,236,245,0.5)' : '#6A7F92' }}>Prices in PKR. Gulf clients are billed in AED at the equivalent rate — ask us for a quote.</p>
        </section>

        {/* Trust band */}
        <section style={{ background: '#003366', padding: '78px 24px' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))', gap: 44, alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 17, color: 'var(--butter)' }}>4.8 / 5</span>
                <span style={{ fontSize: 15, letterSpacing: '2px', color: 'var(--butter)' }}>★★★★★</span>
                <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>on Trustpilot</span>
              </div>
              <h2 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 'clamp(26px, 4.4vw, 38px)', lineHeight: 1.14, letterSpacing: '-1.2px', color: '#FFFFFF' }}>The easy, stress-free way to grow your business online.</h2>
              <div style={{ display: 'flex', gap: 34, flexWrap: 'wrap', paddingTop: 6 }}>
                {PROOF_STATS.map((st) => (
                  <div key={st.label} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 27, letterSpacing: '-0.8px', color: '#FFFFFF' }}>{st.value}</span>
                    <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>{st.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, minWidth: 0 }}>
              {REVIEWS.map((r) => (
                <div key={r.name} style={{ padding: '24px 26px', borderRadius: 20, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <p style={{ margin: 0, fontSize: 15.5, lineHeight: 1.6, color: 'rgba(255,255,255,0.9)' }}>&ldquo;{r.quote}&rdquo;</p>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                    <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 14, color: 'var(--butter)' }}>{r.name}</span>
                    <span style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.55)' }}>{r.company}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section style={{ maxWidth: 860, margin: '0 auto', padding: '82px 24px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 34 }}>
            <span style={{ fontSize: 12, letterSpacing: '2px', textTransform: 'uppercase', color: dark ? 'var(--moss-light)' : 'var(--olive)', fontWeight: 600 }}>Questions</span>
            <h2 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 'clamp(26px, 4.4vw, 38px)', lineHeight: 1.12, letterSpacing: '-1.2px', color: ink1 }}>Frequently asked</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {FAQ_DATA.map((q, i) => {
              const open = openFaq === i
              return (
                <div key={q.question} className={dark ? 'glass-dark-inner' : 'glass-card'} style={{ borderRadius: 18, overflow: 'hidden' }}>
                  <button type="button" onClick={() => setOpenFaq(open ? -1 : i)} style={{ all: 'unset', cursor: 'pointer', boxSizing: 'border-box', width: '100%', display: 'flex', alignItems: 'center', gap: 16, padding: '21px 24px' }}>
                    <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 16.5, color: ink1, marginRight: 'auto', textAlign: 'left' }}>{q.question}</span>
                    <span style={{ width: 28, height: 28, flex: '0 0 auto', borderRadius: '50%', background: dark ? 'rgba(255,255,255,0.08)' : '#F2EEE2', display: 'grid', placeItems: 'center' }}>
                      <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke={ink1} strokeWidth="2.4" strokeLinecap="round" style={{ transform: open ? 'rotate(45deg)' : 'rotate(0deg)', transition: 'transform 200ms ease' }}><path d="M12 5v14M5 12h14" /></svg>
                    </span>
                  </button>
                  {open && <p style={{ margin: 0, padding: '0 24px 24px', fontSize: 15, lineHeight: 1.65, color: ink4 }}>{q.answer}</p>}
                </div>
              )
            })}
          </div>
        </section>

        <SiteFooter />
      </div>
    </div>
  )
}
