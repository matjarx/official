// The outer wrapper every page-level *Content.tsx component opens with.
// 26 files had this as the same 180-odd characters, typed out by hand each
// time -- a page root that needs its own position: relative (for an
// AmbientOrbs/decorative child, or a sticky header to anchor against)
// gets this, verbatim, nowhere to drift.
export const PAGE_ROOT: React.CSSProperties = {
  position: 'relative',
  fontFamily: 'var(--font-open-sans), "Open Sans", Arial, sans-serif',
  background: 'var(--cream)',
  color: 'var(--ink-2)',
  overflowX: 'clip',
}
