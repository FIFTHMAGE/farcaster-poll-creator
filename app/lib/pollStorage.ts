// Simple in-memory poll storage
// In production, replace with a real database like Vercel Postgres

interface Poll {
  id: string
  question: string
  options: string[]
  template: string
  isPremium: boolean
  votes: number[]
  voters: Set<string>
  createdAt: string
}

interface Payment {
  id: string
  plan: string
  amount: number
  userFid: string
  status: 'pending' | 'completed' | 'failed'
  createdAt: string
}

// In-memory storage (will reset on server restart)
const polls: Record<string, Poll> = {}
const payments: Record<string, Payment> = {}

export const pollStorage = {
  // Poll operations
  createPoll: (pollData: Omit<Poll, 'id' | 'votes' | 'voters' | 'createdAt'>) => {
    const id = Math.random().toString(36).substring(2, 15)
    const poll: Poll = {
      ...pollData,
      id,
      votes: new Array(pollData.options.length).fill(0),
      voters: new Set(),
      createdAt: new Date().toISOString()
    }
    polls[id] = poll
    return poll
  },

  getPoll: (id: string): Poll | null => {
    return polls[id] || null
  },

  addVote: (pollId: string, optionIndex: number, voterFid: string): boolean => {
    const poll = polls[pollId]
    if (!poll || poll.voters.has(voterFid)) {
      return false // Poll doesn't exist or user already voted
    }
    
    if (optionIndex < 0 || optionIndex >= poll.options.length) {
      return false // Invalid option
    }

    poll.votes[optionIndex]++
    poll.voters.add(voterFid)
    return true
  },

  hasVoted: (pollId: string, voterFid: string): boolean => {
    const poll = polls[pollId]
    return poll ? poll.voters.has(voterFid) : false
  },

  // Payment operations
  createPayment: (paymentData: Omit<Payment, 'id' | 'createdAt'>) => {
    const id = Math.random().toString(36).substring(2, 15)
    const payment: Payment = {
      ...paymentData,
      id,
      createdAt: new Date().toISOString()
    }
    payments[id] = payment
    return payment
  },

  getPayment: (id: string): Payment | null => {
    return payments[id] || null
  },

  updatePaymentStatus: (id: string, status: Payment['status']): boolean => {
    if (payments[id]) {
      payments[id].status = status
      return true
    }
    return false
  },

  // Debug helpers
  getAllPolls: () => Object.values(polls),
  getAllPayments: () => Object.values(payments),
  clearAll: () => {
    Object.keys(polls).forEach(key => delete polls[key])
    Object.keys(payments).forEach(key => delete payments[key])
  }
}