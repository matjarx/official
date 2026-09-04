import type { Metadata } from 'next'
import { Lato, Open_Sans } from 'next/font/google'
import './globals.css'

const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  variable: '--font-lato',
  display: 'swap',
})

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-open-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'MatjarX — Done-for-you websites, live in 7 days',
    template: '%s · MatjarX',
  },
  description: 'MatjarX builds complete small business websites in 7 days for Rs. 22,500 — done-for-you design, SEO and growth marketing for businesses across Pakistan and the Gulf.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${lato.variable} ${openSans.variable}`}>
      <body>{children}</body>
    </html>
  )
}
