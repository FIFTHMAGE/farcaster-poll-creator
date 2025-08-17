import { NextRequest, NextResponse } from 'next/server'
import { pollStorage } from '@/app/lib/pollStorage'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const paymentId = searchParams.get('id')
  const plan = searchParams.get('plan') || 'premium'
  const amount = searchParams.get('amount') || '3'
  
  // Generate payment frame HTML
  const frameHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Pay ${amount} USDC - ${plan}</title>
        
        <!-- Farcaster Frame Meta Tags -->
        <meta property="fc:frame" content="vNext">
        <meta property="fc:frame:image" content="${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/image?plan=${plan}&amount=${amount}">
        <meta property="fc:frame:button:1" content="💳 Pay ${amount} USDC">
        <meta property="fc:frame:button:1:action" content="tx">
        <meta property="fc:frame:button:1:target" content="${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/tx?plan=${plan}&amount=${amount}">
        <meta property="fc:frame:post_url" content="${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/success">
        
        <!-- Open Graph -->
        <meta property="og:title" content="Pay ${amount} USDC for ${plan}">
        <meta property="og:image" content="${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/image?plan=${plan}&amount=${amount}">
      </head>
      <body>
        <h1>Payment: ${plan}</h1>
        <p>Amount: ${amount} USDC</p>
        <p>Use Farcaster to complete this payment.</p>
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
    const { plan, amount, userFid } = body
    
    // Validate input
    if (!plan || !amount) {
      return NextResponse.json({ 
        success: false, 
        error: 'Missing plan or amount' 
      }, { status: 400 })
    }

    // Create payment request
    const payment = pollStorage.createPayment({
      plan,
      amount: parseFloat(amount),
      userFid: userFid || 'anonymous',
      status: 'pending'
    })
    
    const paymentUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment?id=${payment.id}&plan=${plan}&amount=${amount}`
    
    return NextResponse.json({ 
      success: true, 
      paymentId: payment.id,
      paymentUrl
    })
  } catch (error) {
    console.error('Error creating payment:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to create payment' 
    }, { status: 500 })
  }
}