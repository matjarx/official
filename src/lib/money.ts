// Printing a price, in one place.
//
// There were five copies of this function — one in SavingsCalculator, one in
// HomeMobileContent, one in PricingContent, one in partner-data and one in
// plan-data — and they did not agree. Two rounded, two did not, and the
// PricingContent copy emitted no currency at all because its two call sites
// already had "Rs." sitting in the surrounding markup. So a figure's shape
// depended on which file happened to render it.
//
// Hence two functions rather than one: `money` when the string has to carry
// the currency itself, `amount` when the markup already prints "Rs." beside
// it. Both always round — a rupee has no minor unit on this site, and a
// stray decimal in a headline saving figure reads as a bug.

/** A rupee figure with its currency: `Rs. 67,500`. */
export function money(n: number) {
  return 'Rs. ' + amount(n)
}

/** Just the digits: `67,500`. For markup that already prints "Rs." itself. */
export function amount(n: number) {
  return Math.round(n).toLocaleString('en-US')
}
