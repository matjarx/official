// The business's own contact details, in one place.
//
// The phone number was written out by hand in twenty files: as a tel:
// href, as a wa.me path, as display text, inside JSON-LD, inside llms.txt
// and inside four data modules. layout.tsx already had a BUSINESS_PHONE
// constant -- it was simply never used anywhere but the JSON-LD two lines
// below it, so nineteen other copies drifted alongside it.
//
// That matters the day the number changes: a missed copy is not a build
// error, it is a phone number on a live page that nobody answers.
//
// Three forms because the number genuinely appears three ways and
// reformatting at the call site would be worse:
//   E164     what tel: and schema.org want
//   WA       wa.me rejects the leading +
//   DISPLAY  what a human reads
export const BUSINESS_PHONE_E164 = '+923033720953'
export const BUSINESS_PHONE_WA = '923033720953'
export const BUSINESS_PHONE_DISPLAY = '+92 303 372 0953'
export const BUSINESS_EMAIL = 'office@matjarx.com'

/** Ready-made hrefs, so a call site cannot assemble one wrongly. */
export const TEL_HREF = `tel:${BUSINESS_PHONE_E164}`
export const WHATSAPP_HREF = `https://wa.me/${BUSINESS_PHONE_WA}`
