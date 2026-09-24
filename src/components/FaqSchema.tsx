// FAQPage JSON-LD for a page that already renders its own FAQ markup.
//
// Seventeen page types render questions and answers — /pricing, the
// homepage, /features, /videos, /contact, all four service pages, the
// website audit, the best-builder comparison — and only four of them
// told Google about it. The plans, industries, cities and /faqs emit
// FAQPage; everything else emitted nothing.
//
// This is deliberately schema-only. Those pages each lay their FAQ out
// differently and replacing the markup to gain a script tag would be a
// visual change nobody asked for. FaqSection is for pages that had no
// FAQ at all; this is for the ones that did.
//
// Google reads a closed accordion panel — it is in the DOM either way —
// so emitting the whole set is correct regardless of what is expanded.

export type SchemaFaq = { question: string; answer: string }

export default function FaqSchema({ faqs }: { faqs: SchemaFaq[] }) {
  if (faqs.length === 0) return null
  const json = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />
}

/** For the many data files that store FAQs as `[question, answer]`. */
export function fromPairs(pairs: readonly (readonly [string, string])[]): SchemaFaq[] {
  return pairs.map(([question, answer]) => ({ question, answer }))
}
