'use client'

import { useState, useEffect } from 'react'
import { Card as CardComponent, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { CardForm } from '@/components/card-form'
import { Search, Filter, BookOpen, Clock, Award, Plus, MoreVertical, Edit, Trash2, FolderPlus, Folder } from 'lucide-react'
import type { EditFlashcard, Card, Category } from '@/types'
import { useCategories } from '@/hooks/use-categories'
import { CategoryForm } from '@/components/category-form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui'
import { toast } from 'sonner'
import { OPTION_SELECT_ALL } from '@/constants/app-config'
import { useCards } from '@/hooks/use-cards'

const pageSize = 10 // You can adjust this as needed

export default function CardsPage() {
  const { cards = [], addCard, editCard, deleteCard } = useCards()
  const { categories, addCategory } = useCategories()

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(OPTION_SELECT_ALL)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [editingCard, setEditingCard] = useState<Card | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false)
  const [isCategoryLoading, setIsCategoryLoading] = useState(false)

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)

  const filteredCards = cards.filter(card => {
    const matchesSearch = card.front.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory.value === OPTION_SELECT_ALL.value || card.category.code === selectedCategory.value
    return matchesSearch && matchesCategory
  })

  // Pagination calculations
  const totalCards = filteredCards.length
  const totalPages = Math.ceil(totalCards / pageSize)
  const paginatedCards = filteredCards.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, selectedCategory])

  const handleAddCard = async (cardData: EditFlashcard) => {
    setIsLoading(true)
    try {
      addCard(cardData)
      setIsAddModalOpen(false)
    } catch (error) {
      toast.error('Failed to add card. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleEditCard = async (cardData: EditFlashcard) => {
    if (!editingCard) return

    setIsLoading(true)
    try {
      editCard(editingCard.id, cardData)
      setEditingCard(null)
    } catch (error) {
      toast.error('Failed to update card. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteCard = (cardId: string) => {
    if (confirm('Are you sure you want to delete this card? This action cannot be undone.')) {
      deleteCard(cardId)
    }
  }

  const getStatusBadge = (card: Card) => {
    if (card.repetitions === 0) return <Badge variant='secondary'>New</Badge>
    if (card.repetitions < 3) return <Badge variant='outline'>Learning</Badge>
    return <Badge className='bg-green-100 text-green-800'>Mastered</Badge>
  }

  const getDifficultyColor = (easeFactor: number) => {
    if (easeFactor >= 2.5) return 'text-green-600'
    if (easeFactor >= 2.0) return 'text-yellow-600'
    return 'text-red-600'
  }

  const handleAddCategory = async (categoryData: { name: string; description: string; color: string; difficulty: string }) => {
    setIsCategoryLoading(true)
    try {
      // Check if category name already exists
      const existingCategory = categories.find(cat => cat.name.toLowerCase() === categoryData.name.toLowerCase())

      if (existingCategory) {
        alert('A category with this name already exists. Please choose a different name.')
        return
      }

      addCategory(categoryData)
      setIsCategoryModalOpen(false)
      toast.success(`Category "${categoryData.name}" created successfully!`)
    } catch (error) {
      toast.error('Failed to create category. Please try again.')
    } finally {
      setIsCategoryLoading(false)
    }
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='flex justify-between items-center mb-8'>
        <div>
          <h1 className='text-3xl font-bold mb-2'>Card Library</h1>
          <p className='text-muted-foreground'>Manage your vocabulary cards</p>
        </div>

        <div className='flex items-center space-x-3'>
          {/* Add New Category Button */}
          <Dialog open={isCategoryModalOpen} onOpenChange={setIsCategoryModalOpen}>
            <DialogTrigger asChild>
              <Button variant='outline' className='flex items-center space-x-2 bg-transparent'>
                <FolderPlus className='w-4 h-4' />
                <span>Add Category</span>
              </Button>
            </DialogTrigger>
            <DialogContent className='max-w-2xl'>
              <DialogHeader>
                <DialogTitle className='flex items-center space-x-2'>
                  <Folder className='w-5 h-5' />
                  <span>Create New Category</span>
                </DialogTitle>
              </DialogHeader>
              <CategoryForm onSubmit={handleAddCategory} onCancel={() => setIsCategoryModalOpen(false)} isLoading={isCategoryLoading} />
            </DialogContent>
          </Dialog>

          {/* Add New Card Button */}
          <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
            <DialogTrigger asChild>
              <Button className='flex items-center space-x-2'>
                <Plus className='w-4 h-4' />
                <span>Add New Card</span>
              </Button>
            </DialogTrigger>
            <DialogContent className='max-w-2xl'>
              <DialogHeader>
                <DialogTitle>Add New Card</DialogTitle>
              </DialogHeader>
              <CardForm onSubmit={handleAddCard} onCancel={() => setIsAddModalOpen(false)} isLoading={isLoading} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <CardComponent className='mb-6'>
        <CardHeader>
          <CardTitle className='flex items-center'>
            <Filter className='w-5 h-5 mr-2' />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            <div>
              <label className='text-sm font-medium mb-2 block'>Search</label>
              <div className='relative'>
                <Search className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' />
                <Input placeholder='Search cards...' value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className='pl-10' />
              </div>
            </div>

            <div className=''>
              <label className='text-sm font-medium mb-2 block'>Category</label>
              <Select value={selectedCategory.value} onValueChange={e => setSelectedCategory({ value: e, label: e })}>
                <SelectTrigger className='min-w-[120px]'>
                  <SelectValue placeholder='Select a category' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={OPTION_SELECT_ALL.value}>{OPTION_SELECT_ALL.label}</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category.id} value={category.name}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </CardComponent>

      {/* Results Summary */}
      <div className='mb-6 flex justify-between items-center'>
        <p className='text-muted-foreground'>
          Showing {filteredCards.length} of {cards.length} cards
        </p>
        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className='flex justify-center mt-6 space-x-2'>
            <Button variant='outline' size='sm' onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1}>
              Previous
            </Button>
            {Array.from({ length: totalPages }, (_, i) => (
              <Button key={i + 1} variant={currentPage === i + 1 ? 'default' : 'outline'} size='sm' onClick={() => setCurrentPage(i + 1)}>
                {i + 1}
              </Button>
            ))}
            <Button
              variant='outline'
              size='sm'
              onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        )}
      </div>

      {/* Cards Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {paginatedCards.map(card => (
          <CardComponent key={card.id} className='hover:shadow-md transition-shadow relative gap-2'>
            {/* Options Menu */}
            <div className='absolute top-3 right-3 z-10'>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant='ghost' size='sm' className='h-8 w-8 p-0'>
                    <MoreVertical className='h-4 w-4' />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end'>
                  <DropdownMenuItem onClick={() => setEditingCard(card)}>
                    <Edit className='w-4 h-4 mr-2' />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleDeleteCard(card.id)} className='text-red-600 focus:text-red-600'>
                    <Trash2 className='w-4 h-4 mr-2' />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <CardHeader className='pb-1 pr-12'>
              <div className='flex justify-between items-start'>
                <CardTitle className='text-lg pr-4'>{card.front}</CardTitle>
                {getStatusBadge(card)}
              </div>
              {/* <Badge variant='outline' className='w-fit text-xs'>
                {card.category.label}
              </Badge> */}
            </CardHeader>
            <CardContent className='gap-1'>
              <p className='text-muted-foreground mb-2 line-clamp-3'>{card.definition}</p>
              <div className='space-y-2 text-sm'>
                <div className='flex justify-between'>
                  <span className='flex items-center'>
                    <BookOpen className='w-4 h-4 mr-1' />
                    Reviews:
                  </span>
                  <span className='font-medium'>{card.repetitions}</span>
                </div>

                <div className='flex justify-between'>
                  <span className='flex items-center'>
                    <Clock className='w-4 h-4 mr-1' />
                    Interval:
                  </span>
                  <span className='font-medium'>{card.interval} days</span>
                </div>

                <div className='flex justify-between'>
                  <span className='flex items-center'>
                    <Award className='w-4 h-4 mr-1' />
                    Difficulty:
                  </span>
                  <span className={`font-medium ${getDifficultyColor(card.easeFactor)}`}>{card.easeFactor.toFixed(1)}</span>
                </div>

                <div className='flex justify-between'>
                  <span className='flex items-center'>
                    <Award className='w-4 h-4 mr-1' />
                    Review Count:
                  </span>
                  <span className='font-medium'>{card.repetitions}</span>
                </div>

                {/* <div className='flex justify-between'>
                  <span>Next Review:</span>
                  <span className='font-medium'>{new Date(card.nextReview).toLocaleDateString()}</span>
                </div> */}
              </div>
            </CardContent>
          </CardComponent>
        ))}
      </div>

      {/* Edit Card Modal */}
      <Dialog open={!!editingCard} onOpenChange={() => setEditingCard(null)}>
        <DialogContent className='max-w-2xl'>
          <DialogHeader>
            <DialogTitle>Edit Card</DialogTitle>
          </DialogHeader>
          {editingCard && (
            <CardForm card={editingCard} onSubmit={handleEditCard} onCancel={() => setEditingCard(null)} isLoading={isLoading} />
          )}
        </DialogContent>
      </Dialog>

      {filteredCards.length === 0 && (
        <CardComponent className='text-center py-8'>
          <CardContent>
            <BookOpen className='w-16 h-16 text-muted-foreground mx-auto mb-4' />
            <h3 className='text-lg font-semibold mb-2'>No cards found</h3>
            <p className='text-muted-foreground mb-4'>Try adjusting your search or filter criteria.</p>
            <Button onClick={() => setIsAddModalOpen(true)}>
              <Plus className='w-4 h-4 mr-2' />
              Add Your First Card
            </Button>
          </CardContent>
        </CardComponent>
      )}
    </div>
  )
}
