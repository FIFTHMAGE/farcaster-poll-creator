import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Farcaster Poll Creator - Beautiful Interactive Polls',
  description: 'Create stunning poll frames for Farcaster with analytics and premium templates',
  openGraph: {
    title: 'Farcaster Poll Creator',
    description: 'Create stunning poll frames for Farcaster',
    images: ['/og-image.png'],
  },
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