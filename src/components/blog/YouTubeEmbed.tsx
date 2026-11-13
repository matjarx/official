'use client'

// A YouTube embed that starts as a static thumbnail + play button, not a
// live iframe -- the actual youtube-nocookie.com embed (its own JS, fonts,
// and network requests) only loads once the reader presses play. Same
// "facade" idea as lite-youtube-embed: a blog post page shouldn't pay
// YouTube's load cost for a video most visitors never watch.

import { useState } from 'react'

export default function YouTubeEmbed({ videoId, caption }: { videoId: string; caption?: string }) {
  const [playing, setPlaying] = useState(false)

  return (
    <figure style={{ margin: '8px 0', display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{ position: 'relative', width: '100%', aspectRatio: '16 / 9', borderRadius: 18, overflow: 'hidden', background: 'var(--ink-1)' }}>
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`}
            title={caption || 'YouTube video'}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }}
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={caption ? `Play video: ${caption}` : 'Play video'}
            style={{
              position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0, padding: 0,
              cursor: 'pointer', background: `url(https://i.ytimg.com/vi/${videoId}/hqdefault.jpg) center / cover no-repeat`,
            }}
          >
            <span
              style={{
                position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                width: 68, height: 48, borderRadius: 14, background: 'rgba(0,0,0,0.75)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </button>
        )}
      </div>
      {caption && (
        <figcaption style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--ink-3-alt)' }}>{caption}</figcaption>
      )}
    </figure>
  )
}
