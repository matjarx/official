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
import CurrencyProvider from '@/components/CurrencyProvider'
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

import { organizationJsonLd } from '@/lib/schema'
import { dirFor, DEFAULT_LOCALE } from '@/lib/locale'

const SITE_URL = 'https://matjarx.com'

const DEFAULT_TITLE = 'MatjarX — Done-for-you websites, live in 7 days'
const DEFAULT_DESCRIPTION = 'MatjarX builds complete small business websites in 7 days for Rs. 22,500 — done-for-you design, SEO and growth marketing for businesses across Pakistan and the Gulf.'

// Static per-page metadata already overrides title/description on nearly
// every route — this is just the root fallback (and the OG/twitter
// defaults), so making it async to read the settings override doesn't
// change how any individual page's own metadata resolves.
export async function generateMetadata(): Promise<Metadata> {
  const settings = await getMergedContent<SiteSettings>(SITE_SETTINGS_SLUG)
  // The noindex for untranslated /ar and /ur URLs is NOT set here. It is an
  // X-Robots-Tag response header from src/proxy.ts -- see the note there.
  // Reading the locale in this function would make all 154 pages
  // server-rendered on demand; a response header costs nothing.
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
  // lang and dir are English constants, NOT read from the request.
  //
  // Reading the locale here means calling headers(), and a headers() call in
  // the ROOT layout opts every route in the app into dynamic rendering. It
  // measurably did: 154 statically prerendered pages became 5, and every
  // request would re-render React and re-query Supabase instead of serving
  // prerendered HTML -- undoing the round-trip work that took TTFB from
  // 2,045ms to 1,681ms, and paying that on every English page, which is all
  // of today's traffic.
  //
  // It costs nothing today, because /ar/<path> currently SERVES ENGLISH:
  // until the translations exist, lang="en" dir="ltr" is the accurate
  // description of what is on the page, not a compromise.
  //
  // Making it per-locale without going dynamic needs every route under
  // app/[locale]/ so the locale is a root param (next/root-params) and all
  // three languages prerender. That is the move to make when there is
  // translated content to put behind it -- see docs/backlog.md.
  const locale = DEFAULT_LOCALE
  const dir = dirFor(locale)

  const [settings, announcementConfig, popupConfig] = await Promise.all([
    getMergedContent<SiteSettings>(SITE_SETTINGS_SLUG),
    getMergedContent<AnnouncementBarConfig>(ANNOUNCEMENT_BAR_SLUG),
    getMergedContent<PopupConfig>(POPUP_SLUG),
  ])
  const gaId = settings.ga_measurement_id || DEFAULT_GA_MEASUREMENT_ID
  const pixelId = settings.meta_pixel_id || DEFAULT_META_PIXEL_ID
  const description = settings.default_description || DEFAULT_DESCRIPTION

  // Organization only; LocalBusiness lives on /contact (lib/schema.ts).
  // Its email, phone, address and sameAs are the values specified for SEO
  // group 4, not the admin's settings row, so the schema can't drift from
  // what /contact publishes.
  const orgJsonLd = organizationJsonLd(description)

  return (
    <html lang={locale} dir={dir} className={`${lato.variable} ${openSans.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <Suspense fallback={null}>
          <PageviewTracker />
        </Suspense>
        <WebVitalsReporter />
        {/* Only what actually reads the theme sits inside the provider.
            The analytics scripts below do not, and wrapping them would put
            a client boundary around markup that has no reason to be one. */}
        {/* Wraps ThemeProvider's children rather than sitting beside it:
            the footer selector and every price on the page are both inside,
            so one choice reaches all of them. */}
        <CurrencyProvider>
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
        </CurrencyProvider>
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
