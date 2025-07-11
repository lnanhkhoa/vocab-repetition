import { useState, useEffect } from 'react'
import type { Card } from '@/types'
import { getCardsForReview } from '@/lib/srs-algorithm'

import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { supabase } from '@/lib/supabase'

interface CardStore {
  cards: Card[]
  setCards: (cards: Card[]) => void
}

const cardsStores = create<CardStore>()(
  persist(
    (set, get) => ({
      cards: [],
      setCards: (cards: Card[]) => set({ cards })
    }),
    {
      name: 'cards-store',
      storage: createJSONStorage(() => sessionStorage)
    }
  )
)

export function useCards() {
  const { cards, setCards } = cardsStores()
  const [take, setTake] = useState(20)
  const [skip, setSkip] = useState(0)

  const fetchCards = async (take: number, skip: number) => {
    const responses = await supabase
      .from('cards')
      .select('*')
      .order('created_at', { ascending: false })
      .range(skip, skip + take - 1)
    if (responses.error) throw responses.error
    const allCards = responses.data as Card[]
    if (allCards) setCards(allCards)
  }

  useEffect(() => {
    fetchCards(take, skip)
  }, [take, skip])

  const addCard = async (cardData: Omit<Card, 'id' | 'easeFactor' | 'interval' | 'repetitions' | 'nextReview'>) => {
    const newCard = {
      ...cardData,
      easeFactor: 2.5,
      interval: 1,
      repetitions: 0,
      nextReview: new Date()
    }

    const { data, error } = await supabase.from('cards').insert([newCard]).select().single()
    if (error) throw error
    if (data) fetchCards(take, skip)
    return data
  }

  const editCard = async (cardId: string, cardData: Partial<Omit<Card, 'id'>>) => {
    const { data, error } = await supabase.from('cards').update(cardData).eq('id', cardId).select().single()
    if (error) throw error
    if (data) fetchCards(take, skip)
    return data
  }

  const deleteCard = async (cardId: string) => {
    const { error } = await supabase.from('cards').delete().eq('id', cardId)
    if (error) throw error
    fetchCards(take, skip)
  }

  const getReviewCards = () => getCardsForReview(cards)

  const getStats = () => {
    const stats = {
      totalCards: cards.length,
      dueCards: getReviewCards().length,
      dueCardsPercentage: (getReviewCards().length / cards.length) * 100,
      reviewedToday: cards.filter(card => card.nextReview <= new Date()).length,
      streak: cards.reduce((streak, card) => (card.nextReview <= new Date() ? streak + 1 : 0), 0)
    }
    return stats
  }

  return {
    cards,
    addCard,
    editCard,
    deleteCard,
    getReviewCards,
    getStats
  }
}
