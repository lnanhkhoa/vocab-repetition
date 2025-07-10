export interface Flashcard {
  id: string
  front: string
  definition: string
  example: string[]
  category: string
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
  category: string
}


export interface StudySession {
  cardId: string
  quality: number // 0-5 rating
  timestamp: Date
}

export interface UserProgress {
  totalCards: number
  cardsReviewed: number
  streak: number
  lastStudyDate?: Date
}
