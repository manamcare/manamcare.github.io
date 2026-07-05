import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MANAM — Elder Care & Family Support',
  description: 'We will personally take care of your parents like your extended family — with proof of every visit.',
  keywords: 'elder care, parent care, NRI, Andhra Pradesh, home care, senior care',
  openGraph: {
    title: 'MANAM — Elder Care & Family Support',
    description: 'Trusted care network for NRI families with parents in Andhra Pradesh.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
