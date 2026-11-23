# GTM container setup — Meta Pixel, TikTok Pixel, LinkedIn Insight Tag

The app now loads GTM (`GTM-KWD8DJX2`) on every page and sets Consent Mode v2
defaults to `granted` before it loads (no cookie banner exists yet, so
`denied` would mean nothing is ever measured — see the comment in
`layout.tsx`). This app has no API access to the GTM account itself, so the
three tags below need to be added by hand in the GTM web UI
(tagmanager.google.com). GA4 is **not** moved into GTM — it stays on its own
direct `gtag.js` load in `layout.tsx`, because `src/lib/analytics.ts`'s
`trackEvent()` calls `window.gtag(...)` directly for the 9 real interactions
already instrumented site-wide (CTA clicks, form submits, etc.), and GTM's
dataLayer-push model doesn't define that function. Moving GA4 in would
silently stop all 9 of those events.

For all three tags below: **Trigger → All Pages**.

## 1. Meta Pixel

GTM has no official Meta template, so use a Custom HTML tag with Meta's own
base code. The pixel ID is already in the page's dataLayer as
`meta_pixel_id` (it follows the admin's Settings override, same as before),
so reference it through a Data Layer Variable rather than hardcoding it:

1. **Variables → New → Data Layer Variable** → name it `DLV - meta_pixel_id`,
   Data Layer Variable Name: `meta_pixel_id`.
2. **Tags → New → Custom HTML**:
   ```html
   <script>
   !function(f,b,e,v,n,t,s)
   {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
   n.callMethod.apply(n,arguments):n.queue.push(arguments)};
   if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
   n.queue=[];t=b.createElement(e);t.async=!0;
   t.src=v;s=b.getElementsByTagName(e)[0];
   s.parentNode.insertBefore(t,s)}(window, document,'script',
   'https://connect.facebook.net/en_US/fbevents.js');
   fbq('init', '{{DLV - meta_pixel_id}}');
   fbq('track', 'PageView');
   </script>
   <noscript><img height="1" width="1" style="display:none"
     src="https://www.facebook.com/tr?id=1082965164297632&ev=PageView&noscript=1" /></noscript>
   ```
   (Today's live pixel ID is `1082965164297632` — the hardcoded `id=` in the
   `<noscript>` fallback only matters for the no-JS case, so it doesn't need
   to track the variable the way the main script does.)

## 2. TikTok Pixel

Custom HTML tag, using the base code you provided:

```html
<script>
!function (w, d, t) {
  w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(
var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement("script")
;n.type="text/javascript",n.async=!0,n.src=r+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};

  ttq.load('DC248TBC77UDGJAO00J0');
  ttq.page();
}(window, document, 'ttq');
</script>
```

## 3. LinkedIn Insight Tag

Custom HTML tag, using LinkedIn's own base code with your partner ID
(`11371185`):

```html
<script type="text/javascript">
_linkedin_partner_id = "11371185";
window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
window._linkedin_data_partner_ids.push(_linkedin_partner_id);
</script>
<script type="text/javascript">
(function(l) {
if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
window.lintrk.q=[]}
var s = document.getElementsByTagName("script")[0];
var b = document.createElement("script");
b.type = "text/javascript";b.async = true;
b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
s.parentNode.insertBefore(b, s);})(window.lintrk);
</script>
<noscript>
<img height="1" width="1" style="display:none;" alt=""
  src="https://px.ads.linkedin.com/collect/?pid=11371185&fmt=gif" />
</noscript>
```

## After setting these up

Publish the container version in GTM, then check the live site's Network
tab for requests to `connect.facebook.net`, `analytics.tiktok.com`, and
`snap.licdn.com` to confirm all three are firing.
