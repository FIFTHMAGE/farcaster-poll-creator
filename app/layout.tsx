import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'PollCaster - Create Beautiful Farcaster Polls',
  description: 'Create stunning, interactive poll frames for Farcaster with premium templates, analytics, and USDC monetization. Free basic polls, premium features available.',
  keywords: ['farcaster', 'polls', 'frames', 'crypto', 'usdc', 'web3', 'social'],
  authors: [{ name: 'PollCaster' }],
  openGraph: {
    title: 'PollCaster - Farcaster Poll Creator',
    description: 'Create beautiful poll frames for Farcaster with premium templates and analytics',
    url: process.env.NEXT_PUBLIC_BASE_URL,
    siteName: 'PollCaster',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'PollCaster - Create Beautiful Farcaster Polls'
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PollCaster - Farcaster Poll Creator',
    description: 'Create stunning poll frames for Farcaster',
    images: ['/og-image.png'],
  },
  manifest: '/manifest.json',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">{children}</body>
    </html>
  )
}