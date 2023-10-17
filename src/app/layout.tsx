import Header from '@/components/Header'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Sidebar from '@/components/Sidebar'
import Menu from '@/components/Menu'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MGF Web Scraper',
  description: 'Made in 3003 Headquarters',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex h-screen`}>

        <div className='hidden md:block'>
          {/* Sidebar */}
          <Sidebar/>
        </div>
        <div className="flex md:hidden pl-2 py-2 absolute top-0 left-0 sm:top-2 sm:left-2">
          {/* SM Sidebar */}
          <Menu/>
        </div>

        <main className='max-w-7xl w-full mx-auto p-10 overflow-y-auto'>
          {/* Header */}
          <Header/>
          {children}
        </main>        
        
      </body>
    </html>
  )
}
