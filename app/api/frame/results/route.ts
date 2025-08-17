import { NextRequest, NextResponse } from 'next/server'

// Mock database
const polls: any = {}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const pollId = searchParams.get('id')
  
  if (!pollId || !polls[pollId]) {
    return new NextResponse('Poll not found', { status: 404 })
  }

  const poll = polls[pollId]
  const totalVotes = poll.votes.reduce((a: number, b: number) => a + b, 0)
  
  // Generate SVG image for poll results
  const svg = `
    <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <style>
          .title { font: bold 42px system-ui, sans-serif; fill: white; }
          .option { font: 28px system-ui, sans-serif; fill: white; }
          .percentage { font: bold 32px system-ui, sans-serif; fill: white; }
          .subtitle { font: 24px system-ui, sans-serif; fill: rgba(255,255,255,0.8); }
        </style>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#8B5CF6;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#EC4899;stop-opacity:1" />
        </linearGradient>
      </defs>
      
      <!-- Background -->
      <rect width="1200" height="630" fill="url(#grad)"/>
      
      <!-- Decorative elements -->
      <circle cx="1000" cy="100" r="80" fill="rgba(255,255,255,0.1)"/>
      <circle cx="200" cy="500" r="60" fill="rgba(255,255,255,0.1)"/>
      
      <!-- Title -->
      <text x="60" y="80" class="title">📊 Poll Results</text>
      <text x="60" y="130" class="subtitle">${poll.question}</text>
      
      <!-- Results -->
      ${poll.options.map((option: string, index: number) => {
        const votes = poll.votes[index]
        const percentage = totalVotes > 0 ? Math.round((votes / totalVotes) * 100) : 0
        const barWidth = totalVotes > 0 ? (votes / totalVotes) * 800 : 0
        
        return `
          <!-- Option background -->
          <rect x="60" y="${180 + index * 90}" width="1080" height="70" rx="35" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.2)" stroke-width="2"/>
          
          <!-- Progress bar -->
          <rect x="60" y="${180 + index * 90}" width="${barWidth}" height="70" rx="35" fill="rgba(255,255,255,0.3)"/>
          
          <!-- Option text -->
          <text x="90" y="${210 + index * 90}" class="option">${option.length > 25 ? option.substring(0, 22) + '...' : option}</text>
          
          <!-- Percentage -->
          <text x="980" y="${210 + index * 90}" class="percentage">${percentage}%</text>
          
          <!-- Vote count -->
          <text x="980" y="${235 + index * 90}" class="subtitle">${votes} vote${votes !== 1 ? 's' : ''}</text>
        `
      }).join('')}
      
      <!-- Footer -->
      <text x="60" y="580" class="subtitle">Total: ${totalVotes} vote${totalVotes !== 1 ? 's' : ''} • Created with PollCaster</text>
    </svg>
  `
  
  return new NextResponse(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=60' // Shorter cache for results
    }
  })
}