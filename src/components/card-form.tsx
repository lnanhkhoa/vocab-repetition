'use client'

import type React from 'react'

import { useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import type { EditFlashcard, Flashcard } from '@/types/flashcard'
import { useCategories } from '@/hooks/use-categories'

interface CardFormProps {
  card?: Flashcard
  onSubmit: (cardData: EditFlashcard) => void
  onCancel: () => void
  isLoading?: boolean
}

export function CardForm({ card, onSubmit, onCancel, isLoading = false }: CardFormProps) {
  const { categories } = useCategories()
  const categoryOptions = categories.map(cat => ({ value: cat.code, label: cat.name }))

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      front: card?.front || '',
      definition: card?.definition || '',
      example: card?.example || '',
      category: card?.category || undefined
    }
  })
  useEffect(() => {
    if (card) reset({ front: card.front, definition: card.definition, example: card.example, category: card.category })
  }, [card])

  const onFormSubmit = (data: any) => {
    onSubmit({
      front: data.front.trim(),
      definition: data.definition.trim(),
      example: data.example.trim(),
      category: data.category
    })
  }

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className='space-y-6'>
      <div className='space-y-2'>
        <Label htmlFor='front'>Word/Phrase/Question</Label>
        <Input id='front' placeholder='Enter the word, phrase, or question' {...register('front', { required: true })} />
        {errors.front && <span className='text-red-500 text-xs'>This field is required</span>}
      </div>

      <div className='space-y-2'>
        <Label htmlFor='definition'>Definition</Label>
        <Textarea id='definition' placeholder='Enter the definition' rows={4} {...register('definition', { required: true })} />
        {errors.definition && <span className='text-red-500 text-xs'>This field is required</span>}
      </div>

      <div className='space-y-2'>
        <Label htmlFor='example'>Example</Label>
        <Textarea id='example' placeholder='Enter an example' rows={4} {...register('example', { required: true })} />
        {errors.example && <span className='text-red-500 text-xs'>This field is required</span>}
      </div>

      <div className='space-y-2'>
        <Label htmlFor='category'>Category</Label>
        <Controller
          name='category'
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Select value={field.value?.code} onValueChange={field.onChange} required>
              <SelectTrigger>
                <SelectValue placeholder='Select a category' />
              </SelectTrigger>
              <SelectContent>
                {categoryOptions.map(cat => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.category && <span className='text-red-500 text-xs'>This field is required</span>}
      </div>
      <div className='flex justify-end space-x-3'>
        <Button type='button' variant='outline' onClick={onCancel} disabled={isLoading}>
          Cancel
        </Button>
        <Button type='submit' disabled={isLoading}>
          {isLoading ? 'Saving...' : card ? 'Update Card' : 'Add Card'}
        </Button>
      </div>
    </form>
  )
}
