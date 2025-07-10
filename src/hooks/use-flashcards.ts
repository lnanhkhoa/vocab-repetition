'use client'

import { useState, useEffect } from 'react'
import type { Flashcard, UserProgress } from '@/types/flashcard'
import { calculateNextReview, getCardsForReview } from '@/lib/srs-algorithm'
import { sampleCards } from '@/data/sample-cards'

export function useFlashcards() {
  const [cards, setCards] = useState<Flashcard[]>([])
  const [progress, setProgress] = useState<UserProgress>({
    totalCards: 0,
    cardsReviewed: 0,
    streak: 0
  })

  useEffect(() => {
    // Load cards from localStorage or initialize with sample data
    const savedCards = localStorage.getItem('flashcards')
    const savedProgress = localStorage.getItem('userProgress')

    if (savedCards) {
      const parsedCards = JSON.parse(savedCards).map((card: any) => ({
        ...card,
        nextReview: new Date(card.nextReview),
        lastReviewed: card.lastReviewed ? new Date(card.lastReviewed) : undefined
      }))
      setCards(parsedCards)
    } else {
      // Initialize with sample cards
      const initialCards: Flashcard[] = sampleCards.map((card, index) => ({
        ...card,
        id: `card-${index}`,
        easeFactor: 2.5,
        interval: 1,
        repetitions: 0,
        nextReview: new Date()
      }))
      setCards(initialCards)
      localStorage.setItem('flashcards', JSON.stringify(initialCards))
    }

    if (savedProgress) {
      setProgress(JSON.parse(savedProgress))
    }
  }, [])

  const updateCard = (cardId: string, quality: number) => {
    setCards(prevCards => {
      const updatedCards = prevCards.map(card => {
        if (card.id === cardId) {
          return calculateNextReview(card, quality)
        }
        return card
      })
      localStorage.setItem('flashcards', JSON.stringify(updatedCards))
      return updatedCards
    })

    // Update progress
    setProgress(prev => {
      const newProgress = {
        ...prev,
        cardsReviewed: prev.cardsReviewed + 1,
        lastStudyDate: new Date()
      }
      localStorage.setItem('userProgress', JSON.stringify(newProgress))
      return newProgress
    })
  }

  const getReviewCards = () => getCardsForReview(cards)

  const getStats = () => ({
    totalCards: cards.length,
    dueCards: getCardsForReview(cards).length,
    reviewedToday: progress.cardsReviewed,
    streak: progress.streak
  })

  return {
    cards,
    updateCard,
    getReviewCards,
    getStats,
    progress
  }
}
