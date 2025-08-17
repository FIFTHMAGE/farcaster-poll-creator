'use client'

import { X, Check, Crown, Zap } from 'lucide-react'

interface PricingModalProps {
  onClose: () => void
}

export function PricingModal({ onClose }: PricingModalProps) {

  const handlePurchase = async (plan: string, amount: number) => {
    try {
      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan, amount, userFid: 'demo' })
      })
      
      const result = await response.json()
      
      if (result.success) {
        // Copy payment frame URL to clipboard
        navigator.clipboard.writeText(result.paymentUrl)
        alert(`Payment frame generated! URL copied to clipboard:\n${result.paymentUrl}\n\nShare this URL in Farcaster to complete your payment.`)
        onClose()
      }
    } catch (error) {
      alert('Error generating payment frame. Please try again.')
    }
  }



  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Choose Your Plan</h2>
              <p className="text-gray-600 mt-1">Unlock premium templates and advanced features</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Free Plan */}
            <div className="border border-gray-200 rounded-xl p-6">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">Free</h3>
                <div className="mt-2">
                  <span className="text-3xl font-bold">$0</span>
                  <span className="text-gray-600">/forever</span>
                </div>
              </div>
              
              <ul className="space-y-3 mb-6">
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-sm">2 basic templates</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Up to 4 poll options</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Basic analytics</span>
                </li>
              </ul>
              
              <button className="w-full py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50">
                Current Plan
              </button>
            </div>

            {/* Premium Poll */}
            <div className="border-2 border-purple-500 rounded-xl p-6 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </span>
              </div>
              
              <div className="text-center mb-6">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Crown className="w-5 h-5 text-purple-500" />
                  <h3 className="text-xl font-bold text-gray-900">Premium Poll</h3>
                </div>
                <div className="mt-2">
                  <span className="text-3xl font-bold">$3</span>
                  <span className="text-gray-600">/poll</span>
                </div>
              </div>
              
              <ul className="space-y-3 mb-6">
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-sm">All premium templates</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Unlimited options</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Advanced analytics</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Export results (CSV)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Custom branding</span>
                </li>
              </ul>
              
              <button
                onClick={() => handlePurchase('Premium Poll', 3)}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 px-4 rounded-lg hover:shadow-lg transition-all"
              >
                Pay $3 USDC
              </button>
            </div>

            {/* Bulk Package */}
            <div className="border border-gray-200 rounded-xl p-6">
              <div className="text-center mb-6">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Zap className="w-5 h-5 text-orange-500" />
                  <h3 className="text-xl font-bold text-gray-900">Bulk Pack</h3>
                </div>
                <div className="mt-2">
                  <span className="text-3xl font-bold">$20</span>
                  <span className="text-gray-600">/10 polls</span>
                </div>
                <div className="text-sm text-green-600 font-medium">Save 33%</div>
              </div>
              
              <ul className="space-y-3 mb-6">
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-sm">10 premium polls</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-sm">All premium features</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Priority support</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-sm">6 month validity</span>
                </li>
              </ul>
              
              <button
                onClick={() => handlePurchase('Bulk Pack', 20)}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-2 px-4 rounded-lg hover:shadow-lg transition-all"
              >
                Pay $20 USDC
              </button>
            </div>
          </div>
        </div>
      </div>


    </div>
  )
}