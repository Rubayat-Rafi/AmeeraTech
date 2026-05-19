import { useEffect } from 'react'
import Services from '../components/Services'

export default function ServicesPage() {

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="pt-32 min-h-screen">
      <Services />
    </div>
  )
}
