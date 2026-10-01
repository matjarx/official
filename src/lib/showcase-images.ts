// The showcase image sets, in one place.
//
// EditorShowcase and EditorShowcaseMobile draw completely different chrome —
// a desktop editor against a phone frame — so their markup is rightly
// separate. What was not separate was the data: both files carried the same
// twelve `/showcase/*.webp` paths inline, and the mobile strip was the
// desktop strip with its last entry dropped. Renaming an image meant
// remembering to edit two files, and the strips had already drifted apart by
// one entry with no reason recorded for it.

/** The two storefronts the showcase alternates between. */
export const SHOWCASE_THUMBS = {
  product: ['/showcase/ee-hanger.webp', '/showcase/ee-paisley.webp', '/showcase/ee-purple.webp', '/showcase/ee-chikankari.webp', '/showcase/ee-necklines.webp', '/showcase/ee-blockprint.webp'],
  bakery: ['/showcase/scb-hero.webp', '/showcase/scb-shelf.webp', '/showcase/scb-croissants.webp', '/showcase/scb-cookies.webp', '/showcase/scb-baguettes.webp', '/showcase/scb-muffins.webp'],
} as const

/** The filmstrip under the canvas. Mobile shows the first three; the phone
 *  frame has no room for the fourth. */
export const SHOWCASE_STRIP = {
  product: ['/showcase/ee-chikankari.webp', '/showcase/ee-necklines.webp', '/showcase/ee-blockprint.webp', '/showcase/ee-quilt.webp'],
  bakery: ['/showcase/scb-croissants.webp', '/showcase/scb-cookies.webp', '/showcase/scb-muffins.webp', '/showcase/scb-patties.webp'],
} as const

export const STRIP_COUNT_MOBILE = 3
