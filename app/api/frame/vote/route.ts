import { NextRequest, NextResponse } from 'next/server'
import { pollStorage } from '@/app/lib/pollStorage'

export async function POST(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const pollId = searchParams.get('id')
  
  if (!pollId) {
    return new NextResponse('Poll ID required', { status: 400 })
  }

  const poll = pollStorage.getPoll(pollId)
  if (!poll) {
    return new NextResponse('Poll not found', { status: 404 })
  }

  try {
    const body = await request.json()
    const buttonIndex = body.untrustedData?.buttonIndex
    const fid = body.untrustedData?.fid || 'anonymous' // Farcaster user ID
    
    if (!buttonIndex || buttonIndex < 1 || buttonIndex > poll.options.length) {
      return new NextResponse('Invalid vote', { status: 400 })
    }

    // Check if user already voted
    const alreadyVoted = pollStorage.hasVoted(pollId, fid)
    if (alreadyVoted) {
      return generateResultsFrame(poll, pollId, true)
    }

    // Record the vote (buttonIndex is 1-based, array is 0-based)
    const success = pollStorage.addVote(pollId, buttonIndex - 1, fid)
    if (!success) {
      return new NextResponse('Failed to record vote', { status: 500 })
    }

    // Get updated poll data
    const updatedPoll = pollStorage.getPoll(pollId)!
    
    // Return results frame
    return generateResultsFrame(updatedPoll, pollId, false)
    
  } catch (error) {
    console.error('Vote error:', error)
    return new NextResponse('Error processing vote', { status: 500 })
  }
}

function generateResultsFrame(poll: any, pollId: string, alreadyVoted: boolean) {
  const totalVotes = poll.votes.reduce((a: number, b: number) => a + b, 0)
  
  const frameHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Poll Results: ${poll.question}</title>
        
        <!-- Farcaster Frame Meta Tags -->
        <meta property="fc:frame" content="vNext">
        <meta property="fc:frame:image" content="${process.env.NEXT_PUBLIC_BASE_URL}/api/frame/results?id=${pollId}">
        <meta property="fc:frame:button:1" content="🔄 Vote Again">
        <meta property="fc:frame:button:2" content="📊 View Details">
        <meta property="fc:frame:post_url" content="${process.env.NEXT_PUBLIC_BASE_URL}/api/frame?id=${pollId}">
        
        <!-- Open Graph -->
        <meta property="og:title" content="Poll Results: ${poll.question}">
        <meta property="og:image" content="${process.env.NEXT_PUBLIC_BASE_URL}/api/frame/results?id=${pollId}">
      </head>
      <body>
        <h1>Poll Results</h1>
        <h2>${poll.question}</h2>
        <p>Total votes: ${totalVotes}</p>
        ${alreadyVoted ? '<p>You have already voted in this poll.</p>' : '<p>Thank you for voting!</p>'}
      </body>
    </html>
  `
  
  return new NextResponse(frameHtml, {
    headers: { 'Content-Type': 'text/html' }
  })
}