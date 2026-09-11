// Every currently-published blog slug (matches `marketing_blog_posts` in
// Supabase — the real content lives there, not in a static file, so this
// is a manually-kept mirror of that table's slugs) plus a map of any
// slug that got renamed after it was already indexed under its
// original name. Single source of truth for the redirect generations
// below, rather than one-off entries added by hand each time a Search
// Console report turns up another dead link: a Search Console crawl of
// the pre-rebuild WordPress site found the same 28 posts indexed under
// four different URL shapes — /resources-tools/<slug>, /blog/<slug>,
// bare /<slug>, and (for four renamed posts) their original slug — and
// the live site only ever serves /blogs/<slug>.
const CURRENT_BLOG_SLUGS = [
  'b2b-website-myths-broken',
  'beyond-blue-links-how-generative-engine-optimization-drives-traffic',
  'business-content-ideas-no-dancing',
  'cod-optimization-reduce-rto',
  'definitive-master-guide-to-generative-engine-optimization',
  'domain-and-hosting-explained',
  'elegance-embroidery-mukesh-kumar-lucky-draw-winner',
  'facebook-page-for-business',
  'facebook-page-setup-guide',
  'hiring-a-geo-expert-agencies-and-consulting-services',
  'how-generative-engine-optimization-works',
  'local-seo-for-small-business-guide',
  'mastering-ai-search-best-generative-ai-geo-training-courses',
  'matjarx-complete-guide-small-business',
  'mobile-first-design-tips-ux',
  'professional-website-build-trust',
  'rastah-case-study-lessons-small-business',
  'set-up-tiktok-ads',
  'setup-easypaisa-business-website',
  'setup-jazzcash-jazz-business-website',
  'setup-payfast-payment-gateway',
  'setup-sadapay-sadabiz-website',
  'tiktok-growth-limit-switch-business-account',
  'top-5-website-mistakes-killing-conversions',
  'top-geo-and-content-automation-tools-search-strategy',
  'trends-in-digital-marketing-for-pakistani-businesses',
  'whatsapp-automation-setup',
  'why-website-is-important-for-business',
]

