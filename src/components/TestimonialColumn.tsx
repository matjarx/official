// The stars / quote / attribution column, shared by the industry and city
// quote panels.
//
// Only this column was duplicated. The panels around it genuinely differ —
// an industry page puts result stats beside the quote inside a
// `glass-dark-panel`, a city page puts a list of wins inside its own
// gradient — so those stay where they are. This is the part that was the
// same character for character in both.

export default function TestimonialColumn({ quote, name, company }: {
  quote: string
  /** Both are optional in the industry and city data, and the markup this
   *  replaced rendered a missing one as nothing. Kept that way. */
  name?: string
  company?: string
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14, minWidth: 0 }}>
      <span style={{ fontSize: 15, letterSpacing: '2.5px', color: 'var(--butter)' }}>★★★★★</span>
      <p style={{ margin: 0, fontSize: 'clamp(15px, 1.8vw, 17px)', lineHeight: 1.62, color: 'rgba(var(--ink-inverse-rgb), 0.9)' }}>&ldquo;{quote}&rdquo;</p>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 9, paddingTop: 4 }}>
        <span style={{ fontFamily: 'var(--font-lato), Lato, sans-serif', fontWeight: 700, fontSize: 15, color: 'var(--butter)' }}>{name}</span>
        <span style={{ fontSize: 13, color: 'rgba(var(--ink-inverse-rgb), 0.72)' }}>{company}</span>
      </div>
    </div>
  )
}
