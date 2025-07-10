'use client'

import { useFlashcards } from '@/hooks/use-flashcards'
import { ProgressDashboard } from '@/components/progress-dashboard'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BookOpen, Play } from 'lucide-react'
import Link from 'next/link'
import { useUserSession } from '@/hooks/use-user-session'
import { useEffect } from 'react'
import { redirect } from 'next/navigation'
import { routeName } from '@/constants/routeName'

export default function DashboardPage() {
  const { getStats } = useFlashcards()
  const stats = getStats()
  const { userSession, loading } = useUserSession()

  useEffect(() => {
    if (!loading && !userSession) redirect(routeName.signIn)
  }, [userSession, loading])

  if (loading) return <div>Loading...</div>
  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='text-center mb-8'>
        <h1 className='text-4xl font-bold mb-2'>English Vocabulary</h1>
        <p className='text-muted-foreground'>Master English vocabulary with spaced repetition</p>
      </div>

      <ProgressDashboard stats={stats} />

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto'>
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center'>
              <Play className='w-5 h-5 mr-2' />
              Start Studying
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-muted-foreground mb-4'>
              {stats.dueCards > 0 ? `You have ${stats.dueCards} cards ready for review.` : 'All cards are up to date! Check back later.'}
            </p>
            <Link href='/study'>
              <Button className='w-full' disabled={stats.dueCards === 0}>
                {stats.dueCards > 0 ? 'Start Review Session' : 'No Cards Due'}
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className='flex items-center'>
              <BookOpen className='w-5 h-5 mr-2' />
              Your Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-2'>
              <div className='flex justify-between'>
                <span>Total vocabulary:</span>
                <span className='font-semibold'>{stats.totalCards} words</span>
              </div>
              <div className='flex justify-between'>
                <span>Reviewed today:</span>
                <span className='font-semibold'>{stats.reviewedToday} cards</span>
              </div>
              <div className='flex justify-between'>
                <span>Current streak:</span>
                <span className='font-semibold'>{stats.streak} days</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
