// /locations: every indexed city page, grouped by province (decided 15
// Oct). The hub the footer, the homepage and every city page's
// breadcrumb point to, so no city page depends on a rotation to be found.

import Link from 'next/link'
import SiteChrome from '@/components/SiteChrome'
import PillarCta from '@/components/PillarCta'
import { routes } from '@/lib/routes'
import { CITY_DATA } from '@/lib/location-data'
import { indexedCitiesByProvince } from '@/lib/location-geo'
import { PILLAR_CTA } from '@/lib/pillars'

const H1 = 'Website design and development in your city'

export default function LocationsContent() {
  const groups = indexedCitiesByProvince()
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://matjarx.com' + routes.home },
      { '@type': 'ListItem', position: 2, name: 'Locations', item: 'https://matjarx.com' + routes.locations },
    ],
  }

  return (
    <div style={{ position: 'relative', fontFamily: 'var(--font-open-sans), "Open Sans", Arial, sans-serif', background: 'var(--cream)', color: 'var(--ink-2)', overflowX: 'clip' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <SiteChrome active="services">
        <section style={{ maxWidth: 1400, margin: '0 auto', padding: '44px 24px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 9, flexWrap: 'wrap', fontSize: 12.5, color: 'var(--ink-muted)' }}>
            <Link href={routes.home}>Home</Link>
            <span>/</span>
            <span style={{ fontWeight: 600, color: 'var(--ink-1)' }}>Locations</span>
          </div>
        </section>

        <section style={{ maxWidth: 1400, margin: '0 auto', padding: '36px 24px 0', display: 'flex', flexDirection: 'column', gap: 16 }}>
          <h1 style={{ margin: 0, maxWidth: 860, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 'clamp(30px, 5vw, 50px)', lineHeight: 1.1, letterSpacing: '-1.6px', color: 'var(--ink-1)' }}>{H1}</h1>
          <p style={{ margin: 0, maxWidth: 720, fontSize: 17, lineHeight: 1.65, color: 'var(--ink-4)' }}>
            Find your city to see what we build for businesses there, the plans, and answers to the questions local owners ask us.
          </p>
        </section>

        {groups.map((g) => (
          <section key={g.province} style={{ maxWidth: 1400, margin: '0 auto', padding: '52px 24px 0' }}>
            <h2 style={{ margin: '0 0 18px', fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 'clamp(21px, 2.8vw, 27px)', letterSpacing: '-0.6px', color: 'var(--ink-1)' }}>{g.province}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 230px), 1fr))', gap: 10 }}>
              {g.cities.map((k) => (
                <Link key={k} href={routes.location(k)} className="keep-reading-card" style={{ display: 'block', padding: '14px 18px', borderRadius: 14, background: 'var(--surface)', border: '1px solid rgba(var(--ink-1-rgb), 0.09)', fontSize: 15, fontWeight: 600, color: 'var(--ink-1)' }}>
                  Website design in {CITY_DATA[k].name}
                </Link>
              ))}
            </div>
          </section>
        ))}

        <section style={{ maxWidth: 1400, margin: '0 auto', padding: '64px 24px 0' }}>
          <PillarCta cta={PILLAR_CTA.P1} />
        </section>
        <div style={{ height: 70 }} />
      </SiteChrome>
    </div>
  )
}
