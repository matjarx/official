import type { Metadata } from 'next'
import { Suspense } from 'react'
import Script from 'next/script'
import { GoogleAnalytics } from '@next/third-parties/google'
import { Lato, Open_Sans } from 'next/font/google'
import PageviewTracker from '@/components/PageviewTracker'
import WebVitalsReporter from '@/components/WebVitalsReporter'
import {
  getMergedContent,
  isWidgetActive,
  SITE_SETTINGS_SLUG,
  ANNOUNCEMENT_BAR_SLUG,
  POPUP_SLUG,
  type SiteSettings,
  type AnnouncementBarConfig,
  type PopupConfig,
} from '@/lib/marketing-content'
import AnnouncementBar from '@/components/AnnouncementBar'
import ThemeProvider from '@/components/ThemeProvider'
import SitePopup from '@/components/SitePopup'
import './globals.css'

// Without this, Next's Data Cache would cache the layout's own
// getMergedContent() calls indefinitely (force-cache is the default for
// fetch-backed reads with no revalidate set) — meaning a Settings,
// Announcements, or Popup edit would only ever show up after a full
// redeploy, not "within a minute" like every other page in this repo.
// Every other page.tsx already has this same line for the same reason;
// the root layout was just missed until now.
export const revalidate = 60

// Today's real values — used unless overridden from the admin's Marketing
// Site > Settings tab, and always the fallback if that row is empty or
// unreachable, so nothing regresses.
const DEFAULT_GA_MEASUREMENT_ID = 'G-FPFM7MMEDB'
const DEFAULT_META_PIXEL_ID = '1082965164297632'
const DEFAULT_CONTACT_EMAIL = 'office@matjarx.com'

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

import { CITY_DATA, CITY_SLUGS } from '@/lib/location-data'

const SITE_URL = 'https://matjarx.com'

// Duplicated from SiteFooter, FaqSection, ContactContent and the two home
// variants, which each hardcode the same number. Worth centralising, but
// not in a change about structured data -- what matters here is that the
// number Google is told is the number the page actually dials.
const BUSINESS_PHONE = '+923033720953'
const DEFAULT_TITLE = 'MatjarX — Done-for-you websites, live in 7 days'
const DEFAULT_DESCRIPTION = 'MatjarX builds complete small business websites in 7 days for Rs. 22,500 — done-for-you design, SEO and growth marketing for businesses across Pakistan and the Gulf.'
const DEFAULT_SOCIALS: Record<string, string> = {
  Facebook: 'https://www.facebook.com/matjarxpakistan/',
  Instagram: 'https://www.instagram.com/matjarxpakistan/',
  X: 'https://x.com/matjar_X',
  Threads: 'https://www.threads.com/@matjarxpakistan',
  TikTok: 'https://www.tiktok.com/@matjarxofficial',
  LinkedIn: 'http://linkedin.com/company/matjarx/',
  YouTube: 'https://www.youtube.com/@matjarxofficial',
}

