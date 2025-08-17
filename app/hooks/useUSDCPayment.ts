'use client'

import { useState } from 'react'
import { useAccount, useContractWrite, useWaitForTransaction } from 'wagmi'
import { parseUnits } from 'viem'

// USDC contract ABI (minimal for transfer)
const USDC_ABI = [
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
] as const

const USDC_ADDRESS = '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913' // Base USDC
const RECIPIENT_ADDRESS = process.env.RECIPIENT_WALLET_ADDRESS || '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b7'

export function useUSDCPayment() {
  const { address, isConnected } = useAccount()
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'pending' | 'success' | 'error'>('idle')

  const { data, write } = useContractWrite({
    address: USDC_ADDRESS,
    abi: USDC_ABI,
    functionName: 'transfer',
    onSuccess: () => setPaymentStatus('pending'),
    onError: () => setPaymentStatus('error')
  })

  const { isLoading } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess: () => setPaymentStatus('success'),
    onError: () => setPaymentStatus('error')
  })

  const payUSDC = async (amountUSD: number) => {
    if (!isConnected || !write) {
      setPaymentStatus('error')
      return
    }

    try {
      // USDC has 6 decimals
      const amount = parseUnits(amountUSD.toString(), 6)
      
      write({
        args: [RECIPIENT_ADDRESS as `0x${string}`, amount]
      })
    } catch (error) {
      console.error('Payment error:', error)
      setPaymentStatus('error')
    }
  }

  return {
    payUSDC,
    paymentStatus,
    txHash: data?.hash,
    isLoading: isLoading || paymentStatus === 'pending',
    isConnected,
    address
  }
}