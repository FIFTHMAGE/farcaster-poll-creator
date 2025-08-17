import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { untrustedData } = body
    const txHash = untrustedData?.transactionId
    
    // In production, verify the transaction on-chain
    // For now, we'll assume success if we have a txHash
    
    const frameHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <title>Payment Successful!</title>
          
          <!-- Farcaster Frame Meta Tags -->
          <meta property="fc:frame" content="vNext">
          <meta property="fc:frame:image" content="${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/success-image?tx=${txHash}">
          <meta property="fc:frame:button:1" content="🎉 Create Premium Poll">
          <meta property="fc:frame:button:1:action" content="link">
          <meta property="fc:frame:button:1:target" content="${process.env.NEXT_PUBLIC_BASE_URL}?premium=true">
          <meta property="fc:frame:button:2" content="📊 View Transaction">
          <meta property="fc:frame:button:2:action" content="link">
          <meta property="fc:frame:button:2:target" content="https://basescan.org/tx/${txHash}">
          
          <!-- Open Graph -->
          <meta property="og:title" content="Payment Successful!">
          <meta property="og:image" content="${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/success-image?tx=${txHash}">
        </head>
        <body>
          <h1>Payment Successful!</h1>
          <p>Transaction: ${txHash}</p>
          <p>Your premium features are now active.</p>
        </body>
      </html>
    `
    
    return new NextResponse(frameHtml, {
      headers: { 'Content-Type': 'text/html' }
    })
    
  } catch (error) {
    console.error('Success handler error:', error)
    return new NextResponse('Error processing success', { status: 500 })
  }
}