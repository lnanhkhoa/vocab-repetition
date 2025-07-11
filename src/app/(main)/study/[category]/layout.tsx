import { CATEGORIES } from '@/constants/app-config'
import { redirect } from 'next/navigation'

export default function StudyLayout({ children, params }: { children: React.ReactNode; params: { category: string } }) {
  const category = CATEGORIES.find(cat => cat.id === params.category)
  if (!category) {
    redirect('/404')
  }

  return children
}
