'use client'

// Pricing page — from Marketing - Pricing.dc.html. Hero, billing-cycle
// toggle driving 4 plan cards (Boost dark "Most popular"), the shared
// savings calculator, a 5-group comparison accordion with real tick
// tables, testimonials + Trustpilot badge, and FAQs.

import { Fragment, useState } from 'react'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import SavingsCalculator from '@/components/SavingsCalculator'
import { routes } from '@/lib/routes'

const HERO_TICKS = ['Done-for-you service', '5-star support', 'No hidden costs']

type Cell = 1 | 0 | string
const YES = { mark: '✓', color: 'var(--olive)' }
const NO = { mark: '—', color: '#B4C0CA' }
function cellsFor(a: Cell, b: Cell, c: Cell, d: Cell) {
  return [a, b, c, d].map((v) => (v === 1 ? YES : v === 0 ? NO : { mark: String(v), color: '#04121F' }))
}

const COMPARE_GROUPS: { title: string; rows: [string, Cell, Cell, Cell, Cell][] }[] = [
  { title: 'Done-for-you website', rows: [
    ['Multi-page website built by our team', 1, 1, 1, 1],
    ['Copywriting and image selection', 1, 1, 1, 1],
    ['Custom domain and business email', '1 inbox', '4 inboxes', '4 inboxes', 'Unlimited'],
    ['Live in 7 days', 1, 1, 1, 1],
    ['30-day money-back guarantee', 1, 1, 1, 1],
  ] },
  { title: 'Pro website features', rows: [
    ['Easy-to-use editor', 1, 1, 1, 1],
    ['Online store and checkout', 'Basic', 'Basic', 'Advanced', 'Full webstore'],
    ['Bookings and reservations', 1, 1, 1, 'Multi-seat'],
    ['Subscriptions and digital products', 0, 0, 0, 1],
    ['0% transaction fees', 1, 1, 1, 1],
  ] },
  { title: 'Local SEO', rows: [
    ['Google Business Profile set up', 1, 1, 1, 1],
    ['Google Maps listing', 0, 1, 1, 1],
    ['Advanced on-page SEO', 0, 1, 1, 1],
    ['Monthly SEO audit report', 0, 0, 1, 1],
    ['Review collection and replies', 0, 1, 1, 1],
  ] },
  { title: 'Concierge service', rows: [
    ['Live chat support', 1, 1, 1, 1],
    ['Unlimited done-for-you edits', 0, 1, 1, 1],
    ['VIP phone support', 0, 1, 1, 1],
    ['Named concierge, replies in 4 hours', 0, 0, 1, 1],
  ] },
  { title: 'Growth marketing service', rows: [
    ['Marketing plan for your business', 0, 0, 1, 1],
    ['1-on-1 monthly marketing session', 0, 0, 1, 1],
    ['2,000 words of content monthly', 0, 0, 1, 1],
    ['Paid ads setup and management', 0, 0, 1, 1],
    ['Reputation management', 0, 0, 1, 1],
  ] },
]

const TESTIMONIALS = [
  { quote: "If you're looking for a website provider, then MatjarX is fantastic. The level of service is really good, and I'm getting loads of leads as well.", name: 'Shahzad Ilyas', company: 'Sacred Tantra & Wellness', initials: 'SI', tint: '#C6CB8A' },
  { quote: 'What you get for the value you pay is almost unheard of. You get all the support and tech help you need, in a quick turnaround time.', name: 'Zohaib Sethia', company: 'Bin Adam Textile', initials: 'ZS', tint: '#F4F2AE' },
  { quote: 'MatjarX delivered our website in 7 days, with excellent quality and smooth communication throughout.', name: 'Samuel Abbas Jaffri', company: 'Verified Trustpilot review', initials: 'SJ', tint: '#BFD4E6' },
]

const FAQ_DATA = [
  { question: 'Which plan is right for me?', answer: 'Launch gets you online with a professional website, domain, email and hosting. Boost is our most popular — it adds unlimited edits done by us, advanced SEO and selling on Google, Facebook and Instagram. Growth adds a dedicated team and monthly marketing sessions. Platinum is a fully custom build for serious e-commerce.' },
  { question: 'How do I get started?', answer: 'Pick a plan and check out. You fill in a short questionnaire about your business, we build the whole site in seven days, then we launch it with you on a live call.' },
  { question: 'How does this all work?', answer: "Our team designs, writes and builds your site — you don't touch a builder. Once live, you can edit anything yourself in our editor, or send changes to your concierge and we do them for you." },
  { question: 'Can I switch plans?', answer: 'Yes, any time. Upgrading applies immediately and we only charge the difference. Downgrading takes effect at your next billing date.' },
  { question: 'How do I cancel?', answer: "Message your concierge or email office@matjarx.com. There's no lock-in contract — cancel before your next billing date and you won't be charged again. Within the first 30 days you get a full refund." },
  { question: 'Is the setup fee charged every year?', answer: 'No. The setup fee is one-time and covers the full build — design, copy, images, SEO and launch. After that you only pay the monthly plan fee.' },
]

