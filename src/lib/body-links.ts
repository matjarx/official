// In-body links for the money pages (spec group 5, item 4).
//
// The targets and anchor text come from the SEO sheet, tab "Internal
// links", via scripts/seo/gen-body-links.py -> generated/body-links.json,
// already filtered to targets that return 200. This file only turns them
// into sentences, using each anchor exactly as given. Links of the same
// kind share one sentence ("See our pages on X, Y and Z."), placed where
// the first of them appears in the sheet's order.

import data from './generated/body-links.json'

export type Segment = string | { href: string; text: string }

type Link = { href: string; text: string }

const BODY_LINKS = data.links as unknown as Record<string, [string, string][]>

// Each link belongs to a group; a group renders as one sentence.
type Group =
  | { kind: 'single'; key: string; links: Link[] }
  | { kind: 'cities' | 'nearby' | 'industries' | 'plans' | 'rivals'; key: string; links: Link[] }

const CITY_NAME = /^[A-Z][a-z]+$/

function groupOf(l: Link): { kind: Group['kind']; key: string } {
  if (l.href.startsWith('/website-design-')) return CITY_NAME.test(l.text) ? { kind: 'cities', key: 'cities' } : { kind: 'nearby', key: 'nearby' }
  if (l.href.startsWith('/website-for-')) return { kind: 'industries', key: 'industries' }
  if (l.href.startsWith('/plans/')) return { kind: 'plans', key: 'plans' }
  if (l.href.startsWith('/alternatives/matjarx-vs-')) return { kind: 'rivals', key: 'rivals' }
  return { kind: 'single', key: `${l.href}|${l.text}` }
}

/** "a", "a and b", "a, b and c" -- or "or" in place of "and". */
function list(links: Link[], join = 'and', article = ''): Segment[] {
  const out: Segment[] = []
  links.forEach((l, i) => {
    if (i > 0) out.push(i === links.length - 1 ? ` ${join} ${article}` : `, ${article}`)
    out.push(l)
  })
  return out
}

// One sentence per single link, keyed by target, then by anchor where the
// anchor's grammar needs a different frame.
function single(l: Link): Segment[] {
  const a = l
  switch (l.href) {
    case '/done-for-you-website':
      return l.text === 'done-for-you website'
        ? ['Prefer not to build it yourself? Get a ', a, '.']
        : ['Want it built for you? See our ', a, '.']
    case '/local-national-and-global-seo':
      return ['To get found on Google, see our ', a, '.']
    case '/growth-marketing-service':
      return l.text === 'digital marketing agency'
        ? ['Need a ', a, '? Our team runs your social media and ads.']
        : ['For social media and ads, see our ', a, ' service.']
    case '/concierge-service':
      return ['For changes after launch, see our ', a, '.']
    case '/complete-website-audit-for-organic-visibility':
      return ['You can ', a, ' for free.']
    case '/pricing':
      if (l.text === 'compare plans') return ['You can ', a, ' side by side.']
      if (l.text.startsWith('website price')) return ['Check the ', a, ' for each plan.']
      return ['See ', a, ' for every plan.']
    case '/website-examples':
      return ['Browse our ', a, '.']
    case '/templates':
      return l.text.startsWith('all ') ? ['Browse ', a, '.'] : ['Or start from one of our ', a, '.']
    case '/best-website-builder-pakistan':
      return ['Comparing options? See our guide to choosing a ', a, '.']
    case '/alternatives':
      return ['See ', a, ' side by side.']
    case '/blogs/local-seo-for-small-business-guide':
      return ['Start with our ', a, '.']
  }
  if (l.href.startsWith('/templates/')) return ['There is a ', a, ' for this kind of business.']
  if (l.href.startsWith('/blogs/')) return ['Read our guide to ', a, '.']
  return ['See ', a, '.']
}

function sentence(g: Group): Segment[] {
  switch (g.kind) {
    case 'single':
      return single(g.links[0])
    case 'cities':
      return ['We build websites for businesses in ', ...list(g.links), '.']
    case 'nearby':
      return ['Nearby, see ', ...list(g.links), '.']
    case 'industries':
      return [g.links.length > 1 ? 'See our pages on ' : 'See our page on ', ...list(g.links), '.']
    case 'plans':
      return ['See what the ', ...list(g.links), g.links.length > 1 ? ' include.' : ' includes.']
    case 'rivals':
      return ['Looking for a ', ...list(g.links, 'or', 'a '), '? See how MatjarX compares.']
  }
}

/** The page's in-body link sentences, or [] when the sheet has none for it. */
export function bodyLinksFor(path: string): Segment[][] {
  const groups: Group[] = []
  for (const [href, text] of BODY_LINKS[path] ?? []) {
    const l = { href, text }
    const { kind, key } = groupOf(l)
    const g = groups.find((x) => x.key === key)
    if (g) g.links.push(l)
    else groups.push({ kind, key, links: [l] } as Group)
  }
  return groups.map(sentence)
}
