'use client'

// The design canvas's DCLogic.renderVals(), ported to a hook: the three
// pieces of state the v2 artboard is interactive with (the editor demo,
// the industry marquee's pause button, the DIY cost calculator).

import { useEffect, useState } from 'react'

// The mock site in the editor demo is one of two themes: a boutique when
// the store is on, a café when bookings are on — so switching mode reads as
// "same editor, different business", not just a relabelled button.
const THEMES = {
  shop: {
    name: 'Elegance Embroidery', url: 'eleganceembroidery.pk', logo: 'ELEGANCE',
    links: ['Shop', 'Collections', 'Fabric guide', 'Contact'],
    kick: 'New winter collection', h: 'Hand-stitched, made to be seen.',
    p: 'Chikankari, ralli and ajrak work — delivered nationwide with cash on delivery.',
    btn: 'Order Now', btn2: 'View collection', file: 'hero-chikankari.jpg', grid: 'Product grid', gridN: '4 items',
    imgs: ['/home-v2/fdccc8dbf56644e29fc80ce58e97ab17.webp', '/home-v2/d01d198017f0982f78469eec130d1e07.webp', '/home-v2/697bc168af8804b34f728f7d52e6c8c5.webp'],
  },
  book: {
    name: 'Crumb & Co. Café', url: 'crumbandco.pk', logo: 'CRUMB & CO.',
    links: ['Menu', 'Reservations', 'Private dining', 'Contact'],
    kick: 'Tables for tonight', h: 'Fresh from the oven, every morning.',
    p: 'Breakfast, high tea and family dinners — book a table in two taps.',
    btn: 'Book Now!', btn2: 'See the menu', file: 'hero-bakery.jpg', grid: 'Menu', gridN: '24 dishes',
    imgs: ['/showcase/scb-hero.webp', '/showcase/scb-croissants.webp', '/showcase/scb-shelf.webp'],
  },
} as const

const NOTES = {
  image: 'Photo swapped — your new image is live in seconds',
  book: 'Bookings on — every button now opens the reservation form',
  shop: 'Store on — products, cart and checkout are live',
} as const

type Chip = { label: string; cls: string; pressed: 'true' | 'false'; pick: () => void }

const fmt = (n: number) => 'Rs. ' + String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ',')

export function useV2Vals() {
  // `mode` is the either/or (bookings or a store); the photo swap is a
  // separate one-off action that flashes its card and leaves the mode alone.
  const [s, set] = useState({ mode: 'shop' as 'shop' | 'book', img: 0, note: 'shop' as keyof typeof NOTES, flash: 0, hours: 15, rate: 5000, paused: false })
  const up = (p: Partial<typeof s>) => set((prev) => ({ ...prev, ...p }))
  useEffect(() => {
    if (!s.flash) return
    const t = setTimeout(() => set((prev) => ({ ...prev, flash: 0 })), 900)
    return () => clearTimeout(t)
  }, [s.flash])
  const diy = s.hours * s.rate
  const i = s.img % 3

  const hours: Chip[] = [10, 15, 25, 40, 60].map((h) => ({
    label: String(h), cls: h === s.hours ? 'is-on' : '', pressed: h === s.hours ? 'true' : 'false', pick: () => up({ hours: h }),
  }))
  const rates: Chip[] = ([[2500, '2.5k'], [5000, '5k'], [7500, '7.5k'], [10000, '10k']] as const).map(([r, label]) => ({
    label, cls: r === s.rate ? 'is-on' : '', pressed: r === s.rate ? 'true' : 'false', pick: () => up({ rate: r }),
  }))

  return {
    marqCls: s.paused ? 'is-paused' : '',
    marqLabel: s.paused ? 'Play animation' : 'Pause animation',
    marqIcon: s.paused ? '▶' : 'II',
    marqPressed: (s.paused ? 'true' : 'false') as 'true' | 'false',
    toggleMarq: () => up({ paused: !s.paused }),
    mode: s.mode,
    site: THEMES[s.mode],
    heroBtn: THEMES[s.mode].btn,
    heroBtn2: THEMES[s.mode].btn2,
    siteKick: THEMES[s.mode].kick,
    heroImg: THEMES[s.mode].imgs[i],
    l0: i === 0 ? 'sel' : '', l1: i === 1 ? 'sel' : '', l2: i === 2 ? 'sel' : '',
    e1: s.flash ? 'is-flash' : '', e2: s.mode === 'book' ? 'is-on' : '', e3: s.mode === 'shop' ? 'is-on' : '',
    storeNote: NOTES[s.note],
    edImage: () => up({ note: 'image', img: s.img + 1, flash: Date.now() }),
    edBook: () => up({ note: 'book', mode: 'book' }),
    edShop: () => up({ note: 'shop', mode: 'shop' }),
    hours, rates,
    hoursLabel: s.hours + ' hours',
    rateLabel: fmt(s.rate) + ' / hour',
    diyFormula: s.hours + ' hours × ' + fmt(s.rate) + ' / hour',
    diyCost: fmt(diy),
    save: fmt(diy - 22500),
    saveNote: "And you don't spend a single one of those " + s.hours + ' hours.',
  }
}

export type V2Vals = ReturnType<typeof useV2Vals>