const LIGHT_THEME = {
  bg: 'rgba(255,255,255,0.62)', border: 'rgba(255,255,255,0.85)', shadow: '0 16px 40px rgba(4,18,31,0.07), inset 0 1px 0 rgba(255,255,255,0.9)', blur: 'blur(22px)',
  ink: '#04121F', muted: '#6A7F92', body: '#3B5063', rule: 'rgba(4,18,31,0.09)',
  tick: 'var(--olive)', ctaInk: '#FFFFFF', ctaBg: '#003366', ctaBorder: '#003366', savingInk: 'var(--olive)',
}
const DARK_THEME = {
  bg: 'linear-gradient(160deg, rgba(0,51,102,0.96), rgba(0,28,51,0.96))', border: 'rgba(255,255,255,0.16)', shadow: '0 30px 66px rgba(4,18,31,0.3), inset 0 1px 0 rgba(255,255,255,0.2)', blur: 'blur(26px)',
  ink: '#FFFFFF', muted: 'rgba(255,255,255,0.6)', body: 'rgba(255,255,255,0.82)', rule: 'rgba(255,255,255,0.16)',
  tick: 'var(--moss-light)', ctaInk: '#16210B', ctaBg: 'var(--butter)', ctaBorder: 'var(--butter)', savingInk: 'var(--butter)',
}

const PLAN_ROWS = [
  { name: 'Launch', base: 4500, setup: '22,500', pitch: 'We build and launch your website.', cta: 'Choose Launch', theme: LIGHT_THEME, tag: '', inherits: '', href: routes.plan('launch'),
    features: ['Built-for-you website or online store', 'Personalised design, made for your trade', 'Fast loading, structured to rank on Google', 'Ready in 7 days', 'Custom domain, or connect one you own', 'Professional business email address', 'Easy-to-use editor', '0% fees on sales and bookings', '1-on-1 launch and training call', 'Secure hosting and SSL certificate', '30-day money-back guarantee'] },
  { name: 'Boost', base: 15600, setup: '22,500', pitch: 'We manage your online presence.', cta: 'Choose Boost', theme: DARK_THEME, tag: 'Most popular', inherits: 'Everything in Launch, plus:', href: routes.plan('boost'),
    features: ['4 business email addresses', 'Advanced SEO to rank on Google', 'Unlimited done-for-you edits', 'Live chat, lead forms and multimedia added for you', 'Promote products on Google, Facebook and Instagram', 'VIP phone support'] },
  { name: 'Growth', base: 27000, setup: '22,500', pitch: 'We grow your business online.', cta: 'Choose Growth', theme: LIGHT_THEME, tag: '', inherits: 'Everything in Boost, plus:', href: routes.plan('growth'),
    features: ['Dedicated VIP growth team', 'A marketing plan built for your business', '1-on-1 monthly marketing sessions', 'Advice on email, social, ads, SEO and reputation', '2,000 words of fresh content written monthly'] },
  { name: 'Platinum', base: 55000, setup: '140,000', pitch: 'We scale your e-commerce business.', cta: 'Talk to us', theme: LIGHT_THEME, tag: 'Custom built', inherits: 'Everything in Growth, plus:', href: routes.plan('platinum'),
    features: ['Custom design built in our own tool', 'Full webstore built for you', 'Unlimited products and unlimited edits', 'Sell subscriptions and digital products', 'Manage multi-seat bookings', 'Enhanced marketing integrations'] },
]

const CYCLES = [
  { id: 'monthly' as const, label: 'Monthly' },
  { id: 'yearly' as const, label: 'Yearly' },
  { id: 'two' as const, label: 'Two-year' },
]
const CYCLE_FACTOR = { monthly: 1, yearly: 10 / 12, two: 0.75 }

function money(n: number) {
  return n.toLocaleString('en-US')
}

