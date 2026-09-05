import type { Metadata } from 'next'
import TemplatesContent from '@/components/templates/TemplatesContent'
import { META } from '@/lib/templates-data'

export const metadata: Metadata = {
  title: META.title,
  description: META.description,
}

export default function Page() {
  return <TemplatesContent />
}
