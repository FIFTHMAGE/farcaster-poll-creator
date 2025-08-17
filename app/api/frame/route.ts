import { NextRequest, NextResponse } from 'next/server'
import { pollStorage } from '@/app/lib/pollStorage'

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
  try {
    const body = await request.json()
    const { question, options, template, isPremium } = body
    
    // Validate input
    if (!question || !options || !Array.isArray(options) || options.length < 2) {
      return NextResponse.json({ 
        success: false, 
        error: 'Invalid poll data' 
      }, { status: 400 })
    }

    // Create poll
    const poll = pollStorage.createPoll({
      question,
      options,
      template: template || 'gradient-purple',
      isPremium: isPremium || false
    })
    
    const frameUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/frame?id=${poll.id}`
    
    return NextResponse.json({ 
      success: true, 
      pollId: poll.id,
      frameUrl,
      shareUrl: frameUrl
    })
  } catch (error) {
    console.error('Error creating poll:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to create poll' 
    }, { status: 500 })
  }
}