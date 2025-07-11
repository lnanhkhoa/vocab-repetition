
export interface Category {
  id: string
  name: string
  code: string
  description: string
  difficulty: string
  createdAt: Date
}

export interface Card {
  id: string
  front: string
  definition: string
  example: string[]
  category: Category
  easeFactor: number
  interval: number
  repetitions: number
  nextReview: Date
  lastReviewed?: Date
}

export interface EditFlashcard {
  front: string
  definition: string
  example: string[]
  category: Category
}

export interface UserProgress {
  totalCards: number
  cardsReviewed: number
  streak: number
  lastStudyDate?: Date
}
