'use client'

import { useCards } from '@/hooks/use-cards'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { BarChart3, Calendar, Clock, Target, TrendingUp, Award } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function StatisticsPage() {
  const { cards } = useCards()
  const progress = {
    streak: 0
  }

  // Calculate detailed statistics
  const categoryStats = cards.reduce(
    (acc, card) => {
      if (!acc[card.category.code]) {
        acc[card.category.code] = { total: 0, mastered: 0 }
      }
      acc[card.category.code].total++
      if (card.repetitions >= 3) {
        acc[card.category.code].mastered++
      }
      return acc
    },
    {} as Record<string, { total: number; mastered: number }>
  )

  const difficultyStats = cards.reduce(
    (acc, card) => {
      if (card.easeFactor >= 2.5) acc.easy++
      else if (card.easeFactor >= 2.0) acc.medium++
      else acc.hard++
      return acc
    },
    { easy: 0, medium: 0, hard: 0 }
  )

  const masteredCards = cards.filter(card => card.repetitions >= 3).length
  const learningCards = cards.filter(card => card.repetitions > 0 && card.repetitions < 3).length
  const newCards = cards.filter(card => card.repetitions === 0).length

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='flex justify-between items-center mb-8'>
        <div>
          <h1 className='text-3xl font-bold mb-2'>Learning Statistics</h1>
          <p className='text-muted-foreground'>Track your English learning progress</p>
        </div>
        <Link href='/dashboard'>
          <Button variant='outline'>Back to Dashboard</Button>
        </Link>
      </div>

      {/* Overview Cards */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Mastered</CardTitle>
            <Award className='h-4 w-4 text-green-500' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold text-green-600'>{masteredCards}</div>
            <p className='text-xs text-muted-foreground'>{((masteredCards / cards.length) * 100).toFixed(1)}% of total</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Learning</CardTitle>
            <TrendingUp className='h-4 w-4 text-blue-500' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold text-blue-600'>{learningCards}</div>
            <p className='text-xs text-muted-foreground'>{((learningCards / cards.length) * 100).toFixed(1)}% of total</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>New Cards</CardTitle>
            <Target className='h-4 w-4 text-orange-500' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold text-orange-600'>{newCards}</div>
            <p className='text-xs text-muted-foreground'>{((newCards / cards.length) * 100).toFixed(1)}% of total</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Study Streak</CardTitle>
            <Calendar className='h-4 w-4 text-purple-500' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold text-purple-600'>{progress.streak}</div>
            <p className='text-xs text-muted-foreground'>consecutive days</p>
          </CardContent>
        </Card>
      </div>

      {/* Category Breakdown */}
      <Card className='mb-8'>
        <CardHeader>
          <CardTitle className='flex items-center'>
            <BarChart3 className='w-5 h-5 mr-2' />
            Progress by Category
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='space-y-4'>
            {Object.entries(categoryStats).map(([category, stats]) => {
              const percentage = (stats.mastered / stats.total) * 100
              return (
                <div key={category} className='space-y-2'>
                  <div className='flex justify-between items-center'>
                    <span className='font-medium'>{category}</span>
                    <span className='text-sm text-muted-foreground'>
                      {stats.mastered}/{stats.total} mastered
                    </span>
                  </div>
                  <Progress value={percentage} className='h-2' />
                  <div className='text-xs text-muted-foreground text-right'>{percentage.toFixed(1)}% complete</div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Difficulty Distribution */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center'>
              <Clock className='w-5 h-5 mr-2' />
              Difficulty Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              <div className='flex justify-between items-center'>
                <span className='text-green-600'>Easy Cards</span>
                <span className='font-bold'>{difficultyStats.easy}</span>
              </div>
              <Progress value={(difficultyStats.easy / cards.length) * 100} className='h-2' />

              <div className='flex justify-between items-center'>
                <span className='text-yellow-600'>Medium Cards</span>
                <span className='font-bold'>{difficultyStats.medium}</span>
              </div>
              <Progress value={(difficultyStats.medium / cards.length) * 100} className='h-2' />

              <div className='flex justify-between items-center'>
                <span className='text-red-600'>Hard Cards</span>
                <span className='font-bold'>{difficultyStats.hard}</span>
              </div>
              <Progress value={(difficultyStats.hard / cards.length) * 100} className='h-2' />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Learning Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              <div className='p-3 bg-green-50 rounded-lg border border-green-200'>
                <h4 className='font-semibold text-green-800 mb-1'>Strengths</h4>
                <p className='text-sm text-green-700'>
                  {masteredCards > 0
                    ? `You've mastered ${masteredCards} cards! Keep up the great work.`
                    : 'Start reviewing cards to build your strengths!'}
                </p>
              </div>

              <div className='p-3 bg-blue-50 rounded-lg border border-blue-200'>
                <h4 className='font-semibold text-blue-800 mb-1'>Focus Areas</h4>
                <p className='text-sm text-blue-700'>
                  {difficultyStats.hard > 0
                    ? `${difficultyStats.hard} cards need more practice. Review them regularly.`
                    : 'Great! No cards are currently marked as difficult.'}
                </p>
              </div>

              <div className='p-3 bg-orange-50 rounded-lg border border-orange-200'>
                <h4 className='font-semibold text-orange-800 mb-1'>Next Steps</h4>
                <p className='text-sm text-orange-700'>
                  {newCards > 0
                    ? `${newCards} new cards are waiting. Start learning them today!`
                    : 'All cards have been introduced. Focus on mastering them!'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
