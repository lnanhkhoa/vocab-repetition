import { Navigation } from '@/components/navigation'

export default function Layout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main>
      <Navigation />
      {children}
    </main>
  )
}
