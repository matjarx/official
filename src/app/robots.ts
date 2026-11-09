import type { MetadataRoute } from 'next'

// Everything on this public marketing site is meant to be found — including
// by AI-agent crawlers ("agentic browsing"), so they're explicitly allowed
// rather than left to whatever an agent's own default assumes.

const SITE_URL = 'https://matjarx.com'

const AI_AGENTS = [
  'GPTBot',
  'ChatGPT-User',
  'OAI-SearchBot',
  'ClaudeBot',
  'Claude-User',
  'Claude-SearchBot',
  'anthropic-ai',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot-Extended',
  'Amazonbot',
  'CCBot',
  'Meta-ExternalAgent',
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Content-Signal (https://contentsignal.org): a licensing signal
      // separate from crawl permission -- says search indexing AND AI
      // training are both fine, matching the AI_AGENTS allow-list above
      // rather than contradicting it with a training opt-out.
      { userAgent: '*', allow: '/', other: { 'Content-Signal': 'search=yes, ai-train=yes' } },
      ...AI_AGENTS.map((userAgent) => ({ userAgent, allow: '/' })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
