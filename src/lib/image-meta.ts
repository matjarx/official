// The four things an image on this site can carry.
//
// `alt` and `title` end up on the <img>. `caption` renders visibly under
// the image where the layout has room for one -- a blog cover does, a
// 44px testimonial avatar does not. `description` never renders; it goes
// into the page's ImageObject JSON-LD, which is the field Google Images
// actually reads.
//
// ── On empty alt ─────────────────────────────────────────────────────
// A decorative image takes alt="" and MUST keep it. Eighteen images on
// this site have one and most are correct: the screenshots inside the
// mock browser in EditorShowcase, the 20px platform logo sitting beside
// the words "MatjarX vs Wix", the plan tier icon next to the plan's own
// name. Describing those out loud makes a screen reader worse, not
// better -- it reads the name twice and the decoration once.
//
// So this type is for images that carry meaning. Decorative ones stay as
// a bare <Image alt="" />.

export type ImageMeta = {
  src: string
  /** What the image shows, for someone who cannot see it. Never empty here. */
  alt: string
  /** Tooltip. Only worth setting when it says something `alt` does not. */
  title?: string
  /** Rendered under the image, where the layout has room. */
  caption?: string
  /** For ImageObject JSON-LD. Not rendered. */
  description?: string
  width: number
  height: number
}

/**
 * Schema.org ImageObject for a page's JSON-LD.
 *
 * Returns undefined for an image with nothing to say beyond its alt --
 * an ImageObject whose description repeats its caption is noise in the
 * structured data, not a signal.
 */
export function imageObject(img: ImageMeta | undefined, siteUrl = 'https://matjarx.com') {
  if (!img) return undefined
  return {
    '@type': 'ImageObject',
    url: `${siteUrl}${img.src}`,
    width: img.width,
    height: img.height,
    ...(img.title && { name: img.title }),
    ...(img.caption && { caption: img.caption }),
    ...(img.description && { description: img.description }),
  }
}
