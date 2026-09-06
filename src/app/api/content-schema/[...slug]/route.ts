import { NextResponse } from 'next/server'
import { getDefaultContent, getContentOverride } from '@/lib/marketing-content'

// Read-only endpoint the matjarx-platform admin uses to build its content
// editor: given a slug (e.g. "cities/karachi", "plans/launch"), returns
// this page's complete default content plus any current override — the
// same data the live page itself renders from, addressable from outside
// this app without duplicating it anywhere. Nothing sensitive here: every
// field returned is already publicly visible on the live page.
export async function GET(_req: Request, { params }: { params: Promise<{ slug: string[] }> }) {
  const { slug: slugParts } = await params
  const slug = slugParts.join('/')

  const defaultContent = getDefaultContent(slug)
  if (!defaultContent) {
    return NextResponse.json({ error: `Unknown slug: ${slug}` }, { status: 404 })
  }

  const override = await getContentOverride<Record<string, unknown>>(slug)
  return NextResponse.json({ slug, default: defaultContent, override: override ?? {} })
}
