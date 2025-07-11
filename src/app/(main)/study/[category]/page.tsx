'use client'

import { FlashcardPreview } from '@/components/flashcard-preview'

export default function SamplesPage() {
  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Header */}
      <div className='bg-white border-b'>
        <div className='container mx-auto px-4 py-8'>
          <div className='text-center'>
            <h1 className='text-4xl font-bold mb-4'>Study Flashcards</h1>
            <p className='text-xl text-muted-foreground mb-6'>Explore our comprehensive collection of English learning flashcards</p>
          </div>
        </div>
      </div>

      <div className='container mx-auto px-4 py-8'>
        {/* Interactive Preview */}
        <FlashcardPreview />
      </div>
    </div>
  )
}
