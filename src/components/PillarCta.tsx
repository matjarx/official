// The one call-to-action box on a blog post or city page, matched to the
// page's content pillar (see src/lib/pillars.ts). Same look as the
// "Want this handled for you?" box it replaces.

import Link from 'next/link'
import type { PillarCta as PillarCtaData } from '@/lib/pillars'

export default function PillarCta({ cta, style }: { cta: PillarCtaData; style?: React.CSSProperties }) {
  return (
    <div style={{ padding: '30px 32px', borderRadius: 22, background: 'linear-gradient(150deg, var(--butter), var(--moss-light))', display: 'flex', flexDirection: 'column', gap: 14, ...style }}>
      <h3 style={{ margin: 0, fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 900, fontSize: 25, lineHeight: 1.16, letterSpacing: '-0.7px', color: '#1F2A08' }}>{cta.title}</h3>
      <p style={{ margin: 0, fontSize: 15.5, lineHeight: 1.6, color: '#3D4A16' }}>{cta.body}</p>
      <Link href={cta.href} className="btn-navy" style={{ alignSelf: 'flex-start', marginTop: 4 }}>{cta.label}</Link>
    </div>
  )
}
