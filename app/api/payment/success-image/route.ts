import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const txHash = searchParams.get('tx') || ''
  
  const svg = `
    <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <style>
          .title { font: bold 64px system-ui, sans-serif; fill: white; }
          .subtitle { font: 36px system-ui, sans-serif; fill: rgba(255,255,255,0.9); }
          .success { font: bold 48px system-ui, sans-serif; fill: #10B981; }
          .footer { font: 24px system-ui, sans-serif; fill: rgba(255,255,255,0.7); }
          .tx { font: 20px monospace, sans-serif; fill: rgba(255,255,255,0.8); }
        </style>
        <linearGradient id="successGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#059669;stop-opacity:1" />
          <stop offset="50%" style="stop-color:#10B981;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#34D399;stop-opacity:1" />
        </linearGradient>
      </defs>
      
      <!-- Background -->
      <rect width="1200" height="630" fill="url(#successGrad)"/>
      
      <!-- Success checkmark circle -->
      <circle cx="600" cy="200" r="80" fill="rgba(255,255,255,0.2)" stroke="white" stroke-width="4"/>
      <path d="M560 200 L590 230 L640 170" stroke="white" stroke-width="8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      
      <!-- Content -->
      <text x="600" y="340" class="title" text-anchor="middle">Payment Successful!</text>
      <text x="600" y="400" class="subtitle" text-anchor="middle">Premium features unlocked</text>
      
      <!-- Transaction info -->
      <text x="60" y="500" class="footer">Transaction: ${txHash.slice(0, 20)}...${txHash.slice(-10)}</text>
      <text x="60" y="540" class="footer">✨ Create unlimited premium polls</text>
      <text x="60" y="580" class="footer">📊 Access advanced analytics dashboard</text>
    </svg>
  `
  
  return new NextResponse(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=3600'
    }
  })
}