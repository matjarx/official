'use client'

// Embeds a single Instagram reel/post using Meta's own documented,
// no-token embed method (developers.facebook.com/docs/instagram/embedding):
// a <blockquote class="instagram-media"> that Instagram's own embed.js
// script replaces with a real player. A raw iframe pointed at
// instagram.com/.../embed was tried first and hit Instagram's login wall
// instead of rendering cleanly — this is the approach Meta actually still
// supports for embedding on third-party sites without an app/access token.

import { useEffect } from 'react'

declare global {
  interface Window {
    instgrm?: { Embeds: { process: () => void } }
  }
}

let scriptPromise: Promise<void> | null = null
function loadEmbedScript(): Promise<void> {
  if (scriptPromise) return scriptPromise
  scriptPromise = new Promise((resolve) => {
    if (window.instgrm) return resolve()
    const script = document.createElement('script')
    script.src = 'https://www.instagram.com/embed.js'
    script.async = true
    script.onload = () => resolve()
    document.body.appendChild(script)
  })
  return scriptPromise
}

export default function InstagramEmbed({ url }: { url: string }) {
  useEffect(() => {
    loadEmbedScript().then(() => {
      // A microtask-immediate process() call can run before the
      // blockquote below has actually painted (most visible when the
      // script was already loaded by an earlier card on the same page,
      // so this resolves synchronously) — one rAF is enough to let
      // layout settle first.
      requestAnimationFrame(() => window.instgrm?.Embeds.process())
    })
  }, [url])

  return (
    <div style={{ minHeight: 420, background: '#FAFAFA', display: 'flex', justifyContent: 'center', overflow: 'hidden' }}>
      <blockquote
        className="instagram-media"
        data-instgrm-permalink={url}
        data-instgrm-version="14"
        style={{ background: '#FFF', border: 0, margin: 0, maxWidth: 400, minWidth: 280, width: '100%' }}
      />
    </div>
  )
}
