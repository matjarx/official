import { NextResponse } from 'next/server'
import { getMergedContent, SITE_SETTINGS_SLUG, type SiteSettings } from '@/lib/marketing-content'

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

// Public read of the site-wide settings row (GA4/Meta Pixel IDs, social
// links, contact email, default title/description) — fetched client-side
// by SiteFooter (a 'use client' component rendered from ~30 different
// page-content components, so it can't itself await the Supabase-backed
// helper directly the way layout.tsx does). Same shape and fallback
// behavior as every other page's content: a missing row just means every
// field comes back empty, and the caller falls back to its own hardcoded
// default per field.
export async function GET() {
  const settings = await getMergedContent<SiteSettings>(SITE_SETTINGS_SLUG)
  return NextResponse.json(settings, { headers: CORS_HEADERS })
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS })
}
