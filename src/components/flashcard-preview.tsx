'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ChevronLeft, ChevronRight, RotateCcw, Volume2, BookOpen } from 'lucide-react'
import { comprehensiveCards } from '@/data/comprehensive-cards'
import { CATEGORY_COLORS } from '@/constants/app-config'

export function FlashcardPreview() {
  // TODO: Replace with useFlashcards() logic for real review
  const handleReview = (quality: number) => {
    // Example: console.log(`Reviewed card ${currentCard.front} with quality ${quality}`)
    // Here, you would call updateCard(currentCard.id, quality) from useFlashcards
    // and then go to the next card
    // updateCard(currentCard.id, quality)
    nextCard()
    setIsFlipped(false)
  }
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)

  const currentCard = comprehensiveCards[currentIndex]

  const nextCard = () => {
    setCurrentIndex(prev => (prev + 1) % comprehensiveCards.length)
    setIsFlipped(false)
  }

  const prevCard = () => {
    setCurrentIndex(prev => (prev - 1 + comprehensiveCards.length) % comprehensiveCards.length)
    setIsFlipped(false)
  }

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = 'en-US'
      utterance.rate = 0.8
      speechSynthesis.speak(utterance)
    }
  }

  const getCategoryColor = (category: string) => {
    return CATEGORY_COLORS[category] || CATEGORY_COLORS['Advanced Vocabulary']
  }

  return (
    <div className='w-full max-w-4xl mx-auto p-6'>
      {/* Navigation */}
      <div className='flex justify-between items-center mb-4'>
        <Button variant='outline' onClick={prevCard} size='sm'>
          <ChevronLeft className='w-4 h-4 mr-1' />
          Previous
        </Button>

        <div className='flex items-center space-x-2'>
          <Badge variant='outline'>
            {currentIndex + 1} of {comprehensiveCards.length}
          </Badge>
          <Badge className={getCategoryColor(currentCard.category)}>{currentCard.category}</Badge>
        </div>

        <Button variant='outline' onClick={nextCard} size='sm'>
          Next
          <ChevronRight className='w-4 h-4 ml-1' />
        </Button>
      </div>

      {/* Main Card */}
      <Card className='min-h-[400px] shadow-lg border-2 hover:shadow-xl transition-shadow'>
        <CardHeader className='text-center pb-2'>
          <div className='flex justify-center items-center space-x-2'>
            <BookOpen className='w-5 h-5 text-muted-foreground' />
            <CardTitle className='text-lg'>{isFlipped ? 'Definition & Example' : 'Word/Phrase'}</CardTitle>
          </div>
        </CardHeader>

        <CardContent className='flex flex-col text-center'>
          <div className='flex-1 flex items-center justify-center w-full min-h-[200px]'>
            {!isFlipped ? (
              // Front of card
              <div className='space-y-2'>
                <Button
                  variant='ghost'
                  size='sm'
                  onClick={() => speakText(currentCard.front)}
                  className='text-gray-500 hover:text-gray-700'
                >
                  <Volume2 className='w-5 h-5' />
                </Button>
                <div className='flex items-center justify-center space-x-3'>
                  <h1 className='text-4xl font-bold text-gray-900'>{currentCard.front}</h1>
                </div>
                <p className='text-muted-foreground mb-4 line-clamp-3'>{currentCard.definition}</p>
              </div>
            ) : (
              // Back of card
              <div className='space-y-4 max-w-2xl p-4'>
                <div className=''>
                  <Button
                    variant='ghost'
                    size='sm'
                    onClick={() => speakText(currentCard.front)}
                    className='text-gray-500 hover:text-gray-700'
                  >
                    <Volume2 className='w-5 h-5' />
                  </Button>
                  <div className='flex items-center justify-center space-x-3'>
                    <h1 className='text-4xl font-bold text-gray-900'>{currentCard.front}</h1>
                  </div>
                  <p className='text-muted-foreground mb-4 line-clamp-3 mt-2'>{currentCard.definition}</p>
                </div>
                <h2 className='text-xl font-bold text-gray-900 mt-2'>Example</h2>
                <div className='space-y-2'>
                  {currentCard?.example?.map((example, index) => (
                    <div className='flex items-start justify-start space-x-3' key={index.toString()}>
                      <Button
                        variant='ghost'
                        size='sm'
                        onClick={() => speakText(example)}
                        className='text-gray-500 hover:text-gray-700 mt-1 flex-shrink-0'
                      >
                        <Volume2 className='w-4 h-4' />
                      </Button>
                      <div className='text-lg text-left'>{example}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className='flex flex-col items-center'>
            <Button onClick={() => setIsFlipped(!isFlipped)} size='lg' className='px-8'>
              {isFlipped ? (
                <>
                  <RotateCcw className='w-4 h-4 mr-2' />
                  {'Show Word'}
                </>
              ) : (
                'Show Example'
              )}
            </Button>

            {/* Anki Review Buttons */}
            {isFlipped && (
              <div className='flex flex-wrap justify-center gap-3 mt-8'>
                <Button
                  variant='secondary'
                  size='lg'
                  className='items-center bg-red-500/10 hover:bg-red-600/20'
                  onClick={() => handleReview(0)}
                >
                  <span>Again</span>
                  <span className='text-xs opacity-80'>&lt;1 min</span>
                </Button>
                <Button
                  variant='secondary'
                  size='lg'
                  className='items-center bg-orange-500/10 hover:bg-orange-600/20'
                  onClick={() => handleReview(1)}
                >
                  <span>Hard</span>
                  <span className='text-xs opacity-80'>10 min</span>
                </Button>
                <Button
                  variant='secondary'
                  size='lg'
                  className='items-center bg-green-500/10 hover:bg-green-600/20'
                  onClick={() => handleReview(2)}
                >
                  <span>Good</span>
                  <span className='text-xs opacity-80'>1 day</span>
                </Button>
                <Button
                  variant='secondary'
                  size='lg'
                  className='items-center bg-blue-500/10 hover:bg-blue-600/20'
                  onClick={() => handleReview(3)}
                >
                  <span>Easy</span>
                  <span className='text-xs opacity-80'>4 days</span>
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