// Static per-page metadata already overrides title/description on nearly
// every route — this is just the root fallback (and the OG/twitter
// defaults), so making it async to read the settings override doesn't
// change how any individual page's own metadata resolves.
export async function generateMetadata(): Promise<Metadata> {
  const settings = await getMergedContent<SiteSettings>(SITE_SETTINGS_SLUG)
  const title = settings.default_title || DEFAULT_TITLE
  const description = settings.default_description || DEFAULT_DESCRIPTION
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: title,
      // Every real page wraps its own title with pageTitle() (see
      // marketing-content.ts) before returning it — that either returns
      // an absolute title (when the page's own title already mentions
      // MatjarX, which is how most of them are written) or a plain
      // string for this template to brand. Kept at '|' to match how
      // every hand-written and admin-entered title on the site already
      // separates its own brand suffix, rather than the '·' this used
      // to be, which only ever showed up doubled on top of a page's own
      // '| MatjarX'.
      template: '%s | MatjarX',
    },
    description,
    // No canonical here -- see the note in src/app/page.tsx.
    //
    // The homepage must declare `https://matjarx.com/`, and Next strips the
    // root's trailing slash from anything the metadata API produces while
    // trailingSlash is false, including an absolute URL that already ends in
    // one. So the homepage renders its own <link> instead, and this fallback
    // is removed rather than left to emit a second, conflicting canonical.
    //
    // Nothing else depended on it: 151 of the 153 routes set their own, and
    // the two that do not (home-dark, home-mobile) are noindex,nofollow and
    // absent from the sitemap.
    openGraph: {
      type: 'website',
      siteName: 'MatjarX',
      title,
      description,
      url: SITE_URL,
      locale: 'en_US',
      // Image itself comes from the opengraph-image.tsx file convention
      // (auto-generated, scoped to this segment and inherited by children
      // that don't define their own) — no need to list it here too.
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [settings, announcementConfig, popupConfig] = await Promise.all([
    getMergedContent<SiteSettings>(SITE_SETTINGS_SLUG),
    getMergedContent<AnnouncementBarConfig>(ANNOUNCEMENT_BAR_SLUG),
    getMergedContent<PopupConfig>(POPUP_SLUG),
  ])
  const gaId = settings.ga_measurement_id || DEFAULT_GA_MEASUREMENT_ID
  const pixelId = settings.meta_pixel_id || DEFAULT_META_PIXEL_ID
  const contactEmail = settings.contact_email || DEFAULT_CONTACT_EMAIL
  const description = settings.default_description || DEFAULT_DESCRIPTION
  // Overrides apply per-platform by name; a platform with no override (or
  // this whole row missing) keeps its real, live default — never drops a
  // profile just because settings hasn't been touched yet.
  const socials = { ...DEFAULT_SOCIALS, ...settings.socials }

  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'MatjarX',
    url: SITE_URL,
    logo: `${SITE_URL}/icon.png`,
    description,
    sameAs: Object.values(socials),
    contactPoint: [{
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: contactEmail,
      areaServed: ['PK'],
    }],
  }

  // MatjarX's own local identity.
  //
  // The site published Organization but never LocalBusiness -- so the one
  // business here with a real office, a published phone number and stated
  // opening hours was the only one not telling Google any of it. Organization
  // says who a company is; LocalBusiness is what makes it eligible to appear
  // for "near me" and city-qualified searches, which is most of the intent
  // behind "website builder in Lahore".
  //
  // Only what the site already states publicly: the phone number and hours
  // from the contact page, the cities from about-us and careers. No street
  // address is published anywhere, so none is claimed -- addressLocality and
  // addressCountry alone are valid, and an invented street would be worse
  // than an incomplete one. Adding the real street address later is what
  // unlocks the full local rich result.
  const localBusinessJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_URL}/#localbusiness`,
    name: 'MatjarX',
    url: SITE_URL,
    image: `${SITE_URL}/icon.png`,
    logo: `${SITE_URL}/icon.png`,
    description,
    telephone: BUSINESS_PHONE,
    email: contactEmail,
    // Karachi is the address; the other three cities are areaServed.
    //
    // A LocalBusiness node describes ONE location -- that is what lets Google
    // attach a map pin, hours and directions to it. Four addresses on one node
    // gives it nothing to pin, and the alternative (a separate branch node per
    // city) is only worth emitting with a real street address behind each one,
    // which is not published for any of them yet. areaServed is the honest way
    // to say the business operates in all four without inventing four offices.
    //
    // Give me street addresses per city and these become proper branch nodes.
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Karachi',
      addressRegion: 'Sindh',
      addressCountry: 'PK',
    },
    // Every city with a page behind it, generated from the same list those
    // pages are generated from -- so a city added to CITY_DATA appears here
    // without anyone remembering to update a second list. Each of those
    // pages also declares the service for its own city; this is the
    // sitewide claim, and the country closes it off for the rest.
    areaServed: [
      ...CITY_SLUGS.map((slug) => ({ '@type': 'City', name: CITY_DATA[slug].name })),
      { '@type': 'Country', name: 'Pakistan' },
    ],
    openingHoursSpecification: [{
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '11:00',
      closes: '20:00',
    }],
    sameAs: Object.values(socials),
  }

  return (
    <html lang="en" className={`${lato.variable} ${openSans.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        <Suspense fallback={null}>
          <PageviewTracker />
        </Suspense>
        <WebVitalsReporter />
        {/* Only what actually reads the theme sits inside the provider.
            The analytics scripts below do not, and wrapping them would put
            a client boundary around markup that has no reason to be one. */}
        <ThemeProvider>
          {isWidgetActive(announcementConfig) && <AnnouncementBar config={announcementConfig} />}
          {children}
        {/* `heading` is what SitePopup keys everything off -- its own
            render guard, and its frequency cap. An enabled popup with no
            heading is a config that silently does nothing, which reads
            as "the popup is broken". Checking it here at least keeps the
            two in agreement; the admin now warns about it on the way in. */}
          {isWidgetActive(popupConfig) && !!popupConfig.heading && <SitePopup config={popupConfig} />}
        </ThemeProvider>
        <GoogleAnalytics gaId={gaId} />
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
            fbq('init', '${pixelId}');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>
      </body>
    </html>
  )
}
