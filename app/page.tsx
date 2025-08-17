'use client'

import { useState } from 'react'
import { PollCreator } from './components/PollCreator'
import { PollPreview } from './components/PollPreview'
import { Header } from './components/Header'
import { PricingModal } from './components/PricingModal'

export default function Home() {
  const [pollData, setPollData] = useState({
    question: '',
    options: ['', ''],
    template: 'gradient-purple',
    isPremium: false
  })
  
  const [showPricing, setShowPricing] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Create Stunning Farcaster Polls
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Build beautiful, interactive poll frames that drive engagement. 
            Free basic polls or premium templates with analytics.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <PollCreator 
            pollData={pollData}
            setPollData={setPollData}
            onUpgrade={() => setShowPricing(true)}
          />
          <PollPreview pollData={pollData} />
        </div>
      </main>

      {showPricing && (
        <PricingModal onClose={() => setShowPricing(false)} />
      )}
    </div>
  )
}