'use client'

import { useState } from 'react'
import { Plus, X, Crown, Palette } from 'lucide-react'

const TEMPLATES = {
  'gradient-purple': { name: 'Purple Gradient', premium: false, bg: 'from-purple-600 to-pink-600' },
  'gradient-blue': { name: 'Ocean Blue', premium: false, bg: 'from-blue-600 to-cyan-600' },
  'gradient-sunset': { name: 'Sunset Vibes', premium: true, bg: 'from-orange-500 to-red-600' },
  'gradient-forest': { name: 'Forest Green', premium: true, bg: 'from-green-600 to-emerald-600' },
  'gradient-royal': { name: 'Royal Gold', premium: true, bg: 'from-yellow-500 to-orange-600' },
  'gradient-cosmic': { name: 'Cosmic Purple', premium: true, bg: 'from-indigo-600 to-purple-800' },
}

interface PollCreatorProps {
  pollData: any
  setPollData: (data: any) => void
  onUpgrade: () => void
}

export function PollCreator({ pollData, setPollData, onUpgrade }: PollCreatorProps) {
  const addOption = () => {
    if (pollData.options.length < 4) {
      setPollData({
        ...pollData,
        options: [...pollData.options, '']
      })
    }
  }

  const removeOption = (index: number) => {
    if (pollData.options.length > 2) {
      setPollData({
        ...pollData,
        options: pollData.options.filter((_: any, i: number) => i !== index)
      })
    }
  }

  const updateOption = (index: number, value: string) => {
    const newOptions = [...pollData.options]
    newOptions[index] = value
    setPollData({ ...pollData, options: newOptions })
  }

  const selectTemplate = (templateId: string) => {
    const template = TEMPLATES[templateId as keyof typeof TEMPLATES]
    if (template.premium && !pollData.isPremium) {
      onUpgrade()
      return
    }
    setPollData({ ...pollData, template: templateId })
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
      <div className="flex items-center space-x-2 mb-6">
        <Palette className="w-5 h-5 text-purple-600" />
        <h2 className="text-2xl font-bold text-gray-900">Create Your Poll</h2>
      </div>

      <div className="space-y-6">
        {/* Question Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Poll Question
          </label>
          <input
            type="text"
            value={pollData.question}
            onChange={(e) => setPollData({ ...pollData, question: e.target.value })}
            placeholder="What's your favorite programming language?"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        {/* Options */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Poll Options
          </label>
          <div className="space-y-3">
            {pollData.options.map((option: string, index: number) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="text"
                  value={option}
                  onChange={(e) => updateOption(index, e.target.value)}
                  placeholder={`Option ${index + 1}`}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                {pollData.options.length > 2 && (
                  <button
                    onClick={() => removeOption(index)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
          
          {pollData.options.length < 4 && (
            <button
              onClick={addOption}
              className="mt-3 flex items-center space-x-2 px-4 py-2 text-purple-600 border border-purple-200 rounded-lg hover:bg-purple-50"
            >
              <Plus className="w-4 h-4" />
              <span>Add Option</span>
            </button>
          )}
        </div>

        {/* Templates */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Choose Template
          </label>
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(TEMPLATES).map(([id, template]) => (
              <button
                key={id}
                onClick={() => selectTemplate(id)}
                className={`relative p-3 rounded-lg border-2 transition-all ${
                  pollData.template === id 
                    ? 'border-purple-500 ring-2 ring-purple-200' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className={`w-full h-8 rounded bg-gradient-to-r ${template.bg} mb-2`} />
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{template.name}</span>
                  {template.premium && (
                    <Crown className="w-4 h-4 text-yellow-500" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}