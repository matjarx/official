import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import LegalContent from '@/components/legal/LegalContent'
import { LEGAL_DATA, LEGAL_DOC_KEYS, type LegalDoc } from '@/lib/legal-data'

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
  return {
    title: d.title,
    description: d.intro,
  }
}

export default async function LegalDocPage({ params }: { params: Promise<{ doc: string }> }) {
  const { doc } = await params
  if (!isLegalDoc(doc)) notFound()
  return <LegalContent doc={doc} />
}
