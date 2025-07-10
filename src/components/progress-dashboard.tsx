'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { BookOpen, Calendar, Target, TrendingUp } from 'lucide-react'

interface ProgressDashboardProps {
  stats: {
    totalCards: number
    dueCards: number
    reviewedToday: number
    streak: number
  }
}

export function ProgressDashboard({ stats }: ProgressDashboardProps) {
  const completionRate = stats.totalCards > 0 ? ((stats.totalCards - stats.dueCards) / stats.totalCards) * 100 : 0

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8'>
      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>Total Cards</CardTitle>
          <BookOpen className='h-4 w-4 text-muted-foreground' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>{stats.totalCards}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>Due for Review</CardTitle>
          <Target className='h-4 w-4 text-muted-foreground' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold text-orange-600'>{stats.dueCards}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>Reviewed Today</CardTitle>
          <Calendar className='h-4 w-4 text-muted-foreground' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold text-green-600'>{stats.reviewedToday}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>Study Streak</CardTitle>
          <TrendingUp className='h-4 w-4 text-muted-foreground' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold text-blue-600'>{stats.streak} days</div>
        </CardContent>
      </Card>

      <Card className='md:col-span-2 lg:col-span-4'>
        <CardHeader>
          <CardTitle className='text-sm font-medium'>Overall Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={completionRate} className='w-full' />
          <p className='text-sm text-muted-foreground mt-2'>{completionRate.toFixed(1)}% of cards mastered</p>
        </CardContent>
      </Card>
    </div>
  )
}
