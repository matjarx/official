// Three fixed radial-gradient orbs behind every page's content — the
// site's ambient background texture. Render as the first child inside a
// `position: relative` page wrapper, with page content in a sibling
// `.page-content` div. `dark` swaps in Home Dark's stronger tint set.
export default function AmbientOrbs({ dark = false }: { dark?: boolean }) {
  const colors = dark
    ? ['rgba(112,117,56,0.55)', 'rgba(41,110,177,0.48)', 'rgba(198,203,138,0.30)']
    : ['rgba(198,203,138,0.40)', 'rgba(120,170,215,0.32)', 'rgba(244,242,174,0.36)']

  return (
    <div className="orb-field">
      <div style={{ position: 'absolute', width: 860, height: 860, left: -250, top: -300, borderRadius: '50%', background: `radial-gradient(circle, ${colors[0]} 0%, transparent 68%)` }} />
      <div style={{ position: 'absolute', width: 720, height: 720, right: -190, top: 340, borderRadius: '50%', background: `radial-gradient(circle, ${colors[1]} 0%, transparent 68%)` }} />
      <div style={{ position: 'absolute', width: 780, height: 780, left: '20%', top: 1400, borderRadius: '50%', background: `radial-gradient(circle, ${colors[2]} 0%, transparent 70%)` }} />
    </div>
  )
}
