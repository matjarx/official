'use client'

// A YouTube card that shows the cover image and loads the player on click.
//
// ── Why not just drop in an <iframe> ─────────────────────────────────────
//
// The videos page has 21 slots. A YouTube iframe pulls roughly half a
// megabyte of player, and twenty-one of them on one page would cost more
// than the rest of the site put together -- for a page where most visitors
// watch at most one. So the card renders YouTube's own thumbnail, which is
// a single image, and swaps in the real player only when someone asks for
// it by clicking.
//
// `autoplay=1` on that swap is what makes the click feel like a play
// button rather than a two-step. It is allowed because the iframe is
// created BY the click -- a user gesture -- which is the case browsers
// permit; an autoplaying iframe present at load would be blocked, and
// should be.
//
// youtube-nocookie.com, not youtube.com: no cookie is set until the
// visitor actually plays something, which is the right default for a page
// that embeds twenty-one of them.

import { useState } from 'react'

/**
 * The video id from any YouTube URL a person is likely to paste.
 *
 * Handles watch?v=, youtu.be/, /embed/, /shorts/ and /live/, with or
 * without extra query parameters, because "copy link" gives a different
 * shape depending on where you copied it from. Returns null for anything
 * else so the caller can fall back rather than render a broken player.
 */
export function youTubeId(url: string | undefined | null): string | null {
  if (!url) return null
  const raw = String(url).trim()
  if (!raw) return null
  // A bare id, which is what someone pastes when they already know the trick.
  if (/^[A-Za-z0-9_-]{11}$/.test(raw)) return raw
  let u: URL
  try { u = new URL(raw.startsWith('http') ? raw : `https://${raw}`) } catch { return null }
  const host = u.hostname.replace(/^www\./, '')
  if (host === 'youtu.be') {
    const id = u.pathname.slice(1).split('/')[0]
    return /^[A-Za-z0-9_-]{11}$/.test(id) ? id : null
  }
  if (!/(^|\.)youtube(-nocookie)?\.com$/.test(host)) return null
  const v = u.searchParams.get('v')
  if (v && /^[A-Za-z0-9_-]{11}$/.test(v)) return v
  const m = u.pathname.match(/\/(?:embed|shorts|live|v)\/([A-Za-z0-9_-]{11})/)
  return m ? m[1] : null
}

/** True for any URL this component can render. Lets the card choose. */
export function isYouTube(url: string | undefined | null): boolean {
  return youTubeId(url) !== null
}

export default function YouTubeEmbed({ url, title }: { url: string; title?: string }) {
  const id = youTubeId(url)
  const [playing, setPlaying] = useState(false)
  if (!id) return null

  if (playing) {
    return (
      <div style={{ position: 'relative', width: '100%', aspectRatio: '16 / 9', background: '#000' }}>
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`}
          title={title || 'Video'}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }}
        />
      </div>
    )
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label={title ? `Play: ${title}` : 'Play video'}
      style={{
        position: 'relative', width: '100%', aspectRatio: '16 / 9', padding: 0,
        border: 0, cursor: 'pointer', background: '#000', display: 'block', overflow: 'hidden',
      }}
    >
      {/* hqdefault exists for every video; maxresdefault does not, and a
          missing one renders as a grey 120x90 placeholder. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
        alt=""
        loading="lazy"
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />
      <span
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0, display: 'grid', placeItems: 'center',
          background: 'linear-gradient(180deg, rgba(0,0,0,0.05), rgba(0,0,0,0.35))',
        }}
      >
        <span style={{
          width: 62, height: 44, borderRadius: 12, background: 'rgba(14,14,14,0.78)',
          display: 'grid', placeItems: 'center',
        }}>
          <svg viewBox="0 0 24 24" width="22" height="22" fill="#fff"><path d="M8 5v14l11-7z" /></svg>
        </span>
      </span>
    </button>
  )
}
