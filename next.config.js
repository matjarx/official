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
      { source: '/pricing-table', destination: '/pricing', permanent: true },
      // No real equivalent for the old partner-offer landing page.
      { source: '/partner-offer', destination: '/', permanent: true },

      // Blog posts that kept their old WordPress slug through a rename —
      // same content lives at a new slug now.
      {
        source: '/blogs/you-can-too-lessons-from-rastah-for-small-business-owners',
        destination: '/blogs/rastah-case-study-lessons-small-business',
        permanent: true,
      },
      {
        source: '/blogs/top-5-website-mistakes-killing-your-conversions-and-how-to-fix-them',
        destination: '/blogs/top-5-website-mistakes-killing-conversions',
        permanent: true,
      },
      {
        source: '/blogs/digital-marketing-trends-pakistan-2026',
        destination: '/blogs/trends-in-digital-marketing-for-pakistani-businesses',
        permanent: true,
      },
      {
        // Slug is unchanged from "why-small-businesses-struggle-online" —
        // WordPress kept it even after the post was reworked into what's
        // now published as matjarx-complete-guide-small-business.
        source: '/blogs/why-small-businesses-struggle-online',
        destination: '/blogs/matjarx-complete-guide-small-business',
        permanent: true,
      },

      // Legacy bare-slug blog permalinks from before the old site adopted
      // the /blogs/ prefix — still indexed without it.
      { source: '/local-seo-for-small-business-guide', destination: '/blogs/local-seo-for-small-business-guide', permanent: true },
      { source: '/tiktok-growth-limit-switch-business-account', destination: '/blogs/tiktok-growth-limit-switch-business-account', permanent: true },
      { source: '/business-content-ideas-no-dancing', destination: '/blogs/business-content-ideas-no-dancing', permanent: true },
      { source: '/set-up-tiktok-ads', destination: '/blogs/set-up-tiktok-ads', permanent: true },
      { source: '/facebook-page-for-business', destination: '/blogs/facebook-page-for-business', permanent: true },
      { source: '/facebook-page-setup-guide', destination: '/blogs/facebook-page-setup-guide', permanent: true },
      { source: '/setup-payfast-payment-gateway', destination: '/blogs/setup-payfast-payment-gateway', permanent: true },

      // Old WordPress portfolio/demo taxonomy (artist showcase pages,
      // project categories, tag/category archives) — none of it has an
      // equivalent on the new site. Catch-all patterns so any indexed
      // variant (including /page/N pagination) lands on the homepage
      // instead of 404ing.
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
