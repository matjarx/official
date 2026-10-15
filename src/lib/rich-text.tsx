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

// ── Bold, and nofollow ────────────────────────────────────────────────
//
// `**text**` renders as <strong>, and may wrap a link. A link can carry
// `"nofollow"` after its href -- `[Site](https://x.com "nofollow")`, the
// markdown title position -- for sources cited but not vouched for. Both are
// opt-in syntax: no existing block contains `**` or a quoted title, so every
// stored post renders exactly as before.

import type { ReactNode } from 'react'

/** `[label](href)` or `[label](href "nofollow")`; href has no spaces, parens or brackets. */
const LINK = /\[([^\]]+)\]\(([^\s()[\]]+)(?:\s+"(nofollow)")?\)/g

/** `**text**`, non-greedy, on one line. */
const BOLD = /\*\*(.+?)\*\*/g

/** True for a link that leaves the site. An absolute URL on matjarx.com is
 *  the site itself, written out in full -- same tab, no noopener. */
function isExternal(href: string): boolean {
  if (/^https?:\/\/(www\.)?matjarx\.com(\/|$)/i.test(href)) return false
  return /^https?:\/\//i.test(href) || href.startsWith('//')
}

/**
 * Render a block's text with any `[label](href)` turned into a real link.
 *
 * Returns the string unchanged when there is nothing to do, so the
 * overwhelming majority of blocks cost one regex test and no allocation.
 */
export function richText(text: string): ReactNode {
  if (!text.includes('**')) return links(text)
  const out: ReactNode[] = []
  let cursor = 0
  let m: RegExpExecArray | null
  BOLD.lastIndex = 0
  while ((m = BOLD.exec(text)) !== null) {
    if (m.index > cursor) out.push(links(text.slice(cursor, m.index), `t${cursor}`))
    out.push(<strong key={`b${m.index}`}>{links(m[1], `b${m.index}`)}</strong>)
    cursor = m.index + m[0].length
  }
  if (cursor < text.length) out.push(links(text.slice(cursor), `t${cursor}`))
  return out
}

/** The link pass on its own; `keyPrefix` keeps keys unique when called per bold segment. */
function links(text: string, keyPrefix = ''): ReactNode {
  if (!text.includes('[')) return text

  const out: ReactNode[] = []
  let cursor = 0
  let m: RegExpExecArray | null
  LINK.lastIndex = 0
  while ((m = LINK.exec(text)) !== null) {
    if (m.index > cursor) out.push(text.slice(cursor, m.index))
    const [, label, href, nofollow] = m
    const external = isExternal(href)
    const rel = [external && 'noopener noreferrer', nofollow && 'nofollow'].filter(Boolean).join(' ')
    out.push(
      <a
        key={`${keyPrefix}${m.index}-${href}`}
        href={href}
        // noopener on external links only. Adding it to an internal link
        // costs nothing but says something untrue about where it goes.
        {...(external ? { target: '_blank' } : {})}
        {...(rel ? { rel } : {})}
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
  return text.replace(LINK, '$1').replace(BOLD, '$1')
}
