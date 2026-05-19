import { useEffect } from 'react'
import Contact from '../components/Contact'

export default function ContactPage() {

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])


  return (
    <div className="pt-32 min-h-screen">
      <Contact />
    </div>
  )
}