export default function PricingContent() {
  const [cycle, setCycle] = useState<'monthly' | 'yearly' | 'two'>('monthly')
  const [openGroup, setOpenGroup] = useState(0)
  const [openFaq, setOpenFaq] = useState(-1)

  const factor = CYCLE_FACTOR[cycle]
  const fmt = (n: number) => Math.round((n * factor) / 50) * 50
  const savingFor = (base: number) => {
    if (cycle === 'monthly') return ''
    const saved = (base - fmt(base)) * 12
    return `Save Rs. ${money(saved)} a year`
  }
  const saveNote = cycle === 'monthly' ? '2 months free on yearly billing' : cycle === 'yearly' ? '2 months free applied' : 'Best value — 25% off every month'

  return (
    <div style={{ position: 'relative', fontFamily: 'var(--font-open-sans), "Open Sans", Arial, sans-serif', background: 'var(--cream)', color: 'var(--ink-2)', overflowX: 'hidden' }}>
      <SiteHeader active="pricing" />

      {/* Hero */}
      <section style={{ background: 'var(--navy)', padding: '66px 24px 58px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18, textAlign: 'center' }}>
          <span style={{ fontSize: 12, letterSpacing: '2.4px', textTransform: 'uppercase', color: 'var(--moss-light)', fontWeight: 600 }}>MatjarX website pricing</span>
          <h1 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 'clamp(32px, 6vw, 54px)', lineHeight: 1.07, letterSpacing: '-1.9px', color: '#FFFFFF' }}>
            Launch, manage and grow your <span style={{ background: 'var(--moss-light)', color: '#16210B', padding: '0 10px', borderRadius: 3 }}>business online</span>
          </h1>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '12px 30px', paddingTop: 6 }}>
            {HERO_TICKS.map((t) => (
              <span key={t} style={{ display: 'flex', alignItems: 'center', gap: 9, fontSize: 14.5, color: 'rgba(255,255,255,0.82)' }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--butter)' }} />
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Plans */}
      <section id="plans" style={{ maxWidth: 1240, margin: '0 auto', padding: '46px 24px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20, flexWrap: 'wrap', marginBottom: 12 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 7 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--olive)', fontStyle: 'italic' }}>{saveNote}</span>
            <div style={{ display: 'flex', gap: 5, padding: 5, borderRadius: 999, background: 'var(--cream-deep)', border: '1px solid rgba(4,18,31,0.08)' }}>
              {CYCLES.map((c) => {
                const on = cycle === c.id
                return (
                  <button key={c.id} type="button" onClick={() => setCycle(c.id)} style={{ all: 'unset', cursor: 'pointer', padding: '10px 22px', borderRadius: 999, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 13.5, color: on ? '#FFFFFF' : '#4B5D6E', background: on ? 'var(--navy)' : 'transparent', transition: 'background 180ms ease' }}>{c.label}</button>
                )
              })}
            </div>
          </div>
          <a href="tel:+923033720953" className="pricing-call-cta" style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '12px 20px', borderRadius: 999, background: '#04121F' }}>
            <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="var(--butter)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flex: '0 0 auto' }}><path d="M6.5 4h3l1.5 3.6-2 1.4a10 10 0 0 0 5.5 5.5l1.4-2L19.5 14v3a1.6 1.6 0 0 1-1.8 1.6A14 14 0 0 1 5 6.3 1.6 1.6 0 0 1 6.5 4Z" /></svg>
            <span style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)' }}>Got questions? Call us</span>
              <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 14, color: '#FFFFFF' }}>+92 303 372 0953</span>
            </span>
          </a>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 262px), 1fr))', gap: 18, alignItems: 'stretch', paddingTop: 22 }}>
          {PLAN_ROWS.map((p) => {
            const t = p.theme
            const price = fmt(p.base)
            const saving = savingFor(p.base)
            return (
              <div key={p.name} style={{ padding: '28px 25px 30px', borderRadius: 24, display: 'flex', flexDirection: 'column', gap: 12, background: t.bg, border: `1.5px solid ${t.border}`, backdropFilter: t.blur, boxShadow: t.shadow }}>
                {p.tag && <span style={{ alignSelf: 'flex-start', fontSize: 10.5, fontWeight: 700, letterSpacing: '0.9px', textTransform: 'uppercase', padding: '6px 12px', borderRadius: 999, color: '#3D3A08', background: 'var(--butter)' }}>{p.tag}</span>}
                <h3 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 25, letterSpacing: '-0.7px', color: t.ink }}>{p.name}</h3>
                <span style={{ fontSize: 13.5, lineHeight: 1.5, color: t.muted }}>{p.pitch}</span>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 5, paddingTop: 8 }}>
                  <span style={{ fontSize: 15, fontWeight: 600, color: t.muted }}>Rs.</span>
                  <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 36, letterSpacing: '-1.3px', color: t.ink }}>{money(price)}</span>
                  <span style={{ fontSize: 14, color: t.muted }}>/mo</span>
                </div>
                <span style={{ fontSize: 12.5, color: t.muted }}>+ Rs. {p.setup} one-time setup</span>
                {saving && <span style={{ fontSize: 12.5, fontWeight: 600, color: t.savingInk }}>{saving}</span>}
                <Link href={p.href} style={{ display: 'block', paddingTop: 8 }}>
                  <span style={{ display: 'block', textAlign: 'center', padding: '14px 18px', borderRadius: 999, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 14, color: t.ctaInk, background: t.ctaBg, border: `1.5px solid ${t.ctaBorder}` }}>{p.cta}</span>
                </Link>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingTop: 16, marginTop: 6, borderTop: `1px solid ${t.rule}` }}>
                  {p.inherits && <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 13.5, color: t.ink }}>{p.inherits}</span>}
                  {p.features.map((f) => (
                    <span key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 9, fontSize: 13, lineHeight: 1.5, color: t.body }}>
                      <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke={t.tick} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" style={{ flex: '0 0 auto', marginTop: 3 }}><path d="m5 12.5 4.5 4.5L19 7" /></svg>
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
        <p style={{ margin: '26px auto 0', maxWidth: 660, textAlign: 'center', fontSize: 13.5, lineHeight: 1.6, color: '#6A7F92' }}>
          Prices in PKR, billed to Pakistani businesses. Gulf clients are quoted in AED at the equivalent rate — <Link href={routes.contact} style={{ fontWeight: 600 }}>ask for a quote</Link>.
        </p>
      </section>

      {/* Savings calculator */}
      <section id="calculator" style={{ maxWidth: 1240, margin: '0 auto', padding: '66px 24px 0' }}>
        <SavingsCalculator />
      </section>

      {/* Compare plans */}
      <section style={{ maxWidth: 900, margin: '0 auto', padding: '76px 24px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, textAlign: 'center', marginBottom: 34 }}>
          <h2 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 'clamp(26px, 4.4vw, 38px)', lineHeight: 1.12, letterSpacing: '-1.2px', color: '#04121F' }}>Compare our <span style={{ background: 'var(--butter)', padding: '0 9px', borderRadius: 3 }}>plans</span></h2>
          <p style={{ margin: 0, fontSize: 15.5, color: '#435A70' }}>The best investment you&apos;ll make all year.</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {COMPARE_GROUPS.map((g, i) => {
            const open = openGroup === i
            return (
              <div key={g.title} className="glass-card" style={{ borderRadius: 18, overflow: 'hidden' }}>
                <button type="button" onClick={() => setOpenGroup(open ? -1 : i)} style={{ all: 'unset', cursor: 'pointer', boxSizing: 'border-box', width: '100%', display: 'flex', alignItems: 'center', gap: 16, padding: '20px 24px' }}>
                  <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 16.5, color: '#04121F', marginRight: 'auto', textAlign: 'left' }}>{g.title}</span>
                  <span className="glass-cream" style={{ width: 28, height: 28, flex: '0 0 auto', borderRadius: '50%', display: 'grid', placeItems: 'center' }}>
                    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="#04121F" strokeWidth="2.4" strokeLinecap="round" style={{ transform: open ? 'rotate(45deg)' : 'rotate(0deg)', transition: 'transform 200ms ease' }}><path d="M12 5v14M5 12h14" /></svg>
                  </span>
                </button>
                {open && (
                  <div className="table-scroll" style={{ padding: '0 24px 22px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.7fr) repeat(4, minmax(58px, 0.55fr))', gap: '8px 10px', alignItems: 'center', minWidth: 520 }}>
                      <span />
                      {['Launch', 'Boost', 'Growth', 'Platinum'].map((h) => (
                        <span key={h} style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 11.5, letterSpacing: '0.4px', textTransform: 'uppercase', color: '#6A7F92', textAlign: 'center' }}>{h}</span>
                      ))}
                      {g.rows.map((r) => {
                        const [label, a, b, c, d] = r
                        return (
                          <Fragment key={label}>
                            <span style={{ fontSize: 13.5, lineHeight: 1.45, color: '#24384A', padding: '9px 0', borderTop: '1px solid rgba(4,18,31,0.07)' }}>{label}</span>
                            {cellsFor(a, b, c, d).map((cell, ci) => (
                              <span key={ci} style={{ display: 'grid', placeItems: 'center', padding: '9px 0', borderTop: '1px solid rgba(4,18,31,0.07)', fontSize: 12.5, fontWeight: 600, color: cell.color }}>{cell.mark}</span>
                            ))}
                          </Fragment>
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ background: 'var(--cream-deep)', padding: '78px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <h2 style={{ margin: '0 0 40px', textAlign: 'center', fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 'clamp(26px, 4.4vw, 38px)', lineHeight: 1.14, letterSpacing: '-1.2px', color: '#04121F' }}>
            Join 70,000+ business owners <span style={{ background: 'var(--moss-light)', padding: '0 9px', borderRadius: 3 }}>who love MatjarX</span>
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: 20 }}>
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="glass-card" style={{ padding: '30px 28px', borderRadius: 22, display: 'flex', flexDirection: 'column', gap: 18 }}>
                <span style={{ fontSize: 15, letterSpacing: '2.5px', color: '#C6A20E' }}>★★★★★</span>
                <p style={{ margin: 0, fontSize: 16, lineHeight: 1.62, color: '#24384A' }}>&ldquo;{t.quote}&rdquo;</p>
                <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ width: 42, height: 42, flex: '0 0 auto', borderRadius: '50%', background: t.tint, display: 'grid', placeItems: 'center', fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 14, color: '#04121F' }}>{t.initials}</span>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0 }}>
                    <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 15, color: '#04121F' }}>{t.name}</span>
                    <span style={{ fontSize: 12.5, color: '#6A7F92' }}>{t.company}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="glass-card" style={{ margin: '34px auto 0', maxWidth: 560, padding: '22px 26px', borderRadius: 18, display: 'flex', alignItems: 'center', gap: 18, flexWrap: 'wrap', justifyContent: 'center' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <svg viewBox="0 0 24 24" width="20" height="20" fill="#00B67A" style={{ flex: '0 0 auto' }}><path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.6 7-6.2-3.8-6.2 3.8 1.6-7L2 9.2l7.1-.6z" /></svg>
              <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 15.5, color: '#04121F' }}>Trustpilot</span>
            </span>
            <span style={{ width: 1, height: 26, background: 'rgba(4,18,31,0.12)' }} />
            <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 17, color: '#04121F' }}>4.8 / 5</span>
            <span style={{ fontSize: 14, letterSpacing: '2px', color: '#00B67A' }}>★★★★★</span>
            <span style={{ fontSize: 13, color: '#6A7F92' }}>Rated &lsquo;Excellent&rsquo; by our clients</span>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section style={{ maxWidth: 1000, margin: '0 auto', padding: '78px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: 40, alignItems: 'start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, minWidth: 0 }}>
            <h2 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 'clamp(24px, 4vw, 34px)', lineHeight: 1.14, letterSpacing: '-1.1px', color: '#04121F' }}>Frequently asked <span style={{ background: 'var(--butter)', padding: '0 8px', borderRadius: 3 }}>questions</span></h2>
            <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: '#435A70' }}>Everything you need to use MatjarX like a pro.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5, paddingTop: 6 }}>
              <span style={{ fontSize: 14, fontWeight: 600, color: '#04121F' }}>Still have questions?</span>
              <a href="tel:+923033720953" style={{ fontSize: 14, fontWeight: 600, color: 'var(--olive)' }}>Call us: +92 303 372 0953</a>
              <a href="mailto:office@matjarx.com" style={{ fontSize: 14, fontWeight: 600, color: 'var(--olive)' }}>office@matjarx.com</a>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, minWidth: 0 }}>
            {FAQ_DATA.map((q, i) => {
              const open = openFaq === i
              return (
                <div key={q.question} className="glass-card" style={{ borderRadius: 16, overflow: 'hidden' }}>
                  <button type="button" onClick={() => setOpenFaq(open ? -1 : i)} style={{ all: 'unset', cursor: 'pointer', boxSizing: 'border-box', width: '100%', display: 'flex', alignItems: 'center', gap: 14, padding: '18px 20px' }}>
                    <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 15, color: '#04121F', marginRight: 'auto', textAlign: 'left' }}>{q.question}</span>
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#6A7F92" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flex: '0 0 auto', transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 200ms ease' }}><path d="m6 9 6 6 6-6" /></svg>
                  </button>
                  {open && <p style={{ margin: 0, padding: '0 20px 20px', fontSize: 14.5, lineHeight: 1.65, color: '#435A70' }}>{q.answer}</p>}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
