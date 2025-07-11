'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Volume2 } from 'lucide-react'
import type { Flashcard as FlashcardType } from '@/types'

interface AnkiFlashcardProps {
  card: FlashcardType
  showAnswer: boolean
  onShowAnswer: () => void
  onAnswer: (quality: number) => void
}

export function AnkiFlashcard({ card, showAnswer, onShowAnswer, onAnswer }: AnkiFlashcardProps) {
  const [isFlipping, setIsFlipping] = useState(false)

  const handleFlip = () => {
    if (!showAnswer) {
      setIsFlipping(true)
      setTimeout(() => {
        onShowAnswer()
        setIsFlipping(false)
      }, 150)
    }
  }

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = 'en-US'
      utterance.rate = 0.8
      speechSynthesis.speak(utterance)
    }
  }

  return (
    <div className='w-full max-w-4xl mx-auto'>
      {/* Category Badge */}
      <div className='text-center mb-6'>
        <span className='inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-medium px-4 py-2 rounded-full shadow-sm'>
          {card.category}
        </span>
      </div>

      {/* Main Card */}
      <Card
        className={`min-h-[450px] shadow-xl border-0 bg-gradient-to-br from-white to-gray-50 transition-all duration-300 ${
          isFlipping ? 'scale-95 opacity-80' : 'scale-100 opacity-100'
        }`}
      >
        <CardContent className='flex flex-col items-center justify-center h-full p-12 text-center'>
          <div className='flex-1 flex items-center justify-center w-full'>
            <div className='space-y-8 w-full max-w-2xl'>
              {/* Front of card */}
              <div className='space-y-6'>
                <div className='flex items-center justify-center space-x-4'>
                  <h1 className='text-4xl md:text-5xl font-bold text-gray-900 leading-tight'>{card.front}</h1>
                  <Button variant='ghost' size='sm' onClick={() => speakText(card.front)} className='text-gray-500 hover:text-gray-700'>
                    <Volume2 className='w-5 h-5' />
                  </Button>
                </div>
              </div>

              {/* Answer section */}
              {showAnswer && (
                <div className='border-t border-gray-200 pt-8 space-y-6 animate-in fade-in duration-300'>
                  <div className='flex items-start justify-center space-x-4'>
                    <div className='text-xl md:text-2xl text-gray-700 leading-relaxed text-left max-w-xl'>{card.back}</div>
                    <Button
                      variant='ghost'
                      size='sm'
                      onClick={() => speakText(card.back)}
                      className='text-gray-500 hover:text-gray-700 mt-1'
                    >
                      <Volume2 className='w-4 h-4' />
                    </Button>
                  </div>

                  {/* Card Stats */}
                  <div className='flex justify-center space-x-6 text-sm text-gray-500'>
                    <span>Reviews: {card.repetitions}</span>
                    <span>Interval: {card.interval}d</span>
                    <span>Ease: {card.easeFactor.toFixed(1)}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Show Answer Button */}
          {!showAnswer && (
            <div className='space-y-4'>
              <Button
                onClick={handleFlip}
                size='lg'
                className='px-8 py-4 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg'
              >
                Show Answer
              </Button>
              <div className='text-sm text-gray-500'>
                Press <kbd className='px-2 py-1 bg-gray-100 rounded text-xs'>Space</kbd> or{' '}
                <kbd className='px-2 py-1 bg-gray-100 rounded text-xs'>Enter</kbd>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Answer Buttons */}
      {showAnswer && (
        <div className='mt-8 space-y-6'>
          <div className='text-center'>
            <h3 className='text-lg font-semibold text-gray-800 mb-2'>How well did you know this word?</h3>
            <p className='text-sm text-gray-600'>Be honest with your self-assessment</p>
          </div>

          <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
            <Button
              variant='destructive'
              onClick={() => onAnswer(0)}
              className='h-20 flex flex-col items-center justify-center space-y-2 text-white bg-red-500 hover:bg-red-600 shadow-lg'
            >
              <span className='font-bold text-lg'>Again</span>
              <span className='text-xs opacity-90'>{'<'}1 minute</span>
              <kbd className='text-xs bg-red-600 px-2 py-1 rounded'>1</kbd>
            </Button>

            <Button
              variant='outline'
              onClick={() => onAnswer(2)}
              className='h-20 flex flex-col items-center justify-center space-y-2 border-2 border-orange-400 text-orange-700 hover:bg-orange-50 shadow-lg'
            >
              <span className='font-bold text-lg'>Hard</span>
              <span className='text-xs opacity-90'>{'<'}6 minutes</span>
              <kbd className='text-xs bg-orange-100 px-2 py-1 rounded'>2</kbd>
            </Button>

            <Button
              variant='outline'
              onClick={() => onAnswer(3)}
              className='h-20 flex flex-col items-center justify-center space-y-2 border-2 border-green-400 text-green-700 hover:bg-green-50 shadow-lg'
            >
              <span className='font-bold text-lg'>Good</span>
              <span className='text-xs opacity-90'>{'<'}10 minutes</span>
              <kbd className='text-xs bg-green-100 px-2 py-1 rounded'>3</kbd>
            </Button>

            <Button
              variant='outline'
              onClick={() => onAnswer(5)}
              className='h-20 flex flex-col items-center justify-center space-y-2 border-2 border-blue-400 text-blue-700 hover:bg-blue-50 shadow-lg'
            >
              <span className='font-bold text-lg'>Easy</span>
              <span className='text-xs opacity-90'>4 days</span>
              <kbd className='text-xs bg-blue-100 px-2 py-1 rounded'>4</kbd>
            </Button>
          </div>

          <div className='text-center text-sm text-gray-500'>
            Use number keys <kbd className='px-2 py-1 bg-gray-100 rounded text-xs'>1-4</kbd> for quick answers
          </div>
        </div>
      )}
    </div>
  )
}
