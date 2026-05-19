import Navbar from './Navbar'
import Footer from './Footer'
import ScrollButton from './ScrollButton'
import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'

export default function Layout() {
  const { pathname } = useLocation()
  
  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname])

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col relative">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <ScrollButton />
    </div>
  )
}
