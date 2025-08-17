'use client'

import { useState } from 'react'
import { Wallet, Check, ExternalLink } from 'lucide-react'

interface CryptoPaymentProps {
  amount: number
  plan: string
  onSuccess: () => void
  onClose: () => void
}

export function CryptoPayment({ amount, plan, onSuccess, onClose }: CryptoPaymentProps) {
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'paid' | 'error'>('pending')
  const [txHash, setTxHash] = useState('')

  // USDC contract address on Base
  const USDC_ADDRESS = '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913'
  const RECIPIENT_ADDRESS = '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b7' // Your wallet

  const handlePayment = async () => {
    try {
      // For demo purposes, we'll simulate the payment
      // In production, you'd use the useUSDCPayment hook
      
      setPaymentStatus('pending')
      
      // Simulate payment processing
      setTimeout(() => {
        const mockTxHash = '0x' + Math.random().toString(16).substring(2, 66)
        setTxHash(mockTxHash)
        setPaymentStatus('paid')
        
        // Call success callback after 2 seconds
        setTimeout(() => {
          onSuccess()
        }, 2000)
      }, 3000)
      
    } catch (error) {
      setPaymentStatus('error')
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Wallet className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Pay with USDC</h2>
          <p className="text-gray-600 mt-1">{plan} Plan</p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600">Amount:</span>
            <span className="font-bold text-xl">${amount} USDC</span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600">Network:</span>
            <span className="font-medium">Base</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Recipient:</span>
            <span className="font-mono text-sm">{RECIPIENT_ADDRESS.slice(0, 6)}...{RECIPIENT_ADDRESS.slice(-4)}</span>
          </div>
        </div>

        {paymentStatus === 'pending' && !txHash && (
          <div className="space-y-4">
            <button
              onClick={handlePayment}
              className="w-full bg-gradient-to-r from-blue-500 to-green-500 text-white py-3 px-4 rounded-lg font-medium hover:shadow-lg transition-all"
            >
              Connect Wallet & Pay
            </button>
            <p className="text-sm text-gray-500 text-center">
              You'll be prompted to connect your wallet and approve the USDC transaction
            </p>
          </div>
        )}

        {paymentStatus === 'pending' && txHash && (
          <div className="text-center space-y-4">
            <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
            <p className="text-gray-600">Processing payment...</p>
            <p className="text-sm text-gray-500">Transaction submitted</p>
          </div>
        )}

        {paymentStatus === 'paid' && (
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto">
              <Check className="w-8 h-8 text-white" />
            </div>
            <p className="text-green-600 font-medium">Payment Successful!</p>
            <p className="text-sm text-gray-500">Your premium features are now active</p>
            {txHash && (
              <a
                href={`https://basescan.org/tx/${txHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1 text-blue-500 hover:text-blue-600 text-sm"
              >
                <span>View on BaseScan</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        )}

        {paymentStatus === 'error' && (
          <div className="text-center space-y-4">
            <p className="text-red-600">Payment failed. Please try again.</p>
            <button
              onClick={handlePayment}
              className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
            >
              Retry Payment
            </button>
          </div>
        )}

        <button
          onClick={onClose}
          className="w-full mt-4 py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}