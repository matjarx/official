// Submits every URL in the live sitemap to IndexNow (api.indexnow.org) —
// a single ping that Bing and Yandex both pick up, so new/changed pages
// get crawled fast instead of waiting on a regular recrawl. Google
// doesn't consume IndexNow directly; use Search Console's own
// "Request indexing" for that (see README note below).
//
// Run after matjarx.com is actually live and serving the real sitemap:
//   node scripts/submit-indexnow.mjs
//
// The key here must match the /{key}.txt file already sitting in
// public/ — IndexNow verifies ownership by fetching that file from the
// same host before accepting a submission.

const KEY = 'd9a5a93e138dcf9df70fd98f8c733c40'
const HOST = 'matjarx.com'
const SITEMAP_URL = `https://${HOST}/sitemap.xml`

async function main() {
  const res = await fetch(SITEMAP_URL)
  if (!res.ok) {
    console.error(`Could not fetch ${SITEMAP_URL} — is the site live yet? (${res.status})`)
    process.exit(1)
  }
  const xml = await res.text()
  const urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])

  if (urlList.length === 0) {
    console.error('No <loc> URLs found in the sitemap — nothing to submit.')
    process.exit(1)
  }

  const submitRes = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList }),
  })

  console.log(`Submitted ${urlList.length} URLs — IndexNow responded ${submitRes.status} ${submitRes.statusText}`)
}

main()
