import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Inter } from 'next/font/google'
import { Toaster } from 'sonner'

const inter = Inter({
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'Vocabulary Builder',
  description: 'A vocabulary builder app to help you learn new words and improve your language skills.'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
          {children}
          <Toaster position='top-right' richColors />
        </ThemeProvider>
      </body>
    </html>
  )
}
