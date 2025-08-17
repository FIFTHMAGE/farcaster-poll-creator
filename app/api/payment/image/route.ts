import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const plan = searchParams.get('plan') || 'Premium'
  const amount = searchParams.get('amount') || '3'
  
  // Generate SVG for payment frame
  const svg = `
    <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <style>
          .title { font: bold 56px system-ui, sans-serif; fill: white; }
          .subtitle { font: 32px system-ui, sans-serif; fill: rgba(255,255,255,0.9); }
          .amount { font: bold 72px system-ui, sans-serif; fill: #10B981; }
          .currency { font: 48px system-ui, sans-serif; fill: #10B981; }
          .footer { font: 24px system-ui, sans-serif; fill: rgba(255,255,255,0.7); }
        </style>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#1E40AF;stop-opacity:1" />
          <stop offset="50%" style="stop-color:#7C3AED;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#DB2777;stop-opacity:1" />
        </linearGradient>
      </defs>
      
      <!-- Background -->
      <rect width="1200" height="630" fill="url(#grad)"/>
      
      <!-- Decorative elements -->
      <circle cx="1000" cy="150" r="100" fill="rgba(255,255,255,0.1)"/>
      <circle cx="200" cy="450" r="80" fill="rgba(255,255,255,0.1)"/>
      <circle cx="950" cy="500" r="60" fill="rgba(255,255,255,0.1)"/>
      
      <!-- Content -->
      <text x="60" y="120" class="title">💳 Secure Payment</text>
      <text x="60" y="180" class="subtitle">${plan} Plan Upgrade</text>
      
      <!-- Amount display -->
      <text x="60" y="320" class="amount">$${amount}</text>
      <text x="${60 + amount.length * 45}" y="320" class="currency">USDC</text>
      
      <!-- Features -->
      <text x="60" y="400" class="subtitle">✨ All premium templates</text>
      <text x="60" y="450" class="subtitle">📊 Advanced analytics</text>
      <text x="60" y="500" class="subtitle">📈 Export capabilities</text>
      
      <!-- Footer -->
      <text x="60" y="580" class="footer">Tap "Pay" to complete transaction • Powered by Base</text>
    </svg>
  `
  
  return new NextResponse(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=3600'
    }
  })
}