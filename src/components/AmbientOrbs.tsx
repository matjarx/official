// Radial-gradient orbs behind every page's content — the site's ambient
// background texture. Render as the first child inside a page wrapper,
// with page content in a sibling `.page-content` div. `dark` swaps in
// Home Dark's stronger tint set.
//
// `.orb-field` (globals.css) is `position: fixed`, so this renders one
// fixed-size window (the viewport) that never scrolls with the page —
// which is why every offset here is a percentage of that window rather
// than a pixel value: a page can be 1200px or 12,000px tall, but the
// orbs always need to land somewhere inside the current viewport to be
// visible at all, on every device height. Three orbs, spread across the
// viewport (top-left, mid-right, bottom-left) so at least one is always
// in view regardless of scroll position.
export default function AmbientOrbs({ dark = false }: { dark?: boolean }) {
  const colors = dark
    ? ['rgba(112,117,56,0.55)', 'rgba(41,110,177,0.48)', 'rgba(198,203,138,0.30)']
    : ['rgba(198,203,138,0.40)', 'rgba(120,170,215,0.32)', 'rgba(244,242,174,0.36)']

  return (
    <div className="orb-field">
      <div style={{ position: 'absolute', width: '52vmax', height: '52vmax', left: '-16vw', top: '-18vh', borderRadius: '50%', background: `radial-gradient(circle, ${colors[0]} 0%, transparent 68%)` }} />
      <div style={{ position: 'absolute', width: '44vmax', height: '44vmax', right: '-12vw', top: '22vh', borderRadius: '50%', background: `radial-gradient(circle, ${colors[1]} 0%, transparent 68%)` }} />
      <div style={{ position: 'absolute', width: '48vmax', height: '48vmax', left: '14vw', bottom: '-20vh', borderRadius: '50%', background: `radial-gradient(circle, ${colors[2]} 0%, transparent 70%)` }} />
    </div>
  )
}
