'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Play, BarChart3, BookOpen, Eye } from 'lucide-react'

export function Navigation() {
  const pathname = usePathname()

  const navItems = [
    { href: '/study', label: 'Study', icon: Play },
    { href: '/cards', label: 'Cards', icon: BookOpen },
    { href: '/statistics', label: 'Statistics', icon: BarChart3 }
  ]

  return (
    <nav className='border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='container mx-auto px-4'>
        <div className='flex h-16 items-center justify-between'>
          <div className='flex items-center space-x-4'>
            <Link href='/dashboard' className='font-bold text-xl'>
              Vocab Builder
            </Link>
          </div>

          <div className='flex items-center space-x-2'>
            {navItems.map(item => {
              const Icon = item.icon
              const isActive = pathname === item.href

              return (
                <Link key={item.href} href={item.href}>
                  <Button variant={isActive ? 'default' : 'ghost'} size='sm' className='flex items-center space-x-2'>
                    <Icon className='w-4 h-4' />
                    <span className='hidden sm:inline'>{item.label}</span>
                  </Button>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}
