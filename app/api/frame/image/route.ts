import { NextRequest, NextResponse } from 'next/server'
import { pollStorage } from '@/app/lib/pollStorage'

const TEMPLATES = {
  'gradient-purple': { bg: 'linear-gradient(135deg, #8B5CF6, #EC4899)' },
  'gradient-blue': { bg: 'linear-gradient(135deg, #2563EB, #06B6D4)' },
  'gradient-sunset': { bg: 'linear-gradient(135deg, #F59E0B, #DC2626)' },
  'gradient-forest': { bg: 'linear-gradient(135deg, #059669, #10B981)' },
  'gradient-royal': { bg: 'linear-gradient(135deg, #EAB308, #F59E0B)' },
  'gradient-cosmic': { bg: 'linear-gradient(135deg, #4F46E5, #7C3AED)' },
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const pollId = searchParams.get('id')
  
  if (!pollId) {
    return new NextResponse('Poll ID required', { status: 400 })
  }

  const poll = pollStorage.getPoll(pollId)
  if (!poll) {
    return new NextResponse('Poll not found', { status: 404 })
  }
  const template = TEMPLATES[poll.template as keyof typeof TEMPLATES] || TEMPLATES['gradient-purple']
  
  // Generate SVG image for the poll
  const svg = `
    <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <style>
          .title { font: bold 48px system-ui, sans-serif; fill: white; }
          .option { font: 32px system-ui, sans-serif; fill: white; }
          .subtitle { font: 24px system-ui, sans-serif; fill: rgba(255,255,255,0.8); }
        </style>
      </defs>
      
      <!-- Background -->
      <rect width="1200" height="630" fill="url(#grad)"/>
      
      <!-- Gradient Definition -->
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#8B5CF6;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#EC4899;stop-opacity:1" />
        </linearGradient>
      </defs>
      
      <!-- Decorative circles -->
      <circle cx="1000" cy="100" r="80" fill="rgba(255,255,255,0.1)"/>
      <circle cx="200" cy="500" r="60" fill="rgba(255,255,255,0.1)"/>
      
      <!-- Content -->
      <text x="60" y="120" class="title">${poll.question.length > 50 ? poll.question.substring(0, 47) + '...' : poll.question}</text>
      
      ${poll.options.map((option: string, index: number) => `
        <rect x="60" y="${200 + index * 80}" width="1080" height="60" rx="30" fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.3)" stroke-width="2"/>
        <text x="90" y="${235 + index * 80}" class="option">${option.length > 30 ? option.substring(0, 27) + '...' : option}</text>
      `).join('')}
      
      <text x="60" y="580" class="subtitle">Tap an option to vote • Created with PollCaster</text>
    </svg>
  `
  
  return new NextResponse(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=3600'
    }
  })
}