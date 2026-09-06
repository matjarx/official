// Shared data for Home + Home Mobile — from Marketing - Home.dc.html
// and Marketing - Home Mobile.dc.html (same badges/voices copy in
// both). Extracted here so the two components don't duplicate it.

export const RATING_BADGES = [
  { name: 'Trustpilot', score: '4.8 / 5', tint: 'rgba(0,182,122,0.14)', mark: '#00B67A', icon: 'm12 2 2.9 6.6 7.1.6-5.4 4.7 1.6 7-6.2-3.8-6.2 3.8 1.6-7L2 9.2l7.1-.6z' },
  { name: 'Google Reviews', score: '4.8 / 5', tint: 'rgba(66,133,244,0.14)', mark: '#4285F4', icon: 'M12 3.5a8.5 8.5 0 1 0 8.4 9.9h-8.4V10h11.5v2a11.5 11.5 0 1 1-3.4-8.2l-2.1 2.1A8.4 8.4 0 0 0 12 3.5Z' },
  { name: 'Clutch', score: '4.9 / 5', tint: 'rgba(230,58,53,0.14)', mark: '#E63A35', icon: 'M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 8.2-6.2l-3-1a5.4 5.4 0 1 1 0-2.6l3-1A8.5 8.5 0 0 0 12 3.5Zm0 5.6a2.9 2.9 0 1 0 0 5.8 2.9 2.9 0 0 0 0-5.8Z' },
]

export const VOICES = [
  { quote: "I really tried to build a website myself, but it didn't look good and I have no idea how to make it show up on Google.", name: 'Ahmed Khan', trade: 'Fabric wholesaler, Lahore', initials: 'AK', tint: '#C6CB8A', photo: { src: '/home/voices/ahmed-khan.webp', alt: 'Ahmed Khan, fabric wholesaler in Lahore', width: 54, height: 56 } },
  { quote: "My cousin built my website. I'm not really happy with it, but I can't tell him that.", name: 'Sabika Noor', trade: 'Boutique owner, Karachi', initials: 'SN', tint: '#F4F2AE', photo: { src: '/home/voices/sabika-noor.webp', alt: 'Sabika Noor, boutique owner in Karachi', width: 54, height: 56 } },
  { quote: "I got quotes in the thousands for a website. I've just started out — I can't afford that.", name: 'Saeed Ahmed', trade: 'Caterer, Islamabad', initials: 'SA', tint: '#BFD4E6', photo: { src: '/home/voices/saeed-ahmed.webp', alt: 'Saeed Ahmed, caterer in Islamabad', width: 54, height: 56 } },
]
