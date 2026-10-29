// The question-and-answer pairs in a post's FAQ section, for FAQPage schema.
//
// A post's FAQ is a convention in its body, not a field: an H2 (`h` block)
// whose text is "Frequently asked questions" (or "FAQ"/"FAQs"), then one H3
// per question, each followed by the paragraphs and lists that answer it,
// until the next H2. Deriving it from the body keeps the schema and the
// visible text the same words by construction -- Google requires FAQ markup
// to match what the reader sees.

import type { BodyBlock } from './blog-data'
import { plainText } from './rich-text'

export const FAQ_HEADING = /^(frequently asked questions|faqs?)\b/i

export type FaqPair = { question: string; answer: string }

export function faqFromBody(body: BodyBlock[]): FaqPair[] {
  const start = body.findIndex((b) => b.t === 'h' && FAQ_HEADING.test(plainText(b.text).trim()))
  if (start === -1) return []
  const pairs: FaqPair[] = []
  let current: { question: string; parts: string[] } | null = null
  const flush = () => {
    if (current && current.parts.length) pairs.push({ question: current.question, answer: current.parts.join(' ') })
  }
  for (const b of body.slice(start + 1)) {
    if (b.t === 'h') break
    if (b.t === 'h3') {
      flush()
      current = { question: plainText(b.text).trim(), parts: [] }
    } else if (current && (b.t === 'p' || b.t === 'q')) {
      current.parts.push(plainText(b.text).trim())
    } else if (current && (b.t === 'l' || b.t === 'ol')) {
      current.parts.push(b.items.map((i) => plainText(i).trim()).join('; '))
    }
  }
  flush()
  return pairs
}
