import type { Metadata } from 'next'
import AlternativesContent from '@/components/alternatives/AlternativesContent'
import { META } from '@/lib/alternatives-data'

export const metadata: Metadata = {
  alternates: { canonical: '/alternatives' },
  title: META.title,
  description: META.description,
}

export default function Page() {
  return <AlternativesContent />
}
