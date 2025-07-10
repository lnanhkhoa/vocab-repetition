"use client"

import { useState, useEffect, useCallback } from "react"
import { useFlashcards } from "@/hooks/use-flashcards"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Home, RotateCcw, Clock, BookOpen } from "lucide-react"
import Link from "next/link"

export default function StudyPage() {
  const { getReviewCards, updateCard, getStats } = useFlashcards()
  const [reviewCards, setReviewCards] = useState<any[]>([])
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  const [sessionStartTime, setSessionStartTime] = useState<Date | null>(null)
  const [studyTime, setStudyTime] = useState(360)
  const [cardsStudied, setCardsStudied] = useState(20)

  useEffect(() => {
    const cards = getReviewCards()
    setReviewCards(cards)
    if (cards.length > 0) {
      setSessionStartTime(new Date())
    }
  }, [])

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (sessionStartTime && reviewCards.length > 0) {
      interval = setInterval(() => {
        setStudyTime(Math.floor((Date.now() - sessionStartTime.getTime()) / 1000))
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [sessionStartTime, reviewCards.length])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (reviewCards.length === 0) return

      switch (event.key) {
        case " ":
        case "Enter":
          event.preventDefault()
          if (!showAnswer) {
            setShowAnswer(true)
          }
          break
        case "1":
          if (showAnswer) handleAnswer(0)
          break
        case "2":
          if (showAnswer) handleAnswer(2)
          break
        case "3":
          if (showAnswer) handleAnswer(3)
          break
        case "4":
          if (showAnswer) handleAnswer(5)
          break
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [showAnswer, reviewCards.length])

  const handleAnswer = useCallback(
    (quality: number) => {
      if (reviewCards.length > 0) {
        const currentCard = reviewCards[currentCardIndex]
        updateCard(currentCard.id, quality)
        setCardsStudied((prev) => prev + 1)

        if (currentCardIndex < reviewCards.length - 1) {
          setCurrentCardIndex(currentCardIndex + 1)
          setShowAnswer(false)
        } else {
          // Session complete
          setReviewCards([])
          setCurrentCardIndex(0)
          setShowAnswer(false)
        }
      }
    },
    [reviewCards, currentCardIndex, updateCard],
  )

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  // Session complete screen
  if (reviewCards.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="text-center p-8">
            <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
            <h1 className="text-2xl font-bold mb-4">Study Session Complete!</h1>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Cards studied:</span>
                <span className="font-semibold">{cardsStudied}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Time spent:</span>
                <span className="font-semibold">{formatTime(studyTime)}</span>
              </div>
              {cardsStudied > 0 && (
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Average per card:</span>
                  <span className="font-semibold">{formatTime(Math.floor(studyTime / cardsStudied))}</span>
                </div>
              )}
            </div>

            <div className="space-y-3">
              <Link href="/" className="block">
                <Button className="w-full">
                  <Home className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <Button variant="outline" className="w-full bg-transparent" onClick={() => window.location.reload()}>
                <RotateCcw className="w-4 h-4 mr-2" />
                Study More Cards
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const currentCard = reviewCards[currentCardIndex]
  const progress = ((currentCardIndex + (showAnswer ? 0.5 : 0)) / reviewCards.length) * 100

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-4 py-3">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <Home className="w-4 h-4 mr-2" />
                Home
              </Button>
            </Link>
            <div className="text-sm text-muted-foreground">
              {currentCardIndex + 1} / {reviewCards.length}
            </div>
          </div>

          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {formatTime(studyTime)}
            </div>
            <div className="flex items-center">
              <BookOpen className="w-4 h-4 mr-1" />
              {cardsStudied} studied
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white px-4 pb-2">
        <div className="container mx-auto">
          <Progress value={progress} className="h-1" />
        </div>
      </div>

      {/* Main Study Area */}
      <div className="container mx-auto px-4 py-8 flex-1">
        <div className="max-w-2xl mx-auto">
          {/* Category Badge */}
          <div className="text-center mb-4">
            <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full">
              {currentCard.category}
            </span>
          </div>

          {/* Main Card */}
          <Card className="min-h-[400px] mb-6 shadow-lg">
            <CardContent className="flex flex-col items-center justify-center h-full p-8 text-center">
              <div className="flex-1 flex items-center justify-center w-full">
                <div className="space-y-6 w-full">
                  {/* Front of card */}
                  <div className="space-y-4">
                    <h2 className="text-3xl font-bold text-gray-900">{currentCard.front}</h2>
                  </div>

                  {/* Answer section */}
                  {showAnswer && (
                    <div className="border-t pt-6 space-y-4">
                      <div className="text-lg text-gray-700 leading-relaxed">{currentCard.back}</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Show Answer Button */}
              {!showAnswer && (
                <Button onClick={() => setShowAnswer(true)} size="lg" className="mt-6">
                  Show Answer
                  <span className="ml-2 text-xs opacity-75">(Space)</span>
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Answer Buttons */}
          {showAnswer && (
            <div className="space-y-4">
              <div className="text-center text-sm text-muted-foreground mb-4">How well did you know this word?</div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <Button
                  variant="destructive"
                  onClick={() => handleAnswer(0)}
                  className="h-16 flex flex-col items-center justify-center space-y-1"
                >
                  <span className="font-semibold">Again</span>
                  <span className="text-xs opacity-90">&lt;1m</span>
                  <span className="text-xs opacity-75">(1)</span>
                </Button>

                <Button
                  variant="outline"
                  onClick={() => handleAnswer(2)}
                  className="h-16 flex flex-col items-center justify-center space-y-1 border-orange-300 text-orange-700 hover:bg-orange-50"
                >
                  <span className="font-semibold">Hard</span>
                  <span className="text-xs opacity-90">&lt;6m</span>
                  <span className="text-xs opacity-75">(2)</span>
                </Button>

                <Button
                  variant="outline"
                  onClick={() => handleAnswer(3)}
                  className="h-16 flex flex-col items-center justify-center space-y-1 border-green-300 text-green-700 hover:bg-green-50"
                >
                  <span className="font-semibold">Good</span>
                  <span className="text-xs opacity-90">&lt;10m</span>
                  <span className="text-xs opacity-75">(3)</span>
                </Button>

                <Button
                  variant="outline"
                  onClick={() => handleAnswer(5)}
                  className="h-16 flex flex-col items-center justify-center space-y-1 border-blue-300 text-blue-700 hover:bg-blue-50"
                >
                  <span className="font-semibold">Easy</span>
                  <span className="text-xs opacity-90">4d</span>
                  <span className="text-xs opacity-75">(4)</span>
                </Button>
              </div>

              <div className="text-center text-xs text-muted-foreground">
                Use keyboard shortcuts (1-4) or click the buttons
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Keyboard Shortcuts Help */}
      <div className="bg-white border-t px-4 py-2">
        <div className="container mx-auto">
          <div className="text-xs text-muted-foreground text-center">
            <span className="font-medium">Shortcuts:</span> Space/Enter = Show Answer • 1 = Again • 2 = Hard • 3 = Good
            • 4 = Easy
          </div>
        </div>
      </div>
    </div>
  )
}
