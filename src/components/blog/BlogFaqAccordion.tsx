'use client'

// The in-body "Frequently asked questions" section of a blog post, styled
// with the site's one shared FAQ accordion (src/components/FaqList.tsx)
// instead of plain bold h3 + paragraph pairs. Its own component because
// FaqList needs a client parent to hold `openIdx` state, and BlogPostContent
// itself stays a server component -- this is the only interactive piece.

import { useState } from 'react'
import { FaqList, type FaqEntry } from '@/components/FaqList'

export default function BlogFaqAccordion({ items }: { items: FaqEntry[] }) {
  const [open, setOpen] = useState(0)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <FaqList items={items} openIdx={open} onToggle={setOpen} itemKey={(_, i) => i} />
    </div>
  )
}
