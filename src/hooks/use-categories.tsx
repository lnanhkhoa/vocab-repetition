'use client'

import { supabase } from '@/lib/supabase'
import { useState, useEffect } from 'react'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export interface Category {
  id: string
  name: string
  code: string
  description: string
  difficulty: string
  createdAt: Date
}

interface CategoryStore {
  categories: Category[]
  setCategories: (categories: Category[]) => void
}

const categoriesStores = create<CategoryStore>()(
  persist(
    (set, get) => ({
      categories: [],
      setCategories: (categories: Category[]) => set({ categories })
    }),
    {
      name: 'categories-store',
      storage: createJSONStorage(() => sessionStorage)
    }
  )
)
export function useCategories() {
  const { categories, setCategories } = categoriesStores()

  const loadCategories = async () => {
    const responses = await supabase.from('categories').select('*').limit(100)
    const allCategories = responses.data as Category[]
    if (allCategories) setCategories(allCategories)
  }

  useEffect(() => {
    loadCategories()
  }, [])

  const addCategory = async (categoryData: { name: string; description: string; difficulty: string }) => {
    const existingCategory = categories.find(cat => cat.name.toLowerCase() === categoryData.name.toLowerCase())
    if (existingCategory) {
      throw new Error('A category with this name already exists. Please choose a different name.')
    }

    const code = categoryData.name.toLowerCase().replace(/\s+/g, '-')
    const params = {
      name: categoryData.name,
      code,
      description: categoryData.description,
      difficulty: categoryData.difficulty
    }

    const { data: newCategory } = await supabase.from('categories').insert([params]).select().single()
    if (newCategory) loadCategories()
  }

  const getCategoryByName = (name: string) => {
    return categories.find(cat => cat.name === name)
  }

  return {
    categories,
    addCategory,
    getCategoryByName
  }
}
