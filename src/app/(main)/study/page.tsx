'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Card, Button, Label } from '@/components/ui'
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select'

import { CATEGORIES } from '@/constants/app-config'

export default function StudyOptionsPage() {
  const [selectedCategory, setSelectedCategory] = useState('')
  const router = useRouter()

  const handleStart = () => {
    if (selectedCategory) {
      // Pass the selected category as a query param
      router.push(`/study/${encodeURIComponent(selectedCategory)}`)
    }
  }

  return (
    <div className='flex justify-center items-center min-h-[60vh]'>
      <Card className='w-full max-w-md p-8'>
        <Label className='text-xl mb-6 block'>Select a Category to Study</Label>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className='w-full mb-6' aria-label='Category'>
            <SelectValue placeholder='Choose a category...' />
          </SelectTrigger>
          <SelectContent>
            {CATEGORIES.map(cat => (
              <SelectItem key={cat.id} value={cat.id}>
                <Label>{cat.label}</Label>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button className='w-full mt-4' onClick={handleStart} disabled={!selectedCategory}>
          Start Studying
        </Button>
      </Card>
    </div>
  )
}
