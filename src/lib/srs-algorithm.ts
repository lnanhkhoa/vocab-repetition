import type { Flashcard } from '@/types/flashcard'

export function calculateNextReview(card: Flashcard, quality: number): Flashcard {
  // SM-2 Algorithm implementation
  let { easeFactor, interval, repetitions } = card

  if (quality >= 3) {
    if (repetitions === 0) {
      interval = 1
    } else if (repetitions === 1) {
      interval = 6
    } else {
      interval = Math.round(interval * easeFactor)
    }
    repetitions += 1
  } else {
    repetitions = 0
    interval = 1
  }

  easeFactor = easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
  if (easeFactor < 1.3) easeFactor = 1.3

  const nextReview = new Date()
  nextReview.setDate(nextReview.getDate() + interval)

  return {
    ...card,
    easeFactor,
    interval,
    repetitions,
    nextReview,
    lastReviewed: new Date()
  }
}

export function getCardsForReview(cards: Flashcard[]): Flashcard[] {
  const now = new Date()
  return cards.filter(card => new Date(card.nextReview) <= now)
}