const RENAMED_BLOG_SLUGS = {
  'you-can-too-lessons-from-rastah-for-small-business-owners': 'rastah-case-study-lessons-small-business',
  'top-5-website-mistakes-killing-your-conversions-and-how-to-fix-them': 'top-5-website-mistakes-killing-conversions',
  'digital-marketing-trends-pakistan-2026': 'trends-in-digital-marketing-for-pakistani-businesses',
  'why-small-businesses-struggle-online': 'matjarx-complete-guide-small-business',
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // /services was never a real page on the live site — the 4
      // services each have their own URL there. Redirect rather than
      // leave a dangling route now that ServicesContent requires a
      // serviceKey.
      { source: '/services', destination: '/done-for-you-website', permanent: true },

      // www never had its own content — it's the same CDN-fronted site as
      // the apex domain with no canonical redirect between them, so both
      // were live independently (duplicate content). Force everything to
      // the apex.
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.matjarx.com' }],
        destination: 'https://matjarx.com/:path*',
        permanent: true,
      },

      // Old WordPress site (pre-rebuild) indexed these paths directly
      // under matjarx.com. The content moved but Google still has the
      // old URLs indexed — redirect rather than 404 real search traffic.
      { source: '/matjarx-vs-godaddy', destination: '/alternatives/matjarx-vs-godaddy', permanent: true },
      { source: '/matjarx-vs-squarespace', destination: '/alternatives/matjarx-vs-squarespace', permanent: true },
      { source: '/matjarx-vs-wix', destination: '/alternatives/matjarx-vs-wix', permanent: true },
      { source: '/terms-and-conditions', destination: '/legal/terms', permanent: true },
      { source: '/refund-policy', destination: '/legal/refund', permanent: true },
      { source: '/privacy-cookies-policy', destination: '/legal/privacy', permanent: true },
      { source: '/website-example', destination: '/website-examples', permanent: true },
      { source: '/website-audit', destination: '/complete-website-audit-for-organic-visibility', permanent: true },
      { source: '/pricing-table', destination: '/pricing', permanent: true },
      // No real equivalent for the old partner-offer landing page.
      { source: '/partner-offer', destination: '/', permanent: true },

      // Blog posts that kept their old WordPress slug through a rename —
      // same content lives at a new slug now. Covers all four URL
      // shapes Search Console had indexed for these specific posts;
      // listed explicitly (rather than only relying on the generic
      // rules below) so each is a single hop straight to the real slug.
      ...Object.entries(RENAMED_BLOG_SLUGS).flatMap(([oldSlug, newSlug]) => [
        { source: `/blogs/${oldSlug}`, destination: `/blogs/${newSlug}`, permanent: true },
        { source: `/blog/${oldSlug}`, destination: `/blogs/${newSlug}`, permanent: true },
        { source: `/resources-tools/${oldSlug}`, destination: `/blogs/${newSlug}`, permanent: true },
        { source: `/${oldSlug}`, destination: `/blogs/${newSlug}`, permanent: true },
      ]),

      // Every other current post, indexed bare (no prefix at all) from
      // before the site adopted /blogs/ — safe to enumerate explicitly
      // (rather than a bare /:slug wildcard) since that would also catch
      // every real top-level route on the site.
      ...CURRENT_BLOG_SLUGS.map((slug) => ({ source: `/${slug}`, destination: `/blogs/${slug}`, permanent: true })),

      // Old WordPress site indexed posts under two other prefixes:
      // /resources-tools/<slug> (its real permalink structure) and
      // /blog/<slug> (singular — this site uses /blogs/, plural). Both
      // are exclusively legacy, so a wildcard here can't collide with a
      // real route the way a bare one could — this alone covers every
      // post's slug, current and future, without needing its own entry.
      { source: '/resources-tools', destination: '/blogs', permanent: true },
      { source: '/resources-tools/:slug', destination: '/blogs/:slug', permanent: true },
      { source: '/blog', destination: '/blogs', permanent: true },
      { source: '/blog/:slug', destination: '/blogs/:slug', permanent: true },

      // Old WordPress portfolio/demo taxonomy (artist showcase pages,
      // project categories, tag/category archives) — none of it has an
      // equivalent on the new site. Catch-all patterns so any indexed
      // variant (including /page/N pagination and /feed/ suffixes)
      // lands on the homepage instead of 404ing.
      { source: '/artist/:path*', destination: '/', permanent: true },
      { source: '/project-cat/:path*', destination: '/', permanent: true },
      { source: '/category/:path*', destination: '/', permanent: true },
      { source: '/tag/:path*', destination: '/', permanent: true },
    ]
  },
  images: {
    // Lets next/image serve images uploaded through the admin's media
    // manager — those live in Supabase Storage (public marketing-media
    // bucket), not in this repo's own public/ folder, since a serverless
    // Next.js build can't accept runtime file writes to public/.
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'tbgywxuebckwhxukfkdx.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
    // AVIF first: for photographic showcase/example images it typically
    // beats WebP by another 15-25% at the same visual quality, which is
    // where Lighthouse's "Improve image delivery" savings estimate was
    // coming from — next/image already negotiates format via the
    // request's Accept header, so declaring it here is the only change
    // needed. WebP stays as the fallback for the few clients that accept
    // it but not AVIF.
    formats: ['image/avif', 'image/webp'],
    // Default is 4 hours (14400s) — Lighthouse's "Use efficient cache
    // lifetimes" wants long-lived caching for content that rarely
    // changes, and these images (committed brand/showcase assets, or
    // admin-uploaded media that gets a new Storage URL rather than
    // overwriting an old one) qualify. A year, same as every other
    // fingerprinted asset under _next/static.
    minimumCacheTTL: 31536000,
  },
}

module.exports = nextConfig
