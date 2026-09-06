import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
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
  },
}

export default nextConfig
