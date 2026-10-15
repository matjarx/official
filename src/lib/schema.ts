// JSON-LD shared across pages (SEO group 4).
//
// Organization is the sitewide identity, emitted once by the root layout.
// LocalBusiness -- the office, its hours, its street address -- is emitted on
// /contact only: it describes a place you can visit, and repeating it on every
// blog post, city page and /thank-you told Google the same office was the
// subject of 150 pages. Everything else points at the Organization by @id.
//
// No AggregateRating or Review for MatjarX itself: Google treats ratings a
// business publishes about itself as self-serving and ignores or penalises
// them, so none are emitted here or anywhere else.

import { BUSINESS_PHONE_E164 } from './contact-details'

const SITE_URL = 'https://matjarx.com'

export const ORGANIZATION_ID = `${SITE_URL}/#organization`
export const LOCAL_BUSINESS_ID = `${SITE_URL}/#localbusiness`

export const BUSINESS_EMAIL = 'office@matjarx.com'

/** The office, as published on /contact. */
export const BUSINESS_ADDRESS = {
  '@type': 'PostalAddress',
  streetAddress: 'B6, 4th Street, Zamzama, Clifton',
  addressLocality: 'Karachi',
  addressRegion: 'Sindh',
  addressCountry: 'PK',
} as const

/** The profiles the Organization's sameAs lists, exactly as specified (15 Oct). */
export const SOCIAL_PROFILES = [
  'https://www.facebook.com/matjarxpakistan/',
  'https://www.instagram.com/matjarxpakistan/',
  'https://www.linkedin.com/company/matjarx/',
  'https://www.tiktok.com/@matjarxofficial',
  'https://www.youtube.com/@matjarxofficial',
] as const

/**
 * TODO(business): review-site profiles, to be supplied. Paste the full
 * profile URLs here (e.g. 'https://www.trustpilot.com/review/matjarx.com')
 * and they are added to sameAs on every page. Empty strings are skipped.
 */
export const REVIEW_PROFILES = {
  trustpilot: '',
  clutch: '',
} as const

const sameAs = [...SOCIAL_PROFILES, ...Object.values(REVIEW_PROFILES).filter(Boolean)]

export function organizationJsonLd(description?: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORGANIZATION_ID,
    name: 'MatjarX',
    url: `${SITE_URL}/`,
    logo: `${SITE_URL}/icon.png`,
    ...(description && { description }),
    email: BUSINESS_EMAIL,
    telephone: BUSINESS_PHONE_E164,
    address: BUSINESS_ADDRESS,
    sameAs,
    contactPoint: [{
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: BUSINESS_EMAIL,
      telephone: BUSINESS_PHONE_E164,
      areaServed: ['PK'],
    }],
  }
}

/** /contact only -- see the note at the top of this file. */
export function localBusinessJsonLd(areaServed: { '@type': string; name: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': LOCAL_BUSINESS_ID,
    name: 'MatjarX',
    url: `${SITE_URL}/`,
    image: `${SITE_URL}/icon.png`,
    logo: `${SITE_URL}/icon.png`,
    telephone: BUSINESS_PHONE_E164,
    email: BUSINESS_EMAIL,
    address: BUSINESS_ADDRESS,
    parentOrganization: { '@id': ORGANIZATION_ID },
    areaServed,
    openingHoursSpecification: [{
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '11:00',
      closes: '20:00',
    }],
    sameAs,
  }
}

/** A BreadcrumbList from [name, path] pairs, root first. */
export function breadcrumbJsonLd(trail: [name: string, path: string][]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map(([name, path], i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name,
      item: `${SITE_URL}${path}`,
    })),
  }
}
