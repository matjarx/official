// Neutralizes `<` so a string safely embedded in a <script> body (raw JS,
// or JSON.stringify'd JSON-LD) can never contain a literal `</script>`,
// `<!--` or `<script>` that would let CMS-entered text break the browser's
// HTML parser out of the tag it is scanning for.
//
// Every one of this site's dangerouslySetInnerHTML(JSON.stringify(x))
// JSON-LD blocks, and AnnouncementBar's pre-paint dismissal script, embeds
// at least one admin-editable CMS field (a page's title/description, a
// blog post body, an announcement's text) somewhere in x. JSON.stringify
// escapes quotes and backslashes for JS-string-literal syntax, but the
// browser's HTML tokenizer splits <script>...</script> on the literal
// substring `</script>` before any JS parsing happens at all -- so
// JSON.stringify alone does not stop an admin-entered (or a compromised
// admin account's) "</script><script>evil()</script>" from closing the
// real script tag early and having its own injected <script> parsed and
// run as real HTML, on every page that embeds that field.
//
// < is the standard fix: it is valid inside both a JSON string and a
// JS string literal, and decodes back to `<` at parse time -- so the
// *value* is unchanged, but the raw HTML source the browser tokenizes
// never contains a literal `<` for it to react to.
export function escapeScriptHtml(raw: string): string {
  return raw.replace(/</g, '\\u003c')
}
