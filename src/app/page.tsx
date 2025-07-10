'use client'
import { Button } from '@/components/ui/button'
import { useUserSession } from '@/hooks/use-user-session'

export default function Home() {
  const { userSession } = useUserSession()

  const email = userSession?.user.email

  return (
    <main className='min-h-screen bg-gradient-to-b from-blue-50 to-white'>
      {/* User Info / Sign-in Button */}
      <div className='fixed top-4 right-4 z-50'>
        {userSession ? (
          <div className='flex items-center gap-2'>
            <Button variant='ghost'>{email}</Button>
            <Button asChild>
              <a href='/dashboard'>Dashboard</a>
            </Button>
          </div>
        ) : (
          <Button asChild>
            <a href='/sign-in'>Sign In</a>
          </Button>
        )}
      </div>
      {/* Hero Section */}
      <section className='container mx-auto px-4 py-20'>
        <div className='max-w-4xl mx-auto text-center'>
          <h1 className='text-4xl md:text-6xl font-bold text-gray-900 mb-6'>Vocab Builder</h1>
          <p className='text-xl text-gray-600 mb-8'>
            Learn new words faster and remember them longer with our scientifically proven method
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className='container mx-auto px-4 py-16'>
        <div className='grid md:grid-cols-3 gap-8'>
          <div className='p-6 bg-white rounded-lg shadow-md'>
            <h3 className='text-xl font-semibold mb-4'>Smart Scheduling</h3>
            <p className='text-gray-600'>Our system automatically adjusts review intervals based on your performance</p>
          </div>
          <div className='p-6 bg-white rounded-lg shadow-md'>
            <h3 className='text-xl font-semibold mb-4'>Personalized Learning</h3>
            <p className='text-gray-600'>Focus on words you find challenging while reinforcing what you know</p>
          </div>
          <div className='p-6 bg-white rounded-lg shadow-md'>
            <h3 className='text-xl font-semibold mb-4'>Track Progress</h3>
            <p className='text-gray-600'>Monitor your vocabulary growth and learning patterns over time</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className='container mx-auto px-4 py-16 bg-gray-50'>
        <h2 className='text-3xl font-bold text-center mb-12'>How It Works</h2>
        <div className='max-w-4xl mx-auto'>
          <div className='space-y-8'>
            <div>
              <h4 className='text-xl font-semibold mb-4'>1. Start Learning</h4>
              <p className='text-gray-600'>Begin with new words and phrases at your own pace</p>
            </div>
            <div>
              <h4 className='text-xl font-semibold mb-4'>2. Review Effectively</h4>
              <p className='text-gray-600'>Review words based on your performance and retention</p>
            </div>
            <div>
              <h4 className='text-xl font-semibold mb-4'>3. Master Vocabulary</h4>
              <p className='text-gray-600'>Watch your vocabulary grow and retain knowledge long-term</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
