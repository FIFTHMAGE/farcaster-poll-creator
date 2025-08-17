'use client'

import { useState } from 'react'
import { Eye, Download, Share2, BarChart3 } from 'lucide-react'

const TEMPLATES = {
  'gradient-purple': { bg: 'from-purple-600 to-pink-600' },
  'gradient-blue': { bg: 'from-blue-600 to-cyan-600' },
  'gradient-sunset': { bg: 'from-orange-500 to-red-600' },
  'gradient-forest': { bg: 'from-green-600 to-emerald-600' },
  'gradient-royal': { bg: 'from-yellow-500 to-orange-600' },
  'gradient-cosmic': { bg: 'from-indigo-600 to-purple-800' },
}

interface PollPreviewProps {
  pollData: any
}

export function PollPreview({ pollData }: PollPreviewProps) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [showResults, setShowResults] = useState(false)
  
  // Mock results for demo
  const mockResults = [45, 30, 15, 10].slice(0, pollData.options.length)
  const total = mockResults.reduce((a, b) => a + b, 0)

  const template = TEMPLATES[pollData.template as keyof typeof TEMPLATES] || TEMPLATES['gradient-purple']

  const generateFrame = async () => {
    if (!pollData.question || pollData.options.some((opt: string) => !opt.trim())) {
      alert('Please fill in the question and all options')
      return
    }

    try {
      const response = await fetch('/api/frame', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pollData)
      })
      
      const result = await response.json()
      
      if (result.success) {
        // Copy frame URL to clipboard
        navigator.clipboard.writeText(result.frameUrl)
        alert(`Frame generated! URL copied to clipboard:\n${result.frameUrl}\n\nShare this URL in any Farcaster cast to embed your poll.`)
      }
    } catch (error) {
      alert('Error generating frame. Please try again.')
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Eye className="w-5 h-5 text-purple-600" />
          <h2 className="text-2xl font-bold text-gray-900">Preview</h2>
        </div>
        <button
          onClick={() => setShowResults(!showResults)}
          className="flex items-center space-x-2 px-3 py-1 bg-gray-100 rounded-lg text-sm"
        >
          <BarChart3 className="w-4 h-4" />
          <span>{showResults ? 'Hide' : 'Show'} Results</span>
        </button>
      </div>

      {/* Frame Preview */}
      <div className="mb-6">
        <div className={`w-full aspect-[1.91/1] bg-gradient-to-r ${template.bg} rounded-xl p-6 text-white relative overflow-hidden`}>
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 right-4 w-32 h-32 border border-white/20 rounded-full" />
            <div className="absolute bottom-4 left-4 w-24 h-24 border border-white/20 rounded-full" />
          </div>
          
          <div className="relative z-10 h-full flex flex-col">
            <h3 className="text-xl font-bold mb-4 line-clamp-2">
              {pollData.question || 'Your poll question will appear here...'}
            </h3>
            
            <div className="flex-1 space-y-3">
              {pollData.options.map((option: string, index: number) => (
                <button
                  key={index}
                  onClick={() => setSelectedOption(index)}
                  className={`w-full p-3 rounded-lg border border-white/30 backdrop-blur-sm transition-all ${
                    selectedOption === index 
                      ? 'bg-white/30 border-white/60' 
                      : 'bg-white/10 hover:bg-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">
                      {option || `Option ${index + 1}`}
                    </span>
                    {showResults && (
                      <span className="text-sm">
                        {Math.round((mockResults[index] / total) * 100)}%
                      </span>
                    )}
                  </div>
                  {showResults && (
                    <div className="mt-2 w-full bg-white/20 rounded-full h-2">
                      <div 
                        className="bg-white rounded-full h-2 transition-all duration-500"
                        style={{ width: `${(mockResults[index] / total) * 100}%` }}
                      />
                    </div>
                  )}
                </button>
              ))}
            </div>
            
            <div className="mt-4 text-center">
              <span className="text-sm opacity-80">
                {showResults ? `${total} votes` : 'Tap to vote'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <button
          onClick={generateFrame}
          disabled={!pollData.question || pollData.options.some((opt: string) => !opt.trim())}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-4 rounded-lg font-medium hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Generate Farcaster Frame
        </button>
        
        <div className="grid grid-cols-2 gap-3">
          <button className="flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
          <button className="flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Share2 className="w-4 h-4" />
            <span>Share</span>
          </button>
        </div>
      </div>
    </div>
  )
}