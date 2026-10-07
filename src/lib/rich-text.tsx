// Inline links inside a block's plain text.
//
// A block's `text` is rendered straight into JSX, so until now a post could
// not link to anything from its prose -- the only links on a post page were
// the ones the template drew. For a blog whose job is internal linking,
// that is the feature missing.
//
// ── Why markdown inside the text, and not a spans array ────────────────
//
// The alternative was `{ text, spans: [{start, end, href}] }`: unambiguous,
// and unwritable by hand. It would have needed the block editor to exist
// before a single link could be added, and a migration for 1,249 existing
// blocks. `[text](/href)` needs neither -- every existing block stays valid
// because text without brackets parses to itself, and someone can type a
// link today.
//
// The cost is that a stray bracket pair followed by a parenthesis becomes a
// link. That is the known trade and the parser is deliberately strict about
// it: the href must be non-empty and contain no whitespace or closing
// bracket, which is what stops "(see below)" prose from matching.

import type { ReactNode } from 'react'

/** `[label](href)` where href has no spaces, parens or brackets. */
const LINK = /\[([^\]]+)\]\(([^\s()[\]]+)\)/g

/** True for a link that leaves the site. */
function isExternal(href: string): boolean {
  return /^https?:\/\//i.test(href) || href.startsWith('//')
}

/**
 * Render a block's text with any `[label](href)` turned into a real link.
 *
 * Returns the string unchanged when there is nothing to do, so the
 * overwhelming majority of blocks cost one regex test and no allocation.
 */
export function richText(text: string): ReactNode {
  if (!text.includes('[')) return text

  const out: ReactNode[] = []
  let cursor = 0
  let m: RegExpExecArray | null
  LINK.lastIndex = 0
  while ((m = LINK.exec(text)) !== null) {
    if (m.index > cursor) out.push(text.slice(cursor, m.index))
    const [, label, href] = m
    const external = isExternal(href)
    out.push(
      <a
        key={`${m.index}-${href}`}
        href={href}
        // noopener on external links only. Adding it to an internal link
        // costs nothing but says something untrue about where it goes.
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        style={{ color: 'inherit', textDecoration: 'underline', textUnderlineOffset: 2 }}
      >
        {label}
      </a>
    )
    cursor = m.index + m[0].length
  }
  if (cursor === 0) return text
  if (cursor < text.length) out.push(text.slice(cursor))
  return out
}

/** The same text with link syntax removed, for places that need a plain
 *  string -- a heading id, an excerpt, a meta description. */
export function plainText(text: string): string {
  return text.replace(LINK, '$1')
}
