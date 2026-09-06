import { NextResponse } from 'next/server'
import { getDefaultContent, getContentOverride } from '@/lib/marketing-content'

// Read-only endpoint the matjarx-platform admin uses to build its content
// editor: given a slug (e.g. "cities/karachi", "plans/launch"), returns
// this page's complete default content plus any current override — the
// same data the live page itself renders from, addressable from outside
// this app without duplicating it anywhere. Nothing sensitive here: every
// field returned is already publicly visible on the live page. CORS is
// wide open for that same reason — the admin (a different origin) reads
// this directly rather than through a proxy.
const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string[] }> }) {
  const { slug: slugParts } = await params
  const slug = slugParts.join('/')

  const defaultContent = getDefaultContent(slug)
  if (!defaultContent) {
    return NextResponse.json({ error: `Unknown slug: ${slug}` }, { status: 404, headers: CORS_HEADERS })
  }

  const override = await getContentOverride<Record<string, unknown>>(slug)
  return NextResponse.json({ slug, default: defaultContent, override: override ?? {} }, { headers: CORS_HEADERS })
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS })
}
