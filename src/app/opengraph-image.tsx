import { ImageResponse } from 'next/og'
import { join } from 'node:path'
import { readFile } from 'node:fs/promises'

// Shared social-preview image for the homepage and any route segment that
// doesn't define its own — generated at build time from the real brand mark
// and palette (--navy/--butter from globals.css), not a placeholder.

export const alt = 'MatjarX — Done-for-you websites, live in 7 days'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const logoData = await readFile(join(process.cwd(), 'public/brand/matjarx-logo-light.png'), 'base64')
const logoSrc = `data:image/png;base64,${logoData}`

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 36,
          background: 'linear-gradient(160deg, #0A4278, #002E5C)',
          padding: 80,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} width={420} height={Math.round((420 / 905) * 287)} style={{ objectFit: 'contain' }} alt="" />
        <div
          style={{
            display: 'flex',
            fontSize: 40,
            fontWeight: 700,
            color: '#F4F2AE',
            textAlign: 'center',
          }}
        >
          Done-for-you websites, live in 7 days
        </div>
      </div>
    ),
    { ...size }
  )
}
