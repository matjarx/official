// The homepage as served at /ar and /ur until those languages exist.
//
// Not a public URL: src/proxy.ts rewrites exactly /ar and /ur here, and
// 404s anyone requesting /untranslated-home/* directly. It exists so those
// two URLs can carry a robots meta tag on top of the X-Robots-Tag header
// the proxy already sends. Every other /ar/<path> keeps the header alone.
//
// Why a route of its own: the tag can only come from metadata, and the
// homepage is prerendered once for every language. Telling the two apart
// would mean reading the request in app/page.tsx, which turns the homepage
// from a prerendered file into a per-request render (see
// lib/locale-server.ts). This page is prerendered too, once per locale.

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import HomeContent from '@/components/home/HomeContent'
import { getMergedContent, type HomeContentShape } from '@/lib/marketing-content'
import { LOCALES, DEFAULT_LOCALE, isLocale } from '@/lib/locale'
import { NOINDEX_FOLLOW } from '@/lib/seo-indexing'

export const revalidate = 60
export const dynamicParams = false

export function generateStaticParams() {
  return LOCALES.filter((l) => l !== DEFAULT_LOCALE).map((locale) => ({ locale }))
}

export const metadata: Metadata = { robots: NOINDEX_FOLLOW }

export default async function UntranslatedHomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale) || locale === DEFAULT_LOCALE) notFound()
  const content = await getMergedContent<HomeContentShape>('home')
  return (
    <>
      {/* Same canonical as the English homepage this is a copy of. */}
      <link rel="canonical" href="https://matjarx.com/" />
      <HomeContent content={content} />
    </>
  )
}
