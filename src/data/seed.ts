import { comprehensiveCards } from './comprehensive-cards'
import { supabase } from '@/lib/supabase'
import _ from 'lodash'

export async function seed() {
  console.log('🚀 Start seeding')
  const { count, error } = await supabase.from('cards').select('*', { count: 'exact', head: true })
  if (count) return
  // console.log("🚀 ~ seed ~ error:", count, error)
  const { data: categories } = await supabase.from('categories').select('*')

  // insert
  const cards = comprehensiveCards.map(card => ({
    ..._.pick(card, ['front', 'definition', 'example']),
    categoryId: categories?.find(c => c.code === card.category)?.id,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReview: new Date(),
    lastReviewed: null
  }))
  const { data, error: insertError } = await supabase.from('cards').insert(cards)
  // console.log('🚀 ~ seed ~ data:', data, insertError)
}
