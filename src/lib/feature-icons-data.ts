// Real feature/integration icons pulled from matjarx.com's WordPress media
// library (already Google-indexed under the site's old "concierge-service"
// page). None had alt text set on WordPress, so the labels below are
// written fresh, describing what each image actually shows (verified by
// visual inspection, not just filename) — not carried over from WordPress.
//
// A separate batch from the same page was excluded entirely: 3 "review"
// screenshots that explicitly claimed to be real MatjarX customer
// feedback (unverifiable), and 6 images from an unrelated generic stock
// pack (a fictional "MINERVA"/"soul" brand, a fox-mascot support-chat
// mockup, and one showing real Nike branding) that don't represent
// MatjarX's own product.

export type FeatureIcon = { src: string; label: string; width: number; height: number }

export const INTEGRATION_ICONS: FeatureIcon[] = [
  { src: '/features/google-analytics.webp', label: 'Google Analytics', width: 357, height: 357 },
  { src: '/features/google-ads.webp', label: 'Google Ads', width: 357, height: 357 },
  { src: '/features/google-tag-manager.webp', label: 'Google Tag Manager', width: 358, height: 357 },
  { src: '/features/hotjar.webp', label: 'Hotjar', width: 357, height: 357 },
  { src: '/features/facebook-pixel.webp', label: 'Facebook Pixel', width: 358, height: 357 },
  { src: '/features/mailchimp.webp', label: 'Mailchimp', width: 400, height: 306 },
  { src: '/features/hubspot.webp', label: 'HubSpot', width: 357, height: 357 },
  { src: '/features/intercom.webp', label: 'Intercom', width: 357, height: 358 },
  { src: '/features/freshdesk.webp', label: 'Freshdesk', width: 357, height: 357 },
  { src: '/features/facebook-messenger.webp', label: 'Facebook Messenger', width: 357, height: 357 },
  { src: '/features/paypal-new.webp', label: 'PayPal', width: 400, height: 306 },
  { src: '/features/call-button.webp', label: 'Click-to-call button', width: 357, height: 357 },
]

export const SOCIAL_FEED_ICONS: FeatureIcon[] = [
  { src: '/features/facebook-feed.webp', label: 'Facebook feed embed', width: 760, height: 377 },
  { src: '/features/instagram-feed.webp', label: 'Instagram feed embed', width: 800, height: 397 },
  { src: '/features/tiktok-feed.webp', label: 'TikTok feed embed', width: 760, height: 377 },
  { src: '/features/youtube-feed.webp', label: 'YouTube feed embed', width: 800, height: 397 },
  { src: '/features/youtube-shorts.webp', label: 'YouTube Shorts embed', width: 800, height: 397 },
  { src: '/features/threads-feed.webp', label: 'Threads feed embed', width: 800, height: 397 },
  { src: '/features/rss-feed.webp', label: 'RSS feed embed', width: 800, height: 397 },
  { src: '/features/vimeo-feed.webp', label: 'Vimeo feed embed', width: 800, height: 397 },
]

export const ENGAGEMENT_ICONS: FeatureIcon[] = [
  { src: '/features/coupon-popup-new.webp', label: 'Coupon popups', width: 760, height: 377 },
  { src: '/features/countdown-new.webp', label: 'Countdown timers', width: 760, height: 377 },
  { src: '/features/sratch-card-new.webp', label: 'Scratch-card promotions', width: 800, height: 397 },
  { src: '/features/display-reviews-new.webp', label: 'Customer review widgets', width: 800, height: 397 },
  { src: '/features/customer-surveys-new.webp', label: 'Customer surveys', width: 800, height: 397 },
  { src: '/features/email-capture.webp', label: 'Email capture forms', width: 400, height: 306 },
  { src: '/features/email-capture-button.webp', label: 'Email capture buttons', width: 400, height: 306 },
  { src: '/features/faq-sections.webp', label: 'FAQ sections', width: 800, height: 397 },
  { src: '/features/pricing-table-new.webp', label: 'Pricing tables', width: 800, height: 397 },
  { src: '/features/biography-new-1.webp', label: 'Team/biography sections', width: 800, height: 397 },
  { src: '/features/files-pdf-embeded-new.webp', label: 'Embedded PDF files', width: 800, height: 397 },
  { src: '/features/data-collections-new.webp', label: 'Data collections/tables', width: 800, height: 397 },
  { src: '/features/advanced-menu.webp', label: 'Advanced menu builder', width: 800, height: 397 },
  { src: '/features/search-bar.webp', label: 'Site search bar', width: 800, height: 397 },
  { src: '/features/flip-card.webp', label: 'Flip-card layouts', width: 800, height: 397 },
  { src: '/features/image-banners.webp', label: 'Image banners', width: 800, height: 397 },
  { src: '/features/logo-banners.webp', label: 'Logo banners', width: 800, height: 397 },
  { src: '/features/brand-sliders.webp', label: 'Brand/client logo sliders', width: 800, height: 397 },
  { src: '/features/before-after-sliders.webp', label: 'Before/after image sliders', width: 800, height: 397 },
  { src: '/features/photo-sliders.webp', label: 'Photo sliders', width: 800, height: 397 },
  { src: '/features/advanced-galleries.webp', label: 'Advanced photo/video galleries', width: 800, height: 397 },
  { src: '/features/audio-player-new.webp', label: 'Audio player embed', width: 800, height: 397 },
  { src: '/features/podcast-new.webp', label: 'Podcast embed', width: 760, height: 377 },
  { src: '/features/refresh-your-design.webp', label: 'Redesign your site anytime', width: 400, height: 306 },
  { src: '/features/age-new.webp', label: 'Age verification gate', width: 400, height: 306 },
  { src: '/features/accesibility-new.webp', label: 'Accessibility menu', width: 400, height: 306 },
]
