// The company claim, in the one wording allowed anywhere on the site
// (decided Oct 2026). Stat tiles show "70,000+ / websites built by our
// team", and the full sentence sits directly under any tile row that
// carries that number.
export const CLAIM =
  'Our team has 7+ years of experience and has built 70,000+ websites, first under our US brand and now in Pakistan.'


/** True when a tile row shows the 70,000 number, so the claim line goes under it. */
export const showsClaimTile = (tiles: { value: string }[]) => tiles.some((t) => t.value.replace(/\D/g, '').startsWith('70000'))
