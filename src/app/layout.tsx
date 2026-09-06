import type { Metadata } from 'next'
import { Lato, Open_Sans } from 'next/font/google'
import './globals.css'

const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  variable: '--font-lato',
  display: 'swap',
})

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-open-sans',
  display: 'swap',
})

const SITE_URL = 'https://matjarx.com'
const DEFAULT_TITLE = 'MatjarX — Done-for-you websites, live in 7 days'
const DEFAULT_DESCRIPTION = 'MatjarX builds complete small business websites in 7 days for Rs. 22,500 — done-for-you design, SEO and growth marketing for businesses across Pakistan and the Gulf.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: '%s · MatjarX',
  },
  description: DEFAULT_DESCRIPTION,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    siteName: 'MatjarX',
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    url: SITE_URL,
    locale: 'en_US',
    // Image itself comes from the opengraph-image.tsx file convention
    // (auto-generated, scoped to this segment and inherited by children
    // that don't define their own) — no need to list it here too.
  },
  twitter: {
    card: 'summary_large_image',
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
  },
}

const ORGANIZATION_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'MatjarX',
  url: SITE_URL,
  logo: `${SITE_URL}/icon.png`,
  description: DEFAULT_DESCRIPTION,
  sameAs: [] as string[],
  contactPoint: [{
    '@type': 'ContactPoint',
    contactType: 'customer service',
    email: 'office@matjarx.com',
    areaServed: ['PK'],
  }],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${lato.variable} ${openSans.variable}`}>
      <body>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_JSON_LD) }}
        />
        {children}
      </body>
    </html>
  )
}
