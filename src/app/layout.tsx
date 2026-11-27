import type { Metadata } from 'next'
import { Suspense } from 'react'
import Script from 'next/script'
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google'
import { Lato, Open_Sans } from 'next/font/google'
import PageviewTracker from '@/components/PageviewTracker'
import WebVitalsReporter from '@/components/WebVitalsReporter'
import { escapeScriptHtml } from '@/lib/safe-script'
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
import FloatingDock from '@/components/FloatingDock'
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
// The GTM container Meta/TikTok/LinkedIn now live in -- see GTM_SETUP.md for
// the tag configuration (this app has no access to the GTM account itself,
// so those tags are set up by hand in the GTM web UI, not by this code).
const GTM_CONTAINER_ID = 'GTM-KWD8DJX2'

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
const DEFAULT_DESCRIPTION = 'MatjarX builds complete small business websites in 7 days, from Rs. 4,500/month + Rs. 22,500 setup — done-for-you design, SEO and growth marketing.'
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
    // Plain public/icon.png, not the app/icon.png convention file it used
    // to be -- that convention auto-generates a dynamic route that
    // defaults to `Cache-Control: public, max-age=0, must-revalidate`
    // even for a static source image that never changes. Confirmed live:
    // every single request re-fetched it, no caching at all, same root
    // cause class as app.matjarx.com's own favicon bug (fixed there
    // 2026-11-13). A plain public/ file gets normal long-lived static
    // caching for free and is served before any redirect logic runs
    // (see next.config.js's own note on this for blog cover images).
    icons: { icon: '/icon.png' },
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
    // Nothing else depended on it: all routes but one set their own, and
    // the one that does not (home-mobile) is noindex,nofollow and absent
    // from the sitemap.
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
  // Both are admin-editable (Marketing Site > Settings) and get
  // interpolated raw into a <script> body below (gaId also goes into
  // @next/third-parties' own GoogleAnalytics component, which does the
  // same raw interpolation internally) -- not HTML, so escapeScriptHtml
  // doesn't apply here, but an unvalidated value would let a malicious or
  // mistaken CMS edit (`'); fetch(...); //`) run arbitrary JS on every
  // page. A pixel/measurement ID has one legitimate shape each, so
  // validating it at the source closes the hole regardless of how either
  // call site embeds it.
  const gaId = settings.ga_measurement_id && /^G-[A-Z0-9]+$/.test(settings.ga_measurement_id)
    ? settings.ga_measurement_id
    : DEFAULT_GA_MEASUREMENT_ID
  const pixelId = settings.meta_pixel_id && /^\d+$/.test(settings.meta_pixel_id)
    ? settings.meta_pixel_id
    : DEFAULT_META_PIXEL_ID
  const description = settings.default_description || DEFAULT_DESCRIPTION

  // Organization only; LocalBusiness lives on /contact (lib/schema.ts).
  // Its email, phone, address and sameAs are the values specified for SEO
  // group 4, not the admin's settings row, so the schema can't drift from
  // what /contact publishes.
  const orgJsonLd = organizationJsonLd(description)

  return (
    <html lang={locale} dir={dir} className={`${lato.variable} ${openSans.variable}`}>
      <body>
        {/* Consent Mode v2 defaults -- must run before GTM (or any tag)
            loads, so every tag already has a consent state to check against
            on its very first fire rather than firing unconditionally for an
            instant first. Set to 'granted' site-wide for now: there is no
            cookie banner yet to call gtag('consent','update', ...) when a
            visitor actually chooses, so a 'denied' default would just mean
            nothing is ever measured. Revisit when a real banner exists. */}
        <Script id="consent-default" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('consent', 'default', {
              ad_storage: 'granted',
              ad_user_data: 'granted',
              ad_personalization: 'granted',
              analytics_storage: 'granted'
            });
          `}
        </Script>
        {/* Meta/TikTok/LinkedIn are configured as tags inside this GTM
            container (see GTM_SETUP.md) -- not in this app's code. GA4
            stays on its own direct gtag.js load below rather than moving
            into a GTM-native tag: analytics.ts's trackEvent() calls
            window.gtag(...) directly for the 9 real interactions already
            instrumented site-wide, and GTM's own dataLayer.push model
            does not define that function -- moving GA4 in here would
            silently stop every one of those events without erroring. */}
        <GoogleTagManager gtmId={GTM_CONTAINER_ID} dataLayer={{ meta_pixel_id: pixelId }} />
        {/* GTM's own required noscript fallback. */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_CONTAINER_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
            title="GTM"
          />
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: escapeScriptHtml(JSON.stringify(orgJsonLd)) }}
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
          <FloatingDock />
        </ThemeProvider>
        </CurrencyProvider>
        <GoogleAnalytics gaId={gaId} />
      </body>
    </html>
  )
}
