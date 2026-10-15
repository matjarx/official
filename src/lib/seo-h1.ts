// The page's H1 from the spec sheet or an admin override (SEO group 3).
// getMergedContent() puts the layered __seo values on the content it
// returns; a component renders this instead of its own heading when set.
// Plain text: the sheet's H1 has no highlighted words.
export function seoH1(content: unknown): string | undefined {
  const h1 = (content as { __seo?: { h1?: unknown } } | null | undefined)?.__seo?.h1
  return typeof h1 === 'string' && h1.trim() ? h1 : undefined
}
