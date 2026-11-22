// Homepage v2 — the "v2 · Desktop 1440" design, plus the motion layer
// worked out from the four reference sites:
//
//   segmentsix.de     rotating announcement ticker, section index rail,
//                     scroll-driven word marquee
//   miguelrecio.es    "View" cursor bubble, image peek on list rows,
//                     magnetic buttons, floating bottom dock
//   burgundy.studio   page background that morphs between sections,
//                     media that scales into its frame on scroll
//   ksenpanchenko.com sticky numbered index beside stacking work cards
//
// A server component: static sections ship as HTML only. The interactive
// parts are client islands: Chrome (ticker, header, menu), V2Client (editor
// demo, cost calculator), TemplatesShowcase, MarqToggle, StepsNav, Motion.

 
import { Z1, Z3, Z4, Z5, Z6, Z7, Z8, Z9, Z11, Z12, Z13, Z14 } from './V2Markup'
import { EditorSection, CostSection } from './V2Client'
import { Ann, Header, type TickerItem } from './Chrome'
import TemplatesShowcase, { type ShowcaseItem } from './TemplatesShowcase'
import Motion from './Motion'
import './home-v2.css'
import './motion.css'

export type { TickerItem }

/* ── Scroll-driven word marquee (segmentsix) ──────────────────────── */
const WORDS = ['Websites', 'Online stores', 'Bookings', 'SEO', 'Growth marketing', 'Live in 7 days']
function WordMarquee() {
  const row = (k: string) => (
    <div className="hv-wm-row" data-hv-wm={k} aria-hidden="true">
      {[0, 1, 2].map((r) => WORDS.map((w, i) => (
        <span key={`${r}-${i}`} className={(i + (k === 'b' ? 1 : 0)) % 2 ? 'o' : ''}>{w}<b>✱</b></span>
      )))}
    </div>
  )
  return (
    <section className="hv-wm" aria-label="What we do">
      <p className="sr-only">Websites, online stores, bookings, SEO and growth marketing — live in 7 days.</p>
      {row('a')}
      {row('b')}
    </section>
  )
}

export default function HomeV2({ templates, announcement, liveDemos = false }: { templates: ShowcaseItem[]; announcement: TickerItem | null; liveDemos?: boolean }) {
  return (
    <div className="v2 hv2">
      <Ann lead={announcement} />
      <Header />
      <Z1 />
      <EditorSection />
      <Z3 />
      <Z4 />
      <Z5 />
      <Z6 />
      <Z7 />
      <WordMarquee />
      <TemplatesShowcase items={templates} live={liveDemos} />
      <Z8 />
      <Z9 />
      <CostSection />
      <Z11 />
      <Z12 />
      <Z13 />
      <Z14 />
      <Motion />
    </div>
  )
}
