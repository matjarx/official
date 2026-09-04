import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import AmbientOrbs from '@/components/AmbientOrbs'
import EditorShowcase from '@/components/EditorShowcase'

export default function HomePage() {
  return (
    <div style={{ position: 'relative', fontFamily: 'var(--font-open-sans), "Open Sans", Arial, sans-serif', background: 'var(--cream)', color: 'var(--ink-2)', overflowX: 'hidden' }}>
      <AmbientOrbs />
      <div className="page-content">
        <SiteHeader active="home" />
        <div style={{ padding: '80px 24px', maxWidth: 1240, margin: '0 auto' }}>
          <EditorShowcase />
        </div>
        <SiteFooter />
      </div>
    </div>
  )
}
