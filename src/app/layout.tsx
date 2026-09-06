import type { Metadata } from 'next'
import { Suspense } from 'react'
import Script from 'next/script'
import { GoogleAnalytics } from '@next/third-parties/google'
import { Lato, Open_Sans } from 'next/font/google'
import PageviewTracker from '@/components/PageviewTracker'
import WebVitalsReporter from '@/components/WebVitalsReporter'
import './globals.css'

const GA_MEASUREMENT_ID = 'G-FPFM7MMEDB'
const META_PIXEL_ID = '1082965164297632'

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
  sameAs: [
    'https://www.facebook.com/matjarxpakistan/',
    'https://www.instagram.com/matjarxpakistan/',
    'https://x.com/matjar_X',
    'https://www.threads.com/@matjarxpakistan',
    'https://www.tiktok.com/@matjarxofficial',
    'http://linkedin.com/company/matjarx/',
    'https://www.youtube.com/@matjarxofficial',
  ],
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_JSON_LD) }}
        />
        <Suspense fallback={null}>
          <PageviewTracker />
        </Suspense>
        <WebVitalsReporter />
        {children}
        <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />
        {/* Meta Pixel — base code + PageView, per Meta's own snippet. */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${META_PIXEL_ID}');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>
      </body>
    </html>
  )
}
