import { NextRequest, NextResponse } from 'next/server'
import { pollStorage } from '@/app/lib/pollStorage'

export async function GET(request: NextRequest) {
  // Only allow in development
  if (process.env.NODE_ENV === 'production') {
    return new NextResponse('Not available in production', { status: 404 })
  }

  const polls = pollStorage.getAllPolls()
  const payments = pollStorage.getAllPayments()

  return NextResponse.json({
    polls: polls.map(poll => ({
      ...poll,
      voters: Array.from(poll.voters) // Convert Set to Array for JSON
    })),
    payments,
    totalPolls: polls.length,
    totalPayments: payments.length
  })
}

export async function DELETE(request: NextRequest) {
  // Only allow in development
  if (process.env.NODE_ENV === 'production') {
    return new NextResponse('Not available in production', { status: 404 })
  }

  pollStorage.clearAll()
  
  return NextResponse.json({
    success: true,
    message: 'All data cleared'
  })
}