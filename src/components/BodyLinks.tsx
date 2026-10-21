// A short paragraph of in-body links for a money page, written from the
// SEO sheet's "Internal links" tab (see src/lib/body-links.ts). Plain
// prose in the page's content column -- not a box or a rail -- so the
// links read, and count, as part of the page.

import Link from 'next/link'
import { bodyLinksFor } from '@/lib/body-links'

export default function BodyLinks({ path, style }: { path: string; style?: React.CSSProperties }) {
  const sentences = bodyLinksFor(path)
  if (sentences.length === 0) return null
  return (
    <section style={{ maxWidth: 1400, margin: '0 auto', padding: '56px 24px 0', ...style }}>
      <p style={{ margin: 0, maxWidth: 820, fontSize: 16, lineHeight: 1.75, color: 'var(--ink-4)' }}>
        {sentences.map((s, i) => (
          <span key={i}>
            {i > 0 && ' '}
            {s.map((seg, k) =>
              typeof seg === 'string' ? (
                seg
              ) : (
                <Link key={k} href={seg.href} style={{ color: 'var(--ink-1)', fontWeight: 600, textDecoration: 'underline', textUnderlineOffset: 3, textDecorationColor: 'var(--moss-light)' }}>
                  {seg.text}
                </Link>
              ),
            )}
          </span>
        ))}
      </p>
    </section>
  )
}
