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
import { CATEGORIES } from '@/constants/app-config'

interface CardFormProps {
  card?: Flashcard
  onSubmit: (cardData: EditFlashcard) => void
  onCancel: () => void
  isLoading?: boolean
}

const categories: string[] = CATEGORIES.map(cat => cat.id)

export function CardForm({ card, onSubmit, onCancel, isLoading = false }: CardFormProps) {
  const { register, handleSubmit, control, setValue, watch, reset, formState: { errors } } = useForm({
    defaultValues: {
      front: card?.front || '',
      definition: card?.definition || '',
      example: card?.example || '',
      category: categories.includes(card?.category || '') ? card?.category : (card ? 'Custom' : ''),
      customCategory: !card || categories.includes(card.category) ? '' : card.category,
    }
  });

  // Watch category to show/hide customCategory
  const category = watch('category');

  useEffect(() => {
    if (card) {
      reset({
        front: card.front,
        definition: card.definition,
        example: card.example,
        category: categories.includes(card.category) ? card.category : categories[0],
        customCategory: categories.includes(card.category) ? '' : card.category,
      });
    }
  }, [card, reset]);

  const onFormSubmit = (data: any) => {
    const finalCategory = data.category === 'Custom' ? data.customCategory : data.category;
    if (!finalCategory.trim()) {
      alert('Please enter a category name');
      return;
    }
    onSubmit({
      front: data.front.trim(),
      definition: data.definition.trim(),
      example: data.example.trim(),
      category: finalCategory.trim(),
    });
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className='space-y-6'>
      <div className='space-y-2'>
        <Label htmlFor='front'>Word/Phrase/Question</Label>
        <Input
          id='front'
          placeholder='Enter the word, phrase, or question'
          {...register('front', { required: true })}
        />
        {errors.front && <span className='text-red-500 text-xs'>This field is required</span>}
      </div>

      <div className='space-y-2'>
        <Label htmlFor='definition'>Definition</Label>
        <Textarea
          id='definition'
          placeholder='Enter the definition'
          rows={4}
          {...register('definition', { required: true })}
        />
        {errors.definition && <span className='text-red-500 text-xs'>This field is required</span>}
      </div>

      <div className='space-y-2'>
        <Label htmlFor='example'>Example</Label>
        <Textarea
          id='example'
          placeholder='Enter an example'
          rows={4}
          {...register('example', { required: true })}
        />
        {errors.example && <span className='text-red-500 text-xs'>This field is required</span>}
      </div>

      <div className='space-y-2'>
        <Label htmlFor='category'>Category</Label>
        <Controller
          name='category'
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Select value={field.value} onValueChange={val => field.onChange(val)} required>
              <SelectTrigger>
                <SelectValue placeholder='Select a category' />
              </SelectTrigger>
              <SelectContent>
                {categories.map(cat => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
                <SelectItem value='Custom'>Custom</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        {errors.category && <span className='text-red-500 text-xs'>This field is required</span>}
      </div>

      {category === 'Custom' && (
        <div className='space-y-2'>
          <Label htmlFor='customCategory'>Custom Category Name</Label>
          <Input
            id='customCategory'
            placeholder='Enter custom category name'
            {...register('customCategory', { required: category === 'Custom' })}
          />
          {errors.customCategory && <span className='text-red-500 text-xs'>This field is required</span>}
        </div>
      )}

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
