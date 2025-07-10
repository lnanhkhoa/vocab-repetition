'use client'

import { useUserSession } from '@/hooks/use-user-session'
import { redirect } from 'next/navigation'
import { routeName } from '@/constants/routeName'

export default function HomePage() {
  const { userSession, loading } = useUserSession()

  if (loading) return <div>Loading...</div>
  if (!userSession) redirect(routeName.signIn)
}
