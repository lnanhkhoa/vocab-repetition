'use client'

import type React from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { DIFFICULTY_LEVELS } from '@/constants/app-config'
import { useCategories } from '@/hooks/use-categories'

const defaultDifficulty = DIFFICULTY_LEVELS[DIFFICULTY_LEVELS.length - 1]

interface CategoryFormProps {
  onSubmit: (categoryData: { name: string; description: string; difficulty: string }) => void
  onCancel: () => void
  isLoading?: boolean
}

export function CategoryForm({ onSubmit, onCancel, isLoading = false }: CategoryFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues: {
      name: '',
      code: '',
      description: '',
      difficulty: defaultDifficulty
    }
  })

  const difficulty = watch('difficulty')

  const onFormSubmit = (data: { name: string; description: string; difficulty: { value: string; label: string } }) => {
    onSubmit({
      name: data.name.trim(),
      description: data.description.trim(),
      difficulty: data.difficulty.value
    })
  }
  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className='space-y-6'>
      <div className='space-y-2'>
        <Label htmlFor='categoryName'>Category Name *</Label>
        <Input
          id='categoryName'
          placeholder='e.g., Medical Terminology, Travel Phrases'
          {...register('name', { required: 'Please enter a category name' })}
        />
        {errors.name && <p className='text-xs text-red-500'>{errors.name.message as string}</p>}
        <p className='text-xs text-muted-foreground'>Choose a descriptive name for your category</p>
      </div>

      <div className='space-y-2'>
        <Label htmlFor='categoryDescription'>Description *</Label>
        <Textarea
          id='categoryDescription'
          placeholder='Describe what type of vocabulary this category contains...'
          rows={3}
          {...register('description', { required: 'Please enter a category description' })}
        />
        {errors.description && <p className='text-xs text-red-500'>{errors.description.message as string}</p>}
        <p className='text-xs text-muted-foreground'>Explain what kind of words or phrases this category will contain</p>
      </div>

      <div className='space-y-2'>
        <Label htmlFor='categoryDifficulty'>Difficulty Level</Label>
        <Select
          value={difficulty.value}
          onValueChange={value => setValue('difficulty', DIFFICULTY_LEVELS.find(level => level.value === value) || defaultDifficulty)}
        >
          <SelectTrigger>
            <SelectValue placeholder='Select difficulty level' />
          </SelectTrigger>
          <SelectContent>
            {DIFFICULTY_LEVELS.map(level => (
              <SelectItem key={level.value} value={level.value}>
                {level.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p className='text-xs text-muted-foreground'>Indicate the general difficulty level for words in this category</p>
      </div>

      <div className='flex justify-end space-x-3'>
        <Button type='button' variant='outline' onClick={onCancel} disabled={isLoading}>
          Cancel
        </Button>
        <Button type='submit' disabled={isLoading}>
          {isLoading ? 'Creating...' : 'Create Category'}
        </Button>
      </div>
    </form>
  )
}
