'use client'

// A price shown inside a server-rendered section of the homepage (V2Markup.tsx
// has no state and ships as plain HTML). useCurrency() needs client context,
// so this is the smallest possible client island around just the price text
// -- the server markup is untouched everywhere else. inText() rewrites any
// "Rs."/"PKR" amount inside the string and leaves the rest of the sentence
// (and the base PKR currency) exactly as written.
import { useCurrency } from '@/components/CurrencyProvider'

export default function PriceText({ children }: { children: string }) {
  const { inText } = useCurrency()
  return <>{inText(children)}</>
}
