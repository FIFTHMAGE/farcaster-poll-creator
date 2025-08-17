import { NextRequest, NextResponse } from 'next/server'

const USDC_ADDRESS = '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913' // Base USDC
const RECIPIENT_ADDRESS = process.env.RECIPIENT_WALLET_ADDRESS || '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b7'

export async function POST(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const plan = searchParams.get('plan') || 'premium'
  const amount = searchParams.get('amount') || '3'
  
  try {
    const body = await request.json()
    const { untrustedData } = body
    
    // Convert amount to USDC (6 decimals)
    const amountInWei = (parseFloat(amount) * 1000000).toString()
    
    // Return transaction data for Farcaster to execute
    const txData = {
      chainId: `eip155:8453`, // Base chain ID
      method: 'eth_sendTransaction',
      params: {
        abi: [
          {
            name: 'transfer',
            type: 'function',
            stateMutability: 'nonpayable',
            inputs: [
              { name: 'to', type: 'address' },
              { name: 'amount', type: 'uint256' }
            ],
            outputs: [{ name: '', type: 'bool' }]
          }
        ],
        to: USDC_ADDRESS,
        data: `0xa9059cbb${RECIPIENT_ADDRESS.slice(2).padStart(64, '0')}${parseInt(amountInWei).toString(16).padStart(64, '0')}`,
        value: '0'
      }
    }
    
    return NextResponse.json(txData)
    
  } catch (error) {
    console.error('Transaction error:', error)
    return new NextResponse('Error creating transaction', { status: 500 })
  }
}