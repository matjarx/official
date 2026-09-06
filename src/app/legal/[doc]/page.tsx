import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import LegalContent from '@/components/legal/LegalContent'
import { LEGAL_DATA, LEGAL_DOC_KEYS, type LegalDoc, type LegalDocData } from '@/lib/legal-data'
import { routes } from '@/lib/routes'
import { getMergedContent, getSeoOverride } from '@/lib/marketing-content'

// Re-checks marketing_content at most once a minute rather than only at
// build time — otherwise an admin edit would need a full redeploy to show
// up, defeating the point of a live content editor.
export const revalidate = 60

export function generateStaticParams() {
  return LEGAL_DOC_KEYS.map((doc) => ({ doc }))
}

function isLegalDoc(v: string): v is LegalDoc {
  return (LEGAL_DOC_KEYS as string[]).includes(v)
}

export async function generateMetadata({ params }: { params: Promise<{ doc: string }> }): Promise<Metadata> {
  const { doc } = await params
  if (!isLegalDoc(doc)) return {}
  const d = LEGAL_DATA[doc]
  const seo = await getSeoOverride(`legal/${doc}`)
  return {
    title: seo?.title || d.title,
    description: seo?.description || d.intro,
    alternates: { canonical: routes.legal(doc) },
  }
}

export default async function LegalDocPage({ params }: { params: Promise<{ doc: string }> }) {
  const { doc } = await params
  if (!isLegalDoc(doc)) notFound()
  const content = await getMergedContent<LegalDocData>(`legal/${doc}`)
  return <LegalContent doc={doc} content={content} />
}
