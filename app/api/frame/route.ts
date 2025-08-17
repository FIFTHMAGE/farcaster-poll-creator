import { NextRequest, NextResponse } from 'next/server'

// This would be your database in production
const polls: any = {}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const pollId = searchParams.get('id')
  
  if (!pollId || !polls[pollId]) {
    return new NextResponse('Poll not found', { status: 404 })
  }

  const poll = polls[pollId]
  
  // Generate the frame HTML
  const frameHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>${poll.question}</title>
        
        <!-- Farcaster Frame Meta Tags -->
        <meta property="fc:frame" content="vNext">
        <meta property="fc:frame:image" content="${process.env.NEXT_PUBLIC_BASE_URL}/api/frame/image?id=${pollId}">
        <meta property="fc:frame:button:1" content="${poll.options[0]}">
        <meta property="fc:frame:button:2" content="${poll.options[1]}">
        ${poll.options[2] ? `<meta property="fc:frame:button:3" content="${poll.options[2]}">` : ''}
        ${poll.options[3] ? `<meta property="fc:frame:button:4" content="${poll.options[3]}">` : ''}
        <meta property="fc:frame:post_url" content="${process.env.NEXT_PUBLIC_BASE_URL}/api/frame/vote?id=${pollId}">
        
        <!-- Open Graph -->
        <meta property="og:title" content="${poll.question}">
        <meta property="og:image" content="${process.env.NEXT_PUBLIC_BASE_URL}/api/frame/image?id=${pollId}">
      </head>
      <body>
        <h1>${poll.question}</h1>
        <p>This is a Farcaster Frame poll. View it in a Farcaster client to interact.</p>
      </body>
    </html>
  `
  
  return new NextResponse(frameHtml, {
    headers: { 'Content-Type': 'text/html' }
  })
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { question, options, template, isPremium } = body
  
  // Generate unique poll ID
  const pollId = Math.random().toString(36).substring(2, 15)
  
  // Store poll (in production, use a real database)
  polls[pollId] = {
    id: pollId,
    question,
    options,
    template,
    isPremium,
    votes: new Array(options.length).fill(0),
    voters: new Set(),
    createdAt: new Date().toISOString()
  }
  
  const frameUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/frame?id=${pollId}`
  
  return NextResponse.json({ 
    success: true, 
    pollId,
    frameUrl,
    shareUrl: frameUrl
  })
}